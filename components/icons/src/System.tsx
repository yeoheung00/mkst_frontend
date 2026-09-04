import { IconProps } from "../type";

export function System({ size = "24px", className = "" }: IconProps) {
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
      <rect x="4" y="4" width="16" height="11" rx="2" ry="2"/>
      <path d="M7,20h10M12,20v-5"/>
    </svg>
  )
}
