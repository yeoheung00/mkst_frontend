import { formatRelativeDate } from "@/lib/util";
import { PostSummary } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function PostItem({ post }: { post: PostSummary }) {
  const hasImage = post.images.length > 0;
  return (
    <Link
      href={`/blog/${post.category.slug}/${post.slug}`}
      className="group w-full bg-surface-card border border-border-default rounded-xl overflow-hidden"
    >
      {/* content */}
      <div className="w-full h-32 flex items-center gap-4 p-4 border-b border-border-default">
        {/* text */}
        <div className="w-full h-full flex flex-col justify-between">
          <h2 className="text-h2 text-text-primary group-hover:text-primary-base">
            {post.title}
          </h2>
          <p className="line-clamp-2 text-base text-text-secondary">
            {post.summary}
          </p>
        </div>
        {/* image */}
        {hasImage && (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-surface-sub border border-border-default">
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}${post.images[0].url}`}
              alt="썸네일"
              fill
              sizes="94px"
              className="object-cover"
            />
          </div>
        )}

      </div>

      {/* meta */}
      <div className="flex items-center gap-2 text-sub text-text-secondary p-2 bg-fill-secondary">
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
    </Link>
  );
}
