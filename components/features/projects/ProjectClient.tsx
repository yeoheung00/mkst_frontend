'use client';

import { Button } from "@/components/ui/Button";
import { Domain, Project } from "@/types";
import { useEffect, useState } from "react";
import ProjectGrid from "./ProjectGrid";
import { PROJECTS } from "@/data/projects";
import { getSortedProjects } from "@/lib/util";

export default function ProjectClient() {

  const [activeTab, setActiveTab] = useState<"All" | Domain>("All");
  const projects = getSortedProjects(PROJECTS.filter((project) => (project.domain === activeTab) || (activeTab === "All")));


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-baseline">
          <h1 className="text-h1 font-semibold">Projects</h1>
          <span className="text-sub text-text-secondary">
            {projects.length} projects
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
      <ProjectGrid projects={projects} />
    </div>
  );
}
