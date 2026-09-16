import { IconProps } from "../type";

export function What({ size = "24px", className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
    >
      <path
        d="M22,12c0,5.52-4.48,10-10,10S2,17.52,2,12,6.48,2,12,2s10,4.48,10,10ZM12,14v-.09c0-.98.59-1.81,1.45-2.28,1.07-.59,1.74-1.82,1.51-3.17-.21-1.21-1.2-2.2-2.41-2.41-1.9-.33-3.54,1.12-3.54,2.95"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2px" />

      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}
