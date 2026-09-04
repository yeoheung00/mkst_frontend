import { Project } from "@/types/project";

export const DUMMY_PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "portfolio-blog-rebuild",
    title: "개발 블로그 & 포트폴리오 플랫폼",
    summary: "Next.js App Router와 홈 서버 DB 기반의 풀스택 개인 웹 플랫폼",
    description:
      "기술적 깊이와 아키텍처 고민을 기록하기 위한 통합 플랫폼입니다. Express backend와 PostgreSQL, Prisma ORM을 연동하고 홈 서버 환경(Ubuntu/Docker)에서 실시간 운용 중입니다.",
    period: "2026.08 - Present",
    status: "In Progress",
    isFeatured: true,
    order: 1,
    domain: "Engineering", // 👈 Development 대신 Engineering 적용
    devStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Docker",
    ],
    visualStack: ["UI/UX Design", "Figma"],
    githubUrl: "https://github.com/example/portfolio-rebuild",
    blogPostUrl: "/blog/ep0-blog-rebuild-start",
    keyChallenge:
      "Express backend와 Next.js 개발 환경에서 Connection Pool 관리 및 Graceful Shutdown 패턴을 적용하여 DB 커넥션 유실 문제를 해결했습니다.",
  },
  {
    id: "proj-4",
    slug: "manuscript-typing",
    title: "원고지 타자연습",
    summary: "한국어 원고지 격자 레이아웃 인터랙티브 타자 연습 애플리케이션",
    description:
      "원고지 특유의 격자 레이아웃 UI를 직접 디자인하고, 한글 조합형 입력(IME) 연동 엔진을 개발한 웹 서비스입니다.",
    period: "2026.06",
    status: "Completed",
    isFeatured: false,
    order: 2,
    domain: "Visual", // 👈 두 영역 모두 포함되는 프로젝트
    devStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    visualStack: ["Figma", "Editorial Design", "Typography Layout"],
    demoUrl: "https://manuscript-typing.example.com",
    githubUrl: "https://github.com/example/manuscript-typing",
  },
  {
    id: "proj-1",
    slug: "portfolio-blog-rebuild",
    title: "개발 블로그 & 포트폴리오 플랫폼",
    summary: "Next.js App Router와 홈 서버 DB 기반의 풀스택 개인 웹 플랫폼",
    description:
      "기술적 깊이와 아키텍처 고민을 기록하기 위한 통합 플랫폼입니다. Express backend와 PostgreSQL, Prisma ORM을 연동하고 홈 서버 환경(Ubuntu/Docker)에서 실시간 운용 중입니다.",
    period: "2026.08 - Present",
    status: "In Progress",
    isFeatured: true,
    order: 3,
    domain: "Engineering", // 👈 Development 대신 Engineering 적용
    devStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Docker",
    ],
    visualStack: ["UI/UX Design", "Figma"],
    githubUrl: "https://github.com/example/portfolio-rebuild",
    blogPostUrl: "/blog/ep0-blog-rebuild-start",
    keyChallenge:
      "Express backend와 Next.js 개발 환경에서 Connection Pool 관리 및 Graceful Shutdown 패턴을 적용하여 DB 커넥션 유실 문제를 해결했습니다.",
  },
  {
    id: "proj-4",
    slug: "manuscript-typing",
    title: "원고지 타자연습",
    summary: "한국어 원고지 격자 레이아웃 인터랙티브 타자 연습 애플리케이션",
    description:
      "원고지 특유의 격자 레이아웃 UI를 직접 디자인하고, 한글 조합형 입력(IME) 연동 엔진을 개발한 웹 서비스입니다.",
    period: "2026.06",
    status: "Completed",
    isFeatured: false,
    order: 4,
    domain: "Engineering", // 👈 두 영역 모두 포함되는 프로젝트
    devStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    visualStack: ["Figma", "Editorial Design", "Typography Layout"],
    demoUrl: "https://manuscript-typing.example.com",
    githubUrl: "https://github.com/example/manuscript-typing",
  },
  {
    id: "proj-1",
    slug: "portfolio-blog-rebuild",
    title: "개발 블로그 & 포트폴리오 플랫폼",
    summary: "Next.js App Router와 홈 서버 DB 기반의 풀스택 개인 웹 플랫폼",
    description:
      "기술적 깊이와 아키텍처 고민을 기록하기 위한 통합 플랫폼입니다. Express backend와 PostgreSQL, Prisma ORM을 연동하고 홈 서버 환경(Ubuntu/Docker)에서 실시간 운용 중입니다.",
    period: "2026.08 - Present",
    status: "In Progress",
    isFeatured: true,
    order: 5,
    domain: "Engineering", // 👈 Development 대신 Engineering 적용
    devStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Docker",
    ],
    visualStack: ["UI/UX Design", "Figma"],
    githubUrl: "https://github.com/example/portfolio-rebuild",
    blogPostUrl: "/blog/ep0-blog-rebuild-start",
    keyChallenge:
      "Express backend와 Next.js 개발 환경에서 Connection Pool 관리 및 Graceful Shutdown 패턴을 적용하여 DB 커넥션 유실 문제를 해결했습니다.",
  },
  {
    id: "proj-4",
    slug: "manuscript-typing",
    title: "원고지 타자연습",
    summary: "한국어 원고지 격자 레이아웃 인터랙티브 타자 연습 애플리케이션",
    description:
      "원고지 특유의 격자 레이아웃 UI를 직접 디자인하고, 한글 조합형 입력(IME) 연동 엔진을 개발한 웹 서비스입니다.",
    period: "2026.06",
    status: "Completed",
    isFeatured: false,
    order: 6,
    domain: "Engineering", // 👈 두 영역 모두 포함되는 프로젝트
    devStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    visualStack: ["Figma", "Editorial Design", "Typography Layout"],
    demoUrl: "https://manuscript-typing.example.com",
    githubUrl: "https://github.com/example/manuscript-typing",
  },
];
