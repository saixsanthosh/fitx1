"use client";

import { motion } from "framer-motion";
import {
  Flame, Mail, Phone, MapPin, Clock, MessageCircle,
  Heart, Target, Zap, Users, Globe, Award,
} from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxInput } from "@/components/ui/FitxInput";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { IMG } from "@/data/images";
import { BRAND } from "@/config/brand";

const values = [
  { icon: Heart, title: "Passion-Driven", desc: "Built by fitness enthusiasts who live and breathe the gym lifestyle every day." },
  { icon: Target, title: "Data-First", desc: "Every feature is designed around real data and real feedback from athletes and gym owners." },
  { icon: Zap, title: "Innovation", desc: "We push boundaries with AI coaching, gamification, and cutting-edge web technology." },
  { icon: Users, title: "Community", desc: "Fitness is better together. We build tools that connect and motivate people." },
  { icon: Globe, title: "Accessibility", desc: "Premium fitness tools should be available to everyone, regardless of budget or location." },
  { icon: Award, title: "Excellence", desc: "We refuse to ship anything less than world-class. Every pixel, every interaction matters." },
];

const team = [
  { name: "B SAI SANTHOSH", role: "Founder & Lead Developer", initials: "BS", color: "fitx-primary" },
  { name: "Fitness Advisory Board", role: "Expert Coaches & Athletes", initials: "FA", color: "fitx-gold" },
  { name: "AI Research Team", role: "Machine Learning Engineers", initials: "AI", color: "fitx-info" },
  { name: "Design Studio", role: "UI/UX & Brand Design", initials: "DS", color: "fitx-success" },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flame className="h-16 w-16 text-fitx-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-display tracking-wider text-fitx-text uppercase mb-4">
              About <span className="text-gradient-red">{BRAND.name}</span>
            </h1>
            <p className="text-lg text-fitx-text-secondary font-body max-w-2xl mx-auto">
              We&apos;re building the future of fitness technology. A platform where every athlete can track,
              improve, and celebrate their journey — and every gym can thrive.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-fitx-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display tracking-wider text-fitx-text uppercase mb-4">Our Story</h2>
              <div className="space-y-4 text-fitx-text-secondary font-body leading-relaxed">
                <p>
                  {BRAND.name} was born from a simple frustration: why isn&apos;t there a single platform that does
                  everything a serious athlete needs? Workout tracking in one app, nutrition in another, habits
                  in a third — none of them talking to each other.
                </p>
                <p>
                  We set out to build the most complete, most beautiful, most intelligent fitness platform
                  on the planet. One that athletes genuinely love using, and that gym owners can rebrand
                  and offer to their members.
                </p>
                <p>
                  Today, {BRAND.name} powers 500+ gyms and serves 50,000+ athletes worldwide.
                  And we&apos;re just getting started.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-fitx-border">
                <SmartImage src={IMG.athlete} alt="FITX athlete training" className="w-full h-full" overlay fallbackGradient="from-fitx-primary/20 to-fitx-surface" />
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div className="bg-fitx-card border border-fitx-border rounded-xl p-6 text-center">
                <p className="text-3xl font-display text-fitx-primary">50K+</p>
                <p className="text-xs font-heading text-fitx-text-secondary uppercase">Athletes</p>
              </div>
              <div className="bg-fitx-card border border-fitx-border rounded-xl p-6 text-center">
                <p className="text-3xl font-display text-fitx-gold">500+</p>
                <p className="text-xs font-heading text-fitx-text-secondary uppercase">Gyms</p>
              </div>
              <div className="bg-fitx-card border border-fitx-border rounded-xl p-6 text-center">
                <p className="text-3xl font-display text-fitx-success">2M+</p>
                <p className="text-xs font-heading text-fitx-text-secondary uppercase">Workouts</p>
              </div>
              <div className="bg-fitx-card border border-fitx-border rounded-xl p-6 text-center">
                <p className="text-3xl font-display text-fitx-info">98%</p>
                <p className="text-xs font-heading text-fitx-text-secondary uppercase">Retention</p>
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Mission" subtitle="Make world-class fitness tools accessible to every athlete and every gym." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <FitxCard className="h-full text-center">
                  <v.icon className="h-10 w-10 text-fitx-primary mx-auto mb-4" />
                  <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-2">{v.title}</h3>
                  <p className="text-sm text-fitx-text-secondary font-body">{v.desc}</p>
                </FitxCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-fitx-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="The Team" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FitxCard className="text-center">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-${t.color}/20 border-2 border-${t.color}/40 flex items-center justify-center font-heading text-${t.color} text-xl mb-4`}>
                    {t.initials}
                  </div>
                  <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">{t.name}</h3>
                  <p className="text-xs text-fitx-text-secondary font-body mt-1">{t.role}</p>
                </FitxCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Contact Us" subtitle="Have questions? We'd love to hear from you." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <FitxCard className="p-8">
                <h3 className="font-heading text-lg text-fitx-text uppercase tracking-wider mb-6">Send a Message</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FitxInput label="Name" placeholder="Your name" />
                    <FitxInput label="Email" type="email" placeholder="you@email.com" />
                  </div>
                  <FitxInput label="Subject" placeholder="How can we help?" />
                  <div>
                    <label className="block text-sm font-heading text-fitx-text-secondary mb-2 tracking-wide uppercase">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Your message..."
                      className="w-full bg-fitx-surface border border-fitx-border rounded-xl px-4 py-3 font-body text-fitx-text placeholder:text-fitx-text-disabled focus:outline-none focus:border-fitx-primary/60 focus:shadow-[0_0_12px_rgba(232,22,12,0.2)] transition-all duration-300 resize-none"
                    />
                  </div>
                  <FitxButton variant="primary" size="lg" className="w-full">
                    Send Message
                  </FitxButton>
                </div>
              </FitxCard>
            </div>

            <div className="space-y-6">
              <FitxCard>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-fitx-primary/10 border border-fitx-primary/20 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-fitx-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-xs text-fitx-text-secondary uppercase tracking-wider">Email</p>
                    <a
                      href={`mailto:${BRAND.creator.email}`}
                      className="text-fitx-text font-body hover:text-fitx-primary transition-colors"
                    >
                      {BRAND.creator.email}
                    </a>
                  </div>
                </div>
              </FitxCard>

              <FitxCard>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-fitx-primary/10 border border-fitx-primary/20 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-fitx-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-xs text-fitx-text-secondary uppercase tracking-wider">Phone / WhatsApp</p>
                    <a
                      href={`tel:${BRAND.creator.phone}`}
                      className="text-fitx-text font-body hover:text-fitx-primary transition-colors"
                    >
                      {BRAND.creator.phoneDisplay}
                    </a>
                  </div>
                </div>
              </FitxCard>

              <FitxCard>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-fitx-primary/10 border border-fitx-primary/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-fitx-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-xs text-fitx-text-secondary uppercase tracking-wider">Support Hours</p>
                    <p className="text-fitx-text font-body">Mon — Sat, 9 AM — 9 PM IST</p>
                  </div>
                </div>
              </FitxCard>

              <FitxCard>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-fitx-primary/10 border border-fitx-primary/20 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-fitx-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-xs text-fitx-text-secondary uppercase tracking-wider">Location</p>
                    <p className="text-fitx-text font-body">India — Serving Gyms Worldwide</p>
                  </div>
                </div>
              </FitxCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
