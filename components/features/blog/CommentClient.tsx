'use client';
import { Comment, CommentWithReplies, Like } from "@/types";
import CommentItem from "./CommentItem";
import { Session } from "next-auth";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { Comment as CommentIcon, Heart, HeartFill } from "@/components/icons";
import { toggleLike } from "@/lib/api/blog";

export default function CommentClient({ comments, session, postId, likes }: { comments: Comment[]; session: Session | null; postId: number; likes: Like[] }) {
  const [commentsList, setCommentsList] = useState(comments);
  const [likesList, setLikesList] = useState(likes.map((like) => like.userId));
  const commentTree = buildCommentTree(commentsList);
  const handleToggleLike = async() => {
    if (!session || !session.user.id || !session.accessToken) return;
    const toggleLikeState = likesList.includes(session.user.id) ? likesList.filter(id => id !== session.user.id) : [...likesList, session.user.id];
    setLikesList(toggleLikeState);
    const likeRes = await toggleLike(postId, session.accessToken);
    if (!likeRes.success) setLikesList(toggleLikeState);
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <div className="flex gap-1 items-center" onClick={handleToggleLike}>
          {
            session && session.user.id && likesList.includes(session.user.id) ? <HeartFill className="text-red-400" /> : <Heart />
          }
          <span>좋아요 {likesList.length}개</span>
        </div>
        <div className="flex gap-1 items-center">
          <CommentIcon />
          <span className="">댓글 {commentsList.filter(c => c.deletedAt === null).length}개</span>
        </div>
      </div>
      <div className="w-full space-y-4 py-4">
        {commentTree.length > 0 ? commentTree.map((comment) => (
          <CommentItem key={comment.id} session={session} postId={postId} comment={comment} onUpdateAction={setCommentsList} />
        )) : <div className="text-text-secondary text-base text-center">댓글이 없습니다.</div>}
      </div>
      <CommentForm session={session} postId={postId} parentId={null} onUpdateAction={setCommentsList} />
    </div>
  );
}

function buildCommentTree(comments: Comment[]): CommentWithReplies[] {
  const map = new Map<string, CommentWithReplies>();
  const roots: CommentWithReplies[] = [];

  for (const comment of comments) {
    map.set(comment.id.toString(), {
      ...comment,
      replies: [],
    });
  }

  for (const comment of comments) {
    const current = map.get(comment.id.toString());
    if (current) {
      if (comment.parentId) {
        const parent = map.get(comment.parentId.toString());

        if (parent) {
          parent.replies.push(current);
        }
      } else {
        roots.push(current);
      }
    }
  }

  return roots;
}
