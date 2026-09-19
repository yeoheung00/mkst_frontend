import { IconProps } from "../type";

export function Trashcan({ size = "24px", className = "" }: IconProps) {
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
      <path d="M19,6v14c0,1.1-.9,2-2,2H7c-1.1,0-2-.9-2-2V6M15,4c0-1.1-.9-2-2-2h-2c-1.1,0-2,.9-2,2v2h6v-2ZM10,11v6M14,11v6M4,6h16"/>
    </svg>
  )
}
