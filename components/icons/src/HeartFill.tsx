import { IconProps } from "../type";

export function HeartFill({ size = "24px", className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2px"
      className={className}
    >
      <path d="M20.28,4.57c-2.29-2.29-6-2.29-8.28,0-2.29-2.29-6-2.29-8.28,0s-2.29,6,0,8.28l8.28,8.28,8.28-8.28c2.29-2.29,2.29-6,0-8.28Z"/>
    </svg>
  )
}
