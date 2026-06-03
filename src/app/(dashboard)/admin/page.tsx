"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Users, BarChart3, CalendarDays, Bell, Palette,
  TrendingUp, TrendingDown, Search, Plus, ChevronRight,
  ArrowUp, ArrowDown, DollarSign, UserPlus, UserMinus,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxInput } from "@/components/ui/FitxInput";

const members = [
  { name: "Rahul Verma", plan: "Elite", status: "Active", joined: "Jan 2026", attendance: "92%" },
  { name: "Ananya Gupta", plan: "Pro", status: "Active", joined: "Mar 2026", attendance: "88%" },
  { name: "Vikram Singh", plan: "Pro", status: "Active", joined: "Feb 2026", attendance: "76%" },
  { name: "Meera Patel", plan: "Elite", status: "Active", joined: "Apr 2026", attendance: "95%" },
  { name: "Karthik Reddy", plan: "Free", status: "At Risk", joined: "May 2026", attendance: "34%" },
  { name: "Pooja Nair", plan: "Pro", status: "Active", joined: "Jan 2026", attendance: "81%" },
  { name: "Aditya Sharma", plan: "Elite", status: "Active", joined: "Dec 2025", attendance: "90%" },
  { name: "Divya Krishna", plan: "Pro", status: "Expired", joined: "Nov 2025", attendance: "0%" },
];

const classes = [
  { name: "Morning HIIT", time: "6:00 AM", trainer: "Coach Alex", slots: "18/25", day: "Mon, Wed, Fri" },
  { name: "Yoga Flow", time: "7:00 AM", trainer: "Priya S.", slots: "12/20", day: "Tue, Thu" },
  { name: "Strength 101", time: "5:00 PM", trainer: "Marcus J.", slots: "22/25", day: "Mon, Wed, Fri" },
  { name: "Spin Class", time: "6:30 PM", trainer: "Sarah C.", slots: "15/20", day: "Tue, Thu, Sat" },
  { name: "CrossFit WOD", time: "7:00 PM", trainer: "Coach Alex", slots: "20/20", day: "Mon-Fri" },
];

const mrrData = [
  { month: "Jan", value: 285000 }, { month: "Feb", value: 310000 },
  { month: "Mar", value: 345000 }, { month: "Apr", value: 372000 },
  { month: "May", value: 398000 }, { month: "Jun", value: 420000 },
];

export default function AdminPage() {
  const [tab, setTab] = useState<"overview" | "members" | "classes" | "revenue" | "branding">("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Building2 size={28} className="text-fitx-gold" />
          <div>
            <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase">Gym Admin</h1>
            <p className="text-xs text-fitx-text-secondary font-body">Iron Paradise — Mumbai</p>
          </div>
        </div>
        <FitxButton variant="gold" size="md" icon={<Bell size={16} />}>Broadcast</FitxButton>
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto">
        {(["overview", "members", "classes", "revenue", "branding"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl font-heading text-sm uppercase tracking-wider transition-all whitespace-nowrap ${
              tab === t ? "bg-fitx-gold/20 text-fitx-text border border-fitx-gold/40" : "text-fitx-text-secondary border border-transparent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Members", value: "342", icon: Users, change: "+18 this month", up: true },
              { label: "MRR", value: "₹4.2L", icon: DollarSign, change: "+12% vs last month", up: true },
              { label: "Churn Rate", value: "3.2%", icon: TrendingDown, change: "-0.5% vs last month", up: false },
              { label: "Avg Attendance", value: "78%", icon: CalendarDays, change: "+4% vs last month", up: true },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <FitxCard hover={false}>
                  <stat.icon size={20} className="text-fitx-gold mb-2" />
                  <p className="text-2xl font-mono font-bold text-fitx-text">{stat.value}</p>
                  <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">{stat.label}</p>
                  <p className={`text-[10px] font-mono mt-1 flex items-center gap-0.5 ${stat.up ? "text-fitx-success" : "text-fitx-primary"}`}>
                    {stat.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{stat.change}
                  </p>
                </FitxCard>
              </motion.div>
            ))}
          </div>

          <FitxCard hover={false}>
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4">Revenue Trend (MRR)</h3>
            <div className="h-40 flex items-end gap-4 px-2">
              {mrrData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-fitx-text">₹{(d.value / 1000).toFixed(0)}K</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.value / 450000) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full bg-fitx-gold/60 rounded-t-lg min-h-[10px]"
                  />
                  <span className="text-[10px] font-mono text-fitx-text-disabled">{d.month}</span>
                </div>
              ))}
            </div>
          </FitxCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FitxCard hover={false}>
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-3">At-Risk Members</h3>
              {members.filter((m) => m.status === "At Risk" || m.status === "Expired").map((m) => (
                <div key={m.name} className="flex items-center justify-between py-2 border-b border-fitx-divider last:border-0">
                  <div>
                    <p className="text-sm font-heading text-fitx-text uppercase tracking-wider">{m.name}</p>
                    <p className="text-[10px] font-mono text-fitx-text-disabled">{m.attendance} attendance</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-heading uppercase ${
                    m.status === "At Risk" ? "bg-fitx-warning/20 text-fitx-warning" : "bg-red-500/20 text-red-400"
                  }`}>{m.status}</span>
                </div>
              ))}
            </FitxCard>

            <FitxCard hover={false}>
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-3">Today&apos;s Classes</h3>
              {classes.slice(0, 3).map((c) => (
                <div key={c.name} className="flex items-center justify-between py-2 border-b border-fitx-divider last:border-0">
                  <div>
                    <p className="text-sm font-heading text-fitx-text uppercase tracking-wider">{c.name}</p>
                    <p className="text-[10px] font-mono text-fitx-text-disabled">{c.time} — {c.trainer}</p>
                  </div>
                  <span className="text-[10px] font-mono text-fitx-text-secondary">{c.slots}</span>
                </div>
              ))}
            </FitxCard>
          </div>
        </div>
      )}

      {tab === "members" && (
        <div>
          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <FitxInput
                placeholder="Search members..."
                icon={<Search size={18} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <FitxButton variant="gold" size="md" icon={<UserPlus size={16} />}>Add Member</FitxButton>
          </div>
          <div className="space-y-2">
            {filteredMembers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 p-4 bg-fitx-card border border-fitx-border rounded-xl hover:border-fitx-gold/30 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-fitx-gold/20 border-2 border-fitx-gold/30 flex items-center justify-center font-heading text-fitx-gold text-xs">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-heading text-fitx-text uppercase tracking-wider">{m.name}</p>
                  <p className="text-[10px] font-mono text-fitx-text-disabled">Joined {m.joined}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-heading uppercase ${
                  m.plan === "Elite" ? "bg-fitx-gold/20 text-fitx-gold" : m.plan === "Pro" ? "bg-fitx-primary/20 text-fitx-primary" : "bg-fitx-surface-variant text-fitx-text-disabled"
                }`}>{m.plan}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-heading uppercase ${
                  m.status === "Active" ? "bg-fitx-success/20 text-fitx-success" : m.status === "At Risk" ? "bg-fitx-warning/20 text-fitx-warning" : "bg-red-500/20 text-red-400"
                }`}>{m.status}</span>
                <span className="text-xs font-mono text-fitx-text-secondary">{m.attendance}</span>
                <ChevronRight size={16} className="text-fitx-text-disabled" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === "classes" && (
        <div>
          <div className="flex justify-between mb-6">
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Class Schedule</h3>
            <FitxButton variant="gold" size="sm" icon={<Plus size={14} />}>New Class</FitxButton>
          </div>
          <div className="space-y-3">
            {classes.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <FitxCard className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-fitx-gold/10 border border-fitx-gold/20 flex items-center justify-center">
                    <CalendarDays size={24} className="text-fitx-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-heading text-fitx-text uppercase tracking-wider">{c.name}</p>
                    <p className="text-[10px] font-mono text-fitx-text-secondary">{c.day} &middot; {c.time} &middot; {c.trainer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-fitx-text">{c.slots}</p>
                    <p className="text-[10px] text-fitx-text-disabled font-body">slots filled</p>
                  </div>
                </FitxCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === "revenue" && (
        <div className="space-y-6">
          <FitxCard hover={false}>
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4">Monthly Recurring Revenue</h3>
            <div className="h-48 flex items-end gap-4 px-2">
              {mrrData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-fitx-text">₹{(d.value / 1000).toFixed(0)}K</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.value / 450000) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full bg-fitx-gold/60 rounded-t-lg min-h-[10px]"
                  />
                  <span className="text-[10px] font-mono text-fitx-text-disabled">{d.month}</span>
                </div>
              ))}
            </div>
          </FitxCard>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "New Signups", value: "18", period: "This Month" },
              { label: "Cancellations", value: "6", period: "This Month" },
              { label: "Net Growth", value: "+12", period: "This Month" },
              { label: "Avg Revenue/Member", value: "₹1,228", period: "This Month" },
            ].map((s) => (
              <FitxCard key={s.label} hover={false} className="text-center">
                <p className="text-xl font-mono font-bold text-fitx-gold">{s.value}</p>
                <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">{s.label}</p>
                <p className="text-[10px] font-mono text-fitx-text-disabled">{s.period}</p>
              </FitxCard>
            ))}
          </div>
        </div>
      )}

      {tab === "branding" && (
        <div className="max-w-lg mx-auto space-y-6">
          <FitxCard hover={false}>
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4 flex items-center gap-2">
              <Palette size={16} className="text-fitx-gold" /> White-Label Branding
            </h3>
            <p className="text-sm text-fitx-text-secondary font-body mb-6">
              Customize the platform with your gym&apos;s brand. Changes apply instantly.
            </p>
            <div className="space-y-4">
              <FitxInput label="Gym Name" placeholder="Iron Paradise" />
              <div>
                <label className="block text-sm font-heading text-fitx-text-secondary mb-2 tracking-wide uppercase">
                  Upload Logo
                </label>
                <div className="border-2 border-dashed border-fitx-border rounded-xl p-8 text-center cursor-pointer hover:border-fitx-gold/40 transition-all">
                  <Palette size={24} className="text-fitx-text-disabled mx-auto mb-2" />
                  <p className="text-xs text-fitx-text-disabled font-body">Click or drag to upload your logo</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-heading text-fitx-text-secondary mb-2 tracking-wide uppercase">
                  Primary Color
                </label>
                <div className="flex gap-3">
                  {["#E8160C", "#3B82F6", "#22C55E", "#EAB308", "#A855F7", "#EC4899"].map((color) => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-xl border-2 border-fitx-border hover:border-white/50 transition-all"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <FitxButton variant="gold" size="lg" className="w-full">Save Branding</FitxButton>
            </div>
          </FitxCard>
        </div>
      )}
    </div>
  );
}
