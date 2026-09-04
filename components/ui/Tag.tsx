import React from "react";

export type TagColor =
  | "blue"
  | "red"
  | "pink"
  | "yellow"
  | "green"
  | "purple"
  | "gray";

interface TagProps {
  children: React.ReactNode;
  color?: TagColor;
  className?: string;
}

const TAILWIND_PRESETS: Record<TagColor, string> = {
  blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200/70 dark:border-blue-900/50",
  red: "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200/70 dark:border-red-900/50",
  pink: "bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 border-pink-200/70 dark:border-pink-900/50",
  yellow: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/70 dark:border-amber-900/50",
  green: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/70 dark:border-emerald-900/50",
  purple: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200/70 dark:border-purple-900/50",
  gray: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700",
};

export default function Tag({
  children,
  color = "blue",
  className = "",
}: TagProps) {
  const colorClass = TAILWIND_PRESETS[color] || TAILWIND_PRESETS.blue;

  return (
    <span
      className={`w-fit inline-flex items-center text-xs px-1.5 py-0.5 rounded-md border ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
}
