export type Domain = "Engineering" | "Visual";
export type ProjectStatus = "In Progress" | "Completed" | "Maintained";

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  period: string;
  status: ProjectStatus;
  isFeatured: boolean;
  order: number;

  domain: Domain;
  devStack: string[];     // 엔지니어링 기술 스택 (Next.js, Express, Docker 등)
  visualStack: string[];  // 시각 디자인 스택 (Procreate, After Effects 등)

  posterUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  blogPostUrl?: string;
  keyChallenge?: string;
}
