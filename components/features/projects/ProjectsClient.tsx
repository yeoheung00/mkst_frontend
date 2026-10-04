'use client';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createProject, editProject } from "@/lib/api/projects";
import { CreateProjectInput, Project } from "@/types";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectsClient({ session, project }: { session: Session, project: Project | null }) {
    const [title, setTitle] = useState(project?.title || "");
    const [slug, setSlug] = useState(project?.slug || "");
    const [summary, setSummary] = useState(project?.summary || "");
    const [period, setPeriod] = useState(project?.period || "");
    const [status, setStatus] = useState(project?.status || "");
    const [isFeatured, setIsFeatured] = useState(project?.isFeatured || false);
    const [order, setOrder] = useState(project?.order || 0);
    const [devStack, setDevStack] = useState(project?.devStack.join(", ") || "");
    const [visualStack, setVisualStack] = useState(project?.visualStack.join(", ") || "");
    const [demoUrl, setDemoUrl] = useState(project?.demoUrl || "");
    const [githubUrl, setGithubUrl] = useState(project?.githubUrl || "");
    const router = useRouter();

    const handleSubmit = async () => {
        if(!session || !session.accessToken) {
            alert("You must be logged in to create a project");
            return;
        }
        if(!title || !summary || !period || !status || !githubUrl) {
            alert("Please fill in all fields");
            return;
        }
        if(slug == "write" || slug == "new") {
            alert("Slug cannot be 'write' or 'new'");
            return;
        }
        const projectInput: CreateProjectInput = {
            title,
            slug,
            summary,
            period,
            status,
            isFeatured,
            order,
            devStack: devStack.trim() ? devStack.split(",").map(s => s.trim()) : [],
            visualStack: visualStack.trim() ? visualStack.split(",").map(s => s.trim()) : [],
            demoUrl,
            githubUrl
        };

        if(project) {
            const res = await editProject(project.id, projectInput, session.accessToken);
            if(!res.success) {
                alert("Failed to update project");
                return;
            }
            router.push(`/projects/${project.slug}`);
        } else {
            const res = await createProject(projectInput, session.accessToken);
            if(!res.success) {
                alert("Failed to create project");
                return;
            }
            router.push(`/projects/${res.data.slug}`);
        }
    };

    return (
        <div className="space-y-6 p-4 w-full max-w-3xl">
            <div className="flex justify-between items-center">
                <h1 className="text-h1 font-semibold">Projects</h1>
                <div className="flex gap-2">
                    <Button variant="secondary" size="md">Cancel</Button>
                    <Button onClick={handleSubmit} variant="primary" size="md">Save</Button>
                </div>
            </div>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} label="제목" placeholder="Title" className="w-full" />
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} label="슬러그" placeholder="Slug" className="w-full" />
            <Input value={summary} onChange={(e) => setSummary(e.target.value)} label="요약" placeholder="Summary" className="w-full" />
            <Input value={period} onChange={(e) => setPeriod(e.target.value)} label="기간" placeholder="Period" className="w-full" />
            <Input value={status} onChange={(e) => setStatus(e.target.value)} label="상태" placeholder="Status" className="w-full" />
            <label htmlFor="isFeatured">isFeatured</label>
            <input id="isFeatured" type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            <Input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value))} label="순서" placeholder="Order" className="w-full" />
            <Input value={devStack} onChange={(e) => setDevStack(e.target.value)} label="개발 스택" placeholder="Dev Stack" className="w-full" />
            <Input value={visualStack} onChange={(e) => setVisualStack(e.target.value)} label="시각 스택" placeholder="Visual Stack" className="w-full" />
            <Input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} label="데모 URL" placeholder="Demo URL" className="w-full" />
            <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} label="깃허브 URL" placeholder="GitHub URL" className="w-full" />
        </div>
    )
}