import { IconProps } from "../type";

export function Layers({ size = "24px", className = "" }: IconProps) {
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
      <path d="M2.63,6.42L10.98,2.24c.64-.32,1.4-.32,2.04,0l8.35,4.17c.84.42.84,1.62,0,2.04l-8.35,4.17c-.64.32-1.4.32-2.04,0L2.63,8.46c-.84-.42-.84-1.62,0-2.04ZM22,12c0,.4-.21.81-.63,1.02l-8.35,4.18c-.64.32-1.4.32-2.04,0L2.63,13.02c-.42-.21-.63-.62-.63-1.02M22,16.56c0,.4-.21.81-.63,1.02l-8.35,4.18c-.64.32-1.4.32-2.04,0l-8.35-4.18c-.42-.21-.63-.62-.63-1.02"/>
    </svg>
  )
}
