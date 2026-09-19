"use client";

import {
  CategoryCombobox,
  Category,
} from "@/components/features/blog/CategoryCombobox";
import { useEffect, useRef, useState } from "react";
import PostEditor, { PostEditorRef } from "./PostEditor";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { CreatePostInput, Post, PostImage } from "@/types";
import { createPost, editPost } from "@/lib/api/blog";
import { getPostSummary } from "@/lib/util";

export default function PostClient({
  categories,
  session,
  post,
}: {
  categories: Category[];
  session: Session | null;
  post: Post | null;
}) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [categoryName, setCategoryName] = useState(
    post ? post.category.name : "",
  );
  const editorRef = useRef<PostEditorRef>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!categories) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    // 3. 제출 시점에 Tiptap 에디터 본문 데이터 추출
    const contentJSON = editorRef.current?.getJSON();
    const contentSummary = getPostSummary(contentJSON);
    const contentIMAGES = editorRef.current?.getIMAGES() ?? [];

    if (!contentJSON) {
      alert("본문 내용을 입력해주세요.");
      return;
    }

    const imageSrcs = new Set<string>();

    const traverse = (currentNode: JSONContent) => {
      if (currentNode.type === "image" && currentNode.attrs?.src) {
        imageSrcs.add(currentNode.attrs.src);
      }
      if (Array.isArray(currentNode.content)) {
        for (const child of currentNode.content) {
          traverse(child);
        }
      }
    };

    traverse(contentJSON);
    let count = 0;

    const filteredImages: PostImage[] = Array.from(imageSrcs)
      .map((url) => {
        const img = contentIMAGES.find(
          (img) => `${process.env.NEXT_PUBLIC_SERVER_URL}${img.url}` === url,
        );
        return { ...img, displayOrder: count++ } as PostImage;
      })
      .filter((img): img is PostImage => img !== undefined);

    const payload: CreatePostInput = {
      title,
      summary: contentSummary,
      content: contentJSON, // 백엔드로 보낼 에디터 데이터
      categoryName: categoryName.trim(),
      images: filteredImages,
    };

    if (!session || !session.accessToken) {
      alert("엑세스 토큰이 필요합니다.");
      return;
    }

    if (post) {
      const res = await editPost(post.id, payload, session.accessToken);
      if (!res.success) {
        alert(res.error);
        return;
      }
      router.push(`/blog/${res.data.category.slug}/${res.data.slug}`);
    } else {
      const res = await createPost(payload, session.accessToken);
      if (!res.success) {
        alert(res.error);
        return;
      }
      router.push(`/blog/${res.data.category.slug}/${res.data.slug}`);
    }
  };
  return (
    <div className="w-full max-w-5xl flex flex-col gap-4 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="text-2xl font-black">새 포스트 작성</h1>
        <div className="flex flex-row gap-2">
          <Button size="md" variant="border">
            취소
          </Button>
          <Button size="md" onClick={handleSubmit}>
            게시
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-xl font-bold">
          포스트 제목
        </label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl font-bold">
          카테고리
        </label>
        <CategoryCombobox
          id="category"
          categories={categories}
          value={categoryName}
          onChange={(selectedId) => setCategoryName(selectedId)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="editor" className="text-xl font-bold">
          본문
        </label>
        <PostEditor ref={editorRef} post={post} session={session} />
      </div>
    </div>
  );
}
