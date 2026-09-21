'use client';
import { Comment, GoTop } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export default function ScrollController() {
  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const handleGoComments = () => {
    const target = window.document.getElementById("comments");
    if(target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
  }
  return (
    <div className="sticky flex flex-col-reverse lg:flex-row gap-2">
      <div className="w-10 h-10 rounded-md bg-fill-secondary lg:bg-surface-sub">
      <Button variant="border" className="w-10 h-10 rounded-md" onClick={handleGoComments}><Comment/></Button></div>
      <div className="w-10 h-10 rounded-md bg-fill-secondary lg:bg-surface-sub">
      <Button variant="border" className="w-10 h-10 rounded-md" onClick={handleGoTop}><GoTop/></Button></div>
    </div>
  );
}
