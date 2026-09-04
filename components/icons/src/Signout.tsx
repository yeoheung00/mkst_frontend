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
      <path d="M8,20h-2c-1.1,0-2-.9-2-2V6c0-1.1.9-2,2-2h2M8,12h12M16,8l4,4-4,4"/>
    </svg>
  )
}
