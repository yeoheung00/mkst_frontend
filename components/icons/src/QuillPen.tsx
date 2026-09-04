import { IconProps } from "../type";

export function QuillPen({ size = "24px", className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2px"
      className={className}
    >
      <path d="M7,16S9.77,3,19.01,3c0,0,1.85,7-11.08,11M10.5,9h2.5M12.5,6h2.5M7,16c-4,0-1.5,5-1.5,5,5-3,1.5-5,1.5-5Z" />
    </svg>
  )
}
