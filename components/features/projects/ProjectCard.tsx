"use client";

import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import Tag from "@/components/ui/Tag";
import { ProjectSummary } from "@/types/projects";
import Link from "next/link";

interface ProjectCardProps {
  project: ProjectSummary;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const devStack = project.devStack || [];
  const visualStack = project.visualStack || [];
  let cardDevStack = devStack;
  let cardVisualStack = visualStack;
  if (devStack.length + visualStack.length > 5) {
    if(visualStack.length >= 2 && devStack.length >= 3) {
      cardDevStack = devStack.slice(0, 3);
      cardVisualStack = visualStack.slice(0, 2);
    } else if(visualStack.length < 2) {
      cardDevStack = devStack.slice(0, 5 - visualStack.length);
      cardVisualStack = visualStack;
    } else if(devStack.length < 3) {
      cardDevStack = devStack;
      cardVisualStack = visualStack.slice(0, 5 - devStack.length);
    }
  }
  const overflowCount = devStack.length + visualStack.length - (cardDevStack.length + cardVisualStack.length);
  return (
    <div
      className="relative flex flex-col justify-between gap-4 p-4 rounded-xl border border-border-default bg-surface-card cursor-pointer"
    >
      <div className="relative flex flex-col justify-between gap-4 flex-1">
        <div className="flex flex-col gap-2">

          <div className="flex items-center gap-2">
            {project.isFeatured && (
              <span className="text-sub text-amber-300">
                ★
              </span>
            )}
            <span className="text-sub text-text-secondary">
              {project.period}
            </span>
          </div>

          <Link href={`/projects/${project.slug}`} className="text-h3 hover:text-primary-base after:absolute after:inset-0">
            {project.title}
          </Link>
          <p className="text-sub text-text-secondary line-clamp-2">
            {project.summary}
          </p>

        </div>

        <div className="flex flex-wrap gap-1.5">
          {/* Dev Stack Badges */}
          {cardDevStack.map((stack) => (
            <Tag key={stack} color="blue">
              {stack}
            </Tag>
          ))}

          {/* Visual Stack Badges */}
          {cardVisualStack.map((stack) => (
            <Tag key={stack} color="purple">
              {stack}
            </Tag>
          ))}

          {/* Overflow count if stacks are many */}
          {overflowCount > 0 && (
            <span className="text-[11px] px-1.5 py-0.5 text-gray-400 font-mono">
              +{overflowCount}
            </span>
          )}
        </div>

      </div>

      <div className="w-full flex gap-4 items-center z-1">
        {project.demoUrl && (
          <LinkButton href={project.demoUrl} target="_blank" variant="primary" size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
            Live Demo ↗
          </LinkButton>
        )}
        {project.githubUrl && (
          <LinkButton href={project.githubUrl} target="_blank" variant="secondary" size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
            Github Repo ↗
          </LinkButton>
        )}
      </div>
    </div>
  );
}
