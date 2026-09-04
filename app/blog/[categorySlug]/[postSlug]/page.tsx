import PostViewer from "@/components/features/blog/PostViewer";
import { formatRelativeDate } from "@/lib/util";
import Link from "next/link";
import CommentSection from "@/components/features/blog/CommentSection";
import { getPost } from "@/lib/api/blog";
import { TocItem, Post } from "@/types";

interface Props {
  params: Promise<{
    categorySlug: string;
    postSlug: string;
  }>;
}

export default async function BlogCategoryPost({ params }: Props) {
  const { categorySlug, postSlug } = await params;
  const postRes = await getPost(postSlug);
  if (!postRes.success) return <div>Get post failed</div>;
  const post = postRes.data as Post;
  return (
    <div className="flex flex-row items-stretch w-full max-w-7xl gap-4 px-4">
      <div className="grow flex flex-col gap-8 py-4 xl:py-16">
        <div className="flex flex-row items-center h-8 gap-2 text-md font-light text-text-secondary">
          <Link className="hover:text-text-primary" href="/">
            Home
          </Link>
          <span>/</span>
          <Link
            className="hover:text-text-primary"
            href={`/blog/${categorySlug}`}
          >
            {post.category.name}
          </Link>
          <span>/</span>
          <span>{post.title}</span>
        </div>
        <div className="h-16 flex flex-col justify-between">
          <h1 className="text-4xl font-semibold">{post.title}</h1>
          <span className="text-sm text-text-secondary">
            {formatRelativeDate(post.createdAt)}
            {post.createdAt !== post.updatedAt &&
              `(수정 ${formatRelativeDate(post.updatedAt)})`}
          </span>
        </div>
        <span className="w-full h-px bg-border-default" />
        <PostViewer content={post.content} />
        <span className="w-full h-px bg-border-default" />
        <CommentSection initialComments={post.comments} />
      </div>
      <div className="hidden xl:block w-56 shrink-0">
        <Toc toc={post.toc} />
      </div>
    </div>
  );
}

function Toc({ toc }: { toc: TocItem[] }) {
  return (
    <div className="w-full sticky top-20 mt-56 p-4 flex flex-col bg-surface-sub rounded-2xl">
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
