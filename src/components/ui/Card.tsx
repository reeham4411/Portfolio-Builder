import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

// ─── Root Card ───────────────────────────────────────────────────────────────

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "ghost" | "accent";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = false,
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "rounded-2xl transition-all duration-300";

    const variants = {
      default:
        "bg-[var(--surface)] border border-[var(--border)]",
      elevated:
        "bg-[var(--surface)] border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
      outline:
        "bg-transparent border border-[var(--border)]",
      ghost:
        "bg-transparent border border-transparent",
      accent:
        "bg-[var(--surface)] border border-[var(--accent)]/30 shadow-[0_0_24px_rgba(124,106,255,0.08)]",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const hoverStyles = hover
      ? "hover:border-[var(--accent)]/60 hover:bg-[var(--surface-2)] hover:shadow-[0_8px_32px_rgba(124,106,255,0.12)] cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={cn(base, variants[variant], paddings[padding], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

// ─── Card Header ─────────────────────────────────────────────────────────────

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, border = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1",
        border && "pb-4 mb-4 border-b border-[var(--border)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

// ─── Card Title ───────────────────────────────────────────────────────────────

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-display text-lg font-semibold leading-tight", className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

// ─── Card Description ────────────────────────────────────────────────────────

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--text-muted)] leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

// ─── Card Content ────────────────────────────────────────────────────────────

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

// ─── Card Footer ─────────────────────────────────────────────────────────────

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, border = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center",
        border && "pt-4 mt-4 border-t border-[var(--border)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

// ─── Stat Card ────────────────────────────────────────────────────────────────
// A ready-made metric card for numbers/stats

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

function StatCard({
  label,
  value,
  subtext,
  icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-[var(--text-muted)]",
  };

  return (
    <Card variant="default" padding="md" className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
          {label}
        </span>
        {icon && (
          <span className="text-[var(--text-muted)] opacity-60">{icon}</span>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-3xl font-bold gradient-text">{value}</span>
        {trendValue && trend && (
          <span className={cn("text-xs font-medium mb-1", trendColors[trend])}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
        )}
      </div>
      {subtext && (
        <span className="text-xs text-[var(--text-muted)]">{subtext}</span>
      )}
    </Card>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
};
export default Card;