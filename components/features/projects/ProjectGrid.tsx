"use client";

import React, { useState } from "react";
import { Project, Domain } from "@/types/project";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import { Button } from "@/components/ui/Button";
import { getSortedProjects } from "@/lib/util";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeTab, setActiveTab] = useState<"All" | Domain>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on activeTab
  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    return project.domain === activeTab;
  });

  const sortedProjects = getSortedProjects(filteredProjects);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-baseline">
          <h1 className="text-4xl font-semibold">Projects</h1>
          <span className="text-sm text-text-secondary">
            {filteredProjects.length} projects
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(["All", "Engineering", "Visual"] as const).map((tab) => (
            <Button
              key={tab}
              size="sm"
              variant={tab === activeTab ? "invert-fill" : "invert-border"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>
      {/* Grid Container */}
      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 xl:gap-6">
          {sortedProjects.map((project, index) => (
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
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
