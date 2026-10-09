'use client';

import { Copy } from "@/components/icons";
import { Button } from "@/components/ui/Button";


const SUPPORTED_LANGUAGES = [
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

interface ReadonlyProps {
  readonly: true;
  language: string;
  content: string;
}

interface EditableProps {
  readonly: false
  language: string;
  onChange: ({ language }: { language: string }) => void;
}

type Props = ReadonlyProps | EditableProps;

export default function CodeHeader(props: Props) {
  const { readonly, language } = props;
  const languageData = SUPPORTED_LANGUAGES.find(lang => lang.value === language) ?? { label: "Unknown" };
  const handleCopy = () => {
    if (!readonly) return;
    navigator.clipboard.writeText(props.content);
  }
  return (
    <div className="h-16 px-4 border-b border-border-default flex items-center justify-between">
      {readonly ? <>
        <span className="text-h4">{languageData.label}</span>
        <Button variant="ghost" className="w-8 h-8 rounded-md" onClick={handleCopy}><Copy/></Button>
      </> : <>
        <select
          value={language || "text"}
          onChange={(event) => props.onChange({ language: event.target.value })}
          className="cursor-pointer text-h4"
        >
          <option value="null" disabled>
            언어 선택
          </option>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </>}
    </div>
  )
}
