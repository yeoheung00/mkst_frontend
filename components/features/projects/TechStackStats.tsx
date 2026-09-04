"use client";

import React, { useState } from "react";
import { Project } from "@/lib/data/dummy";
import { getTechStackStats } from "@/lib/util";

interface TechStackStatsProps {
  projects: Project[];
}

export default function TechStackStats({ projects }: TechStackStatsProps) {
  const [showAll, setShowAll] = useState(false);

  const stats = getTechStackStats(projects);
  const totalProjects = projects.length;

  // 기본적으로 상위 5개만 노출
  const visibleStats = showAll ? stats : stats.slice(0, 5);

  return (
    <div className="w-full p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Tech Stack Usage
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            전체 {totalProjects}개 프로젝트 중 사용 빈도
          </p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
          총 {stats.length}개 스택
        </span>
      </div>

      {/* Stats List */}
      <div className="space-y-3.5">
        {visibleStats.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                {item.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {item.count}
                </span>
                /{totalProjects} ({item.percentage}%)
              </span>
            </div>

            {/* Progress Track */}
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Less Toggle Button */}
      {stats.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full pt-2 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors text-center"
        >
          {showAll ? "접기 ▲" : `전체 스택 보기 (${stats.length - 5}개 더보기) ▼`}
        </button>
      )}
    </div>
  );
}
