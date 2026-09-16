import { IconProps } from "../type";

export function ArrowLeft({ size = "24px", className = "" }: IconProps) {
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
      <path d="M9,19l-7-7,7-7M2,12h20"/>
    </svg>
  )
}
