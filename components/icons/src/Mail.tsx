import { IconProps } from "../type";

export function Mail({ size = "24px", className = "" }: IconProps) {
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
      <path d="M20,20H4c-1.1,0-2-.9-2-2V6c0-1.1.9-2,2-2h16c1.1,0,2,.9,2,2v12c0,1.1-.9,2-2,2ZM2,9l8.21,4.11c1.13.56,2.45.56,3.58,0l8.21-4.11"/>
    </svg>
  )
}
