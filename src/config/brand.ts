export const BRAND = {
  name: "FITX",
  tagline: "Stronger Everyday",
  logoUrl: "/images/logo.png",
  primaryColor: "#E8160C",
  primaryBright: "#FF3520",
  redGlow: "#FF6040",
  accentColor: "#D4A040",
  accentBright: "#F0C060",
  background: "#030000",
  surface: "#0F0404",
  surfaceVariant: "#1A0808",
  cardBg: "#120404",
  successGreen: "#22C55E",
  infoBlue: "#3B82F6",
  warningYellow: "#EAB308",
  textPrimary: "#E8E0E0",
  textSecondary: "#A09090",
  textDisabled: "#604040",
  border: "rgba(232,22,12,0.18)",
  divider: "rgba(255,255,255,0.06)",
  creator: {
    name: "B SAI SANTHOSH",
    email: "saisanthosh102030@gmail.com",
    phone: "+918925075593",
    phoneDisplay: "+91 8925075593",
  },
  meta: {
    title: "FITX — Stronger Everyday | Premium Gym Management Platform",
    description:
      "FITX is the ultimate fitness and gym management platform. Track workouts, nutrition, habits, and progress with AI-powered coaching. White-label ready for gym owners.",
    author: "B SAI SANTHOSH",
  },
} as const;

export type Brand = typeof BRAND;
