import React, { useId } from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  label?: string;
  labelPosition?: "left" | "top" | "right" | "bottom";
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: InputSize;
  fullWidth?: boolean; // 💡 기본값 true (부모 채움), false 설정 시 콘텐츠/클래스 크기에 맞춤
  containerClassName?: string; // 💡 전체 컨테이너 폭/외부 여백 제어용
}

const sizeStyles: Record<InputSize, { input: string; leftPadding: string; rightPadding: string; iconPos: string }> = {
  sm: { input: "h-8 text-xs", leftPadding: "pl-8", rightPadding: "pr-8", iconPos: "left-2.5 right-2.5" },
  md: { input: "h-10 text-sm", leftPadding: "pl-10", rightPadding: "pr-10", iconPos: "left-3.5 right-3.5" },
  lg: { input: "h-12 text-base", leftPadding: "pl-11", rightPadding: "pr-11", iconPos: "left-4 right-4" },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelPosition="left",
      helperText,
      error,
      leftIcon,
      rightIcon,
      size = "md",
      fullWidth = true, // 기본은 w-full
      containerClassName = "",
      disabled,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const isError = Boolean(error);
    const currentSize = sizeStyles[size];
    const labelPositionStyle = {
      left: "flex-row items-center",
      top: "flex-col",
      right: "flex-row flex-reverse items-center",
      bottom: "flex-col flex-reverse",
    }
    return (
      <div
        className={`flex ${labelPositionStyle[labelPosition]} gap-1.5 ${
          fullWidth ? "w-full" : "w-auto"
        } ${containerClassName}`}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`text-sm font-medium whitespace-nowrap transition-colors ${
              disabled ? "text-text-muted" : "text-text-primary"
            }`}
          >
            {label}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative flex items-center w-full">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className={`pointer-events-none absolute flex items-center justify-center text-text-muted ${
                size === "sm" ? "left-2.5" : size === "lg" ? "left-4" : "left-3.5"
              }`}
            >
              {leftIcon}
            </div>
          )}

          {/* Main Input Element */}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`
              w-full rounded-lg transition-all duration-150
              ${currentSize.input}
              text-text-primary placeholder:text-text-muted bg-surface-sub
              border
              ${
                isError
                  ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
                  : "border-border-default hover:border-border-hover focus:border-primary-base focus:bg-surface-card focus:ring-4 focus:ring-primary-ring"
              }
              ${leftIcon ? currentSize.leftPadding : "px-3.5"}
              ${rightIcon ? currentSize.rightPadding : "px-3.5"}
              focus:outline-none
              disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-subest
              ${className}
            `}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div
              className={`pointer-events-none absolute flex items-center justify-center text-text-muted ${
                size === "sm" ? "right-2.5" : size === "lg" ? "right-4" : "right-3.5"
              }`}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper Text or Error Message */}
        {(error || helperText) && (
          <p
            className={`text-xs ${
              isError ? "text-red-500 font-medium" : "text-text-secondary"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
