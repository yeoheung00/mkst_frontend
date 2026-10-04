import { auth } from "@/auth";
import ProjectViewer from "@/components/features/projects/ProjectViewer";
import { LinkButton } from "@/components/ui/LinkButton";
import Tag from "@/components/ui/Tag";
import { getProject } from "@/lib/api/projects";
import { Project } from "@/types/projects";
import { Session } from "next-auth";
import { Suspense } from "react";
import ProjectControl from "@/components/features/projects/ProjectControl";

export default async function projectPage({ params }: { params: Promise<{ projectSlug: string }> }) {
    const { projectSlug } = await params;
    const session = await auth();
    const projectRes = await getProject(projectSlug);
    if (!projectRes.success) {
        console.log("Failed to get project", projectSlug);
        return <div>Failed to get project</div>
    }
    const project: Project = projectRes.data;
    return (
        <div className="w-full max-w-5xl space-y-4 p-4">
            <ProjectHeader project={project} session={session} />
            <ProjectViewer content={project.readmeContent} />
        </div>
    )
}

function ProjectHeader({ project, session }: { project: Project, session: Session | null }) {
    const { title, summary, period, status, isFeatured, devStack, visualStack, demoUrl, githubUrl } = project;
    const statusColor: Record<string, string> = {
        "In Progress": "#F59E0B",
        "Completed": "#20e93b",
        "Maintained": "#0084ff",
    }
    return (
        <div className="space-y-4 lg:pt-8 pb-4 border-b border-border-default">
            {session && session.accessToken && (
                <Suspense fallback={<></>}>
                    <ProjectControl session={session} projectId={project.id} projectSlug={project.slug} />
                </Suspense>
            )}
            {/* 1. Featured 배지 및 프로젝트 제목 */}
            <div className="flex gap-2 items-center">

                <h1 className="text-h1">
                    {title}
                </h1>

                {isFeatured && <span className="text-base text-amber-300">
                    ★
                </span>}
            </div>

            <div className="space-y-2">
                <h2 className="text-h2">Summary</h2>
                <p>{summary}</p>
            </div>
            <div className="space-y-2">
                <h2 className="text-h2">Details</h2>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* 2. 기간 및 상태 */}
                    <div className="flex gap-6 items-start shrink-0">
                        <div className="space-y-2">
                            <h4 className="text-h4">
                                Status
                            </h4>
                            <div className="flex gap-2 items-center">

                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor[status] }}></span>
                                <span>{status}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-h4">
                                Period
                            </h4>
                            <div className="flex gap-2 items-center">
                                <span>{period}</span>
                            </div>
                        </div>

                    </div>


                    {/* 3. 스택 영역 (개발 스택 & 비주얼 스택 분리) */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {devStack.length > 0 && (
                            <div className="flex md:flex-col flex-wrap items-center md:items-start gap-2">
                                <h4 className="text-h4">
                                    Dev
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {devStack.map((tech) => (
                                        <Tag key={tech} color="blue" size="md">
                                            {tech}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                        )}

                        {visualStack.length > 0 && (
                            <div className="flex md:flex-col flex-wrap items-center md:items-start gap-2">
                                <h4 className="text-h4">
                                    Visual
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {visualStack.map((tech) => (
                                        <Tag key={tech} color="purple" size="md">
                                            {tech}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>


            {/* 5. 액션 버튼 (데모 링크 & 깃허브 레포 링크) */}
            <div className="w-full md:w-fit flex gap-4 items-center">
                {demoUrl && (
                    <LinkButton href={demoUrl} target="_blank" variant="primary" size="sm" className="flex-1">
                        Live Demo ↗
                    </LinkButton>
                )}
                {githubUrl && (
                    <LinkButton href={githubUrl} target="_blank" variant="secondary" size="sm" className="flex-1">
                        Github Repo ↗
                    </LinkButton>
                )}
            </div>
        </div>
    );
}