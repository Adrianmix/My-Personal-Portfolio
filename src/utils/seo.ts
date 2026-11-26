import type { Lang } from '../i18n/content';

export const DEFAULT_SITE_ORIGIN = 'https://me.tunetactics.ir';

export interface SeoPageCopy {
  title: string;
  description: string;
  portraitAlt: string;
  portraitCaption: string;
  personName: string;
  jobTitle: string;
  serviceName: string;
}

const SEO_COPY: Record<Lang, SeoPageCopy> = {
  en: {
    title: 'Mohammad Pouhassani — Web Design & Front-End Developer',
    description:
      'Portfolio of Mohammad Pouhassani — web designer and front-end developer crafting fast, SEO-ready sites with Astro, React, TypeScript, and WordPress.',
    portraitAlt:
      'Mohammad Pouhassani — Web Designer and Front-End Developer portrait',
    portraitCaption: 'Mohammad Pouhassani, Designer & Front-End Developer',
    personName: 'Mohammad Pouhassani',
    jobTitle: 'Web Designer & Front-End Developer',
    serviceName: 'Mohammad Pouhassani — Web Design & Front-End Development',
  },
  fa: {
    title: 'محمد پوحسنی (Pouhassani) — طراحی سایت و توسعه فرانت‌اند',
    description:
      'طراحی سایت اختصاصی، سریع و سئو‌شده با محمد پوحسنی (Pouhassani)؛ طراح وب و توسعه‌دهنده فرانت‌اند مسلط به Astro، React، TypeScript و وردپرس.',
    portraitAlt:
      'محمد پوحسنی (Mohammad Pouhassani) — طراح سایت و توسعه‌دهنده فرانت‌اند',
    portraitCaption: 'محمد پوحسنی، طراح و توسعه‌دهنده فرانت‌اند',
    personName: 'محمد پوحسنی',
    jobTitle: 'طراح سایت و توسعه‌دهنده فرانت‌اند',
    serviceName: 'خدمات طراحی سایت و توسعه فرانت‌اند محمد پوحسنی',
  },
};

export function getSeoCopy(lang: Lang): SeoPageCopy {
  return SEO_COPY[lang];
}

function getConfiguredOrigin(): string | undefined {
  const procEnv = (
    globalThis as { process?: { env?: Record<string, string | undefined> } }
  ).process?.env;
  const metaEnv = (
    import.meta as { env?: Record<string, string | undefined> }
  ).env;
  return procEnv?.SITE_URL || metaEnv?.SITE_URL;
}

/**
 * Resolves the canonical public HTTPS origin, avoiding localhost/ephemeral dev hosts
 * in canonical tags, OpenGraph URLs, robots.txt, and sitemap.xml.
 */
export function resolveSiteOrigin(
  requestUrl?: URL | string,
  envSiteUrl: string | undefined = getConfiguredOrigin(),
): string {
  const candidates = [
    envSiteUrl,
    typeof requestUrl === 'string' ? requestUrl : requestUrl?.toString(),
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const parsed = new URL(candidate);
      const isHttp = parsed.protocol === 'https:' || parsed.protocol === 'http:';
      const isLocal =
        parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        parsed.hostname === '0.0.0.0';
      if (isHttp && !isLocal) {
        return parsed.origin.replace(/\/+$/, '');
      }
    } catch {
      // Ignore malformed candidate and fall back safely
    }
  }

  return DEFAULT_SITE_ORIGIN;
}

export function buildCanonicalUrl(origin: string, lang: Lang, subPath = ''): string {
  const base = origin.replace(/\/+$/, '');
  const cleanSub = subPath ? `/${subPath.replace(/^\/+|\/+$/g, '')}` : '';
  if (!cleanSub) {
    return lang === 'fa' ? `${base}/fa` : `${base}/`;
  }
  return lang === 'fa' ? `${base}/fa${cleanSub}` : `${base}${cleanSub}`;
}

/**
 * Validates external anchor destinations so javascript: or data: schemes are never emitted.
 */
export function sanitizeExternalUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return trimmed;
  }
  try {
    const parsed = new URL(trimmed);
    if (
      parsed.protocol === 'https:' ||
      parsed.protocol === 'http:' ||
      parsed.protocol === 'mailto:'
    ) {
      return parsed.toString();
    }
  } catch {
    return undefined;
  }
  return undefined;
}

/**
 * Serializes JSON-LD safely for inline <script type="application/ld+json"> tags.
 */
export function serializeSafeJsonLd(payload: unknown): string {
  return JSON.stringify(payload)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export function buildStructuredDataGraph(origin: string, lang: Lang) {
  const base = origin.replace(/\/+$/, '');
  const copy = getSeoCopy(lang);
  const canonicalUrl = buildCanonicalUrl(base, lang);
  const portraitUrl = `${base}/images/mohammad-pouhassani.jpg`;
  const personId = `${base}/#person`;
  const portraitId = `${base}/#portrait`;
  const websiteId = `${base}/#website`;
  const serviceId = `${base}/#service`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ImageObject',
        '@id': portraitId,
        url: portraitUrl,
        contentUrl: portraitUrl,
        width: 896,
        height: 1200,
        encodingFormat: 'image/jpeg',
        name: copy.portraitAlt,
        caption: copy.portraitCaption,
        representativeOfPage: true,
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: copy.personName,
        alternateName: [
          'Mohammad Pouhassani',
          'Pouhassani',
          'محمد پوحسنی',
          'پوحسنی',
          'Adrianmix',
        ],
        givenName: 'Mohammad',
        familyName: 'Pouhassani',
        jobTitle: copy.jobTitle,
        description: copy.description,
        url: base,
        email: 'mailto:m.pouhassani@gmail.com',
        image: { '@id': portraitId },
        sameAs: [
          'https://github.com/Adrianmix',
          'https://gitlab.com/Adrianmix',
          'https://www.linkedin.com/in/mohammad-pouhassani/',
          'https://tunetactics.ir',
        ],
        knowsAbout: [
          'طراحی سایت',
          'توسعه فرانت‌اند',
          'Web Design',
          'Front-End Development',
          'Astro.js',
          'React.js',
          'TypeScript',
          'WordPress',
          'On-page SEO',
          'UI/UX Design',
        ],
        knowsLanguage: ['fa', 'en'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Tehran',
          addressCountry: 'IR',
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: base,
        name: copy.title,
        alternateName: [
          'Mohammad Pouhassani Portfolio',
          'وب‌سایت محمد پوحسنی',
          'Pouhassani',
        ],
        inLanguage: ['en', 'fa'],
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': serviceId,
        name: copy.serviceName,
        url: canonicalUrl,
        image: { '@id': portraitId },
        provider: { '@id': personId },
        areaServed: ['IR', 'Worldwide'],
        serviceType: [
          'طراحی سایت',
          'طراحی وب‌سایت اختصاصی',
          'طراحی سایت وردپرس',
          'Web Design',
          'Front-End Development',
          'UI/UX Design',
          'Technical SEO',
        ],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: lang,
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        mainEntity: { '@id': personId },
        primaryImageOfPage: { '@id': portraitId },
      },
    ],
  };
}

export function buildBlogPostStructuredData(
  origin: string,
  lang: Lang,
  post: {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    coverImage: string;
  },
) {
  const base = origin.replace(/\/+$/, '');
  const copy = getSeoCopy(lang);
  const articleUrl = buildCanonicalUrl(base, lang, `/blog/${post.slug}`);
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${base}${post.coverImage.startsWith('/') ? '' : '/'}${post.coverImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: lang,
    image: imageUrl,
    author: {
      '@type': 'Person',
      '@id': `${base}/#person`,
      name: copy.personName,
      url: base,
    },
    publisher: {
      '@type': 'Person',
      name: copy.personName,
      url: base,
    },
  };
}
