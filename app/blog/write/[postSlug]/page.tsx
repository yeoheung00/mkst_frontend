import { getAllCategories } from "@/lib/api/blog"
import PostClient from "@/components/features/blog/PostClient";
import { auth } from "@/auth";
import { getRole } from "@/lib/api/auth";
import { redirect } from "next/navigation";
import { getPost } from "@/lib/api/blog";
import { Post } from "@/types";

export default async function Write({ params }: { params: Promise<{ postSlug: string }> }) {
  const { postSlug } = await params;
  const session = await auth();
  const role = await getRole(session);
  if (!role || role !== "ADMIN") {
    redirect("/");
  }
  let post: Post | null;
  if (postSlug === "new") {
    post = null;
  } else {
    const postRes = await getPost(postSlug);
    post = postRes.success ? postRes.data : null;
  }
  const allCategories = await getAllCategories();
  if(!allCategories.success || !allCategories.data) return <div>Get category error</div>
  return (
    <div className="w-full flex flex-col items-center">
      <PostClient categories={allCategories.data} session={ session } post={post} />
    </div>
  )
}
