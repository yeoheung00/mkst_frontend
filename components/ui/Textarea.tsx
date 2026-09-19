import React from "react";

export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "size"> {
  error?: boolean | string; // boolean 또는 에러 메시지 유무로 에러 상태 제어
  size?: TextareaSize;
  fullWidth?: boolean; // 기본값 true (부모 채움)
  resize?: "none" | "both" | "horizontal" | "vertical";

}

// Input과 동일한 padding, font-size 스펙 매핑
const sizeStyles: Record<TextareaSize, { textarea: string; padding: string }> = {
  sm: {
    textarea: "min-h-[42px] text-xs",
    padding: "p-2",
  },
  md: {
    textarea: "min-h-[52px] text-sm",
    padding: "p-2",
  },
  lg: {
    textarea: "min-h-16 text-base",
    padding: "p-2",
  },
};

const resizeStyles = {
  "none": "resize-none",
  "both": "resize",
  "horizontal": "resize-x",
  "vertical": "resize-y",
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error,
      size = "md",
      fullWidth = true,
      disabled,
      className = "",
      resize = "none",
      ...props
    },
    ref
  ) => {
    const isError = Boolean(error);
    const currentSize = sizeStyles[size];

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={`
          rounded-md transition-all duration-150 block

          /* Width Handling */
          ${fullWidth ? "w-full" : "w-auto"}

          /* Dynamic Size & Padding */
          ${currentSize.textarea}
          ${currentSize.padding}

          /* Base Typography & Background */
          text-text-primary placeholder:text-text-muted
          bg-surface-card

          /* Border & Ring (Input과 동일한 State Handling) */
          border
          ${
            isError
              ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
              : "border-border-default hover:border-border-hover focus:border-primary-base focus:ring-4 focus:ring-primary-ring"
          }

          /* Focus & Disabled States */
          focus:outline-none
          disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-subest

          /* Resize & Rows */
          ${resize ? `${resizeStyles[resize]}` : ""}

          ${className}
        `}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
