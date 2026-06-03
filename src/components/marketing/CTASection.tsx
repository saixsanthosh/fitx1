"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { BRAND } from "@/config/brand";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-fitx-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,22,12,0.1)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Flame className="h-16 w-16 text-fitx-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-display tracking-wider text-fitx-text uppercase mb-4">
            Ready to <span className="text-gradient-red">Transform</span>?
          </h2>
          <p className="text-lg text-fitx-text-secondary font-body max-w-xl mx-auto mb-10">
            Join 50,000+ athletes and 500+ gyms already using {BRAND.name}.
            Start your free trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <FitxButton variant="primary" size="xl" icon={<ArrowRight size={20} />}>
                Start Free Trial
              </FitxButton>
            </Link>
            <Link href="/for-gyms">
              <FitxButton variant="gold" size="xl" icon={<ArrowRight size={20} />}>
                Get Your Branded Version
              </FitxButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
