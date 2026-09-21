"use client";
import { Session } from "@auth/core/types";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Send } from "@/components/icons";
import { User } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { createComment, editComment } from "@/lib/api/blog";
import { Comment, CreateCommentInput, EditCommentInput } from "@/types";
import { signIn } from "next-auth/react";
import crypto from "crypto"

interface CommentFormProps {
  session: Session | null;
  postId: number;
  parentId: number | null;
  onUpdateAction: Dispatch<SetStateAction<Comment[]>>;
  origin?: string;
  originId?: number | null;
  onClose?: () => void;
}

export default function CommentForm({
  session,
  postId,
  parentId,
  onUpdateAction,
  origin,
  originId = null,
  onClose,
}: CommentFormProps) {
  const [content, setContent] = useState(origin ?? "");
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length > 1000) {
      setContent(value.slice(0, 1000));
    } else {
      setContent(value);
    }
  };
  const handleSubmit = async () => {
    if (content.trim().length === 0) {
      alert("댓글을 입력해주세요.");
      return;
    }

    if (!session) {
      alert("세션 오류");
      return;
    }

    if (onClose) onClose();

    if (originId) {
      await handleEditComment(session, originId);
    } else {
      await handleCreateComment(session);
    }
  };

  const handleCreateComment = async (session: Session) => {
    if (!session.accessToken) {
      alert("액세스 토큰 오류");
      return;
    }

    const payload: CreateCommentInput = {
      postId,
      content: content.trim(),
      parentId,
    };

    const clientId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const optimisticComment: Comment = {
      id: clientId,
      status: "pending",
      content: content.trim(),
      parentId,
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        id: session.user.id ?? "",
        name: session.user.name ?? "",
        image: session.user.image ?? "",
      },
    };

    // optimistic update
    onUpdateAction((prev) => [...prev, optimisticComment]);
    setContent("");

    const res = await createComment(payload, session.accessToken);

    if (!res.success) {
      alert("댓글 작성 실패");
      onUpdateAction((prev) =>
        prev.filter((comment) => comment.id !== clientId),
      );

      alert(res.error);
      return;
    }

    // 성공 → optimistic 댓글을 실제 서버 댓글로 교체
    onUpdateAction((prev) =>
      prev.map((comment) =>
        comment.id === clientId
          ? {
              ...comment,
              id: res.data as number,
              status: "confirmed",
            }
          : comment,
      ),
    );
  };
  const handleEditComment = async (session: Session, originId: number) => {
    if (!session.accessToken) {
      alert("액세스 토큰 오류");
      return;
    }
    const payload: EditCommentInput = {
      content,
    };
    onUpdateAction((prev) =>
      prev.map((comment) =>
        comment.id === originId
          ? {
              ...comment,
              content,
            }
          : comment,
      ),
    );
    const res = await editComment(originId, payload, session.accessToken);
    if (!res.success) {
      alert("댓글 수정 실패");
      onUpdateAction((prev) =>
        prev.map((comment) =>
          comment.id === originId
            ? {
                ...comment,
                content: origin ?? "",
              }
            : comment,
        ),
      );
    }
  };
  return (
    <div>
      {session ? (
        <div className="border border-border-default p-2 md:p-4 bg-surface-sub rounded-xl space-y-2 md:space-y-4">
          <Textarea
            size="lg"
            resize="vertical"
            placeholder="댓글을 입력하세요...&#10;(부적절한 댓글은 사전고지 없이 삭제될 수 있습니다.)"
            value={content}
            onChange={handleContentChange}
          />
          <div className="flex items-center gap-2">
            <div className="flex grow gap-2 items-center">
              <div className="w-8 h-8 border border-border-default bg-surface-subest rounded-full overflow-hidden">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    width={32}
                    height={32}
                    alt=""
                    className="rounded-full"
                  />
                ) : (
                  <User className="rounded-full" />
                )}
              </div>
              <span className="flex-1">{session.user.name}</span>
            </div>
            <span className="text-text-secondary text-sub">
              {content.length}/1000
            </span>
            <Button
              variant="primary"
              size="md"
              rightIcon={<Send size={18} />}
              onClick={handleSubmit}
            >
              등록
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center border border-border-default p-4 bg-surface-sub rounded-xl space-y-4">
          <p>로그인 후 댓글을 작성할 수 있습니다.</p> <Button variant="primary" size="sm" onClick={()=>signIn("kakao")}>카카오로 로그인</Button>
        </div>
      )}
    </div>
  );
}
