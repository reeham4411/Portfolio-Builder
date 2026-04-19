import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-(--text-muted)">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border border-(--border) bg-(--surface) text-(--text) placeholder-(--text-muted) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all text-sm",
          error && "border-red-500/50",
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  ),
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-(--text-muted)">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border border-(--border) bg-(--surface) text-(--text) placeholder-(--text-muted) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all text-sm resize-none",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Textarea.displayName = "Textarea";
