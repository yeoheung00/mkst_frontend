import { getCategoryBySlug, getPosts } from "@/lib/api/blog";
import PostItem from "@/components/features/blog/PostItem";
import { auth } from "@/auth";
import { LinkButton } from "@/components/ui/LinkButton";
import { getRole } from "@/lib/api/auth";

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
    <div className="max-w-4xl w-full flex flex-col gap-4 py-4 xl:py-16">
      <div className="flex justify-between px-4">
        <div className="flex flex-row gap-4 items-baseline">
          <h1 className="text-h1 font-semibold">{category.name}</h1>
          <span className="text-sub text-text-secondary">
            게시글 {posts.length}개
          </span>
        </div>
        {session && role === "ADMIN" && <LinkButton href="/blog/write/new" variant="primary" size="sm">
          글쓰기
        </LinkButton>}
      </div>
      <div>
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
