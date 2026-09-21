"use client";
import Image from "next/image";
import { Comment, CommentWithReplies } from "@/types";
import { useState, Dispatch, SetStateAction } from "react";
import CommentForm from "./CommentForm";
import { Session } from "next-auth";
import { Button } from "@/components/ui/Button";
import { deleteComment } from "@/lib/api/blog";

export default function CommentItem({
  session,
  comment,
  postId,
  onUpdateAction,
}: {
  session: Session | null;
  comment: CommentWithReplies;
  postId: number;
  onUpdateAction: Dispatch<SetStateAction<Comment[]>>;
}) {
  const [reply, setReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const handleDelete = async () => {
    if(!session || !session.accessToken) return;
    if (confirm("댓글을 삭제하시겠습니까?")) {
      const hasChildren = comment.replies && comment.replies.length > 0;
      if (!hasChildren) {
        onUpdateAction(prev => prev.filter(c => c.id !== comment.id));
      } else {
        onUpdateAction(prev => prev.map(c => c.id === comment.id ? { ...c, deletedAt: new Date().toISOString() } : c));
      }
      const res = await deleteComment(comment.id, session.accessToken);
      if (!res.success) {
        alert("댓글 삭제에 실패했습니다.");
        if (!hasChildren) onUpdateAction(prev => [...prev, comment]);
        else onUpdateAction(prev => prev.map(c => c.id === comment.id ? { ...c, deletedAt: null } : c));
      } else {
        onUpdateAction(prev => prev.filter(c => !res.data?.deletedIds.includes(c.id)));
      }
    }
  };
  return (
    <div className="w-full space-y-4 border-l-2 border-border-default pl-2">
      {/* Comment Content */}
      {comment.deletedAt ? <div>삭제된 댓글입니다.</div>:
        <div className="space-y-2">
          {/* Comment Author */}
          <div className="flex gap-2 items-center">
            <Image
              width={32}
              height={32}
              alt={comment.author.name}
              src={comment.author.image ?? ""}
              className="w-6 h-6 rounded-full border border-border-default"
            />
            <span className="text-h4">{comment.author.name}</span>
          </div>

          {/* Comment Content */}
          {!editing && <p>{comment.content}</p>}
          {editing && <CommentForm session={session} postId={postId} parentId={comment.id} onUpdateAction={onUpdateAction} origin={comment.content} originId={comment.id} onClose={() => setEditing(false)} />}

          {/* Comment Actions */}
          <div className="flex gap-2">
            <Button variant="border" size="sm" disabled={comment.status === "pending"} onClick={() => { setReply(!reply); setEditing(false) }}>
              {reply ? "답글 취소" : "답글 달기"}
            </Button>
            {session && session.user.id === comment.author.id && (
              <>
                <Button variant="border" size="sm" onClick={() => { setEditing(!editing); setReply(false); }}>
                  {editing ? "수정 취소" : "수정"}
                </Button>
                <Button variant="border" size="sm" onClick={handleDelete}>
                  삭제
                </Button>
              </>
            )}
          </div>

          {/* Comment Repling */}
          {reply && (
            <div>
              <CommentForm
                session={session}
                postId={postId}
                parentId={comment.id}
                onUpdateAction={onUpdateAction}
                onClose={() => setReply(false)}
              />
            </div>
          )}
        </div>
}
      {/* Comment Replies */}
      {comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              session={session}
              comment={reply}
              postId={postId}
              onUpdateAction={onUpdateAction}
            />
          ))}
        </div>
      )}
    </div>
  );
}
