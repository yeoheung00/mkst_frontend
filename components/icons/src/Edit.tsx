import { IconProps } from "../type";

export function Edit({ size = "24px", className = "" }: IconProps) {
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
      <path d="M20.41,6.41l-8.64,8.64-3.77.94.94-3.77L17.59,3.59c.78-.78,2.05-.78,2.83,0s.78,2.05,0,2.83ZM10.93,4h-5.67c-1.25,0-2.27,1.01-2.27,2.27v12.47c0,1.25,1.01,2.27,2.27,2.27h12.47c1.25,0,2.27-1.01,2.27-2.27v-5.67"/>
    </svg>
  )
}
