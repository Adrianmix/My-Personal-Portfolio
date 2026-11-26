import * as THREE from 'three';
import {
  SECTION_IDS,
  SHAPE_NAMES,
  computeScrollChoreography,
  computeSurfaceDarkness,
  createSeededRandom,
  generateShapePositions,
} from '../utils/particles';

// 80 x 80 structured lattice -> silky continuous dotted contours & folded wave ridges
const PARTICLE_COUNT = 6400;

const VERTEX_SHADER = `
  attribute vec3 aShape0;
  attribute vec3 aShape1;
  attribute vec3 aShape2;
  attribute vec3 aShape3;
  attribute vec3 aShape4;
  attribute vec3 aShape5;
  attribute vec3 aSeed;

  uniform vec3 uWeightsA;
  uniform vec3 uWeightsB;
  uniform float uTurbulence;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  uniform vec2 uMouseNdc;
  uniform float uMouseActive;
  uniform float uAspect;

  varying float vCoc;
  varying float vCrest;
  varying float vHue;

  void main() {
    vec3 pos =
      aShape0 * uWeightsA.x +
      aShape1 * uWeightsA.y +
      aShape2 * uWeightsA.z +
      aShape3 * uWeightsB.x +
      aShape4 * uWeightsB.y +
      aShape5 * uWeightsB.z;

    // Continuous fluid wave undulation across the folded lattice
    float wavePhase = pos.x * 1.45 + pos.z * 1.15 - uTime * 0.85;
    float wavePhase2 = pos.z * 2.1 - pos.x * 1.3 + uTime * 0.62;
    pos.y += sin(wavePhase) * 0.14 + cos(wavePhase2) * 0.08;
    pos.z += sin(pos.x * 1.2 + uTime * 0.5) * 0.07;

    // Gentle swirl dispersion during section-to-section morph transitions
    float swirlAngle = uTurbulence * (1.2 + aSeed.x * 1.4);
    float s = sin(swirlAngle);
    float c = cos(swirlAngle);
    pos.xz = mat2(c, -s, s, c) * pos.xz;
    pos += normalize(pos + vec3(0.001)) * (uTurbulence * 0.28 * sin(aSeed.x * 6.2831 + uTime * 1.8));

    // Subtle pointer tilt
    pos.y += uPointer.y * 0.09 * pos.z;
    pos.x += uPointer.x * 0.09 * pos.z;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vec4 clipPos = projectionMatrix * mvPosition;
    vec2 ndc = clipPos.xy / max(clipPos.w, 0.001);

    // Localized organic mouse-pointer dispersion in a small feathered area
    vec2 delta = ndc - uMouseNdc;
    delta.x *= uAspect;
    float mouseDist = length(delta);
    float localRadius = 0.115 + 0.055 * aSeed.x;
    float repel = smoothstep(localRadius, 0.0, mouseDist) * uMouseActive;
    float falloff = repel * repel * (0.45 + 0.9 * aSeed.y);

    vec2 baseDir = mouseDist > 0.0005
      ? normalize(delta)
      : vec2(cos(aSeed.x * 6.2831), sin(aSeed.x * 6.2831));
    float swirl = (aSeed.z - 0.5) * 1.35 * repel;
    float sc = cos(swirl);
    float ss = sin(swirl);
    vec2 pushDir = vec2(
      baseDir.x * sc - baseDir.y * ss,
      baseDir.x * ss + baseDir.y * sc
    );
    pushDir.x /= max(uAspect, 0.1);
    float pushStrength = falloff * 0.42;
    mvPosition.x += pushDir.x * pushStrength * (-mvPosition.z * 0.36);
    mvPosition.y += pushDir.y * pushStrength * (-mvPosition.z * 0.36);
    mvPosition.z += (aSeed.x - 0.5) * repel * 0.62 - repel * 0.12;

    gl_Position = projectionMatrix * mvPosition;

    // Photographic Depth-of-Field (Circle of Confusion):
    // Focal plane sits near camera z (~7.0); closer/farther particles soften into bokeh halos.
    float viewDist = -mvPosition.z;
    float coc = clamp(abs(viewDist - 7.0) / 1.95, 0.0, 1.0);
    vCoc = coc;
    vCrest = smoothstep(-0.35, 0.85, pos.y + sin(wavePhase) * 0.25) + repel * 0.12;
    vHue = aSeed.z;

    float sharpPx = mix(2.2, 3.8, aSeed.y);
    float bokehPx = mix(9.5, 22.0, aSeed.y);
    float pointPx = mix(sharpPx, bokehPx, coc * coc);
    gl_PointSize = clamp(pointPx * uPixelRatio, 1.6, 28.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform vec3 uLightDeep;
  uniform vec3 uLightMid;
  uniform vec3 uLightBright;
  uniform vec3 uDarkDeep;
  uniform vec3 uDarkMid;
  uniform vec3 uDarkBright;
  uniform float uSurfaceDarkness;
  uniform float uStagePresence;

  varying float vCoc;
  varying float vCrest;
  varying float vHue;

  void main() {
    vec2 centered = (gl_PointCoord - 0.5) * 2.0;
    float distSq = dot(centered, centered);
    if (distSq > 1.0) discard;

    // Sharp pinpoint core in focal plane -> soft Gaussian bokeh falloff out of focus
    float sharpMask = smoothstep(1.0, 0.12, sqrt(distSq));
    float bokehMask = exp(-distSq * 3.4);
    float shapeAlpha = mix(sharpMask, bokehMask, vCoc);

    // Rich violet -> orchid-magenta -> bright lavender/white crest gradient
    vec3 lightCol = mix(uLightDeep, uLightMid, smoothstep(0.15, 0.75, vHue));
    lightCol = mix(lightCol, uLightBright, vCrest * 0.55);

    vec3 darkCol = mix(uDarkDeep, uDarkMid, smoothstep(0.15, 0.75, vHue));
    darkCol = mix(darkCol, uDarkBright, pow(vCrest, 1.4) * 0.85);

    vec3 finalColor = mix(lightCol, darkCol, uSurfaceDarkness);

    // Sharp focal particles read brightly; bokeh particles diffuse softly so ridges glow
    float focusOpacity = mix(0.78, 0.19, pow(vCoc, 0.85));
    float surfaceBoost = mix(0.9, 1.15, uSurfaceDarkness);
    float alpha = shapeAlpha * focusOpacity * surfaceBoost * uStagePresence;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function mountParticles(canvas: HTMLCanvasElement) {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = reducedMotionQuery.matches;

  const isSoftwareGl = (() => {
    try {
      const probe = document.createElement('canvas').getContext('webgl2');
      if (!probe) return true;
      const ext = probe.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
      const gpu = String(probe.getParameter(param));
      probe.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      return true;
    }
  })();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isSoftwareGl,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const pixelRatio = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);

  const geometry = new THREE.BufferGeometry();
  const shapeBuffers = SHAPE_NAMES.map((shape, idx) =>
    generateShapePositions(shape, PARTICLE_COUNT, 2026 + idx * 17),
  );

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(shapeBuffers[0]!), 3),
  );
  shapeBuffers.forEach((buf, idx) => {
    geometry.setAttribute(`aShape${idx}`, new THREE.BufferAttribute(buf, 3));
  });

  const seeds = new Float32Array(PARTICLE_COUNT * 3);
  const rand = createSeededRandom(9001);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    seeds[i * 3] = rand();
    seeds[i * 3 + 1] = rand();
    seeds[i * 3 + 2] = rand();
  }
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));

  const uniforms = {
    uWeightsA: { value: new THREE.Vector3(1, 0, 0) },
    uWeightsB: { value: new THREE.Vector3(0, 0, 0) },
    uTurbulence: { value: 0 },
    uTime: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uMouseNdc: { value: new THREE.Vector2(0, 0) },
    uMouseActive: { value: 0 },
    uAspect: { value: 1 },
    // Light backdrop palette: deep plum/violet -> orchid -> crisp iris
    uLightDeep: { value: new THREE.Color(0x4c1d95) },
    uLightMid: { value: new THREE.Color(0x9333ea) },
    uLightBright: { value: new THREE.Color(0xc026d3) },
    // Dark backdrop palette (matches reference): deep violet -> vivid orchid -> glowing white crest
    uDarkDeep: { value: new THREE.Color(0x6b21a8) },
    uDarkMid: { value: new THREE.Color(0xd946ef) },
    uDarkBright: { value: new THREE.Color(0xfdf4ff) },
    uSurfaceDarkness: { value: 0 },
    uStagePresence: { value: 1.0 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  const sectionElements = SECTION_IDS.map((id) => document.getElementById(id));
  const sectionCenters: number[] = new Array(SECTION_IDS.length).fill(0);

  let isDarkTheme = document.documentElement.classList.contains('dark');
  const isRtl = document.documentElement.dir === 'rtl';

  let halfHeight = 1;
  let halfWidth = 1;
  let isMobile = window.innerWidth < 1024;

  function syncBlendingMode(surfaceDarkness: number) {
    const nextBlending =
      surfaceDarkness >= 0.5 ? THREE.AdditiveBlending : THREE.NormalBlending;
    if (material.blending !== nextBlending) {
      material.blending = nextBlending;
    }
  }

  function updateViewportMetrics() {
    const width = Math.max(window.innerWidth, 1);
    const height = Math.max(window.innerHeight, 1);
    isMobile = width < 1024;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    halfHeight =
      Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * camera.position.z;
    halfWidth = halfHeight * camera.aspect;
    uniforms.uAspect.value = camera.aspect;
  }

  function sampleSectionCenters() {
    for (let i = 0; i < sectionElements.length; i++) {
      const el = sectionElements[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        sectionCenters[i] = rect.top + rect.height * 0.5;
      } else {
        sectionCenters[i] = i * window.innerHeight;
      }
    }
  }

  let lastReportedSection = '';
  let lastReportedShape = '';
  function syncDataset(sectionId: string, shape: string) {
    if (lastReportedSection !== sectionId) {
      lastReportedSection = sectionId;
      canvas.dataset.section = sectionId;
    }
    if (lastReportedShape !== shape) {
      lastReportedShape = shape;
      canvas.dataset.shape = shape;
    }
  }

  updateViewportMetrics();
  sampleSectionCenters();
  const initialChoreo = computeScrollChoreography(
    sectionCenters,
    window.innerHeight,
    isRtl,
    isMobile,
  );
  uniforms.uWeightsA.value.set(
    initialChoreo.weights[0],
    initialChoreo.weights[1],
    initialChoreo.weights[2],
  );
  uniforms.uWeightsB.value.set(
    initialChoreo.weights[3],
    initialChoreo.weights[4],
    initialChoreo.weights[5],
  );
  uniforms.uTurbulence.value = initialChoreo.turbulence;
  const initialDarkness = computeSurfaceDarkness(
    isDarkTheme,
    initialChoreo.contactBlend,
  );
  uniforms.uSurfaceDarkness.value = initialDarkness;
  syncBlendingMode(initialDarkness);
  uniforms.uStagePresence.value =
    0.58 + 0.42 * (initialChoreo.weights[0] + initialChoreo.weights[5]);
  points.position.set(
    initialChoreo.xFrac * halfWidth,
    initialChoreo.yFrac * halfHeight,
    0,
  );
  points.scale.setScalar(initialChoreo.scale);
  syncDataset(initialChoreo.activeSectionId, initialChoreo.activeShape);

  const pointerTarget = { x: 0, y: 0 };
  const pointerCurrent = { x: 0, y: 0 };
  let mouseActiveTarget = 0;
  let mouseActiveCurrent = 0;

  const onPointerMove = (e: PointerEvent) => {
    pointerTarget.x = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
    pointerTarget.y = -(e.clientY / Math.max(window.innerHeight, 1)) * 2 + 1;
    mouseActiveTarget = 1;
  };
  const onPointerLeave = () => {
    mouseActiveTarget = 0;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onPointerLeave, {
    passive: true,
  });

  let scrollDirty = true;
  const onScroll = () => {
    scrollDirty = true;
    if (prefersReducedMotion) renderStaticSnapshot();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  const onResize = () => {
    updateViewportMetrics();
    scrollDirty = true;
    if (prefersReducedMotion) renderStaticSnapshot();
  };
  window.addEventListener('resize', onResize, { passive: true });

  const themeObserver = new MutationObserver(() => {
    isDarkTheme = document.documentElement.classList.contains('dark');
    if (prefersReducedMotion) renderStaticSnapshot();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  function renderStaticSnapshot() {
    sampleSectionCenters();
    const choreo = computeScrollChoreography(
      sectionCenters,
      window.innerHeight,
      isRtl,
      isMobile,
    );
    uniforms.uWeightsA.value.set(
      choreo.weights[0],
      choreo.weights[1],
      choreo.weights[2],
    );
    uniforms.uWeightsB.value.set(
      choreo.weights[3],
      choreo.weights[4],
      choreo.weights[5],
    );
    uniforms.uTurbulence.value = choreo.turbulence;
    const nextDarkness = computeSurfaceDarkness(isDarkTheme, choreo.contactBlend);
    uniforms.uSurfaceDarkness.value = nextDarkness;
    syncBlendingMode(nextDarkness);
    uniforms.uStagePresence.value =
      0.58 + 0.42 * (choreo.weights[0] + choreo.weights[5]);
    points.position.set(choreo.xFrac * halfWidth, choreo.yFrac * halfHeight, 0);
    points.scale.setScalar(choreo.scale);
    syncDataset(choreo.activeSectionId, choreo.activeShape);
    renderer.render(scene, camera);
  }

  let currentChoreo = initialChoreo;
  const clock = new THREE.Clock();
  let frameId = 0;
  let disposed = false;

  function afterDraw(cb: () => void) {
    const gl = renderer.getContext() as WebGL2RenderingContext;
    if (!gl || typeof gl.fenceSync !== 'function') {
      frameId = window.setTimeout(cb, 80);
      return;
    }
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      if (disposed) {
        if (sync) gl.deleteSync(sync);
        return;
      }
      const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        frameId = window.setTimeout(poll, 5);
      } else {
        if (sync) gl.deleteSync(sync);
        frameId = window.setTimeout(cb, 80);
      }
    };
    frameId = window.setTimeout(poll, 5);
  }

  function tick() {
    if (disposed) return;

    const dt = Math.min(clock.getDelta(), 0.1);
    uniforms.uTime.value += dt;

    if (scrollDirty) {
      scrollDirty = false;
      sampleSectionCenters();
      currentChoreo = computeScrollChoreography(
        sectionCenters,
        window.innerHeight,
        isRtl,
        isMobile,
      );
      syncDataset(currentChoreo.activeSectionId, currentChoreo.activeShape);
    }

    const morphLambda = 6.5;
    uniforms.uWeightsA.value.x = THREE.MathUtils.damp(
      uniforms.uWeightsA.value.x,
      currentChoreo.weights[0],
      morphLambda,
      dt,
    );
    uniforms.uWeightsA.value.y = THREE.MathUtils.damp(
      uniforms.uWeightsA.value.y,
      currentChoreo.weights[1],
      morphLambda,
      dt,
    );
    uniforms.uWeightsA.value.z = THREE.MathUtils.damp(
      uniforms.uWeightsA.value.z,
      currentChoreo.weights[2],
      morphLambda,
      dt,
    );
    uniforms.uWeightsB.value.x = THREE.MathUtils.damp(
      uniforms.uWeightsB.value.x,
      currentChoreo.weights[3],
      morphLambda,
      dt,
    );
    uniforms.uWeightsB.value.y = THREE.MathUtils.damp(
      uniforms.uWeightsB.value.y,
      currentChoreo.weights[4],
      morphLambda,
      dt,
    );
    uniforms.uWeightsB.value.z = THREE.MathUtils.damp(
      uniforms.uWeightsB.value.z,
      currentChoreo.weights[5],
      morphLambda,
      dt,
    );
    uniforms.uTurbulence.value = THREE.MathUtils.damp(
      uniforms.uTurbulence.value,
      currentChoreo.turbulence,
      morphLambda,
      dt,
    );

    const targetDarkness = computeSurfaceDarkness(
      isDarkTheme,
      currentChoreo.contactBlend,
    );
    uniforms.uSurfaceDarkness.value = THREE.MathUtils.damp(
      uniforms.uSurfaceDarkness.value,
      targetDarkness,
      7.0,
      dt,
    );
    syncBlendingMode(uniforms.uSurfaceDarkness.value);

    const targetPresence =
      0.58 + 0.42 * (currentChoreo.weights[0] + currentChoreo.weights[5]);
    uniforms.uStagePresence.value = THREE.MathUtils.damp(
      uniforms.uStagePresence.value,
      targetPresence,
      6.0,
      dt,
    );

    pointerCurrent.x = THREE.MathUtils.damp(
      pointerCurrent.x,
      pointerTarget.x,
      7.5,
      dt,
    );
    pointerCurrent.y = THREE.MathUtils.damp(
      pointerCurrent.y,
      pointerTarget.y,
      7.5,
      dt,
    );
    mouseActiveCurrent = THREE.MathUtils.damp(
      mouseActiveCurrent,
      mouseActiveTarget,
      6.0,
      dt,
    );
    uniforms.uPointer.value.set(pointerCurrent.x, pointerCurrent.y);
    uniforms.uMouseNdc.value.set(pointerCurrent.x, pointerCurrent.y);
    uniforms.uMouseActive.value = mouseActiveCurrent;

    const targetPosX =
      currentChoreo.xFrac * halfWidth + pointerCurrent.x * 0.18;
    const targetPosY =
      currentChoreo.yFrac * halfHeight + pointerCurrent.y * 0.14;
    points.position.x = THREE.MathUtils.damp(
      points.position.x,
      targetPosX,
      5.5,
      dt,
    );
    points.position.y = THREE.MathUtils.damp(
      points.position.y,
      targetPosY,
      5.5,
      dt,
    );
    const nextScale = THREE.MathUtils.damp(
      points.scale.x,
      currentChoreo.scale,
      5.5,
      dt,
    );
    points.scale.setScalar(nextScale);

    // Gentle sway instead of fast spin so wave ridges read clearly like macro silk
    points.rotation.y =
      Math.sin(uniforms.uTime.value * currentChoreo.rotSpeedY * 1.8) * 0.28 +
      pointerCurrent.x * 0.16;
    points.rotation.x =
      Math.sin(uniforms.uTime.value * 0.35) * 0.1 +
      pointerCurrent.y * -0.12 +
      currentChoreo.rotSpeedX * 0.35;

    renderer.render(scene, camera);

    if (prefersReducedMotion) return;

    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }
  }

  const onReducedMotionChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion = e.matches;
    if (prefersReducedMotion) {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      renderStaticSnapshot();
    } else {
      clock.getDelta();
      tick();
    }
  };
  reducedMotionQuery.addEventListener('change', onReducedMotionChange);

  if (prefersReducedMotion) {
    renderStaticSnapshot();
  } else {
    tick();
  }

  return () => {
    disposed = true;
    cancelAnimationFrame(frameId);
    clearTimeout(frameId);
    window.removeEventListener('pointermove', onPointerMove);
    document.documentElement.removeEventListener('mouseleave', onPointerLeave);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    reducedMotionQuery.removeEventListener('change', onReducedMotionChange);
    themeObserver.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
