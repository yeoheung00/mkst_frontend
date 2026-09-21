'use client';

import { useEffect, useState } from "react";
import { Magnifier } from "@/components/icons";
import { usePathname } from "next/navigation";

export default function Search({ onSearchAction }: {onSearchAction: () => void}) {
  const [isMac, setIsMac] = useState(false);
  const path = usePathname();

  useEffect(() => {
    // 브라우저 환경에서만 알 수 있는 OS 정보를 hydration 이후 반영
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(navigator.userAgent.includes("Mac"));
  }, []);
  return (
    <div className={`w-8 sm:w-full max-w-32 h-8 sm:border border-border-default rounded-md flex overflow-hidden items-center cursor-pointer sm:cursor-text justify-between ${path === "/" ? "sm:bg-surface-sub" : "sm:bg-surface-subest"} hover:max-sm:bg-fill-secondary active:max-sm:bg-fill-pressed`} onClick={onSearchAction}>
      <div className="w-8 h-8 shrink-0 flex items-center justify-center">
        <Magnifier className="w-6 h-6 sm:w-4 sm:h-4 text-text-primary sm:text-text-secondary" />
      </div>
      <span className="px-2 text-text-secondary">{isMac ? "⌘" : "ctrl"} K</span>
    </div>
  );
}
