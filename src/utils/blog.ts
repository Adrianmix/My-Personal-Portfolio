import type { Lang } from '../i18n/content';

export type BlogCategory = 'frameworks' | 'architecture' | 'case-study';
export type BlogFilter = 'all' | BlogCategory;

export interface BlogArticleSummary {
  slug: string;
  category: BlogCategory;
  publishedAt: string;
  readingMinutes: number;
  featured?: boolean;
}

export function filterBlogPosts<T extends Pick<BlogArticleSummary, 'category'>>(
  posts: readonly T[],
  filter: BlogFilter,
): T[] {
  if (filter === 'all') {
    return [...posts];
  }
  return posts.filter((post) => post.category === filter);
}

export function getRelatedPosts<T extends Pick<BlogArticleSummary, 'slug' | 'category'>>(
  posts: readonly T[],
  currentSlug: string,
  limit = 2,
): T[] {
  const candidates = posts.filter((post) => post.slug !== currentSlug);
  const current = posts.find((post) => post.slug === currentSlug);
  if (!current) {
    return candidates.slice(0, limit);
  }
  const sameCategory = candidates.filter((post) => post.category === current.category);
  const others = candidates.filter((post) => post.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function estimateReadingMinutes(
  sections: readonly { paragraphs: readonly string[] }[],
  wordsPerMinute = 190,
): number {
  let words = 0;
  for (const section of sections) {
    for (const paragraph of section.paragraphs) {
      const trimmed = paragraph.trim();
      if (!trimmed) continue;
      words += trimmed.split(/\s+/).length;
    }
  }
  return Math.max(2, Math.ceil(words / wordsPerMinute));
}

const EN_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export function formatBlogDate(isoDate: string, lang: Lang): string {
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  if (lang === 'fa') {
    try {
      return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(parsed);
    } catch {
      return isoDate;
    }
  }
  const month = EN_MONTHS[parsed.getUTCMonth()] ?? 'Nov';
  const day = parsed.getUTCDate();
  const year = parsed.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export function computeReadingProgress(
  scrollY: number,
  articleTop: number,
  articleHeight: number,
  viewportHeight: number,
): number {
  const scrollable = articleHeight - viewportHeight * 0.65;
  if (scrollable <= 0) return 1;
  const raw = (scrollY - articleTop) / scrollable;
  return Math.max(0, Math.min(1, raw));
}
