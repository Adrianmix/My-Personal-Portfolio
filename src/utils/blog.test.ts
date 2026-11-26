import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeReadingProgress,
  estimateReadingMinutes,
  filterBlogPosts,
  formatBlogDate,
  getRelatedPosts,
} from './blog';

test('filterBlogPosts filters cleanly by category and preserves order for all', () => {
  const sample = [
    { slug: 'a', category: 'frameworks' as const },
    { slug: 'b', category: 'architecture' as const },
    { slug: 'c', category: 'case-study' as const },
  ];

  assert.equal(filterBlogPosts(sample, 'all').length, 3);
  assert.deepEqual(
    filterBlogPosts(sample, 'frameworks').map((p) => p.slug),
    ['a'],
  );
  assert.deepEqual(
    filterBlogPosts(sample, 'case-study').map((p) => p.slug),
    ['c'],
  );
});

test('getRelatedPosts excludes current post and prioritizes matching category', () => {
  const sample = [
    { slug: 'astro', category: 'frameworks' as const },
    { slug: 'ts', category: 'frameworks' as const },
    { slug: 'wp', category: 'architecture' as const },
    { slug: 'portfolio', category: 'case-study' as const },
  ];

  const related = getRelatedPosts(sample, 'astro', 2);
  assert.equal(related.length, 2);
  assert.equal(related[0].slug, 'ts');
  assert.ok(!related.some((p) => p.slug === 'astro'));
});

test('estimateReadingMinutes enforces a minimum of 2 minutes and scales with word count', () => {
  assert.equal(estimateReadingMinutes([{ paragraphs: ['Short intro.'] }]), 2);
  const longText = new Array(570).fill('word').join(' ');
  assert.equal(estimateReadingMinutes([{ paragraphs: [longText] }], 190), 3);
});

test('formatBlogDate produces readable English and Persian dates cleanly', () => {
  assert.equal(formatBlogDate('2026-11-26', 'en'), 'Nov 26, 2026');
  const fa = formatBlogDate('2026-11-26', 'fa');
  assert.ok(fa.length > 4);
  assert.equal(formatBlogDate('invalid-date', 'en'), 'invalid-date');
});

test('computeReadingProgress clamps smoothly between 0 and 1', () => {
  assert.equal(computeReadingProgress(0, 200, 2000, 800), 0);
  assert.equal(computeReadingProgress(5000, 200, 2000, 800), 1);
  const mid = computeReadingProgress(940, 200, 2000, 800);
  assert.ok(mid > 0.4 && mid < 0.6);
});
