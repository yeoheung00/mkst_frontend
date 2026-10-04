import ProjectsClient from "@/components/features/projects/ProjectsClient";
import { auth } from "@/auth";
import { getRole } from "@/lib/api/auth";
import { redirect } from "next/navigation";
import { getProject } from "@/lib/api/projects";
import { Project } from "@/types";

export default async function Write({ params }: { params: Promise<{ projectSlug: string }> }) {
  const { projectSlug } = await params;
  const session = await auth();
  if(!session || !session.accessToken) {
    redirect("/");
  }
  const role = await getRole(session);
  if (!role || role !== "ADMIN") {
    redirect("/");
  }
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
    <div className="w-full flex flex-col items-center">
      <ProjectsClient session={ session } project={project} />
    </div>
  )
}
