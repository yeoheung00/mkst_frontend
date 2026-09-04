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
      <path d="M16.5,8.5c0,2.49-2.01,4.5-4.5,4.5s-4.5-2.01-4.5-4.5,2.01-4.5,4.5-4.5,4.5,2.01,4.5,4.5ZM20,20v-1c0-1.66-1.34-3-3-3H7c-1.66,0-3,1.34-3,3v1.01"/>
    </svg>
  )
}
