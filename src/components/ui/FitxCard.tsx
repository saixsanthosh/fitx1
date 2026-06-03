"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface FitxCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glow" | "gold" | "highlighted";
  hover?: boolean;
  children: React.ReactNode;
}

export function FitxCard({
  variant = "default",
  hover = true,
  children,
  className,
  ...props
}: FitxCardProps) {
  const variants: Record<string, string> = {
    default: "bg-fitx-card border border-fitx-border",
    glow: "bg-fitx-card border border-fitx-primary/30 glow-red",
    gold: "bg-fitx-card border border-fitx-gold/30 glow-gold",
    highlighted: "bg-gradient-to-b from-fitx-primary/10 to-fitx-card border border-fitx-primary/40",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variants[variant],
        hover && "hover:border-fitx-primary/40 hover:shadow-[0_4px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(232,22,12,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
