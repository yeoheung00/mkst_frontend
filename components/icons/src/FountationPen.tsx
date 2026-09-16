import { IconProps } from "../type";

export function FountationPen({ size = "24px", className = "" }: IconProps) {
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
      <path d="M5,10l10-5,2.29-2.29c.39-.39,1.02-.39,1.41,0l2.59,2.59c.39.39.39,1.02,0,1.41l-2.29,2.29-5,10-9.61,1.75c-.67.12-1.26-.47-1.14-1.14l1.75-9.61ZM4,20l5.59-5.59M11,11c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2ZM15,5l4,4" />
    </svg>
  )
}
