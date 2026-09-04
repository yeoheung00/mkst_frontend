import { IconProps } from "../type";

export function About({ size = "24px", className = "" }: IconProps) {
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
      <path d="M20,12c0,4.42-3.58,8-8,8s-8-3.58-8-8S7.58,4,12,4s8,3.58,8,8ZM20,20l-2-2M12,7c-1.38,0-2.5,1.12-2.5,2.5s1.12,2.5,2.5,2.5,2.5-1.12,2.5-2.5-1.12-2.5-2.5-2.5ZM16,19v-2c0-1.1-.9-2-2-2h-4c-1.1,0-2,.9-2,2v2"/>
    </svg>
  )
}
