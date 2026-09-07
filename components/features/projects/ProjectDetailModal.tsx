"use client";

import React, { useEffect } from "react";
import { Project } from "@/types/project";
import { X } from "@/components/icons";
import { Button } from "@/components/ui/Button";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  // ESC 키 눌렀을 때 모달 닫기 & 스크롤 방지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Background Backdrop (클릭 시 닫힘) */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[95vh] bg-surface-base border border-border-default rounded-xl shadow-2xl overflow-y-auto z-15 flex flex-col transition-all">
        {/* Header Bar */}
        <div className="sticky top-0 z-16 flex items-center justify-between px-4 py-4 bg-surface-sub border-b border-border-default">
          <div className="flex items-center gap-2">
              <span className="text-base font-medium">
                {project.domain}
              </span>
            <span className="text-xs text-text-secondary">• {project.period}</span>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-8 h-8 rounded-md"
          >
            <X/>
          </Button>
        </div>

        {/* Modal Content Area */}
        <div className="">
          {/* Title & Summary */}
          <div>
            <h2 className="text-h2 font-bold">
              {project.title}
            </h2>
            <p className="text-sub text-text-secondary mt-2">
              {project.summary}
            </p>
          </div>


          {/* Detailed Description */}
          <div className="">
            <span className="w-full h-px border border-border-default"/>
            <p className="text-base">
              {project.description}
            </p>
          </div>

          {/* Key Engineering / Visual Challenge */}
          {project.keyChallenge && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 space-y-1">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                💡 Key Challenge & Solution
              </h4>
              <p className="text-xs text-amber-900/80 dark:text-amber-300/90 leading-relaxed">
                {project.keyChallenge}
              </p>
            </div>
          )}

          {/* Project Media Preview (Video / Poster) */}
          {project.videoUrl && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-gray-200 dark:border-gray-800">
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {project.posterUrl && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
              <img
                src={project.posterUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}


          {/* Applied Stacks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {project.devStack && project.devStack.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Development Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.devStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.visualStack && project.visualStack.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  Visual & Interaction
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.visualStack.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-lg bg-pink-50/50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300 font-medium border border-pink-100 dark:border-pink-900/40"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white transition-colors flex items-center gap-1.5"
              >
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
              >
                GitHub Repo ↗
              </a>
            )}
            {project.blogPostUrl && (
              <a
                href={project.blogPostUrl}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
              >
                개발 기록 (Post) ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
