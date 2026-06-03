/* FITX — Designed & Developed by B SAI SANTHOSH | saisanthosh102030@gmail.com | +91 8925075593 */
import type { Metadata } from "next";
import { Bebas_Neue, Orbitron, Inter, JetBrains_Mono } from "next/font/google";
import { BRAND } from "@/config/brand";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: BRAND.meta.title,
  description: BRAND.meta.description,
  authors: [{ name: BRAND.meta.author }],
  keywords: [
    "fitness",
    "gym management",
    "workout tracker",
    "nutrition",
    "AI coach",
    "white-label gym",
    "FITX",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${orbitron.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
