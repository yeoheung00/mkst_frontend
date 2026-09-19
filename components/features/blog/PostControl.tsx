"use client";

import { Button } from "@/components/ui/Button";
import { deletePost } from "@/lib/api/blog";
import { redirect } from "next/navigation";

export default function PostControl({
  token,
  postSlug,
  postId,
  categorySlug,
}: {
  token: string;
  postSlug: string;
  postId: string;
  categorySlug: string;
}) {
  const handleEditPost = () => {
    redirect(`/blog/write/${postSlug}`);
  };
  const handleDeletePost = async () => {
    if (!token) return;
    if(!confirm("게시글을 삭제하시겠습니까?")) return;
    const deleteRes = await deletePost(postId, token);
    if (deleteRes.success) redirect(deleteRes.data.goto);
  };
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" onClick={handleEditPost}>
        수정
      </Button>
      <Button variant="ghost" size="sm" onClick={handleDeletePost}>
        삭제
      </Button>
    </div>
  );
}
