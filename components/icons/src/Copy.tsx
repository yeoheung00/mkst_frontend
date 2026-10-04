import { IconProps } from "../type";

export function Copy({ size = "24px", className = "" }: IconProps) {
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
      <path d="M7,15V5c0-1.1.9-2,2-2h10c1.1,0,2,.9,2,2v10c0,1.1-.9,2-2,2h-10c-1.1,0-2-.9-2-2ZM16.73,20c-.35.6-.99,1-1.73,1H5c-1.1,0-2-.9-2-2v-10c0-.74.4-1.38,1-1.73"/>
    </svg>
  )
}

