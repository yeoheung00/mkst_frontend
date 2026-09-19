import PostViewer from "@/components/features/blog/PostViewer";
import { formatRelativeDate } from "@/lib/util";
import Link from "next/link";
import CommentSection from "@/components/features/blog/CommentSection";
import { getPost, deletePost } from "@/lib/api/blog";
import { TocItem, Post } from "@/types";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import PostControl from "@/components/features/blog/PostControl";
import { LinkButton } from "@/components/ui/LinkButton";

interface Props {
  params: Promise<{
    categorySlug: string;
    postSlug: string;
  }>;
}

export default async function BlogCategoryPost({ params }: Props) {
  const session = await auth();
  const { categorySlug, postSlug } = await params;
  const postRes = await getPost(postSlug);
  if (!postRes.success) return <div>Get post failed</div>;
  const post = postRes.data as Post;
  return (
    <div className="w-full flex flex-row items-stretch justify-center gap-4 px-4">

      {/* post content */}
      <div className="grow max-w-3xl space-y-4 py-4">

        {/* header */}
        <div className="w-full space-y-2 pb-2 border-b border-border-default">
          <Link href={`/blog/${categorySlug}`} className="block text-h4 font-light">{post.category.name}</Link>
          {/* title */}
          <h1 className="text-h1">{post.title}</h1>

          {/* meta & controls */}
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <span className="text-sub text-text-secondary">
                {formatRelativeDate(post.createdAt)}
                {post.createdAt !== post.updatedAt && ` (수정 ${formatRelativeDate(post.updatedAt)})`}
              </span>
            </div>
            {session && post.author.id === session.user.id && session.accessToken && <PostControl token={session.accessToken} postSlug={postSlug} postId={post.id} categorySlug={categorySlug} />}
          </div>
        </div>

        {/* content */}
        <PostViewer content={post.content} />

        {/* comments */}
        <Suspense fallback={<CommentSkeleton />}>
          <CommentSection postId={post.id} />
        </Suspense>
      </div>

      {/* toc */}
      <div className="hidden lg:block w-56 shrink-0">
        <Toc toc={post.toc} />
      </div>
    </div>
  );
}

function Toc({ toc }: { toc: TocItem[] }) {
  return (
    <div className="w-full sticky top-20 mt-56 p-4 flex flex-col bg-surface-sub rounded-xl border border-border-default">
      <span className="text-lg font-semibold mb-2">On this Page</span>
      {toc.map((item, index) => (
        <Link
          key={index}
          className={
            item.level === 3
              ? "pl-4 text-text-secondary font-normal"
              : "font-medium"
          }
          href={`#${item.id}`}
        >
          {item.text}
        </Link>
      ))}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <section className="w-full h-fit py-8 text-center text-base">
      댓글 조회중...
    </section>
  )
}
