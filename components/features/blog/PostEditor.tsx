"use client";

import { useEditor, EditorContent, useEditorState, JSONContent } from "@tiptap/react";
import { Extension } from '@tiptap/core';
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link"; // 👈 Link extension import
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { useRef, useState, useImperativeHandle, Ref } from "react";

export interface UploadedImage {
  url: string;
  width: number;
  height: number;
}

export interface PostEditorRef {
  getHTML: () => string;
  getJSON: () => JSONContent;
  getIMAGES: () => UploadedImage[];
  clear: () => void;
}

interface PostEditorProps {
  ref?: Ref<PostEditorRef>;
  initialContent?: string;
}

export default function PostEditor({
  ref,
  initialContent = "",
}: PostEditorProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const uploadImageToServer = async (
    file: File,
  ): Promise<UploadedImage | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file); // 백엔드 upload.single('file')의 'file' 이름과 일치해야 함

      // 백엔드 업로드 API 호출
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload/image`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "업로드 실패");
      }

      const data: UploadedImage = await res.json();
      console.log("✅ [업로드 성공 응답 데이터]:", data);
      return data; // { url, width, height }
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      alert("이미지 업로드에 실패했습니다.");
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const imageData: UploadedImage | null = await uploadImageToServer(file);
    if (imageData && imageData.width && imageData.height) {
      // TipTap 에디터 본문에 이미지 노드 삽입
      editor
        .chain()
        .focus()
        .setImage({ src: imageData.url, alt: file.name, width: imageData.width, height: imageData.height, title: "" })
        .run();

      // 이미지 메타데이터 State에 저장
      setUploadedImages((prev) => [...prev, imageData]);
    }

    e.target.value = ""; // 동일 파일 다시 선택 가능하도록 초기화
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const lowlight = createLowlight(common);

  const HeadingIdExtension = Extension.create({
    name: 'headingId',
    addGlobalAttributes() {
      return [
        {
          types: ['heading'],
          attributes: {
            id: {
              default: null,
              rendered: true,
              parseHTML: (element) => element.getAttribute('id'),
              renderHTML: (attributes) => {
                if (!attributes.id) return {};
                return { id: attributes.id };
              },
            },
          },
        },
      ];
    },
    // 헤딩 변환/생성 시 ID가 없으면 고유 ID 자동 부여
    onUpdate() {
      const { doc, tr } = this.editor.state;
      let modified = false;

      doc.descendants((node, pos) => {
        if (node.type.name === 'heading' && !node.attrs.id) {
          const randomId = `h${node.attrs.level}-${crypto.randomUUID().slice(0, 8)}`;
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            id: randomId,
          });
          modified = true;
        }
      });

      if (modified) {
        this.editor.view.dispatch(tr);
      }
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        },
        codeBlock: false,
        link: false,
      }),
      HeadingIdExtension,
      // 💡 Link Extension 등록 (prose 스타일 호환 및 자동 링크 인식 설정)
      Link.configure({
        openOnClick: false, // 작성 중 링크 클릭 시 바로 이동하는 것 방지
        HTMLAttributes: {
          class:
            "text-blue-600 underline hover:text-blue-800 transition-colors cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class:
            "rounded-lg border border-slate-200 max-w-full h-auto my-4 mx-auto",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "focus:outline-none max-w-none prose dark:prose-invert p-4 min-h-[350px]",
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();

            uploadImageToServer(file).then((imageData) => {
              if (imageData && imageData.width && imageData.height && editor) {
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });
                editor
                  .chain()
                  .focus()
                  .setTextSelection(coordinates?.pos || 0)
                  .setImage({ src: imageData.url, alt: file.name, width: imageData.width, height: imageData.height, title: ""  })
                  .run();
                setUploadedImages((prev) => [...prev, imageData]);
              }
            });
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;

        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              event.preventDefault();

              uploadImageToServer(file).then((imageData) => {
                if (imageData && imageData.width && imageData.height && editor) {
                  editor
                    .chain()
                    .focus()
                    .setImage({ src: imageData.url, alt: file.name, width: imageData.width, height: imageData.height, title: ""  })
                    .run();
                  setUploadedImages((prev) => [...prev, imageData]);
                }
              });
              return true;
            }
          }
        }
        return false;
      },
    },
    content: initialContent,
    immediatelyRender: false,
  });

  // 상태 구독 (Link 상태 추가)
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const ed = ctx.editor;
      if (!ed) {
        return {
          isHeading2: false,
          isHeading3: false,
          isParagraph: false,
          isBold: false,
          isItalic: false,
          isStrike: false,
          isCode: false,
          isLink: false, // 👈 추가
          isBlockquote: false,
          isCodeBlock: false,
          isBulletList: false,
          isOrderedList: false,
          canUndo: false,
          canRedo: false,
        };
      }

      return {
        isHeading2: ed.isActive("heading", { level: 2 }),
        isHeading3: ed.isActive("heading", { level: 3 }),
        isParagraph: ed.isActive("paragraph"),

        isBold: ed.isActive("bold"),
        isItalic: ed.isActive("italic"),
        isStrike: ed.isActive("strike"),
        isCode: ed.isActive("code"),
        isLink: ed.isActive("link"), // 👈 현재 선택영역 링크 여부 감지

        isBlockquote: ed.isActive("blockquote"),
        isCodeBlock: ed.isActive("codeBlock"),
        isBulletList: ed.isActive("bulletList"),
        isOrderedList: ed.isActive("orderedList"),

        canUndo: ed.can().chain().focus().undo().run(),
        canRedo: ed.can().chain().focus().redo().run(),
      };
    },
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() ?? "",
    getJSON: () => editor?.getJSON() ?? {},
    getIMAGES: () => uploadedImages,
    clear: () => editor?.commands.clearContent(),
  }));

  if (!editor) {
    return (
      <div className="flex items-center justify-center w-full h-80 border rounded-lg text-slate-400">
        에디터를 불러오는 중입니다...
      </div>
    );
  }

  // 🔗 링크 추가/수정/삭제 핸들러
  const handleSetLink = () => {
    if (!editor) return;

    // 이미 링크가 걸려있는 경우 링크 해제 옵션 제공
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("연결할 URL을 입력하세요:", previousUrl);

    // 취소 누름
    if (url === null) return;

    // 빈 값 입력 시 링크 제거
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // 링크 추가
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const getBtnClass = (isActive: boolean, disabled = false) => `
    px-2.5 py-1.5 text-xs font-medium rounded transition-colors flex items-center justify-center
    ${
      disabled
        ? "text-text-muted cursor-not-allowed"
        : isActive
          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
          : "text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700"
    }
  `;

  return (
    <div className="mink-editor flex flex-col w-full h-full border border-border-default rounded-lg">
      {/* 🛠️ 툴바 */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border-default sticky top-16 z-10 bg-surface-sub">
        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState?.canUndo}
          className={getBtnClass(false, !editorState?.canUndo)}
          title="실행 취소"
        >
          ↩️
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState?.canRedo}
          className={getBtnClass(false, !editorState?.canRedo)}
          title="다시 실행"
        >
          ↪️
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={getBtnClass(!!editorState?.isHeading2)}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={getBtnClass(!!editorState?.isHeading3)}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={getBtnClass(!!editorState?.isParagraph)}
        >
          본문
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        {/* Inline Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={getBtnClass(!!editorState?.isBold)}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={getBtnClass(!!editorState?.isItalic)}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={getBtnClass(!!editorState?.isStrike)}
        >
          <s>S</s>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={getBtnClass(!!editorState?.isCode)}
        >
          <code>&lt;/&gt;</code>
        </button>

        {/* 🔗 링크 버튼 추가 */}
        <button
          type="button"
          onClick={handleSetLink}
          className={getBtnClass(!!editorState?.isLink)}
          title="링크 삽입/해제"
        >
          🔗 링크
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        {/* Lists & Blocks */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={getBtnClass(!!editorState?.isBulletList)}
        >
          • 목록
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={getBtnClass(!!editorState?.isOrderedList)}
        >
          1. 목록
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={getBtnClass(!!editorState?.isBlockquote)}
        >
          “” 인용
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={getBtnClass(!!editorState?.isCodeBlock)}
        >
          CodeBlock
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={getBtnClass(false)}
        >
          ― 구분선
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm"
        >
          🖼️ 이미지 첨부
        </button>
      </div>


      <EditorContent editor={editor} />
    </div>
  );
}
