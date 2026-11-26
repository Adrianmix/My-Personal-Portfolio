import type { APIRoute } from 'astro';
import { content } from '../i18n/content';
import { buildCanonicalUrl, resolveSiteOrigin } from '../utils/seo';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = ({ url }) => {
  const origin = resolveSiteOrigin(url);
  const enUrl = buildCanonicalUrl(origin, 'en');
  const faUrl = buildCanonicalUrl(origin, 'fa');
  const portraitLoc = `${origin}/images/mohammad-pouhassani.jpg`;
  const lastMod = new Date().toISOString().split('T')[0];

  const enProjectImages = content.en.work.projects
    .filter((p) => p.image)
    .map(
      (p) => `    <image:image>
      <image:loc>${escapeXml(`${origin}${p.image}`)}</image:loc>
      <image:title>${escapeXml(`${p.title} — Mohammad Pouhassani`)}</image:title>
      <image:caption>${escapeXml(p.description)}</image:caption>
    </image:image>`,
    )
    .join('\n');

  const faProjectImages = content.fa.work.projects
    .filter((p) => p.image)
    .map(
      (p) => `    <image:image>
      <image:loc>${escapeXml(`${origin}${p.image}`)}</image:loc>
      <image:title>${escapeXml(`${p.title} — محمد پوحسنی`)}</image:title>
      <image:caption>${escapeXml(p.description)}</image:caption>
    </image:image>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <url>
    <loc>${escapeXml(enUrl)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}" />
    <xhtml:link rel="alternate" hreflang="fa" href="${escapeXml(faUrl)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(enUrl)}" />
    <image:image>
      <image:loc>${escapeXml(portraitLoc)}</image:loc>
      <image:title>${escapeXml('Mohammad Pouhassani — Web Designer & Front-End Developer')}</image:title>
      <image:caption>${escapeXml(content.en.about.portraitCaption)}</image:caption>
    </image:image>
${enProjectImages}
  </url>
  <url>
    <loc>${escapeXml(faUrl)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}" />
    <xhtml:link rel="alternate" hreflang="fa" href="${escapeXml(faUrl)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(enUrl)}" />
    <image:image>
      <image:loc>${escapeXml(portraitLoc)}</image:loc>
      <image:title>${escapeXml('محمد پوحسنی (Pouhassani) — طراح سایت و توسعه‌دهنده فرانت‌اند')}</image:title>
      <image:caption>${escapeXml(content.fa.about.portraitCaption)}</image:caption>
    </image:image>
${faProjectImages}
  </url>
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};
