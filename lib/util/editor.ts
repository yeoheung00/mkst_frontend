import { Session } from "next-auth";
import { uploadImageFile } from "../api/upload";
import { AnyExtension, CommandProps, Editor } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import { UploadedImage, ApiResponse } from "@/types";
import Heading, { Level } from "@tiptap/extension-heading";
import { common, createLowlight } from "lowlight";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlock from "@/components/features/blog/CodeBlock";
import hljs from "highlight.js";

/* -------------------------------------------------------------------------- */
/* 2. Heading 확장 (ID 자동 생성 및 중복 제거)                              */
/* -------------------------------------------------------------------------- */
export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("id"),
        renderHTML: (attributes) => {
          if (!attributes.id) return {};
          return { id: attributes.id };
        },
      },
    };
  },
  // 헤딩 레벨 변경이나 엔터 입력 시 고유 ID 자동 부여 (트랜잭션 가로채기)
  addCommands() {
    return {
      ...this.parent?.(),
      toggleHeadingWithId:
        (options: {level: Level}) =>
        ({ chain }: CommandProps) => {
          const id = `heading-${crypto.randomUUID().slice(0, 8)}`;
          return chain().toggleHeading(options).updateAttributes("heading", { id }).run();
        },
    };
  },
});

/* -------------------------------------------------------------------------- */
/* 4. 이미지 업로드 유틸                                                     */
/* -------------------------------------------------------------------------- */
export const uploadAndInsertImage = async (
  session: Session | null,
  editor: Editor | null,
  file: File,
  view?: EditorView,
  event?: globalThis.DragEvent
): Promise<ApiResponse<UploadedImage>> => {
  if (!session?.accessToken) {
    alert("로그인이 필요합니다.");
    return { success: false, error: "로그인 필요" };
  }

  const imageRes = await uploadImageFile(file, session.accessToken);
  if (!imageRes.success || !imageRes.data) {
    alert("이미지 업로드에 실패했습니다.");
    return { success: false, error: "업로드 실패" };
  }

  const imageData = imageRes.data;

  if (editor && imageData.url) {
    const pos =
      view && event
        ? view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos
        : editor.state.selection.from;

    const chain = editor.chain().focus();
    if (pos != null) {
      chain.setTextSelection(pos);
    }

    chain
      .setImage({
        src: `${process.env.NEXT_PUBLIC_SERVER_URL || ""}${imageData.url}`,
        alt: file.name,
        width: imageData.width ?? undefined,
        height: imageData.height ?? undefined,
      })
      .run();

    return { success: true, data: imageData };
  }

  return { success: false, error: "에디터 인스턴스를 찾을 수 없습니다." };
};

export function highlightCode(code: string, language?: string): string {
  if (!code) return "";
  try {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value;
    }
    // 언어가 지정되지 않았거나 미지원 언어일 경우 자동 감지
    return hljs.highlightAuto(code).value;
  } catch {
    // 에러 발생 시 원본 코드 반환
    return code;
  }
}

/* -------------------------------------------------------------------------- */
/* 5. 통합 Extension 팩                        */
/* -------------------------------------------------------------------------- */
export function getEditorExtensions(): AnyExtension[] {
  return [
    StarterKit.configure({
      heading: false,
      codeBlock: false,
      link: false,
    }),
    CustomHeading.configure({ levels: [2, 3] }),
    Link.configure({
      openOnClick: false,
    }),
    Image,
    CodeBlockLowlight.extend({
      addNodeView() {
        return ReactNodeViewRenderer(CodeBlock); // 에디터용 커스텀 노드뷰
      },
    }).configure({
      lowlight: createLowlight(common),
      defaultLanguage: "text",
    }),
  ];
}
