import { IconProps } from "../type";

export function Box({ size = "24px", className = "" }: IconProps) {
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
      <path d="M4,9l8-4,8,4-8,4-8-4ZM20,9l1.06-.53c1.21-.61,1.21-2.33,0-2.94l-3.06-1.53c-1.26-.63-2.74-.63-4,0l-2,1,8,4ZM12,5l-2-1c-1.26-.63-2.74-.63-4,0l-3.06,1.53c-1.21.61-1.21,2.33,0,2.94l1.06.53,8-4ZM12,13l2,1c1.26.63,2.74.63,4,0l3.06-1.53c1.21-.61,1.21-2.33,0-2.94l-1.06-.53-8,4ZM4,9l-1.06.53c-1.21.61-1.21,2.33,0,2.94l3.06,1.53c1.26.63,2.74.63,4,0l2-1-8-4ZM4,13v3.35c0,1.01.57,1.94,1.48,2.39l5.33,2.67c.75.38,1.64.38,2.39,0l5.33-2.67c.9-.45,1.48-1.38,1.48-2.39v-3.35M12,21.68v-8.68"/>
    </svg>
  )
}
