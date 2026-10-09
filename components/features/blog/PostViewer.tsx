import { JSONContent } from "@tiptap/core";
import { highlightCode } from "@/lib/util/editor";
import Link from "next/link";
import Image from "next/image";
import CodeHeader from "./CodeHeader";

interface PostViewerProps {
  content: JSONContent;
}

export default function PostViewer({ content }: PostViewerProps) {
  if (!content || !content.content) {
    return <div className="text-text-muted py-8">작성된 내용이 없습니다.</div>;
  }

  return (
    <article className="doc-viewer max-w-none pb-8 border-b border-border-default">
      <RenderNodes nodes={content.content} />
    </article>
  );
}

function RenderNodes({ nodes }: { nodes?: JSONContent[] }) {
  if (!nodes || nodes.length === 0) return null;
  return (
    <>
      {nodes.map((node, index) => (
        <NodeRenderer key={index} node={node} />
      ))}
    </>
  );
}

function NodeRenderer({ node }: { node: JSONContent }) {
  if (node.type === "text") {
    let result: React.ReactNode = node.text;

    node.marks?.forEach((mark) => {
      switch (mark.type) {
        case "bold":
          result = <strong>{result}</strong>;
          break;
        case "italic":
          result = <em>{result}</em>;
          break;
        case "strike":
          result = <s>{result}</s>;
          break;
        case "code":
          result = <code>{result}</code>;
          break;
        case "link": {
          const href = mark.attrs?.href || "#";
          const isExternal = href.startsWith("http");
          result = (
            <Link
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {result}
            </Link>
          );
          break;
        }
      }
    });

    return result;
  }

  // 2. 블록 노드 처리
  switch (node.type) {
    case "paragraph":
      return (
        <p>
          <RenderNodes nodes={node.content} />
        </p>
      );

    case "heading": {
      const level = node.attrs?.level || 2;
      const id = node.attrs?.id;

      if (level === 2)
        return (
          <h2 id={id}>
            <RenderNodes nodes={node.content} />
          </h2>
        );

      return (
        <h3 id={id}>
          <RenderNodes nodes={node.content} />
        </h3>
      );
    }

    case "codeBlock": {
      const language = node.attrs?.language || "text";
      const rawCode = node.content?.map((c) => c.text).join("") || "";

      const highlightedHtml = highlightCode(rawCode, language);

      return (
        <div data-node="code-block">
          <CodeHeader
            readonly={true}
            language={language}
            content={rawCode}
          />
          <pre>
            <code
              data-node="code"
              className={`hljs language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </pre>
        </div>
      );
    }

    case "blockquote":
      return (
        <blockquote>
          <RenderNodes nodes={node.content} />
        </blockquote>
      );

    case "bulletList":
      return (
        <ul>
          <RenderNodes nodes={node.content} />
        </ul>
      );

    case "orderedList":
      return (
        <ol>
          <RenderNodes nodes={node.content} />
        </ol>
      );

    case "listItem":
      return (
        <li>
          <RenderNodes nodes={node.content} />
        </li>
      );

    case "horizontalRule":
      return <hr />;

    case "image": {
      const { src, alt, width, height } = node.attrs || {};
      if (!src) return null;

      // 크기 정보가 있으면 Next.js Image로 최적화, 없으면 기본 img 태그 폴백
      if (width && height) {
        return (
          <div>
            <Image
              src={src}
              alt={alt || "Post image"}
              width={Number(width)}
              height={Number(height)}
            />
          </div>
        );
      }

      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || "Post image"} loading="lazy" />
      );
    }

    default:
      return <RenderNodes nodes={node.content} />;
  }
}
