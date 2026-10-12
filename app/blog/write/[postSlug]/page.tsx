import { getAllCategories } from "@/lib/api/blog";
import PostClient from "@/components/features/blog/PostClient";
import { getPost } from "@/lib/api/blog";
import { Post } from "@/types";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default async function Write({
  params,
}: {
  params: Promise<{ postSlug: string }>;
}) {
  const { postSlug } = await params;
  let post: Post | null;
  if (postSlug === "new") {
    post = null;
  } else {
    const postRes = await getPost(postSlug);
    post = postRes.success ? postRes.data : null;
  }
  const allCategories = await getAllCategories();
  if (!allCategories.success || !allCategories.data)
    return <div>Get category error</div>;
  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <div className="w-full flex flex-col items-center">
        <PostClient
          categories={allCategories.data}
          post={post}
        />
      </div>
    </AuthGuard>
  );
}
