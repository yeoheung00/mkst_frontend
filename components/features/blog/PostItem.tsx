import { formatRelativeDate } from "@/lib/util";
import { PostSummary } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function PostItem({ post }: { post: PostSummary }) {
  const hasImage = post.images.length > 0;
  return (
    <Link
      href={`/blog/${post.category.slug}/${post.slug}`}
      className="group flex flex-col w-full items-center px-4 hover:bg-surface-sub"
    >
      <span className="w-full h-px bg-border-default" />
      <div className="w-full h-24 xl:h-32 flex flex-row items-center gap-2 xl:gap-4 py-2 xl:py-4">
        <div className="w-full h-full flex flex-col justify-between">
          <h2 className="truncate text-h2 text-text-primary group-hover:text-primary-base">
            {post.title}
          </h2>
          <p className="line-clamp-1 xl:line-clamp-2 text-base text-text-secondary">
            {post.summary}
          </p>
          <div className="flex items-center gap-2 text-sub text-text-secondary">
            <span className="font-semibold text-text-primary">
              {post.category.name}
            </span>
            <span>•</span>
            <span>
              {formatRelativeDate(post.createdAt)}{" "}
              {post.createdAt !== post.updatedAt &&
                `(수정 ${formatRelativeDate(post.updatedAt)})`}
            </span>
            <span>•</span>
            <span>좋아요 {post._count.likes}</span>
            <span>•</span>
            <span>댓글 {post._count.comments}</span>
          </div>
        </div>
        {hasImage && (
          <div className="relative h-20 xl:h-24 w-20 xl:w-24 shrink-0 overflow-hidden rounded-md bg-surface-sub border border-border-default">
            <Image
              src={post.images[0].url}
              alt="썸네일"
              fill
              sizes="94px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
