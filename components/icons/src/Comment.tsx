import { IconProps } from "../type";

export function Comment({ size = "24px", className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <circle
        fill="currentColor"
        cx="8" cy="11" r="1" />
      <circle
        fill="currentColor"
        cx="12" cy="11" r="1" />
      <circle
        fill="currentColor"
        cx="16" cy="11" r="1" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2px"
        d="M21,5v12c0,1.1-.9,2-2,2H6.42l-1.71,1.71c-.63.63-1.71.18-1.71-.71V5c0-1.1.9-2,2-2h14c1.1,0,2,.9,2,2Z"
      />
    </svg>
  );
}
