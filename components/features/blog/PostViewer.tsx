'use client'

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { Post } from "@/types";
import { CustomHeading, ImageClass, LinkClass } from "@/lib/util/editor";
import js from "highlight.js/lib/languages/javascript";

export default function PostViewer({ content }: { content: Post["content"] }) {
  if (!content) return <div>Post is undefined</div>;

  const lowlight = createLowlight(common);
  lowlight.register("javascript", js);
  lowlight.register("js", js); // alias 등록

  const htmlContent = generateHTML(content ?? {}, [
    StarterKit.configure({
      heading: false,
      codeBlock: false,
      link: false,
    }),
    CustomHeading,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: LinkClass,
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: ImageClass,
      },
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
  ]);

  return (
    <div
      className="post-viewer prose max-w-none pb-4 border-b border-border-default"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
