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
      <path d="M20,16H4c-1.1,0-2-.9-2-2V5c0-1.1.9-2,2-2h16c1.1,0,2,.9,2,2v9c0,1.1-.9,2-2,2ZM7,21h10M12,21v-5"/>
    </svg>
  )
}
