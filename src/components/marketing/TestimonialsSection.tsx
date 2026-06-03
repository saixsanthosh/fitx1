"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Gym Owner, Iron Paradise",
    avatar: "AM",
    text: "FITX transformed our gym operations. Member retention went up 40% in 3 months. The white-label branding makes it look like we built it ourselves.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Competitive Powerlifter",
    avatar: "SC",
    text: "The workout engine and PR tracking are insane. I've hit more personal records in 6 months with FITX than in the last 2 years without it.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Fitness Coach",
    avatar: "PS",
    text: "My clients love the AI coach and nutrition tracking. It's like having a 24/7 assistant for every member. The gamification keeps them coming back.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "CrossFit Box Owner",
    avatar: "MJ",
    text: "We replaced 4 separate tools with FITX. Member management, class scheduling, revenue tracking — all in one platform. Revenue is up 25%.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Fitness Influencer, 500K+ followers",
    avatar: "ER",
    text: "The progress photos, muscle heatmaps, and shareable PR cards are perfect for my audience. FITX makes fitness content creation effortless.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 bg-fitx-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Athletes & Gym Owners Love FITX"
          subtitle="Join thousands who've transformed their fitness journey."
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-fitx-card border border-fitx-border rounded-2xl p-8 md:p-12"
            >
              <Quote className="h-10 w-10 text-fitx-primary/30 mb-6" />

              <p className="text-lg md:text-xl text-fitx-text font-body leading-relaxed mb-8">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-fitx-primary/20 border-2 border-fitx-primary/40 flex items-center justify-center font-heading text-fitx-primary text-lg">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-heading text-sm text-fitx-text uppercase tracking-wider">
                    {t.name}
                  </p>
                  <p className="text-xs text-fitx-text-secondary font-body">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-fitx-gold fill-fitx-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-fitx-border bg-fitx-surface flex items-center justify-center text-fitx-text-secondary hover:text-fitx-text hover:border-fitx-primary/40 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-fitx-primary" : "bg-fitx-text-disabled"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-fitx-border bg-fitx-surface flex items-center justify-center text-fitx-text-secondary hover:text-fitx-text hover:border-fitx-primary/40 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
