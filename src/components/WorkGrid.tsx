import { useEffect, useMemo, useRef, useState } from 'react';
import { content, type Lang } from '../i18n/content';

type ProjectType = 'web' | 'visual' | 'app';

interface Project {
  title: string;
  description: string;
  type: ProjectType;
  tags: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  /** GitHub repo link, shown as its own button in the detail modal. */
  githubUrl?: string;
  /** Path to a real screenshot/artwork, e.g. '/work/project-one.jpg'.
   *  Drop the file in /public/work and point this at it. Left unset,
   *  the card falls back to the plain placeholder box. */
  image?: string;
  /** Extra screenshots shown in the detail modal's gallery, e.g.
   *  ['/work/project-one-1.jpg', '/work/project-one-2.jpg']. */
  screenshots?: string[];
  /** Longer write-up shown in the modal only (the card keeps the short
   *  `description`). Separate paragraphs with a blank line — each one
   *  renders as its own <p>. Left unset, this section doesn't render. */
  fullDescription?: string;
}

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
  onView,
}: {
  project: Project;
  labels: WorkGridLabels;
  onView: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className="group rounded-2xl border border-ink/10 bg-chalk overflow-hidden"
    >
      <div className="aspect-[16/10] bg-ink/90 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-widemono text-paper/60">
              {project.type === 'visual' ? labels.visualPreviewLabel : labels.webPreviewLabel}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl tracking-tightest">{project.title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-widemono text-graphite mt-1.5 shrink-0">
            {typeLabel(project.type, labels)}
          </span>
        </div>

        <p className="text-graphite text-sm mt-2 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-widemono border border-ink/15 rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onView(project)}
          className="mt-5 font-mono text-[12px] uppercase tracking-widemono bg-ink text-paper rounded-full px-4 py-2 hover:bg-graphite transition-colors duration-300"
        >
          {labels.view}
        </button>
      </div>
    </div>
  );
}

function ExpandCue() {
  return (
    <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300">
      <span className="flex items-center justify-center h-9 w-9 rounded-full bg-paper/0 text-paper opacity-0 group-hover:opacity-100 group-hover:bg-paper/20 backdrop-blur-sm transition-all duration-300">
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
    onNavigate((index - 1 + images.length) % images.length);
  }

  function goNext() {
    onNavigate((index + 1) % images.length);
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
        className="absolute top-4 md:top-6 right-4 md:right-6 z-10 flex items-center justify-center h-10 w-10 rounded-full border border-paper/30 text-paper hover:border-paper transition-colors duration-300"
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
            className="absolute start-4 md:start-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-11 w-11 rounded-full border border-paper/30 text-paper hover:border-paper transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
            className="absolute end-4 md:end-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-11 w-11 rounded-full border border-paper/30 text-paper hover:border-paper transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        <div className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widemono text-paper/70">
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
  project: Project;
  labels: WorkGridLabels;
  dir: 'ltr' | 'rtl';
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = [
    ...(project.image ? [project.image] : []),
    ...(project.screenshots ?? []),
  ];

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
        setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
      } else if (goPrev) {
        setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, lightboxIndex, galleryImages.length]);

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
            <span className="font-mono text-[10px] uppercase tracking-widemono text-graphite">
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
            className="shrink-0 flex items-center justify-center h-9 w-9 rounded-full border border-ink/15 hover:border-ink/60 transition-colors duration-300"
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

        <div className="p-5 md:p-6 space-y-8">
          {project.image && (
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="group relative block w-full aspect-[16/10] rounded-xl overflow-hidden bg-ink/90 cursor-zoom-in"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-105"
              />
              <ExpandCue />
            </button>
          )}

          <p className="text-graphite text-sm md:text-base leading-relaxed">
            {project.description}
          </p>

          {project.fullDescription && (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widemono text-graphite mb-3">
                {labels.modal.details}
              </p>
              <div className="space-y-3 text-graphite text-sm md:text-base leading-relaxed">
                {project.fullDescription
                  .split(/\n\s*\n/)
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widemono text-graphite mb-3">
              {labels.modal.tools}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-widemono border border-ink/15 rounded-full px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widemono text-graphite mb-3">
              {labels.modal.screenshots}
            </p>
            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {project.screenshots.map((src, i) => {
                  const galleryIndex = (project.image ? 1 : 0) + i;
                  return (
                    <button
                      type="button"
                      key={src}
                      onClick={() => setLightboxIndex(galleryIndex)}
                      className="group relative block aspect-[16/10] rounded-xl overflow-hidden bg-ink/90 cursor-zoom-in"
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-105"
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
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-ink/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] uppercase tracking-widemono bg-ink text-paper rounded-full px-4 py-2 hover:bg-graphite transition-colors duration-300"
                >
                  {labels.liveDemo}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widemono border border-ink/20 rounded-full px-4 py-2 hover:border-ink/60 transition-colors duration-300"
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
                  className="font-mono text-[12px] uppercase tracking-widemono underline underline-offset-4 decoration-ink/30 hover:decoration-ink px-1 py-2"
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
  const [filter, setFilter] = useState<'all' | ProjectType>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const labels: WorkGridLabels = {
    webPreviewLabel: t.webPreviewLabel,
    visualPreviewLabel: t.visualPreviewLabel,
    webTag: t.webTag,
    visualTag: t.visualTag,
    appTag: t.appTag ?? 'App',
    liveDemo: t.liveDemo,
    caseStudy: t.caseStudy,
    view: t.viewLabel ?? 'View',
    modal: {
      tools: t.modal?.tools ?? 'Languages & tools',
      screenshots: t.modal?.screenshots ?? 'Screenshots',
      noScreenshots: t.modal?.noScreenshots ?? 'No screenshots yet.',
      github: t.modal?.github ?? 'GitHub',
      close: t.modal?.close ?? 'Close',
      prev: t.modal?.prev ?? 'Previous image',
      next: t.modal?.next ?? 'Next image',
      details: t.modal?.details ?? 'Project details',
    },
  };

  const visible = useMemo(
    () =>
      t.projects.filter(
        (p) => filter === 'all' || p.type === filter || (filter === 'web' && p.type === 'app')
      ),
    [filter, t.projects]
  );

  return (
    <div dir={dir}>
      <div className="flex flex-wrap gap-2 mb-10">
        {t.filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value as 'all' | ProjectType)}
            className={`font-mono text-[12px] uppercase tracking-widemono rounded-full px-4 py-2 border transition-colors duration-300 ${
              filter === f.value
                ? 'bg-ink text-paper border-ink'
                : 'border-ink/20 hover:border-ink/60'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            labels={labels}
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
