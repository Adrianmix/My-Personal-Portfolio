export const SECTION_IDS = [
  'top',
  'about',
  'experience',
  'work',
  'services',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SHAPE_NAMES = [
  'silk-wave',
  'folded-ribbon',
  'torus-shell',
  'crystalline-dome',
  'arch-terrain',
  'spiral-nebula',
] as const;

export type ParticleShape = (typeof SHAPE_NAMES)[number];

export interface SectionChoreographyPreset {
  id: SectionId;
  shape: ParticleShape;
  /** Horizontal offset as a fraction of viewport half-width on desktop (mirrored in RTL). */
  xFracDesktop: number;
  /** Vertical offset as a fraction of viewport half-height on desktop. */
  yFracDesktop: number;
  /** Horizontal offset as a fraction of viewport half-width on mobile/tablet (< 1024px). */
  xFracMobile: number;
  /** Vertical offset as a fraction of viewport half-height on mobile/tablet (< 1024px). */
  yFracMobile: number;
  scaleDesktop: number;
  scaleMobile: number;
  rotSpeedX: number;
  rotSpeedY: number;
}

export const SECTION_PRESETS: readonly SectionChoreographyPreset[] = [
  {
    id: 'top',
    shape: 'silk-wave',
    xFracDesktop: 0.36,
    yFracDesktop: -0.02,
    xFracMobile: 0.0,
    yFracMobile: -0.32,
    scaleDesktop: 1.16,
    scaleMobile: 0.78,
    rotSpeedX: 0.04,
    rotSpeedY: 0.08,
  },
  {
    id: 'about',
    shape: 'folded-ribbon',
    xFracDesktop: 0.72,
    yFracDesktop: 0.02,
    xFracMobile: 0.42,
    yFracMobile: -0.24,
    scaleDesktop: 0.92,
    scaleMobile: 0.68,
    rotSpeedX: 0.06,
    rotSpeedY: 0.16,
  },
  {
    id: 'experience',
    shape: 'torus-shell',
    xFracDesktop: -0.76,
    yFracDesktop: -0.04,
    xFracMobile: -0.44,
    yFracMobile: 0.18,
    scaleDesktop: 0.9,
    scaleMobile: 0.66,
    rotSpeedX: 0.1,
    rotSpeedY: 0.2,
  },
  {
    id: 'work',
    shape: 'crystalline-dome',
    xFracDesktop: 0.74,
    yFracDesktop: 0.28,
    xFracMobile: 0.4,
    yFracMobile: 0.24,
    scaleDesktop: 0.88,
    scaleMobile: 0.64,
    rotSpeedX: 0.08,
    rotSpeedY: 0.18,
  },
  {
    id: 'services',
    shape: 'arch-terrain',
    xFracDesktop: -0.68,
    yFracDesktop: -0.08,
    xFracMobile: 0.0,
    yFracMobile: -0.26,
    scaleDesktop: 1.0,
    scaleMobile: 0.74,
    rotSpeedX: 0.05,
    rotSpeedY: 0.1,
  },
  {
    id: 'contact',
    shape: 'spiral-nebula',
    xFracDesktop: 0.42,
    yFracDesktop: 0.0,
    xFracMobile: 0.0,
    yFracMobile: -0.22,
    scaleDesktop: 1.14,
    scaleMobile: 0.78,
    rotSpeedX: 0.06,
    rotSpeedY: 0.14,
  },
] as const;

export function createSeededRandom(seed = 1337): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Generates deterministic, structured 2D-lattice parametric 3D particle surfaces
 * designed for silky folded ridges, depth-of-field bokeh, and caustic line flow.
 */
export function generateShapePositions(
  shape: ParticleShape,
  count: number,
  seed = 2026,
): Float32Array {
  const positions = new Float32Array(count * 3);
  const rand = createSeededRandom(seed);
  const cols = Math.max(2, Math.round(Math.sqrt(count)));
  const rows = Math.max(2, Math.ceil(count / cols));

  for (let i = 0; i < count; i++) {
    const idx = i * 3;
    const col = i % cols;
    const row = Math.floor(i / cols);
    const u = (col / Math.max(cols - 1, 1)) * 2 - 1; // [-1, 1]
    const v = (row / Math.max(rows - 1, 1)) * 2 - 1; // [-1, 1]
    const micro = (rand() - 0.5) * 0.025;

    if (shape === 'silk-wave') {
      // Flowing multi-fold ribbon terrain inspired by macro DOF particle waves
      const x = u * 2.15 + Math.sin(v * 2.4) * 0.28 + micro;
      const ridgeA = Math.sin(u * 2.6 + v * 1.4) * 0.55;
      const ridgeB = Math.cos(u * 4.2 - v * 2.9) * 0.28;
      const peak = Math.exp(-((u + 0.15) * (u + 0.15) * 2.4 + v * v * 1.6)) * 0.72;
      const y = ridgeA + ridgeB + peak - 0.18 + Math.sin(v * Math.PI) * 0.15;
      const z = v * 1.65 + Math.sin(u * 2.1 + v * 2.2) * 0.42;

      // Pitch gently toward camera so crests stack and overlap in depth
      const pitch = 0.42;
      positions[idx] = x;
      positions[idx + 1] = y * Math.cos(pitch) - z * Math.sin(pitch) * 0.48;
      positions[idx + 2] = y * Math.sin(pitch) + z * Math.cos(pitch);
      continue;
    }

    if (shape === 'folded-ribbon') {
      // Twisted helical silk sheet
      const theta = u * Math.PI * 1.65;
      const width = v * 0.88;
      const twist = u * 1.9;
      const rad = 0.86 + width * Math.cos(twist) * 0.42;
      const x = rad * Math.cos(theta) * 0.9 + micro;
      const y = u * 1.42 + width * Math.sin(twist) * 0.45;
      const z = rad * Math.sin(theta) * 1.1;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;
      continue;
    }

    if (shape === 'torus-shell') {
      // Parametric silk torus with harmonic surface ripples
      const theta = (u * 0.5 + 0.5) * Math.PI * 2;
      const phi = (v * 0.5 + 0.5) * Math.PI * 2;
      const ripple = 0.12 * Math.sin(theta * 3 + phi * 2);
      const R = 1.05;
      const r = 0.42 + ripple;
      const lx = (R + r * Math.cos(phi)) * Math.cos(theta);
      const ly = (R + r * Math.cos(phi)) * Math.sin(theta);
      const lz = r * Math.sin(phi);

      // Tilted 3/4 view
      const tiltX = 0.65;
      positions[idx] = lx + micro;
      positions[idx + 1] = ly * Math.cos(tiltX) - lz * Math.sin(tiltX);
      positions[idx + 2] = ly * Math.sin(tiltX) + lz * Math.cos(tiltX);
      continue;
    }

    if (shape === 'crystalline-dome') {
      // Harmonic wave sphere shell
      const theta = (u * 0.5 + 0.5) * Math.PI * 2;
      const phi = (v * 0.5 + 0.5) * Math.PI;
      const wave =
        1.14 +
        0.22 * Math.sin(theta * 4) * Math.sin(phi * 3) +
        0.1 * Math.cos(phi * 5);
      positions[idx] = wave * Math.sin(phi) * Math.cos(theta) + micro;
      positions[idx + 1] = wave * Math.cos(phi);
      positions[idx + 2] = wave * Math.sin(phi) * Math.sin(theta);
      continue;
    }

    if (shape === 'arch-terrain') {
      // Sweeping diagonal folded wave ridge
      const x = u * 1.95 + micro;
      const z = v * 1.65;
      const diag = u * 2.2 - v * 1.9;
      const y =
        0.48 * Math.sin(diag * 1.35) +
        0.26 * Math.cos(u * 3.8 + v * 2.4) +
        0.14 * (u * u - v * v);
      const tilt = 0.52;
      positions[idx] = x;
      positions[idx + 1] = y * Math.cos(tilt) - z * Math.sin(tilt) * 0.45;
      positions[idx + 2] = y * Math.sin(tilt) + z * Math.cos(tilt);
      continue;
    }

    // 'spiral-nebula' — Flowing 3D spiral silk wave for Contact dark stage
    const rNorm = (u * 0.5 + 0.5);
    const angle = rNorm * Math.PI * 4.5 + v * 1.45;
    const radius = 0.16 + Math.pow(rNorm, 0.78) * 1.65;
    const waveY =
      0.34 * Math.sin(radius * 3.2 - angle * 0.8) +
      0.22 * Math.cos(v * 3.6 + rNorm * 4.0);
    const px = radius * Math.cos(angle) + micro;
    const pz = radius * Math.sin(angle);

    // Tilt forward 32 deg so spiral ribbons fan dramatically in depth
    const pitch = 0.56;
    positions[idx] = px;
    positions[idx + 1] = waveY * Math.cos(pitch) - pz * Math.sin(pitch) * 0.52;
    positions[idx + 2] = waveY * Math.sin(pitch) + pz * Math.cos(pitch);
  }

  return positions;
}

export interface ChoreographyState {
  weights: [number, number, number, number, number, number];
  activeIndex: number;
  activeSectionId: SectionId;
  activeShape: ParticleShape;
  turbulence: number;
  xFrac: number;
  yFrac: number;
  scale: number;
  rotSpeedX: number;
  rotSpeedY: number;
  contactBlend: number;
}

/**
 * Computes smoothly blended particle shape weights, viewport coordinates,
 * scale, rotation rates, and transition turbulence from section center positions.
 */
export function computeScrollChoreography(
  sectionCentersY: readonly number[],
  viewportHeight: number,
  isRtl: boolean,
  isMobile: boolean,
): ChoreographyState {
  const count = SECTION_PRESETS.length;
  const weights: [number, number, number, number, number, number] = [
    0, 0, 0, 0, 0, 0,
  ];
  const anchorY = viewportHeight * 0.5;

  if (sectionCentersY.length < count) {
    weights[0] = 1;
    const fallback = SECTION_PRESETS[0]!;
    const sign = isRtl ? -1 : 1;
    return {
      weights,
      activeIndex: 0,
      activeSectionId: fallback.id,
      activeShape: fallback.shape,
      turbulence: 0,
      xFrac: (isMobile ? fallback.xFracMobile : fallback.xFracDesktop) * sign,
      yFrac: isMobile ? fallback.yFracMobile : fallback.yFracDesktop,
      scale: isMobile ? fallback.scaleMobile : fallback.scaleDesktop,
      rotSpeedX: fallback.rotSpeedX,
      rotSpeedY: fallback.rotSpeedY,
      contactBlend: 0,
    };
  }

  let lowerIdx = 0;
  let upperIdx = 0;
  let blend = 0;

  if (anchorY <= sectionCentersY[0]!) {
    lowerIdx = 0;
    upperIdx = 0;
    blend = 0;
  } else if (anchorY >= sectionCentersY[count - 1]!) {
    lowerIdx = count - 1;
    upperIdx = count - 1;
    blend = 0;
  } else {
    for (let i = 0; i < count - 1; i++) {
      const cA = sectionCentersY[i]!;
      const cB = sectionCentersY[i + 1]!;
      if (anchorY >= cA && anchorY <= cB) {
        lowerIdx = i;
        upperIdx = i + 1;
        const span = Math.max(cB - cA, 1);
        blend = smoothstep(0.08, 0.92, (anchorY - cA) / span);
        break;
      }
    }
  }

  if (lowerIdx === upperIdx) {
    weights[lowerIdx] = 1;
  } else {
    weights[lowerIdx] = 1 - blend;
    weights[upperIdx] = blend;
  }

  const activeIndex = blend >= 0.5 ? upperIdx : lowerIdx;
  const pA = SECTION_PRESETS[lowerIdx]!;
  const pB = SECTION_PRESETS[upperIdx]!;
  const sign = isRtl ? -1 : 1;

  const xA = (isMobile ? pA.xFracMobile : pA.xFracDesktop) * sign;
  const xB = (isMobile ? pB.xFracMobile : pB.xFracDesktop) * sign;
  const yA = isMobile ? pA.yFracMobile : pA.yFracDesktop;
  const yB = isMobile ? pB.yFracMobile : pB.yFracDesktop;
  const sA = isMobile ? pA.scaleMobile : pA.scaleDesktop;
  const sB = isMobile ? pB.scaleMobile : pB.scaleDesktop;

  return {
    weights,
    activeIndex,
    activeSectionId: SECTION_PRESETS[activeIndex]!.id,
    activeShape: SECTION_PRESETS[activeIndex]!.shape,
    turbulence:
      lowerIdx === upperIdx || blend <= 0 || blend >= 1
        ? 0
        : Math.sin(blend * Math.PI),
    xFrac: xA + (xB - xA) * blend,
    yFrac: yA + (yB - yA) * blend,
    scale: sA + (sB - sA) * blend,
    rotSpeedX: pA.rotSpeedX + (pB.rotSpeedX - pA.rotSpeedX) * blend,
    rotSpeedY: pA.rotSpeedY + (pB.rotSpeedY - pA.rotSpeedY) * blend,
    contactBlend: weights[5],
  };
}

/**
 * Computes effective surface darkness (0 = light backdrop, 1 = dark backdrop)
 * accounting for the fact that Contact (`bg-ink`) always inverts the page theme.
 */
export function computeSurfaceDarkness(
  isDarkTheme: boolean,
  contactBlend: number,
): number {
  const clamped = Math.max(0, Math.min(1, contactBlend));
  return isDarkTheme ? 1 - clamped : clamped;
}
