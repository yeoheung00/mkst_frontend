import { ProjectSummary } from "@/types";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: ProjectSummary[];
  maxCols?: number;
}

const GRID_COLS_MAP: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 lg:grid-cols-2", // 2열 이상으로 안 올라가도록 상위 분기점 생략
  3: "grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3", // 3열까지만 허용
  4: "grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4",
};

const DEFAULT_COLS = "grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4";

export default function ProjectsGrid({ projects, maxCols }: ProjectGridProps) {
  const columnsClass = (maxCols && GRID_COLS_MAP[maxCols]) ? GRID_COLS_MAP[maxCols] : DEFAULT_COLS;

  if (projects.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          프로젝트가 존재하지 않습니다.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${columnsClass}`}>
      {projects.map((project, index) => (
        <ProjectCard key={project.id ?? index} project={project} />
      ))}
    </div>
  );
}