import { Session } from "next-auth";
import { uploadImageFile } from "../api/upload";
import { Editor, Extension } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import { UploadedImage } from "@/types";
import { ApiResponse } from "@/types";
import Heading from "@tiptap/extension-heading";

export const LinkClass = "text-blue-600 underline hover:text-blue-800 transition-colors cursor-pointer";
export const ImageClass = "rounded-lg border border-slate-200 max-w-full h-auto my-4 mx-auto";

export const uploadAndInsertImage = async (session: Session | null, editor: Editor | null, file: File, view?: EditorView, event?: globalThis.DragEvent): Promise<ApiResponse<UploadedImage>> => {
  if (!session || !session.accessToken) {
    alert("로그인 오류");
    return { success: false, error: "로그인 오류" };
  }
  const imageRes = await uploadImageFile(file, session.accessToken);

  if (!imageRes.success) {
    alert("이미지 업로드 실패");
    return { success: false, error: "이미지 업로드 실패" };
  }

  const imageData = imageRes.data;

  if (imageData.width && imageData.height && editor) {
    const pos = view && event
      ? view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })?.pos
      : editor.state.selection.from;

    if (pos == null) {
      return { success: false, error: "이미지 삽입 지점 지정 실패" };
    }

    editor
      .chain()
      .focus()
      .setTextSelection(pos)
      .setImage({
        src: `${process.env.NEXT_PUBLIC_SERVER_URL}${imageData.url}`,
        alt: file.name,
        width: imageData.width,
        height: imageData.height,
        title: "",
      })
      .run();
    return { success: true, data: imageData };
  } else {
    return { success: false, error: "이미지 크기 정보가 없습니다" };
  }
}


export const HeadingIdExtension = Extension.create({
  name: "headingId",
  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        attributes: {
          id: {
            default: null,
            rendered: true,
            parseHTML: (element) => element.getAttribute("id"),
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
      if (node.type.name === "heading" && !node.attrs.id) {
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

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('id'),
        renderHTML: (attributes) => {
          if (!attributes.id) return {};
          return { id: attributes.id };
        },
      },
    };
  },
});
