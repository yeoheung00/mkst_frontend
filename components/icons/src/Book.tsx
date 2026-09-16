import { IconProps } from "../type";

export function Book({ size = "24px", className = "" }: IconProps) {
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
      <path d="M12,5.13v14.87c-.81-.7-2-1.13-3.33-1.13h-4.44c-1.22,0-2.22-1-2.22-2.22V6.22c0-1.22,1-2.22,2.22-2.22h4.44c1.33,0,2.52.43,3.33,1.13ZM19.78,4h-4.44c-1.33,0-2.52.43-3.33,1.13v14.87c.81-.7,2-1.13,3.33-1.13h4.44c1.22,0,2.22-1,2.22-2.22V6.22c0-1.22-1-2.22-2.22-2.22ZM5,9h4M5,14h4M15,9h4M15,14h4"/>
    </svg>
  )
}
