import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/context/Provider";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { getAllCategories } from "@/lib/api/blog";
import Footer from "@/components/layout/footer/Footer";
import localFont from 'next/font/local';

// 1. 산세리프 본문용 (Pretendard)
const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

// 2. 코드 블록/모노스페이스용 (D2Coding)
const d2coding = localFont({
  src: './fonts/D2Coding.woff2', // 실제 저장한 파일명 확인
  display: 'swap',
  variable: '--font-d2coding',
});
const BASE_URL = 'https://mink-stud.io';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'MINK-STUD.IO',
    template: '%s | MINK-STUD.IO',
  },
  description:
    '프론트엔드 개발, UI/UX 디자인, 사이드 프로젝트의 구현 과정과 문제 해결을 기록하는 아카이빙 플랫폼입니다.',
  applicationName: 'MINK-STUD.IO',
  authors: [{ name: 'MINK', url: BASE_URL }],
  generator: 'Next.js',
  keywords: [
    'MINK-STUD.IO',
    '프론트엔드',
    'Frontend Developer',
    'UI/UX 디자인',
    'Next.js',
    'React',
    '사이드프로젝트',
    '기술 블로그',
    '개발 아카이브',
    '디자인 시스템',
  ],
  creator: 'MINK',
  publisher: 'MINK',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: 'MINK-STUD.IO',
    title: 'MINK-STUD.IO',
    description:
      '프론트엔드 개발, UI/UX 디자인, 사이드 프로젝트의 구현 과정과 문제 해결을 기록하는 아카이빙 플랫폼입니다.',
    images: [
      {
        url: '/og-image.png', // public/og-image.png 배치 필요
        width: 1200,
        height: 630,
        alt: 'MINK-STUD.IO 대표 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MINK-STUD.IO',
    description:
      '프론트엔드 개발, UI/UX 디자인, 사이드 프로젝트의 구현 과정과 문제 해결을 기록하는 아카이빙 플랫폼입니다.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const res = await getAllCategories();
  if (!res.success) return <div>Fail to get all categories (layout.tsx)</div>
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${pretendard.variable} ${d2coding.variable} w-full min-h-full bg-surface-base antialiased`}
    >
      <body className="font-sans w-full min-h-full flex flex-col">
        <Provider>
          <Header/>
          <div className="w-full min-h-full grow flex flex-row">
            <Sidebar initialCategories={res.data} />
            <main className="grow w-full min-h-full flex flex-col items-center justify-between">
              {children}
              <Footer/>
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
