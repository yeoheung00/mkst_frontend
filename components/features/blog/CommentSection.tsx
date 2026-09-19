import { auth } from "@/auth";
import { getComments } from "@/lib/api/blog";
import CommentClient from "./CommentClient";
import { Comment } from "@/types"
export default async function CommentSection({ postId }: { postId: string }) {
  const session = await auth();
  const commentsRes = await getComments(postId);
  if (!commentsRes.success) return <div>댓글을 불러오는 중 오류가 발생했습니다.</div>;
  const comments: Comment[] = commentsRes.data ?? [];
  return (
    <CommentClient comments={comments} session={session} postId={postId} />
  );
}
