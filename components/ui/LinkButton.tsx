import Link from "next/link";
import React from "react";

export type LinkButtonVariant =
  | "primary"
  | "secondary"
  | "border"
  | "ghost"
  | "invert-border"
  | "invert-fill";

export type LinkButtonSize = "sm" | "md" | "lg";

export interface LinkButtonProps extends React.ComponentProps<typeof Link> {
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  tooltip?: string;
  className?: string;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      variant = "primary",
      size,
      leftIcon,
      rightIcon,
      tooltip,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    const variantStyles: Record<LinkButtonVariant, string> = {
      primary: `
        bg-primary-base text-on-primary
        hover:bg-primary-hover
        active:bg-primary-active
        focus-visible:ring-primary-ring
      `,

      secondary: `
        bg-fill-secondary text-text-primary
        hover:bg-fill-pressed
        active:opacity-80
        focus-visible:ring-primary-ring
      `,

      border: `
        bg-transparent text-text-primary
        border border-border-default
        hover:bg-fill-secondary hover:border-border-hover
        active:bg-fill-pressed
        focus-visible:ring-primary-ring
      `,

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
        bg-text-primary text-surface-card
        border border-text-primary
        focus-visible:ring-primary-ring
      `,
    };

    const sizeStyles: Record<LinkButtonSize, string> = {
      sm: "h-8 px-2 text-sub gap-1.5 rounded-md",
      md: "h-10 px-3 text-base gap-2 rounded-lg font-medium",
      lg: "h-12 px-4 text-h3 gap-2.5 rounded-xl font-medium",
    };

    return (
      <Link
        ref={ref}
        aria-label={tooltip}
        className={`
            inline-flex items-center justify-center
            whitespace-nowrap
            transition-all duration-150
            select-none cursor-pointer

            focus-visible:outline-none
            focus-visible:ring-4

            ${variantStyles[variant]}
            ${size ? sizeStyles[size] : ""}
            ${className}
          `}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}

        <span>{children}</span>

        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </Link>
    );
  },
);

LinkButton.displayName = "LinkButton";
