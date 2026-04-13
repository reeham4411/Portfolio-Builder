import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "ghost"
  | "gradient";

type BadgeSize = "xs" | "sm" | "md";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean; // animated pulsing dot prefix
  removable?: boolean; // shows × button
  onRemove?: () => void;
  icon?: React.ReactNode; // icon prefix
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--border)]",
  accent:
    "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/25",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
  danger: "bg-red-500/10 text-red-400 border border-red-500/25",
  info: "bg-sky-500/10 text-sky-400 border border-sky-500/25",
  ghost:
    "bg-transparent text-[var(--text-muted)] border border-transparent hover:border-[var(--border)]",
  gradient: "text-white border-0",
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: "text-[10px] px-2 py-0.5 gap-1",
  sm: "text-xs px-2.5 py-0.5 gap-1.5",
  md: "text-sm px-3 py-1 gap-2",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-[var(--text-muted)]",
  accent: "bg-[var(--accent)]",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-red-400",
  info: "bg-sky-400",
  ghost: "bg-[var(--text-muted)]",
  gradient: "bg-white",
};

export default function Badge({
  className,
  variant = "default",
  size = "sm",
  dot = false,
  removable = false,
  onRemove,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full transition-all duration-200 select-none",
        variantStyles[variant],
        sizeStyles[size],
        variant === "gradient" &&
          "bg-linear-to-r from-(--accent) to-(--accent-2)",
        className,
      )}
      {...props}
    >
      {/* Pulsing dot */}
      {dot && (
        <span className="relative shrink-0 flex items-center justify-center">
          <span
            className={cn(
              "absolute inline-flex h-2 w-2 rounded-full opacity-75 animate-ping",
              dotColors[variant],
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              dotColors[variant],
            )}
          />
        </span>
      )}

      {/* Icon prefix */}
      {icon && (
        <span className="shrink-0 flex items-center" style={{ fontSize: 12 }}>
          {icon}
        </span>
      )}

      {/* Label */}
      <span>{children}</span>

      {/* Remove button */}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={cn(
            "shrink-0 ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10 focus:outline-none",
            variant === "accent" && "hover:bg-(--accent)/20",
            variant === "success" && "hover:bg-emerald-400/20",
            variant === "danger" && "hover:bg-red-400/20",
          )}
          aria-label="Remove"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M1 1l6 6M7 1L1 7" />
          </svg>
        </button>
      )}
    </span>
  );
}

// ─── Badge Group ─────────────────────────────────────────────────────────────
// Renders a compact overlapping stack of badges (e.g. tech stack tags)

interface BadgeGroupProps {
  items: string[];
  max?: number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: (item: string) => void;
  className?: string;
}

export function BadgeGroup({
  items,
  max = Infinity,
  variant = "default",
  size = "sm",
  removable = false,
  onRemove,
  className,
}: BadgeGroupProps) {
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {visible.map((item) => (
        <Badge
          key={item}
          variant={variant}
          size={size}
          removable={removable}
          onRemove={() => onRemove?.(item)}
        >
          {item}
        </Badge>
      ))}
      {overflow > 0 && (
        <Badge variant="ghost" size={size}>
          +{overflow} more
        </Badge>
      )}
    </div>
  );
}
