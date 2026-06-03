"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ value, suffix = "", label, icon, className }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("text-center", className)}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon && <span className="text-fitx-primary">{icon}</span>}
        <span className="text-4xl md:text-5xl font-display text-fitx-text tracking-wider">
          {count.toLocaleString()}{suffix}
        </span>
      </div>
      <p className="text-sm font-heading text-fitx-text-secondary uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}
