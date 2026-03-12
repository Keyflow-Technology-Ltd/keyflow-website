import { forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="font-body text-sm text-brand-dark/70">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "font-body text-base px-4 py-3 bg-transparent border rounded-lg transition-all duration-200",
            "border-brand-dark/20 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent",
            "placeholder:text-brand-dark/30",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-xs font-body">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
