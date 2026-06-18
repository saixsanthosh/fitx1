"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      toastOptions={{
        style: {
          background: "rgba(14,16,18,0.92)",
          border: "1px solid var(--fitx-border)",
          color: "var(--fitx-text)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        },
      }}
    />
  );
}
