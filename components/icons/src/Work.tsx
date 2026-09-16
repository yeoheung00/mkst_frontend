import { IconProps } from "../type";

export function Work({ size = "24px", className = "" }: IconProps) {
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
      <path d="M22,9v9c0,1.1-.9,2-2,2H4c-1.1,0-2-.9-2-2v-9c0-1.1.9-2,2-2h16c1.1,0,2,.9,2,2ZM16,6v-1c0-1.1-.9-2-2-2h-4c-1.1,0-2,.9-2,2v1M2,11l7.32,1.46c1.77.35,3.6.35,5.37,0l7.32-1.46M7,10v4M17,10v4"/>
    </svg>
  )
}
