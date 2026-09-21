"use client";
import Logo from "@/components/commons/logo";
import { Hamburger } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./Search";
import SearchModal from "./SearchModal";
import { useSidebar } from "@/context/SidebarProvider";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const { setIsOpen } = useSidebar();
  const path = usePathname();
  const [isSearch, setIsSearch] = useState(false);
  const isSearchRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // 브라우저 기본 단축키 동작 방지
        setIsSearch(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearch && !isSearchRef.current) {
      window.history.pushState({ modal: "search" }, "", path);
      isSearchRef.current = true;
    }
    const handlePopState = () => {
      if (isSearchRef.current) {
        isSearchRef.current = false;
        setIsSearch(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isSearch, path]);

  const handleClose = () => {
    if (isSearchRef.current) {
      isSearchRef.current = false;
      window.history.back(); // 가짜 히스토리 제거
    }
    setIsSearch(false);
  };

  const handleItemSelect = () => {
    isSearchRef.current = false; // 플래그만 해제
    setIsSearch(false); // 모달 언마운트
  };

  return (
    <>
      <header
        className={`w-full h-16 p-4 flex flex-row justify-between sticky top-0 z-10 ${path !== "/" ? "bg-surface-sub" : "backdrop-blur-sm"} border-border-default border-b`}
      >
        <div className="h-full w-fit flex flex-row gap-4 items-center">
          <ToggleSidebar />
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex flex-row items-center gap-2"
          >
            <Logo size="24px" />
            <span className="font-black text-h2">MINK-STUD.IO</span>
          </Link>
        </div>
        <Search onSearchAction={() => setIsSearch(true)} />
      </header>
      {isSearch && (
        <SearchModal
          onCloseAction={handleClose}
          onItemSelectAction={handleItemSelect}
        />
      )}
    </>
  );
}

function ToggleSidebar() {
  const { setIsOpen, setIsExpanded } = useSidebar();
  return (
    <div>
      <div className="flex md:hidden w-8 h-8">
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          variant="ghost"
          className="w-full h-full rounded-md"
        >
          <Hamburger />
        </Button>
      </div>
      <div className="hidden md:flex w-8 h-8">
        <Button
          onClick={() => setIsExpanded((prev) => !prev)}
          variant="ghost"
          className="w-full h-full rounded-md"
        >
          <Hamburger />
        </Button>
      </div>
    </div>
  );
}
