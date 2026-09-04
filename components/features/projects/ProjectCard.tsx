"use client";

import { Button } from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={() => onClick(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(project);
        }
      }}
      className="group relative flex flex-col justify-between gap-4 p-4 rounded-xl border border-border-default bg-surface-card cursor-pointer"
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-medium">
                {project.domain}
              </span>
              {project.isFeatured && (
                <span className="text-sm text-amber-300">
                  ★
                </span>
              )}
            </div>

            <span className="text-xs text-text-secondary">
              {project.period}
            </span>
          </div>

          <h3 className="text-xl font-semibold group-hover:text-primary-base">
            {project.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
            {project.summary}
          </p>

        </div>

        <div className="flex flex-wrap gap-1.5">
          {/* Dev Stack Badges */}
          {project.devStack?.slice(0, 3).map((stack) => (
            <Tag key={stack} color="blue">
              {stack}
            </Tag>
          ))}

          {/* Visual Stack Badges */}
          {project.visualStack?.slice(0, 2).map((stack) => (
            <Tag key={stack} color="purple">
              {stack}
            </Tag>
          ))}

          {/* Overflow count if stacks are many */}
          {project.devStack.length + project.visualStack.length > 5 && (
            <span className="text-[11px] px-1.5 py-0.5 text-gray-400 font-mono">
              +{project.devStack.length + project.visualStack.length - 5}
            </span>
          )}
        </div>

      </div>

      <div className="w-full flex gap-4 items-center">
        {project.githubUrl && (
          <Button variant="secondary" size="sm" className="flex-1">Github Repo</Button>
        )}
        {project.demoUrl && (
          <Button variant="primary" size="sm" className="flex-1">Visit Demo</Button>
        )}
      </div>
    </div>
  );
}
