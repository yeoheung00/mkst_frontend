import { IconProps } from "../type";

export function Sparkle({ size = "24px", className = "" }: IconProps) {
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
      <path d="M10.91,2.72l-2.46,5.74-5.74,2.46c-.96.41-.96,1.76,0,2.17l5.74,2.46,2.46,5.74c.41.96,1.76.96,2.17,0l2.46-5.74,5.74-2.46c.96-.41.96-1.76,0-2.17l-5.74-2.46-2.46-5.74c-.41-.96-1.76-.96-2.17,0Z"/>
    </svg>
  )
}
