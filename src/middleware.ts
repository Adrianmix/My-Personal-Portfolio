import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const headers = new Headers(response.headers);
  const pathname = context.url.pathname;

  // Baseline security headers compatible with iframe preview and WebGL canvas
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  headers.set('X-DNS-Prefetch-Control', 'on');

  const contentType = headers.get('content-type') || '';
  if (contentType.includes('text/html') && !headers.has('Content-Security-Policy')) {
    headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; '),
    );
  }

  // Production HTTP cache policy (dev mode stays uncached for fast iteration)
  if (!import.meta.env.DEV && !headers.has('Cache-Control')) {
    if (pathname.startsWith('/_astro/')) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (
      pathname.startsWith('/images/') ||
      pathname.startsWith('/assets/') ||
      pathname === '/favicon.svg'
    ) {
      headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    } else if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
      headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    } else if (contentType.includes('text/html')) {
      headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
