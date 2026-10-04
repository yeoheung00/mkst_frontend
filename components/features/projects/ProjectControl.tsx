import { Session } from "next-auth";
import { Button } from "@/components/ui/Button";
import { getRole } from "@/lib/api/auth";
import ProjectControlClient from "./ProjectControlClient";

export default async function ProjectControl({ session, projectId, projectSlug }: { session: Session, projectId: number, projectSlug: string }) {
    const isAdmin = await getRole(session) === "ADMIN";
    if (!session || !session.accessToken || !isAdmin) return <></>;
    return (
        <ProjectControlClient token={session.accessToken} projectId={projectId} projectSlug={projectSlug} />
    )
}