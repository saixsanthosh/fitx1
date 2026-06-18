"use client";

import { Fragment } from "react";

/**
 * Word-by-word blur-in. Pure CSS (.animate-blur-fade-up) with staggered
 * inline animation-delay — GPU-composited (opacity/transform/filter), no
 * per-frame JS, so it stays smooth on low-end phones.
 */
export function BlurText({
  text,
  className,
  delay = 0,
  step = 100,
}: {
  text: string;
  className?: string;
  delay?: number; // ms before the first word
  step?: number; // ms between words
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            className="inline-block animate-blur-fade-up"
            style={{ animationDelay: `${delay + i * step}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
