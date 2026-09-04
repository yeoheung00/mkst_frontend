'use client'

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { Post } from "@/types";

const lowlight = createLowlight(common);

export default function PostViewer({ content }: { content: Post["content"] }) {
  if (!content) return <div>Post is undefined</div>;
  const CustomHeading = Heading.extend({
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
  ]);

  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
