import { IconProps } from "../type";

export function User({ size = "24px", className = "" }: IconProps) {
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
      <path d="M16.5,7.5c0,2.49-2.01,4.5-4.5,4.5s-4.5-2.01-4.5-4.5,2.01-4.5,4.5-4.5,4.5,2.01,4.5,4.5ZM21,21v-1c0-2.21-1.79-4-4-4H7c-2.21,0-4,1.79-4,4v1"/>
    </svg>
  )
}
