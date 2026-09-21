"use client";

import { useCallback, useEffect, useRef } from "react";
import { Project } from "@/types/project";
import { ArrowLeft, X } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Tag from "@/components/ui/Tag";
import { LinkButton } from "@/components/ui/LinkButton";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  // ESC 키 눌렀을 때 모달 닫기 & 스크롤 방지
  const isPoppedRef = useRef(false);

  const handleClose = useCallback(() => {
    // 사용자가 뒤로가기 제스처/버튼으로 닫은 게 아니고, 가상 히스토리가 남아있다면 1단계 수동 원복
    if (!isPoppedRef.current && window.history.state?.modalOpen) {
      window.history.back();
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    // 모달이 닫혀있거나 프로젝트가 없으면 아무 작업도 하지 않고 리턴 (pushState 절대 안 함)
    if (!isOpen || !project) return;

    // 1. 모달이 열릴 때 초기화 및 스크롤 고정
    isPoppedRef.current = false;
    document.body.style.overflow = "hidden";

    // 2. 가상 히스토리 스택 추가
    window.history.pushState({ modalOpen: true }, "", window.location.href);

    // 3. 브라우저/모바일 뒤로가기 이벤트 감지
    const handlePopState = () => {
      isPoppedRef.current = true; // 뒤로가기로 닫혔음을 기록
      onClose();
    };

    // 4. ESC 키 감지
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, project, onClose, handleClose]);

  if (!project) return null;

  return (
    <div className="fixed left-0 bottom-0 w-full h-[calc(100vh-64px)] md:h-full z-30 flex items-center justify-center md:p-8">
      {/* Background Backdrop (클릭 시 닫힘) */}
      <div
        className="fixed w-full h-[calc(100vh-64px)] md:h-full bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      <div className="absolute -top-12 left-4 bg-surface-sub z-50">
        <Button
          variant="ghost"
          onClick={handleClose}
          className=" block md:hidden w-8 h-8 rounded-md"
        >
          <ArrowLeft />
        </Button>
      </div>

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl h-[calc(100vh-64px)] md:h-fit md:max-h-[95%] bg-surface-base md:border border-border-default md:rounded-xl overflow-y-auto flex flex-col">
        {/* Header Bar */}
        <div className="hidden md:flex h-16 sticky top-0 z-16 items-center justify-between p-4 bg-surface-sub border-b border-border-default">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">{project.domain}</span>
            <span className="text-sub text-text-secondary">
              • {project.period}
            </span>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={handleClose}
            className="w-8 h-8 rounded-md"
          >
            <X />
          </Button>
        </div>

        <div className="p-4 h-full relative flex flex-col gap-4">
          {/* Title & Summary */}
          <div className="flex flex-col gap-1">
            <h1 className="text-h1 font-bold">{project.title}</h1>
            <div className="md:hidden flex items-center gap-2">
              <span className="text-base font-medium">{project.domain}</span>
              <span className="text-sub text-text-secondary">
                • {project.period}
              </span>
            </div>
          </div>

          <span className="bg-border-default h-px w-full" />


          {/* Detailed Description */}
          <p className="text-base">{project.description}</p>

          {/* Key Engineering / Visual Challenge */}
          {project.keyChallenge && (
            <div className="pl-2 border-l-2 border-border-default space-y-2">
              <h2 className="text-h2">핵심 과제</h2>
              <p className="text-base">{project.keyChallenge}</p>
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
          {project.poster && (
            <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
              <Image
                src={project.poster.src}
                alt={project.title}
                width={project.poster.width}
                height={project.poster.height}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Applied Stacks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {project.devStack && project.devStack.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-h3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-primary" />
                  Development Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.devStack.map((item) => (
                    <Tag key={item} size="md" color="blue">
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {project.visualStack && project.visualStack.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-h3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-primary" />
                  Visual Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.visualStack.map((item) => (
                    <Tag key={item} size="md" color="purple">
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Links */}
        <div className="sticky bottom-0 w-full flex justify-end items-center gap-4 p-4 border-t border-border-default bg-surface-sub">
          {project.demoUrl && (
            <LinkButton
              href={project.demoUrl}
              target="_blank"
              variant="primary"
              size="sm"
              className="max-md:flex-1"
            >
              Live Demo ↗
            </LinkButton>
          )}
          {project.githubUrl && (
            <LinkButton
              href={project.githubUrl}
              target="_blank"
              variant="secondary"
              size="sm"
              className="max-md:flex-1"
            >
              GitHub Repo ↗
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
}
