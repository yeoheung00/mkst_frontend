import { IconProps } from "../type";

export function Dark({ size = "24px", className = "" }: IconProps) {
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
      <path d="M16,16c-4.42,0-8-3.58-8-8,0-1.73.56-3.33,1.49-4.64-3.75,1.09-6.49,4.54-6.49,8.64,0,4.97,4.03,9,9,9,4.1,0,7.55-2.74,8.64-6.49-1.31.93-2.91,1.49-4.64,1.49Z"/>
    </svg>
  )
}
