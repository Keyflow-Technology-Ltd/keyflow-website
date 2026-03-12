import { forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "font-body rounded-full transition-all duration-300 inline-flex items-center justify-center",
          {
            "bg-brand-dark text-brand-light hover:bg-brand-accent": variant === "primary",
            "border border-brand-dark text-brand-dark hover:border-brand-accent hover:text-brand-accent": variant === "secondary",
            "text-brand-dark hover:text-brand-accent": variant === "ghost",
          },
          {
            "text-xs px-4 py-2": size === "sm",
            "text-sm px-6 py-3": size === "md",
            "text-base px-8 py-4": size === "lg",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
