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
      <path d="M3,3l18,9L3,21l3-9L3,3ZM6,12h6"/>
    </svg>
  )
}
