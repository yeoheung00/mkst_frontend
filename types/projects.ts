
export interface ProjectSummary {
  id: number;
  slug: string;
  title: string;
  summary: string;
  period: string;
  status: string;
  isFeatured: boolean;
  order: number;
  devStack: string[];
  visualStack: string[];
  demoUrl: string;
  githubUrl: string;
}

export interface Project extends ProjectSummary {
  readmeContent: string;
}

export interface CreateProjectInput {
    slug: string;
    title: string;
    summary: string;
    period: string;
    status: string;
    isFeatured: boolean;
    order: number;
    devStack: string[];
    visualStack: string[];
    demoUrl?: string;
    githubUrl: string;
}