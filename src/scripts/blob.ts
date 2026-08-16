import * as THREE from 'three';

/**
 * The "Ink Blob" — a soft, organic 3D metaball rendered in grayscale that
 * drifts toward the cursor and sits behind the hero headline with
 * mix-blend-mode: difference (applied in CSS on the canvas wrapper), so it
 * inverts whatever type or shapes it passes under. It is the site's one
 * signature move — everything else stays quiet.
 */
export function mountBlob(canvas: HTMLCanvasElement) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Grayscale two-tone lighting: a bright key light and a dim fill so the
  // blob reads as dimensional without ever introducing hue.
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(3, 4, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.5);
  fill.position.set(-4, -2, -3);
  scene.add(fill);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const geometry = new THREE.IcosahedronGeometry(1.6, 24);
  const basePositions = geometry.attributes.position.array.slice();

  // The blob's base color must track the current theme's "ink" (foreground)
  // color: mix-blend-mode: difference against a same-toned surface produces
  // almost no contrast, so if this stayed a fixed dark hex the blob would
  // effectively disappear once dark mode inverts the page to a dark
  // background with light text.
  function readInkColor(): THREE.Color {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-ink')
      .trim();
    const [r, g, b] = raw.split(/\s+/).map(Number);
    if ([r, g, b].some((n) => Number.isNaN(n))) return new THREE.Color(0x0b0b0c);
    return new THREE.Color(r / 255, g / 255, b / 255);
  }

  const material = new THREE.MeshStandardMaterial({
    color: readInkColor(),
    roughness: 0.25,
    metalness: 0.1,
    flatShading: false,
  });

  // Re-read the color whenever the theme toggle flips the `dark` class.
  const themeObserver = new MutationObserver(() => {
    material.color.copy(readInkColor());
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Cheap layered-sine "noise" — avoids pulling in an extra noise
  // dependency for a single organic displacement effect.
  function pseudoNoise(x: number, y: number, z: number, t: number) {
    return (
      Math.sin(x * 1.8 + t) * 0.5 +
      Math.sin(y * 2.3 - t * 1.3) * 0.35 +
      Math.sin(z * 2.1 + t * 0.7) * 0.3 +
      Math.sin((x + y + z) * 1.2 + t * 0.5) * 0.25
    );
  }

  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  window.addEventListener('pointermove', (e) => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  function resize() {
    const { clientWidth, clientHeight } = canvas.parentElement as HTMLElement;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas.parentElement as HTMLElement);
  resize();

  const clock = new THREE.Clock();
  let frameId: number;

  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;
        const bx = basePositions[ix];
        const by = basePositions[ix + 1];
        const bz = basePositions[ix + 2];
        const n = pseudoNoise(bx, by, bz, t * 0.6);
        const scale = 1 + n * 0.14;
        pos.setXYZ(i, bx * scale, by * scale, bz * scale);
      }
      pos.needsUpdate = true;
      geometry.computeVertexNormals();

      mesh.rotation.y += 0.0018;
      mesh.rotation.x = Math.sin(t * 0.15) * 0.15;

      current.x += (target.x - current.x) * 0.03;
      current.y += (target.y - current.y) * 0.03;
      mesh.position.x = current.x * 1.1;
      mesh.position.y = current.y * 0.7;
    }

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    themeObserver.disconnect();
    renderer.dispose();
    geometry.dispose();
    material.dispose();
  };
}
