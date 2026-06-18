export const BRAND = {
  name: "FITX",
  tagline: "Stronger Everyday",
  logoUrl: "/images/logo.png",

  // ── "Obsidian + Volt" — cinematic near-black base, electric-lime energy ──
  primaryColor: "#C6F24E", // volt (electric lime) — primary energy
  primaryBright: "#DBFF6B",
  redGlow: "#E6FF8A", // volt glow (key kept for back-compat)
  accentColor: "#E9B949", // amber — streaks / PRs / warmth
  accentBright: "#F4CF6E",
  background: "#070809", // obsidian
  surface: "#0E1012",
  surfaceVariant: "#15181B",
  cardBg: "#0C0E10",
  successGreen: "#34D399",
  infoBlue: "#5BC8FF", // ice — protein / info
  warningYellow: "#FACC15",
  ember: "#FF6A3D", // calories burned / fire
  textPrimary: "#EAF0EE",
  textSecondary: "#9BA8A3",
  textDisabled: "#5A6560",
  border: "rgba(198,242,78,0.16)",
  divider: "rgba(255,255,255,0.06)",

  creator: {
    name: "B SAI SANTHOSH",
    email: "saisanthosh102030@gmail.com",
    phone: "+918925075593",
    phoneDisplay: "+91 8925075593",
    instagram: "saixsanthosh",
    instagramUrl: "https://instagram.com/saixsanthosh",
  },
  meta: {
    title: "FITX — Stronger Everyday | Premium Fitness & Gym OS",
    description:
      "FITX is the all-in-one fitness operating system. Track workouts, scan food barcodes, log nutrition, follow guided exercise videos, and watch your progress compound — with AI coaching. White-label ready for gym owners.",
    author: "B SAI SANTHOSH",
  },
} as const;

export type Brand = typeof BRAND;
