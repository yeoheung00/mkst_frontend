import React from "react";

export type ButtonVariant = "primary" | "secondary" | "border" | "ghost" | "invert-border" | "invert-fill";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    // 1. Variant별 스타일 정의 (Tailwind v4 @theme 토큰 사용)
    const variantStyles: Record<ButtonVariant, string> = {
      // Primary: 강한 강조 (CTA) - 브랜드 컬러 채우기 + Hover/Active 상태
      primary: `
        bg-primary-base text-on-primary
        hover:bg-primary-hover
        active:bg-primary-active
        focus-visible:ring-primary-ring
      `,

      // Secondary: 은은한 면 강조 - 알파 채널 Fill 적용
      secondary: `
        bg-fill-secondary text-text-primary
        hover:bg-fill-pressed
        active:opacity-80
        focus-visible:ring-primary-ring
      `,

      // Border: 경계선 강조 - 투명 배경 + Hover 시 은은하게 채워짐
      border: `
        bg-transparent text-text-primary
        border border-border-default
        hover:bg-fill-secondary hover:border-border-hover
        active:bg-fill-pressed
        focus-visible:ring-primary-ring
      `,

      // Ghost: 투명한 버튼 - 아이콘/텍스트 전용 호버 효과
      ghost: `
        bg-transparent text-text-primary
        hover:bg-fill-secondary
        active:bg-fill-pressed
        focus-visible:ring-primary-ring
      `,

      "invert-border": `
      bg-transparent text-text-primary
      border border-text-secondary
      hover:bg-fill-secondary hover:border-text-primary
      active:bg-fill-pressed
      focus-visible:ring-primary-ring
      `,
      "invert-fill": `
      bg-text-primary text-surface-card border border-text-primary
      focus-visible:ring-primary-ring
      `
    };

    // 2. Size별 스타일 정의
    const sizeStyles: Record<ButtonSize, string> = {
      sm: "h-8 px-3 text-sub gap-1.5 rounded-md",
      md: "h-10 px-4 text-base gap-2 rounded-lg font-medium",
      lg: "h-12 px-5 text-h3 gap-2.5 rounded-xl font-medium",
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          /* Base Layout & Alignment */
          inline-flex items-center justify-center whitespace-nowrap
          transition-all duration-150 select-none cursor-pointer

          /* Focus Accessibility */
          focus-visible:outline-none focus-visible:ring-4

          /* Disabled State */
          disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none

          /* Applied Variant & Size */
          ${variantStyles[variant]}
          ${size ? sizeStyles[size] : ""}
          ${className}
        `}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}

        {/* Button Content */}
        <span>{children}</span>

        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
