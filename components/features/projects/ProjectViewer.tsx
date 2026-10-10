import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

interface MarkdownRendererProps {
  content: string;
}

// GitHub 뱃지/이미지 정렬 태그 등을 허용하기 위한 살균(Sanitize) 옵션 확장
const customSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div || []), ["align"]],
    p: [...(defaultSchema.attributes?.p || []), ["align"]],
    img: [
      ...(defaultSchema.attributes?.img || []),
      ["align", "src", "alt", "width", "height"],
    ],
    span: [...(defaultSchema.attributes?.span || []), ["className"]],
    code: [...(defaultSchema.attributes?.code || []), ["className"]],
  },
};

export default function ProjectViewer({ content }: MarkdownRendererProps) {
  if (!content) {
    return (
      <div className="text-neutral-500 py-12 text-center text-sm">
        등록된 README 내용이 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/*
        markdown-body 클래스가 GitHub 스타일을 적용합니다.
        다크모드 지원 시 bg-transparent 및 text 색상을 Tailwind와 맞추어줍니다.
      */}
      <article className="doc-viewer max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [rehypeSanitize, customSchema],
            rehypeHighlight,
          ]}
          components={{
            // 외부 링크는 항상 새 탭에서 열리도록 보정
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
            pre: ({ children, ...props }) => (
              <div data-node="code-block">
                <pre {...props}>{children}</pre>
              </div>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
