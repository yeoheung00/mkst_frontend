"use client";
import { Button } from "@/components/ui/Button";
import { useSidebar } from "@/context/SidebarProvider";
import { Category } from "@/types/blog";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { signIn, signOut } from "next-auth/react";
import {
  About,
  Box,
  QuillPen,
  DirectionDown,
  User,
  Signout,
} from "@/components/icons";

interface Props {
  session: Session | null;
  initialCategories: Category[];
}

export default function Sidebar({ session, initialCategories }: Props) {
  const { isOpen, isExpanded } = useSidebar();
  return (
    <aside
      className={`
      /* narrow */
      w-full
      fixed
      max-xl:h-full
      ${isOpen ? "left-0" : "-left-full"}

      /* wide */
      xl:left-0
      xl:sticky
      xl:h-[calc(100vh-64px)]
      xl:border-border-default
      xl:border-r
      xl:shrink-0
      ${isExpanded ? "xl:w-64" : "xl:w-16"}

      /* common */
      top-16 z-20 transition-[width,left] duration-300 ease-in-out`}
    >
      <div className="w-full min-h-full bg-surface-sub flex flex-col xl:flex-col-reverse xl:justify-between">
        <UserLink session={session} />
        <div className="flex flex-col xl:gap-2 p-4">
          <LinkItem href="/about" value="About">
            <About />
          </LinkItem>
          <LinkItem href="/projects" value="Projects">
            <Box />
          </LinkItem>
          <BlogLinks initialCategories={initialCategories} />
        </div>
      </div>
    </aside>
  );
}

function UserLink({ session }: { session: Session | null }) {
  const { isExpanded } = useSidebar();
  return (
    <div className="w-full h-16 p-4 flex flex-row gap-2 items-center justify-between overflow-hidden">
      <Link href="/user" className="group flex flex-row items-center gap-2">
        <div className="w-8 h-8 shrink-0 border border-border-default bg-surface-subest rounded-full overflow-hidden flex items-center justify-center">
          {session ? (
            <Image
              src={session.user.image ?? ""}
              width={32}
              height={32}
              sizes="32px"
              alt="User"
            />
          ) : (
            <User />
          )}
        </div>
        <span
          className={`shrink-0 group-hover:underline grow text-base ${isExpanded ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}
        >
          {session ? (session.user.name ?? "") : "비회원"}
        </span>
      </Link>
      <div
        className={`${isExpanded ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}
      >
        {session ? (
          <Button
            onClick={() => signOut()}
            variant="ghost"
            className="rounded-md w-8 h-8"
          >
            <Signout />
          </Button>
        ) : (
          <Button
            onClick={() => signIn("google")}
            variant="border"
            className="rounded-md h-8 px-2"
          >
            로그인
          </Button>
        )}
      </div>
    </div>
  );
}

interface LinkItemProps {
  href: string;
  value: string;
  children: React.ReactNode;
}

function LinkItem({ href, value, children }: LinkItemProps) {
  const { isExpanded, setIsOpen } = useSidebar();
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className={`w-full h-8 flex flex-row gap-2 items-center  hover:text-primary-base text-base rounded-md overflow-hidden ${isActive ? "bg-surface-subest text-primary-base" : "text-text-primary"}`}
    >
      <div className="w-8 h-8 flex shrink-0 items-center justify-center">
        {children}
      </div>
      <span
        className={`${isExpanded ? "opacity-100" : "opacity-100 xl:opacity-0"} transition-opacity duration-300 ease-in-out`}
      >
        {value}
      </span>
    </Link>
  );
}

function BlogLinks({ initialCategories }: { initialCategories: Category[] }) {
  const { isExpanded, setIsOpen } = useSidebar();
  const [isDowned, setisDowned] = useState(true);
  const href = "/blog";
  const path = usePathname();
  console.log("[asdf]", href, path);
  const isActive = path.startsWith("/blog");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/categories`,
    fetcher,
    {
      fallbackData: initialCategories,
      refreshInterval: 10000, // 10초마다 자동 최신화
      revalidateOnFocus: true, // 탭 다시 활성화 시 최신화
    },
  );
  const categories = data as Category[];
  return (
    <div className="flex flex-col relative">
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={`w-full h-8 flex flex-row gap-2 items-center  hover:text-primary-base text-base rounded-md overflow-hidden ${path === href || (isActive && !isDowned) || (!isExpanded && isActive) ? "bg-surface-subest text-primary-base" : "text-text-primary"}`}
      >
        <div className="w-8 h-8 flex shrink-0 items-center justify-center">
          <QuillPen />
        </div>
        <span
          className={`${isExpanded ? "opacity-100" : "opacity-100 xl:opacity-0"} transition-opacity duration-300 ease-in-out`}
        >
          Blog
        </span>
      </Link>
      <Button
        variant="ghost"
        onClick={() => setisDowned((prev) => !prev)}
        className={`absolute w-8 h-8 top-0 right-0 rounded-md ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300 ease-in0-out`}
      >
        <div
          className={`${isDowned && "-rotate-180"} transition-transform duration-300 ease-in-out`}
        >
          <DirectionDown />
        </div>
      </Button>
      <div
        className={`w-full overflow-hidden transition-[height] duration-150 ease-in-out`}
        style={{
          height: isExpanded
            ? isDowned
              ? `${categories.length * 32}px`
              : "0px"
            : "0px",
        }}
      >
        {categories.map((category, index) => (
          <CategoryItem key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

function CategoryItem({ category }: { category: Category }) {
  const { setIsOpen } = useSidebar();
  const path = usePathname();
  const isActive = decodeURIComponent(path.split("/")[2]) === category.slug;
  return (
    <Link
      href={`/blog/${category.slug}`}
      onClick={() => setIsOpen(false)}
      className={`flex flex-row shrink-0 gap-2 rounded-md items-center ${isActive && "bg-surface-subest"}`}
    >
      <div className="w-8 h-8 flex shrink-0 justify-center items-center">
        <span className="bg-border-default w-0.5 h-8" />
      </div>
      <span
        className={`shrink-0 ${isActive ? "text-primary-base" : "text-text-secondary"} text-base`}
      >
        {category.name}
      </span>
    </Link>
  );
}
