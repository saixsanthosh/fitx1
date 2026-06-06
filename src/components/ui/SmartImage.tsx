"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Tailwind gradient classes used as the fallback background, e.g. "from-fitx-primary/40 to-fitx-surface" */
  fallbackGradient?: string;
  /** Icon shown centered on the fallback gradient */
  fallbackIcon?: React.ReactNode;
  /** Overlay a dark gradient on top of the image (for text legibility) */
  overlay?: boolean;
  priority?: boolean;
}

/**
 * Image that NEVER shows a broken-image icon. On any load error it
 * degrades gracefully to a themed gradient with an optional icon.
 */
export function SmartImage({
  src,
  alt,
  className,
  fallbackGradient = "from-fitx-primary/30 to-fitx-surface",
  fallbackIcon,
  overlay = false,
  priority = false,
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (errored) {
    return (
      <div className={cn("relative overflow-hidden bg-gradient-to-br flex items-center justify-center", fallbackGradient, className)}>
        <div className="text-fitx-text-disabled opacity-60">{fallbackIcon}</div>
        {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-fitx-surface-variant", className)}>
      {!loaded && (
        <div className={cn("absolute inset-0 bg-gradient-to-br animate-shimmer", fallbackGradient)} />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />}
    </div>
  );
}
