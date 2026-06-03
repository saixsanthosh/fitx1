"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const gyms = [
  "Iron Paradise", "Beast Mode Gym", "Flex Fitness", "Titan Athletics",
  "Power House", "CrossFit Summit", "FitZone Pro", "Muscle Factory",
  "Peak Performance", "Steel Gym", "Warrior Fitness", "Alpha Strength",
];

export function TrustedBySection() {
  return (
    <section className="py-16 bg-background border-y border-fitx-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm font-heading text-fitx-text-disabled uppercase tracking-[0.3em]">
          Trusted by 500+ gyms worldwide
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...gyms, ...gyms].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-2 text-fitx-text-disabled hover:text-fitx-text-secondary transition-colors"
            >
              <Building2 size={20} />
              <span className="font-heading text-sm uppercase tracking-wider">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
