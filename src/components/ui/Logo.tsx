import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

/**
 * FITX emblem — a fiery flame fused with a barbell, in dark chrome with red glow.
 * Pure SVG so it always renders (no missing-image risk) and scales crisply.
 */
export function Logo({ size = 40, className, glow = true }: LogoProps) {
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {glow && (
        <span
          className="absolute inset-0 rounded-full blur-lg bg-fitx-primary/40"
          style={{ transform: "scale(0.8)" }}
        />
      )}
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        className="relative z-10"
        aria-label="FITX logo"
      >
        <defs>
          <linearGradient id="fitx-flame" x1="32" y1="6" x2="32" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6040" />
            <stop offset="0.5" stopColor="#FF3520" />
            <stop offset="1" stopColor="#E8160C" />
          </linearGradient>
          <linearGradient id="fitx-ring" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3a3a3a" />
            <stop offset="0.5" stopColor="#1a1a1a" />
            <stop offset="1" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>

        {/* Outer chrome ring */}
        <circle cx="32" cy="32" r="30" fill="url(#fitx-ring)" stroke="#E8160C" strokeOpacity="0.5" strokeWidth="2" />
        <circle cx="32" cy="32" r="30" stroke="#FF6040" strokeOpacity="0.25" strokeWidth="1" />

        {/* Flame */}
        <path
          d="M32 13c2 6 8 9 8 16 0 3-1.4 5.4-3.3 7 1-2.5.3-5-1.7-6.6.4 4-2.4 6.2-4.3 7.8-2.2 1.8-3.7 4-3.7 7.2 0 .6.1 1.2.2 1.8C23.6 44.7 21 40.6 21 35.5c0-6.6 5.4-9 6.7-15.2.9 1.6 1 3.4.7 5 2.4-2.6 3.6-6.6 3.6-12.3Z"
          fill="url(#fitx-flame)"
        />
        {/* Barbell across the bottom */}
        <g stroke="#E8E0E0" strokeWidth="2.4" strokeLinecap="round">
          <line x1="18" y1="50" x2="46" y2="50" />
        </g>
        <g fill="#E8E0E0">
          <rect x="13" y="46" width="3.5" height="8" rx="1.4" />
          <rect x="47.5" y="46" width="3.5" height="8" rx="1.4" />
          <rect x="9.5" y="47.5" width="3" height="5" rx="1.2" opacity="0.7" />
          <rect x="51.5" y="47.5" width="3" height="5" rx="1.2" opacity="0.7" />
        </g>
      </svg>
    </span>
  );
}
