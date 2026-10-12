import ProjectsClient from "@/components/features/projects/ProjectsClient";
import { redirect } from "next/navigation";
import { getProject } from "@/lib/api/projects";
import { Project } from "@/types";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default async function Write({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  let project: Project | null;
  if (projectSlug === "new") {
    project = null;
  } else {
    const projectRes = await getProject(projectSlug);
    if (!projectRes.success) {
      console.log("Failed to get project", projectSlug);
      redirect("/projects");
    }
    project = projectRes.data;
  }
  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <div className="w-full flex flex-col items-center">
        <ProjectsClient project={project} />
      </div>
    </AuthGuard>
  );
}
