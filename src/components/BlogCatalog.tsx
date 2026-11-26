import { useMemo, useState } from 'react';
import { content, type Lang } from '../i18n/content';
import { localizeBlogPosts } from '../data/blog';
import {
  filterBlogPosts,
  formatBlogDate,
  type BlogFilter,
} from '../utils/blog';

export default function BlogCatalog({ lang }: { lang: Lang }) {
  const t = content[lang];
  const dir = t.dir;
  const blogPrefix = lang === 'fa' ? '/fa/blog' : '/blog';
  const arrow = dir === 'rtl' ? '←' : '→';
  const posts = useMemo(() => localizeBlogPosts(lang), [lang]);
  const [filter, setFilter] = useState<BlogFilter>('all');

  const visiblePosts = useMemo(
    () => filterBlogPosts(posts, filter),
    [posts, filter],
  );

  const leadPost = filter === 'all' ? visiblePosts.find((p) => p.featured) ?? visiblePosts[0] : null;
  const gridPosts = leadPost
    ? visiblePosts.filter((p) => p.slug !== leadPost.slug)
    : visiblePosts;

  return (
    <div dir={dir}>
      <div
        role="tablist"
        aria-label={t.blog.title}
        className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full bg-chalk border border-ink/10 mb-10"
      >
        {t.blog.filters.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item.value as BlogFilter)}
              className={`text-xs font-medium rounded-full px-4 py-2 transition-colors duration-200 whitespace-nowrap shrink-0 ${
                active ? 'bg-accent text-white' : 'text-graphite hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {leadPost && (
        <article className="rounded-2xl border border-ink/10 bg-chalk overflow-hidden mb-8">
          <a
            href={`${blogPrefix}/${leadPost.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-[300px] bg-fog overflow-hidden">
              <img
                src={leadPost.coverImage}
                alt={leadPost.coverAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-graphite mb-3 tabular-nums">
                  <span className="text-accent font-medium">{t.blog.featuredLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t.blog.categories[leadPost.category]}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={leadPost.publishedAt}>
                    {formatBlogDate(leadPost.publishedAt, lang)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>
                    {leadPost.readingMinutes} {t.blog.minRead}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl tracking-tightest leading-tight text-balance group-hover:text-accent transition-colors duration-200">
                  {leadPost.title}
                </h2>
                <p className="text-graphite text-sm md:text-base leading-relaxed mt-3 max-w-2xl">
                  {leadPost.excerpt}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-ink group-hover:text-accent transition-colors duration-200">
                <span>{t.blog.readArticle}</span>
                <span aria-hidden="true">{arrow}</span>
              </div>
            </div>
          </a>
        </article>
      )}

      <div className="grid sm:grid-cols-2 gap-6 items-stretch">
        {gridPosts.map((post) => (
          <article
            key={post.slug}
            className="h-full rounded-2xl border border-ink/10 bg-chalk overflow-hidden flex flex-col"
          >
            <a
              href={`${blogPrefix}/${post.slug}`}
              className="group flex-1 flex flex-col"
            >
              <div className="aspect-[4/3] w-full bg-fog overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.coverAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-graphite mb-2.5 tabular-nums">
                    <span className="text-accent font-medium">
                      {t.blog.categories[post.category]}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.publishedAt}>
                      {formatBlogDate(post.publishedAt, lang)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>
                      {post.readingMinutes} {t.blog.minRead}
                    </span>
                  </div>
                  <h2 className="font-display text-xl tracking-tightest leading-snug text-balance group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-graphite text-sm leading-relaxed mt-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-ink group-hover:text-accent transition-colors duration-200 pt-2 border-t border-ink/10">
                  <span>{t.blog.readArticle}</span>
                  <span aria-hidden="true">{arrow}</span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
