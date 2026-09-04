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
      <circle cx="12" cy="12" r="4"/>
      <path d="M12,3v2M12,19v2M4.21,7.5l1.73,1M18.06,15.5l1.73,1M19.79,7.5l-1.73,1M5.94,15.5l-1.73,1"/>
    </svg>
  )
}
