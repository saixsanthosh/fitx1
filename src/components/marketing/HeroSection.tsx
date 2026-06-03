"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Flame } from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FireParticles } from "@/components/ui/FireParticles";
import { BRAND } from "@/config/brand";
import Link from "next/link";

const taglines = [
  "Track Every Rep. Crush Every Goal.",
  "AI-Powered Fitness Intelligence.",
  "Your Gym. Your Brand. Your Platform.",
  "Nutrition. Workouts. Progress. All-In-One.",
];

export function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = taglines[taglineIndex];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === target) {
      const timer = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(timer);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting ? target.slice(0, displayText.length - 1) : target.slice(0, displayText.length + 1)
      );
    }, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, taglineIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030000] via-[#0a0000] to-[#030000]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,22,12,0.08)_0%,transparent_70%)]" />
      <FireParticles />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fitx-primary/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center justify-center mb-6">
            <Flame className="h-20 w-20 md:h-28 md:w-28 text-fitx-primary" />
            <div className="absolute inset-0 blur-2xl bg-fitx-primary/30 rounded-full animate-glow-pulse" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display tracking-wider text-fitx-text uppercase leading-none mb-4"
        >
          Forge Your{" "}
          <span className="text-gradient-red">Legacy</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-8 mb-8"
        >
          <span className="text-lg md:text-xl font-heading text-fitx-text-secondary tracking-wider">
            {displayText}
            <span className="animate-pulse text-fitx-primary">|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base md:text-lg text-fitx-text-secondary font-body max-w-2xl mx-auto mb-10"
        >
          {BRAND.name} is the all-in-one platform for athletes and gym owners.
          Track workouts, nutrition, habits, and progress with AI-powered coaching.
          White-label ready to power your gym&apos;s brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/signup">
            <FitxButton variant="primary" size="xl" icon={<ArrowRight size={20} />}>
              Start Free Trial
            </FitxButton>
          </Link>
          <Link href="#demo">
            <FitxButton variant="outline" size="xl" icon={<Play size={20} />}>
              Watch Demo
            </FitxButton>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <div className="animate-bounce text-fitx-text-disabled">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
