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
      <path d="M3.45,8.63c-.6-.3-.6-1.15,0-1.45l4.19-2.09c.23-.11.5-.11.73,0l3.64,1.82-6,3-2.55-1.27ZM18,9.9l2.55-1.27c.6-.3.6-1.15,0-1.45l-4.19-2.09c-.23-.11-.5-.11-.73,0l-3.64,1.82,6,3ZM8.36,14.72l3.64-1.82-6-3-2.55,1.27c-.6.3-.6,1.15,0,1.45l4.19,2.09c.23.11.5.11.73,0ZM15.64,14.72c.23.11.5.11.73,0l4.19-2.09c.6-.3.6-1.15,0-1.45l-2.55-1.27-6,3,3.64,1.82ZM6,14v2c0,.76.43,1.45,1.11,1.79l4,2c.56.28,1.23.28,1.79,0l4-2c.68-.34,1.11-1.03,1.11-1.79v-2M12,20v-7.1"/>
    </svg>
  )
}
