import { IconProps } from "../type";

export function Phone({ size = "24px", className = "" }: IconProps) {
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
      <path d="M21.69,19.19l-.86,1.44c-.53.88-1.51,1.39-2.53,1.3C9.72,21.12,2.88,14.28,2.08,5.7c-.1-1.02.42-2,1.3-2.53l1.44-.86c1.22-.73,2.81-.38,3.6.81l1.24,1.86c.76,1.14.53,2.68-.53,3.55h0c-1.09.89-1.31,2.48-.5,3.62.89,1.24,1.98,2.33,3.22,3.22,1.14.82,2.73.59,3.62-.5h0c.87-1.07,2.41-1.3,3.56-.53l1.86,1.24c1.19.79,1.54,2.38.81,3.6Z"/>
    </svg>
  )
}
