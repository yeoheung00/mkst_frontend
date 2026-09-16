import { IconProps } from "../type";

export function QuillPen({ size = "24px", className = "" }: IconProps) {
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
      <path d="M6.56,16.44S9.64,2,19.9,2c0,0,2.05,7.78-12.32,12.22M10,9h3M13,5h2.78M6.56,16.44c-4.44,0-1.67,5.56-1.67,5.56,5.56-3.33,1.67-5.56,1.67-5.56Z" />
    </svg>
  )
}
