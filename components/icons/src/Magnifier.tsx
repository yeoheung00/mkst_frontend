import { IconProps } from "../type";

export function Magnifier({ size = "24px", className = "" }: IconProps) {
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
      <path d="M17,10c0,3.87-3.13,7-7,7s-7-3.13-7-7,3.13-7,7-7,7,3.13,7,7ZM15,15l6,6"/>
    </svg>
  )
}
