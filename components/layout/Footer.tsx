'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-base border-t border-border-subtle text-text-secondary transition-colors duration-300">
      {/* 상단 메인 그리드 */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

        {/* 브랜딩 및 소개 (5 컬럼) */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="inline-block">
            <span className="text-xl font-black tracking-tight text-text-primary hover:text-primary-base transition-colors">
              MINK STUDIO<span className="text-primary-base">.</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-text-tertiary max-w-sm">
            풀스택 개발과 기술적 도전을 기록하는 공간입니다. 더 나은 사용자 경험과 견고한 시스템을 고민합니다.
          </p>
          {/* 상태 표시 뱃지 */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-subtle border border-border-subtle text-xs text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for new projects</span>
          </div>
        </div>

        {/* 내비게이션 링크 (7 컬럼) */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {['Blog', 'Projects', 'About'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-primary-base transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary-base transition-colors duration-200 flex items-center gap-1"
                >
                  GitHub
                  <span className="text-[10px] opacity-60">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@mink-stud.io"
                  className="hover:text-primary-base transition-colors duration-200"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack Info */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              Built With
            </h4>
            <ul className="space-y-2 text-sm text-text-tertiary">
              <li>Next.js 15</li>
              <li>Tailwind CSS</li>
              <li>Prisma & Express</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 하단 카피라이트 & 디테일 */}
      <div className="border-t border-border-subtle/50 bg-surface-subtle/30">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-tertiary">
          <p>© {currentYear} MINK STUDIO. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <span className="text-red-500">♥</span> in Korea
          </p>
        </div>
      </div>
    </footer>
  );
}
