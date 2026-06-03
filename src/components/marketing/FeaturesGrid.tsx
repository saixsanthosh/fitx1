"use client";

import { motion } from "framer-motion";
import {
  Dumbbell, Utensils, ListChecks, TrendingUp, Bot, Users, Trophy, Settings,
  CreditCard, Building2, BarChart3, Heart, Zap, Smartphone, Shield, Globe,
  Timer, Flame,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  { icon: Dumbbell, title: "5,000+ Exercises", desc: "Complete library with video demos, muscle maps, and smart filtering." },
  { icon: Utensils, title: "Nutrition Tracking", desc: "Log meals, scan barcodes, AI photo recognition, and macro targets." },
  { icon: ListChecks, title: "Task Manager", desc: "Fitness-aware tasks, habits, streaks, and smart AI suggestions." },
  { icon: Timer, title: "Workout Engine", desc: "Active workout tracking with rest timers, RPE, and plate calculator." },
  { icon: TrendingUp, title: "Progress Analytics", desc: "Charts, body measurements, PR tracking, and muscle heatmaps." },
  { icon: Bot, title: "AI Coach", desc: "GPT-4 powered coaching that knows your workouts, diet, and recovery." },
  { icon: Users, title: "Social Community", desc: "Activity feeds, challenges, leaderboards, and group workouts." },
  { icon: Trophy, title: "Gamification", desc: "XP, 50 levels, 200+ achievements, streaks, and celebrations." },
  { icon: Settings, title: "Toggle System", desc: "Dark/Light, Metric/Imperial, Gym/Home, Bulk/Cut — all instant." },
  { icon: CreditCard, title: "Subscriptions", desc: "Free, Pro, Elite tiers with Stripe and Razorpay integration." },
  { icon: Building2, title: "Gym Admin", desc: "Member management, revenue dashboard, class scheduling, branding." },
  { icon: BarChart3, title: "Revenue Dashboard", desc: "MRR, churn, growth, retention analytics for gym owners." },
  { icon: Heart, title: "Recovery Score", desc: "0-100 recovery score based on sleep, stress, and training load." },
  { icon: Zap, title: "Smart Suggestions", desc: "AI recommends next workout, meal, and recovery based on your data." },
  { icon: Smartphone, title: "White-Label Ready", desc: "Gym owners get their own branded version — logo, colors, domain." },
  { icon: Shield, title: "Enterprise Security", desc: "JWT auth, rate limiting, encryption, GDPR-ready data handling." },
  { icon: Globe, title: "Works Everywhere", desc: "Responsive web app that works flawlessly on any device." },
  { icon: Flame, title: "Premium Design", desc: "Dark mode, fire animations, smooth transitions — feels $1M." },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 bg-background" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Everything You Need"
          subtitle="18 powerful modules working together to transform how you train, eat, recover, and grow."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <FitxCard className="h-full group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-fitx-primary/10 border border-fitx-primary/20 flex items-center justify-center group-hover:bg-fitx-primary/20 group-hover:border-fitx-primary/40 transition-all">
                    <feat.icon className="h-6 w-6 text-fitx-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-fitx-text-secondary font-body leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </FitxCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
