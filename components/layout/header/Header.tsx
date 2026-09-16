'use client'
import Logo from "@/components/commons/logo";
import { useSidebar } from "@/context/SidebarProvider";
import {Hamburger} from "@/components/icons";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import ThemeSelector from "./ThemeSelector";
import { usePathname } from "next/navigation";


export default function Header() {
  const { setIsOpen } = useSidebar();
  const path = usePathname();
  return (
    <header className={`w-full h-16 p-4 flex flex-row justify-between sticky top-0 z-10 ${path !== "/" ? "bg-surface-sub" : "backdrop-blur-sm"} border-border-default border-b`}>
      <div className="h-full w-fit flex flex-row gap-4 items-center">
        <ToggleSidebar />
        <Link href="/" onClick={()=>setIsOpen(false)} className="flex flex-row items-center gap-2">
          <Logo size="24px" />
          <span className="font-black text-h2">MINK-STUD.IO</span>
        </Link>
      </div>
      <ThemeSelector/>
    </header>
  )
}

function ToggleSidebar() {
  const { setIsOpen, setIsExpanded } = useSidebar();
  return (
    <div>
      <div className="flex md:hidden w-8 h-8">
        <Button
          onClick={()=>setIsOpen((prev)=>!prev)}
          variant="ghost"
          className="w-full h-full rounded-md">
          <Hamburger/>
        </Button>
      </div>
      <div className="hidden md:flex w-8 h-8">
        <Button
          onClick={()=>setIsExpanded((prev)=>!prev)}
          variant="ghost"
          className="w-full h-full rounded-md">
          <Hamburger/>
        </Button>
      </div>
    </div>
  )
}
