"use client";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { deletePost } from "@/lib/api/blog";
import { redirect } from "next/navigation";

export default function PostControl({
  postSlug,
  postId,
  authorId,
}: {
  postSlug: string;
  postId: number;
  authorId: string;
}) {
  const { user } = useAuth();
  const handleEditPost = () => {
    redirect(`/blog/write/${postSlug}`);
  };
  const handleDeletePost = async () => {
    if (!confirm("게시글을 삭제하시겠습니까?")) return;
    const deleteRes = await deletePost(postId);
    if (deleteRes.success) redirect(deleteRes.data.goto);
  };
  if (!user || authorId !== user.id) return null;
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
