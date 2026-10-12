import { ProjectSummary } from "@/types";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: ProjectSummary[];
  maxCols?: number
}

export default function ProjectsGrid({ projects, maxCols = 3 }: ProjectGridProps) {
  if (projects.length === 0) return (
    <div className="py-16 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        프로젝트가 존재하지 않습니다.
      </p>
    </div>
  );
  return (
    <div className={`grid gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4`}>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
        />
      ))}
    </div>
  )
}
