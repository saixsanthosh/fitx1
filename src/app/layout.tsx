/* FITX — Designed & Developed by B SAI SANTHOSH | saisanthosh102030@gmail.com | +91 8925075593 */
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { BRAND } from "@/config/brand";
import { Toaster } from "@/components/ui/Toaster";
import "./globals.css";

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
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
  metadataBase: new URL("https://fitx1.vercel.app"),
  title: BRAND.meta.title,
  description: BRAND.meta.description,
  authors: [{ name: BRAND.meta.author }],
  keywords: [
    "fitness",
    "gym management",
    "workout tracker",
    "nutrition tracker",
    "barcode food scanner",
    "exercise video library",
    "AI fitness coach",
    "white-label gym",
    "FITX",
  ],
  openGraph: {
    title: BRAND.meta.title,
    description: BRAND.meta.description,
    type: "website",
    siteName: BRAND.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#070809",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrument.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
