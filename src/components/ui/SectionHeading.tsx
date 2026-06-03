"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = true, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(centered && "text-center", "mb-12 md:mb-16", className)}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-wider text-fitx-text uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-fitx-text-secondary font-body max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto h-1 w-20 bg-gradient-to-r from-fitx-primary to-fitx-glow rounded-full" />
    </motion.div>
  );
}
