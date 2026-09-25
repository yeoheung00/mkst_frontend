import { getCategoryBySlug, getPosts } from "@/lib/api/blog";
import PostItem from "@/components/features/blog/PostItem";
import { auth } from "@/auth";
import { LinkButton } from "@/components/ui/LinkButton";
import { getRole } from "@/lib/api/auth";
import { PostSummary } from "@/types";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export default async function BlogCategory({ params }: Props) {
  const session = await auth();
  const role = await getRole(session);
  const { categorySlug } = await params;
  const categoryRes = categorySlug === "all" ? { data: { name: "All Posts" }, success: true, error: null } : await getCategoryBySlug(categorySlug);
  const postsRes = await getPosts(categorySlug);
  if (!postsRes.success || !categoryRes.success)
    return (
      <div>
        {!postsRes.success && postsRes.error}
        <br />
        {!categoryRes.success && categoryRes.error}
      </div>
    );
  const category = categoryRes.data;
  const posts = postsRes.data;
  return (
    <div className="w-full p-4 space-y-6">
      <div className="flex justify-between">
        <div className="flex gap-4 items-baseline">
          <h1 className="text-h1 font-semibold">{category.name}</h1>
          <span className="text-sub text-text-secondary">
            {posts.length} posts
          </span>
        </div>
        {session && role === "ADMIN" && <LinkButton href="/blog/write/new" variant="primary" size="sm">
          글쓰기
        </LinkButton>}
      </div>
      <PostGrid posts={posts} />
    </div>
  );
}

function PostGrid({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="grid gap-x-4 gap-y-4 lg:gap-y-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  );
}
