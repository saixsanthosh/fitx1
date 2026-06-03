"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap, Crown, Building2, ChevronDown } from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxCard } from "@/components/ui/FitxCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Zap,
    cta: "Get Started",
    variant: "default" as const,
  },
  {
    name: "Pro",
    monthlyPrice: 699,
    yearlyPrice: 5999,
    icon: Zap,
    cta: "Start Free Trial",
    variant: "default" as const,
  },
  {
    name: "Elite",
    monthlyPrice: 1499,
    yearlyPrice: 11999,
    icon: Crown,
    cta: "Start Free Trial",
    variant: "highlighted" as const,
    popular: true,
  },
  {
    name: "Gym Enterprise",
    monthlyPrice: -1,
    yearlyPrice: -1,
    icon: Building2,
    cta: "Book a Demo",
    variant: "gold" as const,
  },
];

const featureGroups = [
  {
    group: "Workouts",
    features: [
      { name: "Exercise Library", free: "50 exercises", pro: "5,000+", elite: "5,000+", enterprise: "5,000+" },
      { name: "Video Demos", free: false, pro: true, elite: true, enterprise: true },
      { name: "Workout Programs", free: "3 previews", pro: "Unlimited", elite: "Unlimited", enterprise: "Unlimited" },
      { name: "Active Workout Tracking", free: true, pro: true, elite: true, enterprise: true },
      { name: "Workout Builder", free: false, pro: true, elite: true, enterprise: true },
      { name: "Plate Calculator", free: false, pro: true, elite: true, enterprise: true },
    ],
  },
  {
    group: "Nutrition",
    features: [
      { name: "Basic Food Logging", free: true, pro: true, elite: true, enterprise: true },
      { name: "Barcode Scanner", free: false, pro: true, elite: true, enterprise: true },
      { name: "AI Food Photo Recognition", free: false, pro: true, elite: true, enterprise: true },
      { name: "Meal Planner", free: false, pro: true, elite: true, enterprise: true },
      { name: "Recipe Library", free: false, pro: true, elite: true, enterprise: true },
      { name: "Diet Mode Toggle", free: false, pro: true, elite: true, enterprise: true },
    ],
  },
  {
    group: "AI & Analytics",
    features: [
      { name: "Basic Charts", free: true, pro: true, elite: true, enterprise: true },
      { name: "Advanced Analytics", free: false, pro: true, elite: true, enterprise: true },
      { name: "Muscle Heatmap", free: false, pro: true, elite: true, enterprise: true },
      { name: "AI Coach Messages", free: false, pro: "50/mo", elite: "Unlimited", enterprise: "Unlimited" },
      { name: "Progress Photos", free: false, pro: true, elite: true, enterprise: true },
      { name: "Personal Record Board", free: false, pro: true, elite: true, enterprise: true },
    ],
  },
  {
    group: "Tasks & Social",
    features: [
      { name: "Daily Tasks", free: "5 tasks", pro: "Unlimited", elite: "Unlimited", enterprise: "Unlimited" },
      { name: "Habit Tracking", free: true, pro: true, elite: true, enterprise: true },
      { name: "Community Access", free: true, pro: true, elite: true, enterprise: true },
      { name: "Leaderboards", free: true, pro: true, elite: true, enterprise: true },
      { name: "Group Challenges", free: false, pro: true, elite: true, enterprise: true },
      { name: "Direct Messages", free: false, pro: true, elite: true, enterprise: true },
    ],
  },
  {
    group: "Gym Features",
    features: [
      { name: "White-Label Branding", free: false, pro: false, elite: false, enterprise: true },
      { name: "Member Management", free: false, pro: false, elite: false, enterprise: true },
      { name: "Revenue Dashboard", free: false, pro: false, elite: false, enterprise: true },
      { name: "Class Scheduling", free: false, pro: false, elite: false, enterprise: true },
      { name: "Broadcast Notifications", free: false, pro: false, elite: false, enterprise: true },
      { name: "Dedicated Support", free: false, pro: false, elite: false, enterprise: "24/7" },
    ],
  },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes! Both Pro and Elite plans come with a 7-day free trial. No credit card required to start. Cancel anytime during the trial.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade anytime. When upgrading, you only pay the prorated difference. Downgrades take effect at the end of your billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards via Stripe, UPI, Net Banking, and Razorpay for Indian users. Enterprise plans can arrange invoiced billing.",
  },
  {
    q: "What's included in the Gym Enterprise plan?",
    a: "Everything in Elite plus white-label branding (your logo, colors, domain), unlimited member management, revenue dashboard, class scheduling, and dedicated 24/7 support. Contact us for custom pricing.",
  },
  {
    q: "Do you offer a family plan?",
    a: "Yes! The Elite plan includes a family plan for up to 5 members at no extra cost. Each member gets their own profile with full features.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time. Your access continues until the end of your current billing period. No cancellation fees.",
  },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-xs font-mono text-fitx-text">{value}</span>;
  if (value) return <Check size={16} className="text-fitx-success" />;
  return <X size={16} className="text-fitx-text-disabled" />;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24">
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-display tracking-wider text-fitx-text uppercase mb-4"
          >
            Simple <span className="text-gradient-red">Pricing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-fitx-text-secondary font-body max-w-xl mx-auto"
          >
            Start free, upgrade when you&apos;re ready. No hidden fees, no surprises.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 bg-fitx-surface rounded-full p-1.5 border border-fitx-border">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-heading uppercase tracking-wider transition-all ${
                !annual ? "bg-fitx-primary text-white" : "text-fitx-text-secondary"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-heading uppercase tracking-wider transition-all flex items-center gap-2 ${
                annual ? "bg-fitx-primary text-white" : "text-fitx-text-secondary"
              }`}
            >
              Annual
              <span className="text-[10px] bg-fitx-success/20 text-fitx-success px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
                  <h3 className="font-heading text-lg text-fitx-text uppercase tracking-wider">{tier.name}</h3>
                </div>
                <div className="mb-6">
                  {tier.monthlyPrice === -1 ? (
                    <span className="text-3xl font-display text-fitx-gold tracking-wider">Custom</span>
                  ) : tier.monthlyPrice === 0 ? (
                    <span className="text-4xl font-display text-fitx-text tracking-wider">Free</span>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-mono font-bold text-fitx-text">
                          &#8377;{annual ? Math.round(tier.yearlyPrice / 12) : tier.monthlyPrice}
                        </span>
                        <span className="text-sm text-fitx-text-secondary font-body">/mo</span>
                      </div>
                      {annual && (
                        <p className="text-xs text-fitx-text-disabled font-body mt-1">
                          &#8377;{tier.yearlyPrice.toLocaleString()}/year
                        </p>
                      )}
                    </>
                  )}
                </div>
                <Link href={tier.name === "Gym Enterprise" ? "/for-gyms" : "/signup"} className="mt-auto">
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
      </section>

      <section className="bg-fitx-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Feature Comparison" subtitle="See exactly what's included in each plan." />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-fitx-divider">
                  <th className="text-left py-4 px-4 font-heading text-sm text-fitx-text-secondary uppercase tracking-wider">
                    Feature
                  </th>
                  {tiers.map((t) => (
                    <th key={t.name} className="text-center py-4 px-4 font-heading text-sm text-fitx-text uppercase tracking-wider">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureGroups.map((group) => (
                  <>
                    <tr key={group.group}>
                      <td colSpan={5} className="pt-8 pb-3 px-4 font-heading text-xs text-fitx-primary uppercase tracking-[0.2em]">
                        {group.group}
                      </td>
                    </tr>
                    {group.features.map((feat) => (
                      <tr key={feat.name} className="border-b border-fitx-divider hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 text-sm text-fitx-text-secondary font-body">{feat.name}</td>
                        <td className="py-3 px-4 text-center"><FeatureValue value={feat.free} /></td>
                        <td className="py-3 px-4 text-center"><FeatureValue value={feat.pro} /></td>
                        <td className="py-3 px-4 text-center"><FeatureValue value={feat.elite} /></td>
                        <td className="py-3 px-4 text-center"><FeatureValue value={feat.enterprise} /></td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Frequently Asked Questions" />

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 bg-fitx-card border border-fitx-border rounded-xl text-left hover:border-fitx-primary/30 transition-all"
                >
                  <span className="font-heading text-sm text-fitx-text uppercase tracking-wider pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-fitx-text-secondary flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 py-4 text-sm text-fitx-text-secondary font-body leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
