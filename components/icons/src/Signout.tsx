import { IconProps } from "../type";

export function Signout({ size = "24px", className = "" }: IconProps) {
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
      <path d="M9,21h-4c-1.1,0-2-1.01-2-2.25V5.25c0-1.24.9-2.25,2-2.25h4M7,12h14M17,8l4,4-4,4"/>
    </svg>
  )
}
