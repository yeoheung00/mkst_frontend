'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroSection() {
  const topLayerRef = useRef<HTMLDivElement>(null);
  const angleTextRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // requestAnimationFrame으로 마우스 이벤트를 브라우저 주사율에 동기화
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current || !topLayerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // 각도 계산 (0deg ~ 360deg)
        let deg = Math.atan2(dy, dx) * (180 / Math.PI);
        if (deg < 0) deg += 360;

        // React 리렌더링 없이 DOM의 CSS 변수를 직접 수정 (GPU 가속)
        topLayerRef.current.style.setProperty('--split-angle', `${deg}deg`);

        if (angleTextRef.current) {
          angleTextRef.current.innerText = `${Math.round(deg)}°`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden select-none bg-black">

      {/* 1. BOTTOM LAYER: DEVELOPER ZONE (Z-0) */}
      <div className="absolute inset-0 z-0 bg-slate-950 text-emerald-400 p-12 flex flex-col justify-between font-mono">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>// ENGINE: NEXT.JS 15</span>
          <span>STATUS: ONLINE</span>
        </div>

        <div className="max-w-4xl">
          <p className="text-emerald-500 text-sm mb-2">&gt; const identity = "Design Engineer";</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 mb-6">
            ENGINEERING <br /> THE DEPTH.
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl font-sans">
            견고한 시스템 아키텍처와 백엔드/인프라 기술로 서비스의 깊이를 만듭니다.
          </p>
        </div>

        <div className="flex gap-4 text-xs">
          <span className="px-3 py-1 border border-emerald-500/30 rounded bg-emerald-500/10">Docker / Linux</span>
          <span className="px-3 py-1 border border-emerald-500/30 rounded bg-emerald-500/10">Next.js / Express</span>
        </div>
      </div>

      {/* 2. TOP LAYER: DESIGNER ZONE (Z-10) - Mask/Conic Gradient 최적화 */}
      <div
        ref={topLayerRef}
        className="absolute inset-0 z-10 bg-zinc-100 text-zinc-900 p-12 flex flex-col justify-between font-sans will-change-[mask-image]"
        style={{
          // conic-gradient 마스크를 사용하여 회전 분할 구현 (렌더링 부하 최소화)
          maskImage: 'conic-gradient(from calc(var(--split-angle, 0deg) - 90deg) at 50% 50%, #000 0deg 180deg, transparent 180deg 360deg)',
          WebkitMaskImage: 'conic-gradient(from calc(var(--split-angle, 0deg) - 90deg) at 50% 50%, #000 0deg 180deg, transparent 180deg 360deg)',
        }}
      >
        <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
          <span>FIGMA / VISUAL SYSTEM</span>
          <span>PIXEL PERFECT</span>
        </div>

        <div className="max-w-4xl">
          <p className="text-indigo-600 text-sm font-semibold mb-2">VISUAL IDENTITY</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-6">
            DESIGNING <br /> THE EXPERIENCE.
          </h1>
          <p className="text-zinc-600 text-base md:text-lg max-w-xl">
            시각디자인 전공의 감각으로 유저에게 직관적이고 아름다운 UI/UX를 전달합니다.
          </p>
        </div>

        <div className="flex gap-4 text-xs font-medium">
          <span className="px-3 py-1 bg-zinc-200 text-zinc-800 rounded-full">UI/UX Design</span>
          <span className="px-3 py-1 bg-zinc-200 text-zinc-800 rounded-full">Design System</span>
        </div>
      </div>

      {/* 3. CENTER HUD / ANGLE INDICATOR */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div
          ref={angleTextRef}
          className="w-16 h-16 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-white/70 shadow-2xl"
        >
          0°
        </div>
      </div>

    </div>
  );
}
