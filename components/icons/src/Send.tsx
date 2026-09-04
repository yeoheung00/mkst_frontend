import { IconProps } from "../type";

export function Send({ size = "24px", className = "" }: IconProps) {
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
      <path d="M4,4 l16,8 l-16,8 l2,-8 Z M6,12 h4"/>
    </svg>
  )
}
