import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SHAPE_NAMES,
  computeScrollChoreography,
  computeSurfaceDarkness,
  generateShapePositions,
} from './particles';

test('generateShapePositions produces finite, bounded coordinates for all 6 parametric wave models', () => {
  const count = 900;
  for (const shape of SHAPE_NAMES) {
    const arr = generateShapePositions(shape, count, 2026);
    assert.equal(arr.length, count * 3, `${shape} buffer length mismatch`);

    let maxRadius = 0;
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i]!;
      const y = arr[i + 1]!;
      const z = arr[i + 2]!;
      assert.ok(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z), `${shape} has non-finite value`);
      const r = Math.hypot(x, y, z);
      if (r > maxRadius) maxRadius = r;
    }

    assert.ok(maxRadius > 1.0 && maxRadius < 3.4, `${shape} unexpected radius ${maxRadius}`);
  }
});

test('generateShapePositions is deterministic for identical seeds', () => {
  const a = generateShapePositions('silk-wave', 400, 42);
  const b = generateShapePositions('silk-wave', 400, 42);
  assert.deepEqual(a, b);
});

test('computeScrollChoreography selects each section shape cleanly and normalizes weights', () => {
  const centers = [450, 1250, 2150, 3250, 4150, 4950];
  const vh = 900;

  for (let i = 0; i < centers.length; i++) {
    const shifted = centers.map((c) => c - (centers[i]! - 450));
    const state = computeScrollChoreography(shifted, vh, false, false);
    assert.equal(state.activeIndex, i);
    assert.equal(state.weights[i], 1);
    assert.equal(state.turbulence, 0);
    const sum = state.weights.reduce((acc, v) => acc + v, 0);
    assert.ok(Math.abs(sum - 1) < 1e-6);
  }
});

test('computeScrollChoreography peaks turbulence at mid-transition and mirrors xFrac in RTL', () => {
  const centers = [0, 900, 1800, 2700, 3600, 4500];
  const vh = 900;

  const ltr = computeScrollChoreography(centers, vh, false, false);
  const rtl = computeScrollChoreography(centers, vh, true, false);

  assert.ok(Math.abs(ltr.weights[0] - 0.5) < 1e-6);
  assert.ok(Math.abs(ltr.weights[1] - 0.5) < 1e-6);
  assert.ok(ltr.turbulence > 0.95);
  assert.ok(Math.abs(ltr.xFrac + rtl.xFrac) < 1e-6);
});

test('computeSurfaceDarkness inverts properly for Contact bg-ink in both light and dark modes', () => {
  assert.equal(computeSurfaceDarkness(false, 0), 0);
  assert.equal(computeSurfaceDarkness(false, 1), 1);
  assert.equal(computeSurfaceDarkness(true, 0), 1);
  assert.equal(computeSurfaceDarkness(true, 1), 0);
});
