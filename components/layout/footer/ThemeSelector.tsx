'use client';
import { useTheme } from "next-themes";
import { Light, Dark, System } from "@/components/icons";
import { useEffect, useState } from "react";
export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

    const style = (data: string) => `cursor-pointer w-8 h-8 rounded-full flex justify-center items-center ${data === theme ? "bg-surface-subest border border-border-default" : ""}`;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-1 flex justify-center items-center border border-border-default rounded-full"><span className="block w-26 h-8 leading-8 text-center text-text-secondary text-sub">Loading...</span></div>;

  return (
    <div className="flex flex-row h-full w-fit items-center p-1 border border-border-default rounded-full gap-1">
      <button className={style("light")} onClick={()=>setTheme("light")}><Light/></button>
      <button className={style("dark")} onClick={()=>setTheme("dark")}><Dark/></button>
      <button className={style("system")} onClick={()=>setTheme("system")}><System/></button>
    </div>
  );
};
