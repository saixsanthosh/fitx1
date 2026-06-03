"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Zap, Check, X, CreditCard, Calendar, Download, Shield, Sparkles } from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";

const plans = [
  {
    name: "Pro", monthly: 699, yearly: 5999, icon: Zap,
    features: ["All exercises + video", "Unlimited programs", "AI Coach (50 msg/mo)", "Full nutrition tracking", "Full analytics", "Unlimited tasks"],
    current: false,
  },
  {
    name: "Elite", monthly: 1499, yearly: 11999, icon: Crown,
    features: ["Everything in Pro", "Unlimited AI Coach", "Live classes", "Coach marketplace", "Advanced analytics", "Family plan (5)", "Priority support"],
    current: true,
  },
];

const invoices = [
  { date: "Jun 2, 2026", amount: "₹11,999", plan: "Elite Annual", status: "Paid" },
  { date: "Jun 2, 2025", amount: "₹11,999", plan: "Elite Annual", status: "Paid" },
  { date: "May 2, 2025", amount: "₹1,499", plan: "Elite Monthly", status: "Paid" },
];

export default function SubscriptionPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase mb-6">Subscription</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <FitxCard variant="gold" hover={false} className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-fitx-gold/20 border border-fitx-gold/30 flex items-center justify-center">
                <Crown size={28} className="text-fitx-gold" />
              </div>
              <div>
                <p className="text-xl font-display tracking-wider text-fitx-gold uppercase">Elite Plan</p>
                <p className="text-xs text-fitx-text-secondary font-body">Active &middot; Renews Jul 2, 2026</p>
              </div>
            </div>
            <div className="flex gap-2">
              <FitxButton variant="secondary" size="sm">Change Plan</FitxButton>
              <FitxButton variant="ghost" size="sm">Cancel</FitxButton>
            </div>
          </div>
        </FitxCard>
      </motion.div>

      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 bg-fitx-surface rounded-full p-1.5 border border-fitx-border">
          <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-xs font-heading uppercase tracking-wider transition-all ${!annual ? "bg-fitx-primary text-white" : "text-fitx-text-secondary"}`}>
            Monthly
          </button>
          <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-xs font-heading uppercase tracking-wider transition-all flex items-center gap-2 ${annual ? "bg-fitx-primary text-white" : "text-fitx-text-secondary"}`}>
            Annual <span className="text-[9px] bg-fitx-success/20 text-fitx-success px-1.5 py-0.5 rounded-full">-20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <FitxCard variant={plan.current ? "highlighted" : "default"} hover={false} className={`h-full flex flex-col ${plan.current ? "ring-2 ring-fitx-gold" : ""}`}>
              {plan.current && (
                <span className="self-start text-[10px] bg-fitx-gold/20 text-fitx-gold px-3 py-1 rounded-full font-heading uppercase tracking-widest mb-3">Current Plan</span>
              )}
              <div className="flex items-center gap-2 mb-3">
                <plan.icon className="h-5 w-5 text-fitx-primary" />
                <h3 className="font-heading text-lg text-fitx-text uppercase tracking-wider">{plan.name}</h3>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-mono font-bold text-fitx-text">₹{annual ? Math.round(plan.yearly / 12) : plan.monthly}</span>
                <span className="text-sm text-fitx-text-secondary font-body">/mo</span>
                {annual && <p className="text-xs text-fitx-text-disabled font-body mt-1">₹{plan.yearly.toLocaleString()}/year</p>}
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-fitx-text-secondary font-body">
                    <Check size={14} className="text-fitx-success flex-shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              <FitxButton variant={plan.current ? "secondary" : "primary"} size="md" className="w-full" disabled={plan.current}>
                {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
              </FitxButton>
            </FitxCard>
          </motion.div>
        ))}
      </div>

      <FitxCard hover={false} className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={18} className="text-fitx-primary" />
          <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Payment Method</h3>
        </div>
        <div className="flex items-center justify-between p-4 bg-fitx-surface rounded-xl border border-fitx-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded bg-gradient-to-r from-fitx-primary to-fitx-glow flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
            <div>
              <p className="text-sm font-mono text-fitx-text">•••• •••• •••• 4242</p>
              <p className="text-[10px] text-fitx-text-disabled font-body">Expires 08/28</p>
            </div>
          </div>
          <FitxButton variant="ghost" size="sm">Update</FitxButton>
        </div>
      </FitxCard>

      <FitxCard hover={false}>
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-fitx-primary" />
          <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Billing History</h3>
        </div>
        <div className="space-y-2">
          {invoices.map((inv, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-fitx-surface rounded-xl border border-fitx-border">
              <div>
                <p className="text-sm font-mono text-fitx-text">{inv.amount}</p>
                <p className="text-[10px] text-fitx-text-disabled font-body">{inv.plan} &middot; {inv.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] bg-fitx-success/20 text-fitx-success px-2 py-0.5 rounded-full font-heading uppercase">{inv.status}</span>
                <button className="text-fitx-text-secondary hover:text-fitx-text transition-colors"><Download size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </FitxCard>
    </div>
  );
}
