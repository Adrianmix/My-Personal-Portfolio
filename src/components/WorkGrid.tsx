import { useMemo, useRef, useState } from 'react';
import { content, type Lang } from '../i18n/content';

type ProjectType = 'web' | 'visual';

interface Project {
  title: string;
  description: string;
  type: ProjectType;
  tags: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
}

function ProjectCard({
  project,
  webPreviewLabel,
  visualPreviewLabel,
  webTag,
  visualTag,
  liveDemoLabel,
  caseStudyLabel,
}: {
  project: Project;
  webPreviewLabel: string;
  visualPreviewLabel: string;
  webTag: string;
  visualTag: string;
  liveDemoLabel: string;
  caseStudyLabel: string;
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
      <div className="aspect-[16/10] bg-ink/90 flex items-center justify-center">
        <span className="font-mono text-[11px] uppercase tracking-widemono text-paper/60">
          {project.type === 'web' ? webPreviewLabel : visualPreviewLabel}
        </span>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl tracking-tightest">{project.title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-widemono text-graphite mt-1.5 shrink-0">
            {project.type === 'web' ? webTag : visualTag}
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

        <div className="flex items-center gap-4 mt-5 font-mono text-[12px] uppercase tracking-widemono">
          {project.liveUrl && (
            <a
              href={project.liveUrl} target="_blank"
              className="underline underline-offset-4 decoration-ink/30 hover:decoration-ink"
            >
              {liveDemoLabel}
            </a>
          )}
          {project.caseStudyUrl && (
            <a
              href={project.caseStudyUrl} target="_blank"
              className="underline underline-offset-4 decoration-ink/30 hover:decoration-ink"
            >
              {caseStudyLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkGrid({ lang }: { lang: Lang }) {
  const t = content[lang].work;
  const [filter, setFilter] = useState<'all' | ProjectType>('all');

  const visible = useMemo(
    () => t.projects.filter((p) => filter === 'all' || p.type === filter),
    [filter, t.projects]
  );

  return (
    <div dir={content[lang].dir}>
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
            webPreviewLabel={t.webPreviewLabel}
            visualPreviewLabel={t.visualPreviewLabel}
            webTag={t.webTag}
            visualTag={t.visualTag}
            liveDemoLabel={t.liveDemo}
            caseStudyLabel={t.caseStudy}
          />
        ))}
      </div>
    </div>
  );
}
