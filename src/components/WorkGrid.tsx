import { useEffect, useMemo, useRef, useState } from 'react';
import { content, type Lang } from '../i18n/content';
import {
  filterProjects,
  getGalleryImages,
  splitParagraphs,
  stepGalleryIndex,
  type ProjectFilter,
  type ProjectItem,
  type ProjectType,
} from '../utils/portfolio';

interface WorkGridLabels {
  webPreviewLabel: string;
  visualPreviewLabel: string;
  webTag: string;
  visualTag: string;
  appTag: string;
  liveDemo: string;
  caseStudy: string;
  view: string;
  modal: {
    tools: string;
    screenshots: string;
    noScreenshots: string;
    github: string;
    close: string;
    prev: string;
    next: string;
    details: string;
  };
}

function typeLabel(type: ProjectType, labels: WorkGridLabels) {
  if (type === 'visual') return labels.visualTag;
  if (type === 'app') return labels.appTag;
  return labels.webTag;
}

function ProjectCard({
  project,
  labels,
  dir,
  onView,
}: {
  project: ProjectItem;
  labels: WorkGridLabels;
  dir: 'ltr' | 'rtl';
  onView: (project: ProjectItem) => void;
}) {
  return (
    <article className="group flex flex-col h-full rounded-2xl border border-ink/10 bg-chalk overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
      <button
        type="button"
        onClick={() => onView(project)}
        aria-label={`${project.title} — ${labels.view}`}
        className="aspect-[16/10] w-full bg-ink/90 overflow-hidden block text-start focus-visible:outline-offset-[-2px]"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 ease-out-quart group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs text-paper/60">
              {project.type === 'visual' ? labels.visualPreviewLabel : labels.webPreviewLabel}
            </span>
          </div>
        )}
      </button>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl tracking-tightest font-medium text-ink">
            <button
              type="button"
              onClick={() => onView(project)}
              className="text-start hover:text-accent transition-colors duration-200"
            >
              {project.title}
            </button>
          </h3>
          <span className="font-mono text-[11px] text-graphite mt-1 shrink-0">
            {typeLabel(project.type, labels)}
          </span>
        </div>

        <p className="text-graphite text-sm mt-2.5 leading-relaxed">
          {project.description}
        </p>

        {/* Clean unboxed inline metadata — zero pill clutter */}
        <p className="font-mono text-[11px] text-graphite/85 mt-4 leading-relaxed">
          {project.tags.join(' · ')}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between gap-4 border-t border-ink/10">
          <button
            type="button"
            onClick={() => onView(project)}
            className="text-xs font-medium text-ink hover:text-accent transition-colors duration-200 inline-flex items-center gap-1.5"
          >
            <span>{labels.view}</span>
            <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-graphite hover:text-accent underline underline-offset-4 decoration-ink/20 hover:decoration-accent transition-colors duration-200"
            >
              {labels.liveDemo}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ExpandCue() {
  return (
    <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/25 transition-colors duration-200">
      <span className="flex items-center justify-center h-9 w-9 rounded-full bg-paper/0 text-paper opacity-0 group-hover:opacity-100 group-hover:bg-paper/20 backdrop-blur-sm transition-all duration-200">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6"
          />
        </svg>
      </span>
    </span>
  );
}

function ImageLightbox({
  images,
  index,
  labels,
  dir,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  labels: WorkGridLabels;
  dir: 'ltr' | 'rtl';
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const hasMultiple = images.length > 1;

  function goPrev() {
    onNavigate(stepGalleryIndex(index, 'prev', images.length));
  }

  function goNext() {
    onNavigate(stepGalleryIndex(index, 'next', images.length));
  }

  return (
    <div
      dir={dir}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10"
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
      />

      <button
        type="button"
        onClick={onClose}
        aria-label={labels.modal.close}
        className="absolute top-4 md:top-6 right-4 md:right-6 z-10 flex items-center justify-center h-10 w-10 rounded-full border border-paper/30 text-paper hover:border-paper transition-colors duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M4 4l16 16M20 4 4 20"
          />
        </svg>
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label={labels.modal.prev}
            className="absolute start-4 md:start-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-11 w-11 rounded-full border border-paper/30 text-paper hover:border-paper transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={dir === 'rtl' ? 'rotate-180' : ''}>
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 5 8 12l7 7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={labels.modal.next}
            className="absolute end-4 md:end-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-11 w-11 rounded-full border border-paper/30 text-paper hover:border-paper transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={dir === 'rtl' ? 'rotate-180' : ''}>
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt=""
        className="relative max-w-[92vw] max-h-[85vh] object-contain rounded-lg"
      />

      {hasMultiple && (
        <div className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-paper/80 tabular-nums">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

function ProjectModal({
  project,
  labels,
  dir,
  onClose,
}: {
  project: ProjectItem;
  labels: WorkGridLabels;
  dir: 'ltr' | 'rtl';
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = useMemo(() => getGalleryImages(project), [project]);
  const paragraphs = useMemo(
    () => splitParagraphs(project.fullDescription),
    [project.fullDescription],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
        return;
      }
      if (lightboxIndex === null || galleryImages.length < 2) return;
      const goNext = dir === 'rtl' ? e.key === 'ArrowLeft' : e.key === 'ArrowRight';
      const goPrev = dir === 'rtl' ? e.key === 'ArrowRight' : e.key === 'ArrowLeft';
      if (goNext) {
        setLightboxIndex(stepGalleryIndex(lightboxIndex, 'next', galleryImages.length));
      } else if (goPrev) {
        setLightboxIndex(stepGalleryIndex(lightboxIndex, 'prev', galleryImages.length));
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, lightboxIndex, galleryImages.length, dir]);

  return (
    <div
      dir={dir}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-paper border border-ink/10 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 md:p-6 bg-paper/95 backdrop-blur-sm border-b border-ink/10">
          <div>
            <span className="font-mono text-xs text-accent font-medium">
              {typeLabel(project.type, labels)}
            </span>
            <h3 className="font-display text-2xl md:text-3xl tracking-tightest mt-1">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={labels.modal.close}
            className="shrink-0 flex items-center justify-center h-9 w-9 rounded-full border border-ink/15 hover:border-ink/60 transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M4 4l16 16M20 4 4 20"
              />
            </svg>
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-7">
          {project.image && (
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="group relative block w-full aspect-[16/10] rounded-xl overflow-hidden bg-ink/90 cursor-zoom-in"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-out-quart group-hover:scale-[1.02]"
              />
              <ExpandCue />
            </button>
          )}

          <p className="text-ink text-sm md:text-base leading-relaxed">
            {project.description}
          </p>

          {paragraphs.length > 0 && (
            <div>
              <p className="font-mono text-xs text-graphite mb-3">
                {labels.modal.details}
              </p>
              <div className="space-y-3 text-graphite text-sm md:text-base leading-relaxed">
                {paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-mono text-xs text-graphite mb-2">
              {labels.modal.tools}
            </p>
            <p className="font-mono text-xs text-ink">
              {project.tags.join(' · ')}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-graphite mb-3">
              {labels.modal.screenshots}
            </p>
            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {project.screenshots.map((src) => {
                  const galleryIndex = galleryImages.indexOf(src);
                  return (
                    <button
                      type="button"
                      key={src}
                      onClick={() => setLightboxIndex(galleryIndex >= 0 ? galleryIndex : 0)}
                      className="group relative block aspect-[16/10] rounded-xl overflow-hidden bg-ink/90 cursor-zoom-in"
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-300 ease-out-quart group-hover:scale-[1.03]"
                      />
                      <ExpandCue />
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-graphite text-sm">{labels.modal.noScreenshots}</p>
            )}
          </div>

          {(project.liveUrl || project.githubUrl || project.caseStudyUrl) && (
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-ink/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium bg-accent text-white rounded-full px-4 py-2 hover:opacity-90 transition-opacity duration-200"
                >
                  {labels.liveDemo}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium border border-ink/20 rounded-full px-4 py-2 hover:border-ink/60 transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.57.23 2.73.11 3.02.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
                  </svg>
                  {labels.modal.github}
                </a>
              )}
              {project.caseStudyUrl && (
                <a
                  href={project.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium underline underline-offset-4 decoration-ink/30 hover:decoration-accent px-1 py-2"
                >
                  {labels.caseStudy}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && galleryImages.length > 0 && (
        <ImageLightbox
          images={galleryImages}
          index={lightboxIndex}
          labels={labels}
          dir={dir}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}

export default function WorkGrid({ lang }: { lang: Lang }) {
  const t = content[lang].work;
  const dir = content[lang].dir;
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const labels: WorkGridLabels = {
    webPreviewLabel: t.webPreviewLabel,
    visualPreviewLabel: t.visualPreviewLabel,
    webTag: t.webTag,
    visualTag: t.visualTag,
    appTag: t.appTag,
    liveDemo: t.liveDemo,
    caseStudy: t.caseStudy,
    view: t.viewLabel,
    modal: {
      tools: t.modal.tools,
      screenshots: t.modal.screenshots,
      noScreenshots: t.modal.noScreenshots,
      github: t.modal.github,
      close: t.modal.close,
      prev: t.modal.prev,
      next: t.modal.next,
      details: t.modal.details,
    },
  };

  const visible = useMemo(
    () => filterProjects(t.projects, filter),
    [filter, t.projects],
  );

  return (
    <div dir={dir}>
      <div
        role="tablist"
        aria-label={t.title}
        className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full bg-paper border border-ink/10 mb-10"
      >
        {t.filters.map((f) => {
          const isActive = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(f.value as ProjectFilter)}
              className={`text-xs font-medium rounded-full px-4 py-2 transition-colors duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {visible.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            labels={labels}
            dir={dir}
            onView={setSelected}
          />
        ))}
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          labels={labels}
          dir={dir}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
