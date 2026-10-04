'use client';

import { Button } from "@/components/ui/Button";
import { deleteProject, syncProject } from "@/lib/api/projects";
import { useRouter } from "next/navigation";

export default function ProjectControlClient({ token, projectId, projectSlug }: { token: string, projectId: number, projectSlug: string }) {
    const router = useRouter();
    const handleEdit = () => {
        router.push(`/projects/write/${projectSlug}`);
    };
    const handleDelete = async () => {
        const deleteRes = await deleteProject(projectId, token);
        if (!deleteRes.success) {
            alert("Failed to delete project");
            return;
        }
        router.push("/projects");
    };
    const handleSync = async () => {
        const syncRes = await syncProject(projectId, token);
        if (!syncRes.success) {
            alert("Failed to sync project");
            return;
        }
        router.refresh();
    };
    return (
        <div className="absolute right-4 top-20 flex gap-2">
            <Button variant="border" size="sm" onClick={handleEdit}>
                Edit
            </Button>
            <Button variant="border" size="sm" onClick={handleDelete}>
                Delete
            </Button>
            <Button variant="border" size="sm" onClick={handleSync}>
                Sync
            </Button>
        </div>
    );
}