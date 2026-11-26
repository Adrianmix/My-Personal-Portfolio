import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SITE_ORIGIN,
  buildBlogPostStructuredData,
  buildCanonicalUrl,
  buildStructuredDataGraph,
  resolveSiteOrigin,
  sanitizeExternalUrl,
  serializeSafeJsonLd,
} from './seo';

test('resolveSiteOrigin avoids localhost and prefers configured production origin', () => {
  assert.equal(resolveSiteOrigin('http://localhost:3000/fa'), DEFAULT_SITE_ORIGIN);
  assert.equal(
    resolveSiteOrigin('http://localhost:3000/', 'https://me.tunetactics.ir/'),
    'https://me.tunetactics.ir',
  );
  assert.equal(
    resolveSiteOrigin('https://custom.example.com/fa'),
    'https://custom.example.com',
  );
});

test('buildCanonicalUrl returns / for English, /fa for Persian, and handles sub-routes', () => {
  assert.equal(buildCanonicalUrl('https://me.tunetactics.ir/', 'en'), 'https://me.tunetactics.ir/');
  assert.equal(buildCanonicalUrl('https://me.tunetactics.ir/', 'fa'), 'https://me.tunetactics.ir/fa');
  assert.equal(
    buildCanonicalUrl('https://me.tunetactics.ir/', 'en', '/blog/introducing-astro-js'),
    'https://me.tunetactics.ir/blog/introducing-astro-js',
  );
  assert.equal(
    buildCanonicalUrl('https://me.tunetactics.ir/', 'fa', '/blog/introducing-astro-js'),
    'https://me.tunetactics.ir/fa/blog/introducing-astro-js',
  );
});

test('buildStructuredDataGraph exposes Person, ImageObject, and طراحی سایت metadata', () => {
  const graph = buildStructuredDataGraph('https://me.tunetactics.ir', 'fa');
  const serialized = JSON.stringify(graph);
  assert.match(serialized, /محمد پوحسنی/);
  assert.match(serialized, /Pouhassani/);
  assert.match(serialized, /طراحی سایت/);
  assert.match(serialized, /mohammad-pouhassani\.jpg/);
});

test('buildBlogPostStructuredData outputs BlogPosting JSON-LD with author and cover image', () => {
  const article = buildBlogPostStructuredData('https://me.tunetactics.ir', 'en', {
    slug: 'introducing-astro-js',
    title: 'Introducing Astro.js',
    description: 'Overview of Islands Architecture.',
    publishedAt: '2026-11-22',
    coverImage: '/images/blog/astro-islands.jpg',
  });
  assert.equal(article['@type'], 'BlogPosting');
  assert.equal(article.url, 'https://me.tunetactics.ir/blog/introducing-astro-js');
  assert.equal(article.image, 'https://me.tunetactics.ir/images/blog/astro-islands.jpg');
});

test('serializeSafeJsonLd escapes HTML-sensitive characters to prevent script breakout', () => {
  const escaped = serializeSafeJsonLd({ text: '</script><img src=x>&' });
  assert.equal(escaped.includes('<'), false);
  assert.equal(escaped.includes('>'), false);
  assert.equal(escaped.includes('&'), false);
});

test('sanitizeExternalUrl allows https/http/mailto/relative paths and blocks javascript/data URIs', () => {
  assert.equal(sanitizeExternalUrl('https://tunetactics.ir'), 'https://tunetactics.ir/');
  assert.equal(sanitizeExternalUrl('mailto:m.pouhassani@gmail.com'), 'mailto:m.pouhassani@gmail.com');
  assert.equal(sanitizeExternalUrl('/fa'), '/fa');
  assert.equal(sanitizeExternalUrl('javascript:alert(1)'), undefined);
  assert.equal(sanitizeExternalUrl('data:text/html,<script>alert(1)</script>'), undefined);
});
