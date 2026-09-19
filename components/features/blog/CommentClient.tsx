'use client';
import { Comment, CommentWithReplies } from "@/types";
import CommentItem from "./CommentItem";
import { Session } from "next-auth";
import { useState } from "react";
import CommentForm from "./CommentForm";

export default function CommentClient({ comments, session, postId }: { comments: Comment[]; session: Session | null; postId: string }) {
  const [commentsList, setCommentsList] = useState(comments);
  const commentTree = buildCommentTree(commentsList);
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-text-secondary text-sub">댓글 {commentsList.filter(c => c.deletedAt === null).length}개</span>
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
    map.set(comment.id, {
      ...comment,
      replies: [],
    });
  }

  for (const comment of comments) {
    const current = map.get(comment.id);
    if (current) {
      if (comment.parentId) {
        const parent = map.get(comment.parentId);

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
