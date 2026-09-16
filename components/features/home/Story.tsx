"use client";

import Link from "next/link";

const sections = [
  {
    id: "experiment",
    number: "01",
    title: "저는 실험합니다.",
    description: (
      <>
        저는 평소 호기심이 많은 사람입니다.
        <br />
        궁금한 것이 생기면 탐구하고, 직접 실험하며 원리를 체득합니다.
      </>
    ),
    question: "저에 대해 조금 더 알고 싶으신가요?",
    link: "/about",
    linkText: "About",
  },
  {
    id: "develop",
    number: "02",
    title: "저는 개발합니다.",
    description: (
      <>
        실험을 통해 알게 된 기술과 지식을
        <br />
        작은 프로젝트로 직접 개발해보며 체화합니다.
      </>
    ),
    question: "제가 만든 프로젝트가 궁금하신가요?",
    link: "/projects",
    linkText: "Projects",
  },
  {
    id: "record",
    number: "03",
    title: "저는 기록합니다.",
    description: (
      <>
        인간의 기억은 휘발됩니다.
        <br />
        제 경험이 휘발되지 않도록 기록하고,
        <br />
        다시 꺼내 쓸 수 있는 지식으로 남깁니다.
      </>
    ),
    question: "제가 무엇을 기록하고 있는지 궁금하신가요?",
    link: "/blog",
    linkText: "Blog",
  },
];

export default function HomeStory() {
  return (
    <section className="w-full">
      {sections.map((section) => (
        <article
          key={section.id}
          id={section.id}
          className="flex min-h-screen w-full items-center px-6 py-32 md:px-12 lg:px-24"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col">
            <div className="mb-16 flex items-center gap-4 text-sm text-slate-400 dark:text-slate-500">
              <span>{section.number}</span>
              <span className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
              <span>{section.id.toUpperCase()}</span>
            </div>

            <div className="max-w-4xl">
              <h2 className="text-4xl font-medium tracking-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-slate-100">
                {section.title}
              </h2>

              <p className="mt-8 text-lg leading-9 text-slate-500 md:text-xl md:leading-10 dark:text-slate-400">
                {section.description}
              </p>
            </div>

            <div className="mt-20 flex flex-col items-start gap-5">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                {section.question}
              </p>

              <Link
                href={section.link}
                className="group flex items-center gap-3 text-lg font-medium text-slate-900 dark:text-slate-100"
              >
                <span>{section.linkText}</span>

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
