import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circle" | "card" | "rect";
}

export function SkeletonLoader({ className, variant = "text" }: SkeletonProps) {
  const base = "bg-fitx-surface-variant rounded-lg animate-shimmer";
  const variants: Record<string, string> = {
    text: "h-4 w-full",
    circle: "h-12 w-12 rounded-full",
    card: "h-48 w-full rounded-2xl",
    rect: "h-24 w-full rounded-xl",
  };

  return <div className={cn(base, variants[variant], className)} />;
}
