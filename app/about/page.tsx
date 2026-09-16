import {
  Book,
  Box,
  Layers,
  Mail,
  Sparkle,
  Work,
} from "@/components/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import Tag, { TagColor } from "@/components/ui/Tag";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { getSortedProjects } from "@/lib/util";
import ProjectGrid from "@/components/features/projects/ProjectGrid";
import Link from "next/link";

export default function About() {
  interface WhatIDoItem {
    title: string;
    description: string;
  }
  const whatIDo: WhatIDoItem[] = [
    {
      title: "Build interfaces",
      description: "사용자가 직접 경험하는 인터페이스를 설계하고 구현합니다.",
    },
    {
      title: "Connect the stack",
      description:
        "프론트엔드에서 API, 데이터베이스까지 연결해 실제 동작하는 서비스를 구현합니다.",
    },
    {
      title: "Think about interaction",
      description:
        "시각디자인 전공을 바탕으로 사용자 경험을 최우선으로 생각하는 시각적 디자인과 상호작용을 설계합니다.",
    },
    {
      title: "Explore by building",
      description:
        "새로운 기술을 작은 프로젝트로 직접 구현하며 원리를 이해합니다.",
    },
  ];

  interface ExperienceItem {
    title: string;
    subtitle: string;
    description?: string;
    details?: DetailItem[];
    period: string;
  }
  interface DetailItem {
    title: string;
    description?: string;
  }
  const experiences: ExperienceItem[] = [
    {
      title: "프리랜서 웹 개발",
      subtitle: "개인 프로젝트 및 외주 개발",
      description:
        "웹 서비스를 직접 설계하고 개발하며 프론트엔드를 중심으로 백엔드, 데이터베이스, 서버 환경까지 폭넓게 다루고 있습니다.",
      period: "2025.12 ~ PRESENT",
    },
    {
      title: "대한민국 육군 장교",
      subtitle: "국립공주대학교 ROTC 62기 (예비역 중위)",
      details: [
        {
          title: "미디어 제작 지원",
          description:
            "신임장교 지휘참모과정 중 소대전투종합훈련 전체 과정 촬영 및 편집(보안상 공개제한).",
        },
        {
          title: "정예 소대 지휘 및 부대 관리",
          description:
            "8명 규모의 소대원 지휘, 소대 장비 관리, 작전 수행 및 부대 운영 총괄.",
        },
        {
          title: "자기주도적 역량 강화 & 교관 자격 확보",
          description:
            "근접전투 교관교육 이수 및 전투부상자처치(TCCC) 부대교관교육 수석 수료.",
        },
        {
          title: "주요 성과",
          description:
            "37사단 최정예 기동팀 우승, 2작전사 도시지역작전 탑팀 우승, 제3회 K-ICTC에 2작전사 대표팀으로 참가",
        },
        {
          title: "대표 상훈",
          description:
            "2025년 육군 최정예 소대 선발(육군참모총장 상장: 2025.12)",
        },
      ],
      period: "2024.03 ~ 2026.06",
    },
    {
      title: "대학 학과 졸업전시 위원",
      subtitle: "온라인 전시 팀장 & 웹 개발자",
      details: [
        {
          title: "온라인 졸업전시 웹사이트 기획/개발 총괄",
          description: "온라인 전시 웹 시스템 프론트엔드 제작 및 서비스 운영.",
        },
        {
          title: "다중 프로젝트 & 데드라인 완수",
          description:
            "졸업작품 제작, 학과 과업, 지도교수 산하 웹 프로젝트, 임관 평가 등 고밀도 일정 속 팀 리딩 및 최종 배포 성공.",
        },
      ],
      period: "2023.03 ~ 2023.12",
    },
    {
      title: "학과 지도교수 산하 웹 프로젝트",
      subtitle: "학부 개발자",
      details: [
        {
          title: "클라이언트 요구사항 대응",
          description:
            "지도교수 요청에 따른 인터랙티브 포스터 웹 앱 개발 및 피드백/수정 반영.",
        },
        {
          title: "공로 인정",
          description:
            "과업 병행 속 완수 공로를 인정받아 학과 '교수회 장학금' 수혜.",
        },
      ],
      period: "2023.09 ~ 2023.10",
    },
  ];

  interface SkillItem {
    title: string;
    items: string[];
    color: TagColor;
  }
  const skills: SkillItem[] = [
    {
      title: "Languages",
      items: [
        "TypeScript",
        "JavaScript",
        "Java",
        "Kotlin",
        "Python",
        "HTML/CSS",
      ],
      color: "gray",
    },
    {
      title: "Frontend",
      items: ["React", "Next.js (App Router)", "Tailwind CSS", "Android"],
      color: "blue",
    },
    {
      title: "Backend",
      items: ["Node.js", "Express", "Prisma", "PostgreSQL", "Socket.io"],
      color: "blue",
    },
    {
      title: "Visual",
      items: [
        "Figma",
        "Illustrator",
        "Photoshop",
        "Premiere Pro",
        "After Effects",
        "Blender",
        "Indesign",
      ],
      color: "purple",
    },
  ];

  const projects = getSortedProjects(
    PROJECTS.filter((project) => project.isFeatured),
  );
  return (
    <div className="w-full max-w-4xl space-y-16 px-4 pt-8 lg:pt-16">
      {/* Profile summary */}
      <section className="flex flex-col lg:flex-row-reverse items-center gap-8">
        <Image
          src="/profile.jpg"
          alt="/profile.jpg"
          width="512"
          height="512"
          className="shrink-0 w-42 h-42 overflow-hidden flex items-center justify-center bg-surface-card rounded-3xl border-2 border-border-default"
        />
        <div className="space-y-4">
          <h1 className="text-h1">
            안녕하세요,{" "}
            <span className="font-extrabold text-primary-base">민경원</span>
            입니다.
          </h1>
          <p className="text-base">
            시각디자인을 전공하고 웹 개발을 직접 공부하며, 디자인과 개발을 함께
            이해하는 프론트엔드 개발자를 지향하고 있습니다.
            <br />
            프론트엔드를 중심으로 웹 서비스를 개발하며, 필요에 따라 백엔드와
            데이터베이스까지 직접 구현합니다. 새로운 기술도 작은 프로젝트로 직접
            만들어보며 이해하는 방식을 좋아합니다.
          </p>

          <div className="w-full flex gap-4">
            <LinkButton
              href="https://github.com/yeoheung00"
              target="_blank"
              variant="primary"
              size="md"
              className="max-lg:flex-1"
            >
              Github ↗
            </LinkButton>
            <LinkButton
              href="#readmore"
              variant="ghost"
              size="md"
              className="max-lg:flex-1"
            >
              더 알아보기 ↓
            </LinkButton>
          </div>
        </div>
      </section>

      {/* What I do? */}
      <section className="space-y-4" id="readmore">
        <SectionTitle>
          <Layers />
          What I do
        </SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-lg:ml-2.75 max-lg:pl-4 border-l-2 lg:border-none border-border-default">
          {whatIDo.map((item, index) => (
            <div
              key={index}
              className="space-y-2 lg:border border-border-default lg:p-4 rounded-xl"
            >
              <h3 className="text-h3">{item.title}</h3>
              <p className="text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <SectionTitle>
          <Work />
          Experience
        </SectionTitle>
        <div className="space-y-4">
          {experiences.map((item, index) => (
            <div key={index} className="">
              <div className="text-base text-text-secondary font-mono">
                {item.period}
              </div>
              <div className="border-l-2 ml-2 pl-2 pt-2 border-border-default space-y-2">
                <div className="flex items-baseline flex-col sm:flex-row">
                  <h3 className="text-h3 pr-2">{item.title}</h3>
                  <p className="text-sub text-text-secondary">
                    {item.subtitle}
                  </p>
                </div>
                <p className="text-base">{item.description}</p>
                {item.details && item.details.length > 0 && (
                  <ul>
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>
                        <span className="text-h4">{detail.title}: </span>
                        <span className="text-base">{detail.description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-4">
        <SectionTitle>
          <Box />
          Featured Projects
        </SectionTitle>
        <ProjectGrid projects={projects} maxCols={2} />
        <p className="text-base mt-8 text-center">
          더 많은 프로젝트가 궁금하시다면
          <Link href="/projects" className="text-primary-base ml-2">
            View All ↗
          </Link>
        </p>
      </section>

      {/* Skills & Tooling */}
      <section className="space-y-4">
        <SectionTitle>
          <Sparkle /> Skills & Tooling
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-h3">{skill.title}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, itemIndex) => (
                  <Tag key={itemIndex} color={skill.color} size="md">
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My Story */}
      <section className="space-y-4">
        <SectionTitle>
          <Book />
          My Story
        </SectionTitle>
        <p className="text-base">
          마인크래프트 확장프로그램을 만들고 싶었던{" "}
          <span className="font-semibold">중학생 개발자</span>에서 사용자 경험을
          공부하는 <span className="font-semibold">시각디자인 전공생</span>.
          잠시 국가를 위해 <span className="font-semibold">군인</span>이었던,
          그리고 다시 <span className="font-semibold">개발자</span>로 돌아온
          저의 이야기가 궁금하시다면
        </p>
        <div className="flex justify-start">
          <LinkButton href="/blog/post/temp" variant="primary" size="md">
            Read More ↗
          </LinkButton>
        </div>
      </section>

      <div className="w-full h-px bg-border-default"></div>

      <section className="space-y-4 flex flex-col items-center">
        <SectionTitle>함께 만들어보고 싶다면</SectionTitle>
        <p className="text-base">
          웹 개발, 프로젝트, 협업과 관련된 이야기를 나누고 싶다면 편하게
          연락해주세요.
        </p>
        <LinkButton
          href="mailto:yeoheung27@naver.com"
          tooltip="yeoheung27@naver.com"
          variant="primary"
          size="md"
          leftIcon={<Mail />}
        >
          Get In Touch
        </LinkButton>
      </section>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-h2 flex items-center gap-2">{children}</h2>;
}
