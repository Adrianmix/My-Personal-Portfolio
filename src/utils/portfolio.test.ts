import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  getGalleryImages,
  resolveIsDark,
  splitParagraphs,
  stepGalleryIndex,
} from './portfolio';
import { getCvAsset } from '../i18n/content';

test('filterProjects groups app items under web filter and keeps visual separate', () => {
  const sample = [
    { title: 'Hub', type: 'app' as const },
    { title: 'Mentraic', type: 'web' as const },
    { title: 'Spico Figma', type: 'visual' as const },
  ];

  assert.equal(filterProjects(sample, 'all').length, 3);
  assert.deepEqual(
    filterProjects(sample, 'web').map((p) => p.title),
    ['Hub', 'Mentraic'],
  );
  assert.deepEqual(
    filterProjects(sample, 'visual').map((p) => p.title),
    ['Spico Figma'],
  );
});

test('getGalleryImages deduplicates cover image when repeated in screenshots', () => {
  const imgs = getGalleryImages({
    image: '/images/Projects/Qr-Studio/1.png',
    screenshots: [
      '/images/Projects/Qr-Studio/1.png',
      '/images/Projects/Qr-Studio/2.png',
    ],
  });
  assert.deepEqual(imgs, [
    '/images/Projects/Qr-Studio/1.png',
    '/images/Projects/Qr-Studio/2.png',
  ]);
});

test('stepGalleryIndex wraps cleanly in both directions', () => {
  assert.equal(stepGalleryIndex(0, 'prev', 4), 3);
  assert.equal(stepGalleryIndex(3, 'next', 4), 0);
  assert.equal(stepGalleryIndex(1, 'next', 4), 2);
  assert.equal(stepGalleryIndex(0, 'next', 0), 0);
});

test('splitParagraphs trims and drops empty blocks', () => {
  assert.deepEqual(splitParagraphs('First para.\n\n  Second para.  \n\n'), [
    'First para.',
    'Second para.',
  ]);
  assert.deepEqual(splitParagraphs(undefined), []);
});

test('resolveIsDark handles light, dark, and auto preferences', () => {
  assert.equal(resolveIsDark('dark', false), true);
  assert.equal(resolveIsDark('light', true), false);
  assert.equal(resolveIsDark('auto', true), true);
  assert.equal(resolveIsDark('auto', false), false);
});

test('getCvAsset resolves distinct English and Persian CV PDF files', () => {
  const en = getCvAsset('en');
  const fa = getCvAsset('fa');
  assert.equal(en.url, '/assets/Resume-Mohammad-Pouhassani-EN.pdf');
  assert.equal(en.filename, 'Mohammad-Pouhassani-CV-EN.pdf');
  assert.equal(fa.url, '/assets/aistudio/Resume-Mohammad-Pouhassani_a74a479e.pdf');
  assert.equal(fa.filename, 'Mohammad-Pouhassani-CV-FA.pdf');
  assert.notEqual(en.url, fa.url);
});
