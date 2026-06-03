"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface FitxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const FitxInput = forwardRef<HTMLInputElement, FitxInputProps>(
  ({ label, error, icon, type, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-heading text-fitx-text-secondary mb-2 tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fitx-text-disabled">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "w-full bg-fitx-surface border border-fitx-border rounded-xl px-4 py-3 font-body text-fitx-text placeholder:text-fitx-text-disabled",
              "focus:outline-none focus:border-fitx-primary/60 focus:shadow-[0_0_12px_rgba(232,22,12,0.2)] transition-all duration-300",
              icon && "pl-12",
              isPassword && "pr-12",
              error && "border-red-500 shake",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fitx-text-disabled hover:text-fitx-text transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-400 font-body">{error}</p>}
      </div>
    );
  }
);

FitxInput.displayName = "FitxInput";
