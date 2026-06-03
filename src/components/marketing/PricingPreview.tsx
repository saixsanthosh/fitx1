"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxCard } from "@/components/ui/FitxCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Zap,
    features: ["Basic workout logging", "3 program previews", "5 daily tasks", "Basic charts", "Community access"],
    cta: "Get Started",
    variant: "default" as const,
  },
  {
    name: "Pro",
    monthlyPrice: 699,
    yearlyPrice: 5999,
    icon: Zap,
    features: [
      "All exercises + video demos",
      "Unlimited programs",
      "AI Coach (50 msg/mo)",
      "Full nutrition tracking",
      "Full analytics & charts",
      "Unlimited tasks & habits",
    ],
    cta: "Start Free Trial",
    variant: "default" as const,
  },
  {
    name: "Elite",
    monthlyPrice: 1499,
    yearlyPrice: 11999,
    icon: Crown,
    features: [
      "Everything in Pro",
      "Unlimited AI Coach",
      "Live fitness classes",
      "Coach marketplace",
      "Advanced analytics",
      "Family plan (up to 5)",
      "Priority support",
    ],
    cta: "Start Free Trial",
    variant: "highlighted" as const,
    popular: true,
  },
  {
    name: "Gym Enterprise",
    monthlyPrice: -1,
    yearlyPrice: -1,
    icon: Building2,
    features: [
      "Everything in Elite",
      "White-label branding",
      "Member management",
      "Revenue dashboard",
      "Class scheduling",
      "Unlimited members",
      "Dedicated support",
    ],
    cta: "Book a Demo",
    variant: "gold" as const,
  },
];

export function PricingPreview() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Simple, Transparent Pricing"
          subtitle="Start free, upgrade when you're ready. No hidden fees."
        />

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 bg-fitx-surface rounded-full p-1.5 border border-fitx-border">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-heading uppercase tracking-wider transition-all ${
                !annual ? "bg-fitx-primary text-white" : "text-fitx-text-secondary hover:text-fitx-text"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-heading uppercase tracking-wider transition-all flex items-center gap-2 ${
                annual ? "bg-fitx-primary text-white" : "text-fitx-text-secondary hover:text-fitx-text"
              }`}
            >
              Annual
              <span className="text-[10px] bg-fitx-success/20 text-fitx-success px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <FitxCard
                variant={tier.variant}
                className={`h-full flex flex-col relative ${tier.popular ? "ring-2 ring-fitx-primary" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fitx-primary text-white text-[10px] font-heading uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <tier.icon className="h-5 w-5 text-fitx-primary" />
                  <h3 className="font-heading text-lg text-fitx-text uppercase tracking-wider">
                    {tier.name}
                  </h3>
                </div>

                <div className="mb-6">
                  {tier.monthlyPrice === -1 ? (
                    <span className="text-3xl font-display text-fitx-gold tracking-wider">Custom</span>
                  ) : tier.monthlyPrice === 0 ? (
                    <span className="text-4xl font-display text-fitx-text tracking-wider">Free</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-mono font-bold text-fitx-text">
                        &#8377;{annual ? Math.round(tier.yearlyPrice / 12) : tier.monthlyPrice}
                      </span>
                      <span className="text-sm text-fitx-text-secondary font-body">/mo</span>
                    </div>
                  )}
                  {annual && tier.yearlyPrice > 0 && (
                    <p className="text-xs text-fitx-text-disabled font-body mt-1">
                      &#8377;{tier.yearlyPrice.toLocaleString()}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-fitx-text-secondary font-body">
                      <Check size={16} className="text-fitx-success flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link href={tier.name === "Gym Enterprise" ? "/for-gyms" : "/signup"}>
                  <FitxButton
                    variant={tier.popular ? "primary" : tier.variant === "gold" ? "gold" : "outline"}
                    size="md"
                    className="w-full"
                  >
                    {tier.cta}
                  </FitxButton>
                </Link>
              </FitxCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
