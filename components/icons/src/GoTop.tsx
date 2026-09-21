import { IconProps } from "../type";

export function GoTop({ size = "24px", className = "" }: IconProps) {
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
      <path d="M4,2h16M16,10l-4-4-4,4M12,6v16"/>
    </svg>
  )
}
