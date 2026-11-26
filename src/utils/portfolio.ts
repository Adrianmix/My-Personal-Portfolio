export type ProjectType = 'web' | 'visual' | 'app';
export type ProjectFilter = 'all' | 'web' | 'visual';
export type ThemePref = 'light' | 'dark' | 'auto';

export interface ProjectItem {
  title: string;
  description: string;
  type: ProjectType;
  tags: readonly string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  githubUrl?: string;
  image?: string;
  screenshots?: readonly string[];
  fullDescription?: string;
}

export function filterProjects<T extends Pick<ProjectItem, 'type'>>(
  projects: readonly T[],
  filter: ProjectFilter,
): T[] {
  if (filter === 'all') return [...projects];
  if (filter === 'web') {
    return projects.filter((p) => p.type === 'web' || p.type === 'app');
  }
  return projects.filter((p) => p.type === filter);
}

export function getGalleryImages(project: Pick<ProjectItem, 'image' | 'screenshots'>): string[] {
  const list: string[] = [];
  if (project.image) list.push(project.image);
  if (project.screenshots) {
    for (const src of project.screenshots) {
      if (!list.includes(src)) list.push(src);
    }
  }
  return list;
}

export function stepGalleryIndex(
  current: number,
  direction: 'next' | 'prev',
  total: number,
): number {
  if (total <= 0) return 0;
  const delta = direction === 'next' ? 1 : -1;
  return (current + delta + total) % total;
}

export function splitParagraphs(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function resolveIsDark(pref: ThemePref, systemPrefersDark: boolean): boolean {
  if (pref === 'dark') return true;
  if (pref === 'light') return false;
  return systemPrefersDark;
}
