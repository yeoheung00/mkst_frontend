import ProjectGrid from "@/components/features/projects/ProjectGrid";
import { DUMMY_PROJECTS } from "@/lib/data/dummy"
import { Project } from "@/types/project";

export default function Projects() {
  const projects: Project[] = DUMMY_PROJECTS;
  return (
    <div className="w-full min-h-full p-4 xl:p-6 pb-64">
      <ProjectGrid projects={projects}/>
    </div>
  )
}
