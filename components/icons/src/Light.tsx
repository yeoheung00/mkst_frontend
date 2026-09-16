import { IconProps } from "../type";

export function Light({ size = "24px", className = "" }: IconProps) {
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
      <path d="M17,12c0,2.76-2.24,5-5,5s-5-2.24-5-5,2.24-5,5-5,5,2.24,5,5ZM12,2v2M12,20v2M5.07,8l-1.73-1M20.66,17l-1.73-1M20.66,7l-1.73,1M3.34,17l1.73-1"/>
    </svg>
  )
}
