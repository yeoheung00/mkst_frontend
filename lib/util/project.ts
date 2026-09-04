import { Project } from "@/types/project";

export interface TechStat {
  name: string;      // 기술 이름 (예: "Next.js")
  count: number;     // 사용된 프로젝트 수
  percentage: number; // 전체 대비 비율 (%)
}

export function getSortedProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    // 1. isFeatured가 true인 프로젝트를 최상단으로
    if (a.isFeatured !== b.isFeatured) {
      return a.isFeatured ? -1 : 1;
    }
    // 2. 그 안에서는 지정한 order 순서대로 (또는 최신순)
    return a.order - b.order;
  });
}
