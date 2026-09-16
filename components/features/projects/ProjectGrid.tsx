"use client";

import React, { useEffect, useState } from "react";
import { Project, Domain } from "@/types/project";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import { Button } from "@/components/ui/Button";
import { getSortedProjects } from "@/lib/util";
import { PROJECTS } from "@/data/projects";

interface ProjectGridProps {
  projects: Project[];
  maxCols?: number
}

export default function ProjectGrid({ projects, maxCols = 3 }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="space-y-6">
      {/* Grid Container */}
      {projects.length > 0 ? (
        <div className={`grid grid-cols-1 ${projects.length >= 2 && maxCols >= 2 && "lg:grid-cols-2"} ${projects.length >= 3 && maxCols >= 3 && "xl:grid-cols-3"} gap-4 xl:gap-6`}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            해당 카테고리의 프로젝트가 존재하지 않습니다.
          </p>
        </div>
      )}

      {/* Detail Modal Popup */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
