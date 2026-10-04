import { ProjectSummary } from "@/types/projects";

export function getSortedProjects(projects: ProjectSummary[]) {
  return [...projects].sort((a, b) => {
    // 1. isFeatured가 true인 프로젝트를 최상단으로
    if (a.isFeatured !== b.isFeatured) {
      return a.isFeatured ? -1 : 1;
    }
    // 2. 그 안에서는 지정한 order 순서대로 (또는 최신순)
    return a.order - b.order;
  });
}
