import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {Light, Dark, System} from "@/components/icons";
export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => { setMounted(true) }, []);

  if (!mounted) return <></>;

  return (
    <div className="flex flex-row gap-2 h-full w-fit items-center">
      <button className={`${theme === 'light' ? 'font-black' : ''}`} onClick={()=>setTheme("light")}><Light/></button>
      <button className={`${theme === 'dark' ? 'font-black' : ''}`} onClick={()=>setTheme("dark")}><Dark/></button>
      <button className={`${theme === 'system' ? 'font-black' : ''}`} onClick={()=>setTheme("system")}><System/></button>
    </div>
  );
};
