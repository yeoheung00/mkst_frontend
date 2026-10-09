"use client";

import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import CodeHeader from "./CodeHeader";

export const SUPPORTED_LANGUAGES = [
  { label: "Plain Text", value: "text" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "Python", value: "python" },
  { label: "Bash / Shell", value: "bash" },
  { label: "JSON", value: "json" },
  { label: "SQL", value: "sql" },
];

export default function CodeBlock({
  node: {
    attrs: { language },
  },
  updateAttributes,
}: NodeViewProps) {
  return (
    <NodeViewWrapper className="overflow-hidden" data-node="code-block">
      <CodeHeader
        language={language || "text"}
        readonly={false}
        onChange={updateAttributes}
      />
      <pre>
        <NodeViewContent data-node="code" className="p-4" />
      </pre>
    </NodeViewWrapper>
  );
}
