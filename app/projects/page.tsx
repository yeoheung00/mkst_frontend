import { RoleGate } from "@/components/auth/RoleGate";
import ProjectGrid from "@/components/features/projects/ProjectsGrid";
import { LinkButton } from "@/components/ui/LinkButton";
import { getProjects } from "@/lib/api/projects";
import { getSortedProjects } from "@/lib/util/project";

export default async function Projects() {
  const projectsRes = await getProjects();
  if (!projectsRes.success) return <div>Get projects error</div>;
  const projects = projectsRes.data;
  const sortedProjects = getSortedProjects(projects);
  return (
    <div className="w-full p-4 space-y-6">
      <div className="flex justify-between">
        <div className="flex gap-4 items-baseline">
          <h1 className="text-h1 font-semibold">Projects</h1>
          <span className="text-sub text-text-secondary">
            {projects.length} projects
          </span>
        </div>
        <RoleGate allowedRoles={["ADMIN"]}>
          <LinkButton href="/projects/write/new" variant="primary" size="sm">
            새로운 프로젝트
          </LinkButton>
        </RoleGate>
      </div>
      {/* Grid Container */}
      <ProjectGrid projects={sortedProjects} />
    </div>
  );
}
