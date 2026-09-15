# Project images go here

Drop your screenshots / artwork in this folder, then point each project
in `src/i18n/content.ts` at the matching file using an `image` field, e.g.:

```ts
{
  title: 'Project One',
  description: '...',
  type: 'web' as const,
  tags: ['Astro', 'E-commerce'],
  liveUrl: '#',
  caseStudyUrl: '#',
  image: '/work/project-one.jpg',
},
```

Notes:
- Path starts with `/work/...` (not `/public/work/...`) — Astro serves
  everything in `public/` from the site root.
- Recommended aspect ratio: 16:10 (matches the card's preview box, e.g.
  1600×1000px). Other ratios still work — the image is cropped with
  `object-cover` — but 16:10 avoids awkward cropping.
- If a project doesn't set `image`, its card just falls back to the plain
  placeholder box, so you can add these gradually.
- If you're showcasing English and Persian versions of the same project,
  set the same `image` path on both the `en` and `fa` entries in
  `content.ts` — one file, reused by both.
- This `README.md` file itself won't be served as a project image; delete
  it once your real files are in place, or leave it, it's harmless.
