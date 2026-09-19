'use client'

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { Post } from "@/types";
import { CustomHeading, ImageClass, LinkClass } from "@/lib/util/editor";

const lowlight = createLowlight(common);

export default function PostViewer({ content }: { content: Post["content"] }) {
  if (!content) return <div>Post is undefined</div>;

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
      className="prose dark:prose-invert max-w-none pb-4 border-b border-border-default"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
