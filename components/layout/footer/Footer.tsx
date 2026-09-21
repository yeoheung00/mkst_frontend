import Link from "next/link";
import packageJson from "@/package.json";
import ThemeSelector from "./ThemeSelector";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-default mt-32">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:gap-2 items-center sm:items-baseline">
              <p className="text-h3">MINK-STUD.IO</p>
              <span className="text-sub text-text-secondary">
                v{packageJson.version}
              </span>
            </div>
            <p className="text-sub text-text-secondary text-center sm:text-left">
              실험하고, 개발하고, 기록합니다.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-4 sm:gap-2">
            <nav className="flex flex-wrap gap-4 text-sub text-text-secondary justify-center">
              <Link
                href="/about"
                className="transition-colors hover:text-text-primary"
              >
                About
              </Link>

              <Link
                href="/projects"
                className="transition-colors hover:text-text-primary"
              >
                Projects
              </Link>

              <Link
                href="/blog"
                className="transition-colors hover:text-text-primary"
              >
                Blog
              </Link>

              <a
                href="https://github.com/yeoheung00"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-text-primary"
              >
                GitHub ↗
              </a>
            </nav>

            <ThemeSelector/>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border-default pt-4 sm:flex-row items-center sm:justify-between">
          <p className="text-sub text-text-secondary">© 2026 민경원</p>

          <p className="text-sub text-text-secondary">Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
