"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Users, BarChart3, Palette, CalendarDays, Bell, Shield,
  TrendingUp, ArrowRight, Zap, Check, Mail, Phone, MessageCircle,
} from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxInput } from "@/components/ui/FitxInput";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { IMG } from "@/data/images";
import { BRAND } from "@/config/brand";

const benefits = [
  { icon: Users, title: "Member Management", desc: "Add, search, filter, and manage all your members. Track attendance, subscriptions, and compliance." },
  { icon: Palette, title: "White-Label Branding", desc: "Your logo, your colors, your domain. Members see YOUR brand, not ours. Swap in 2 minutes." },
  { icon: BarChart3, title: "Revenue Dashboard", desc: "MRR, churn, growth, LTV — all in real-time. Know exactly how your business is performing." },
  { icon: CalendarDays, title: "Class Scheduling", desc: "Create, manage, and fill classes. Members book directly. Automatic reminders and waitlists." },
  { icon: Bell, title: "Broadcast Notifications", desc: "Send announcements, promotions, and updates to all members or targeted groups instantly." },
  { icon: Shield, title: "Enterprise Security", desc: "JWT auth, encrypted data, rate limiting, GDPR-ready. Your members' data is safe." },
];

const vsData = [
  { feature: "Member Tracking", manual: "Spreadsheets & paper", fitx: "Automated digital profiles" },
  { feature: "Revenue Tracking", manual: "Manual accounting", fitx: "Real-time MRR dashboard" },
  { feature: "Class Scheduling", manual: "WhatsApp groups", fitx: "Integrated booking system" },
  { feature: "Member Retention", manual: "Hope for the best", fitx: "AI-powered retention analytics" },
  { feature: "Branded App", manual: "None", fitx: "Full white-label platform" },
  { feature: "Member Engagement", manual: "Occasional texts", fitx: "Gamification + AI coach + community" },
  { feature: "Setup Time", manual: "Weeks", fitx: "Under 10 minutes" },
];

const caseStudies = [
  {
    gym: "Iron Paradise, Mumbai",
    stat: "40% increase in member retention",
    quote: "FITX paid for itself in the first month. Members love the app, and our churn dropped dramatically.",
    author: "Arjun Mehta, Owner",
  },
  {
    gym: "CrossFit Summit, Bangalore",
    stat: "25% revenue growth in 6 months",
    quote: "We replaced 4 separate tools with FITX. Operations are smoother and members are happier.",
    author: "Marcus Johnson, Head Coach",
  },
  {
    gym: "FitZone Pro, Delhi",
    stat: "3x increase in class bookings",
    quote: "The scheduling and notification system transformed how we fill classes. No more empty slots.",
    author: "Priya Sharma, Manager",
  },
];

export default function ForGymsPage() {
  const [members, setMembers] = useState(200);
  const [monthlyFee, setMonthlyFee] = useState(2000);

  const manualCost = members * 50;
  const fitxCost = members <= 100 ? 9999 : members <= 500 ? 19999 : 39999;
  const savings = Math.max(0, manualCost - fitxCost + members * monthlyFee * 0.05);

  return (
    <div className="pt-24">
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,22,12,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Building2 className="h-16 w-16 text-fitx-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display tracking-wider text-fitx-text uppercase mb-4">
              Run Your Entire Gym <br />
              <span className="text-gradient-red">From One Platform</span>
            </h1>
            <p className="text-lg text-fitx-text-secondary font-body max-w-2xl mx-auto mb-8">
              Member management, branded app, revenue tracking, retention tools, class scheduling — all white-label
              ready with your gym&apos;s logo and colors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#demo-form">
                <FitxButton variant="primary" size="xl" icon={<ArrowRight size={20} />}>
                  Book a Demo
                </FitxButton>
              </a>
              <a href="#roi-calc">
                <FitxButton variant="outline" size="xl" icon={<BarChart3 size={20} />}>
                  Calculate Your ROI
                </FitxButton>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 max-w-5xl mx-auto"
          >
            <div className="relative aspect-[16/7] rounded-2xl overflow-hidden border border-fitx-border glow-red">
              <SmartImage src={IMG.gymInterior} alt="Modern gym powered by FITX" className="w-full h-full" overlay priority fallbackGradient="from-fitx-primary/20 to-fitx-surface" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                <span className="text-[10px] font-heading uppercase tracking-widest bg-fitx-primary/90 text-white px-3 py-1 rounded-full">
                  Your brand, your gym, your platform
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-fitx-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Everything Your Gym Needs"
            subtitle="Replace 5+ tools with one platform that your members will love."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <FitxCard className="h-full">
                  <b.icon className="h-10 w-10 text-fitx-primary mb-4" />
                  <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-2">{b.title}</h3>
                  <p className="text-sm text-fitx-text-secondary font-body">{b.desc}</p>
                </FitxCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="White-Label Your Brand" subtitle="Members see YOUR gym's brand, not ours." />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <FitxCard variant="glow" className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-fitx-primary/10 border border-fitx-primary/30 flex items-center justify-center mb-3">
                    <Palette className="h-10 w-10 text-fitx-primary" />
                  </div>
                  <h4 className="font-heading text-xs text-fitx-text uppercase tracking-wider mb-1">Your Colors</h4>
                  <p className="text-xs text-fitx-text-secondary font-body">Change one config file</p>
                </div>
                <div>
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-fitx-gold/10 border border-fitx-gold/30 flex items-center justify-center mb-3">
                    <Building2 className="h-10 w-10 text-fitx-gold" />
                  </div>
                  <h4 className="font-heading text-xs text-fitx-text uppercase tracking-wider mb-1">Your Logo</h4>
                  <p className="text-xs text-fitx-text-secondary font-body">Upload &amp; it&apos;s everywhere</p>
                </div>
                <div>
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-fitx-success/10 border border-fitx-success/30 flex items-center justify-center mb-3">
                    <Zap className="h-10 w-10 text-fitx-success" />
                  </div>
                  <h4 className="font-heading text-xs text-fitx-text uppercase tracking-wider mb-1">Live in Minutes</h4>
                  <p className="text-xs text-fitx-text-secondary font-body">Setup takes &lt;10 min</p>
                </div>
              </div>
            </FitxCard>
          </motion.div>
        </div>
      </section>

      <section id="roi-calc" className="py-20 bg-fitx-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="ROI Calculator" subtitle="See how much FITX saves your gym." />
          <FitxCard className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-heading text-fitx-text-secondary mb-2 uppercase tracking-wider">
                  Number of Members
                </label>
                <input
                  type="range"
                  min={50}
                  max={2000}
                  step={50}
                  value={members}
                  onChange={(e) => setMembers(Number(e.target.value))}
                  className="w-full accent-[#E8160C]"
                />
                <span className="text-2xl font-mono text-fitx-text">{members}</span>
              </div>
              <div>
                <label className="block text-sm font-heading text-fitx-text-secondary mb-2 uppercase tracking-wider">
                  Avg Monthly Fee (&#8377;)
                </label>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={500}
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(Number(e.target.value))}
                  className="w-full accent-[#E8160C]"
                />
                <span className="text-2xl font-mono text-fitx-text">&#8377;{monthlyFee.toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 text-center">
                <p className="text-xs font-heading text-red-400 uppercase tracking-wider mb-1">Manual Cost /mo</p>
                <p className="text-2xl font-mono text-red-400">&#8377;{manualCost.toLocaleString()}</p>
              </div>
              <div className="bg-fitx-primary/10 border border-fitx-primary/20 rounded-xl p-4 text-center">
                <p className="text-xs font-heading text-fitx-primary uppercase tracking-wider mb-1">FITX Cost /mo</p>
                <p className="text-2xl font-mono text-fitx-primary">&#8377;{fitxCost.toLocaleString()}</p>
              </div>
              <div className="bg-fitx-success/10 border border-fitx-success/20 rounded-xl p-4 text-center">
                <p className="text-xs font-heading text-fitx-success uppercase tracking-wider mb-1">You Save /mo</p>
                <p className="text-2xl font-mono text-fitx-success">&#8377;{savings.toLocaleString()}</p>
              </div>
            </div>
          </FitxCard>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="FITX vs Running Your Gym Manually" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-fitx-divider">
                  <th className="text-left py-3 px-4 font-heading text-xs text-fitx-text-secondary uppercase tracking-wider">Feature</th>
                  <th className="text-center py-3 px-4 font-heading text-xs text-red-400 uppercase tracking-wider">Manual</th>
                  <th className="text-center py-3 px-4 font-heading text-xs text-fitx-success uppercase tracking-wider">FITX</th>
                </tr>
              </thead>
              <tbody>
                {vsData.map((row) => (
                  <tr key={row.feature} className="border-b border-fitx-divider">
                    <td className="py-3 px-4 text-sm text-fitx-text font-body">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-xs text-fitx-text-secondary font-body">{row.manual}</td>
                    <td className="py-3 px-4 text-center text-xs text-fitx-success font-mono">{row.fitx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-fitx-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Case Studies" subtitle="Real gyms, real results." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.gym}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FitxCard className="h-full">
                  <p className="font-heading text-xs text-fitx-primary uppercase tracking-wider mb-2">{cs.gym}</p>
                  <p className="text-2xl font-display text-fitx-gold tracking-wider mb-4">{cs.stat}</p>
                  <p className="text-sm text-fitx-text-secondary font-body italic mb-4">&ldquo;{cs.quote}&rdquo;</p>
                  <p className="text-xs text-fitx-text-disabled font-body">— {cs.author}</p>
                </FitxCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo-form" className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Book a Demo"
            subtitle="See FITX in action for your gym. We'll walk you through everything."
          />
          <FitxCard className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FitxInput label="Your Name" placeholder="John Smith" />
              <FitxInput label="Gym Name" placeholder="Iron Paradise" />
              <FitxInput label="Email" type="email" placeholder="john@gym.com" />
              <FitxInput label="Phone" type="tel" placeholder="+91 98765 43210" />
            </div>
            <FitxInput label="Number of Members" type="number" placeholder="200" className="mb-4" />
            <FitxInput label="Message (Optional)" placeholder="Tell us about your gym..." className="mb-6" />
            <FitxButton variant="primary" size="lg" className="w-full">
              Book My Demo
            </FitxButton>
          </FitxCard>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <FitxCard variant="glow" className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-fitx-primary/20 border-2 border-fitx-primary/40 flex items-center justify-center font-heading text-fitx-primary text-lg">
                  BS
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-heading text-sm text-fitx-text uppercase tracking-wider">
                    {BRAND.creator.name}
                  </p>
                  <p className="text-xs text-fitx-text-secondary font-body mb-2">
                    Get your gym&apos;s branded version
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    <a href={`mailto:${BRAND.creator.email}`}>
                      <FitxButton variant="primary" size="sm" icon={<Mail size={14} />}>
                        Email Me
                      </FitxButton>
                    </a>
                    <a href={`tel:${BRAND.creator.phone}`}>
                      <FitxButton variant="outline" size="sm" icon={<Phone size={14} />}>
                        Call / WhatsApp
                      </FitxButton>
                    </a>
                  </div>
                </div>
              </div>
            </FitxCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
