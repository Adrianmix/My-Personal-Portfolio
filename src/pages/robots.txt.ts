import type { APIRoute } from 'astro';
import { resolveSiteOrigin } from '../utils/seo';

export const GET: APIRoute = ({ url }) => {
  const origin = resolveSiteOrigin(url);
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};
