"use client";

import { HeroSection } from "@/components/marketing/HeroSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { FeaturesGrid } from "@/components/marketing/FeaturesGrid";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { TrustedBySection } from "@/components/marketing/TrustedBySection";
import { CTASection } from "@/components/marketing/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesGrid />
      <TrustedBySection />
      <TestimonialsSection />
      <PricingPreview />
      <CTASection />
    </>
  );
}
