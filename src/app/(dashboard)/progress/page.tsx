"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Dumbbell, Scale, Utensils, ListChecks, Flame,
  Trophy, Calendar, ArrowUp, ArrowDown, Minus,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";

const weightData = [
  { month: "Jan", value: 78 }, { month: "Feb", value: 77.5 }, { month: "Mar", value: 76.8 },
  { month: "Apr", value: 76.2 }, { month: "May", value: 75.5 }, { month: "Jun", value: 75.0 },
];

const prs = [
  { exercise: "Barbell Bench Press", weight: "100 kg", date: "May 28", isNew: true },
  { exercise: "Back Squat", weight: "140 kg", date: "May 20", isNew: true },
  { exercise: "Conventional Deadlift", weight: "180 kg", date: "May 15", isNew: false },
  { exercise: "Overhead Press", weight: "65 kg", date: "May 10", isNew: false },
  { exercise: "Barbell Row", weight: "90 kg", date: "May 5", isNew: false },
];

const bodyMeasurements = [
  { part: "Chest", current: "104 cm", change: "+2" },
  { part: "Waist", current: "82 cm", change: "-3" },
  { part: "Arms", current: "38 cm", change: "+1.5" },
  { part: "Thighs", current: "62 cm", change: "+2" },
];

export default function ProgressPage() {
  const [tab, setTab] = useState<"strength" | "body" | "nutrition" | "tasks">("strength");
  const [range, setRange] = useState("30D");

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase mb-6">Progress</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Workouts", value: "142", icon: Dumbbell, change: "+12 this month" },
          { label: "Total Volume", value: "845K kg", icon: TrendingUp, change: "+8% vs last month" },
          { label: "Avg Duration", value: "58 min", icon: Calendar, change: "Steady" },
          { label: "Current Streak", value: "14 days", icon: Flame, change: "Best: 21 days" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <FitxCard hover={false} className="text-center">
              <stat.icon size={20} className="text-fitx-primary mx-auto mb-2" />
              <p className="text-xl font-mono font-bold text-fitx-text">{stat.value}</p>
              <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">{stat.label}</p>
              <p className="text-[10px] font-mono text-fitx-text-disabled mt-1">{stat.change}</p>
            </FitxCard>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        {(["strength", "body", "nutrition", "tasks"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl font-heading text-sm uppercase tracking-wider transition-all ${
              tab === t ? "bg-fitx-primary/20 text-fitx-text border border-fitx-primary/40" : "text-fitx-text-secondary border border-transparent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "strength" && (
        <div className="space-y-6">
          <FitxCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Bench Press Progression</h3>
              <div className="flex gap-2">
                {["7D", "30D", "90D", "1Y", "All"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-heading uppercase ${
                      range === r ? "bg-fitx-primary/20 text-fitx-text" : "text-fitx-text-disabled"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-48 flex items-end gap-2">
              {[60, 65, 70, 72.5, 75, 77.5, 80, 82.5, 85, 87.5, 90, 100].map((w, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(w / 100) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={`w-full rounded-t-lg ${i === 11 ? "bg-fitx-gold" : "bg-fitx-primary/60"}`}
                  />
                  <span className="text-[8px] font-mono text-fitx-text-disabled">{w}</span>
                </div>
              ))}
            </div>
          </FitxCard>

          <FitxCard hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={18} className="text-fitx-gold" />
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Personal Records</h3>
            </div>
            <div className="space-y-2">
              {prs.map((pr, i) => (
                <motion.div
                  key={pr.exercise}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    pr.isNew ? "bg-fitx-gold/5 border-fitx-gold/20" : "bg-fitx-surface border-fitx-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {pr.isNew && <Trophy size={14} className="text-fitx-gold" />}
                    <span className="text-sm font-heading text-fitx-text uppercase tracking-wider">{pr.exercise}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-fitx-gold">{pr.weight}</span>
                    <span className="text-[10px] font-mono text-fitx-text-disabled">{pr.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </FitxCard>
        </div>
      )}

      {tab === "body" && (
        <div className="space-y-6">
          <FitxCard hover={false}>
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4">Weight Trend</h3>
            <div className="h-48 flex items-end gap-4 px-4">
              {weightData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-mono text-fitx-text">{d.value}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${((d.value - 72) / 10) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full bg-fitx-info/60 rounded-t-lg min-h-[20px]"
                  />
                  <span className="text-[10px] font-mono text-fitx-text-disabled">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm font-mono text-fitx-success flex items-center justify-center gap-1">
                <ArrowDown size={14} />-3 kg in 6 months
              </span>
              <p className="text-[10px] text-fitx-text-disabled font-body">Target: 73 kg</p>
            </div>
          </FitxCard>

          <FitxCard hover={false}>
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4">Body Measurements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bodyMeasurements.map((m) => (
                <div key={m.part} className="text-center p-4 bg-fitx-surface rounded-xl border border-fitx-border">
                  <p className="text-xs font-heading text-fitx-text-secondary uppercase">{m.part}</p>
                  <p className="text-xl font-mono font-bold text-fitx-text mt-1">{m.current}</p>
                  <p className={`text-[10px] font-mono mt-1 ${
                    m.change.startsWith("+") ? "text-fitx-success" : m.change.startsWith("-") ? "text-fitx-primary" : "text-fitx-text-disabled"
                  }`}>
                    {m.change} cm
                  </p>
                </div>
              ))}
            </div>
          </FitxCard>
        </div>
      )}

      {tab === "nutrition" && (
        <FitxCard hover={false}>
          <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4">Calorie Compliance — Last 30 Days</h3>
          <div className="grid grid-cols-10 gap-1.5">
            {Array.from({ length: 30 }, (_, i) => {
              const compliance = ((Math.sin((i + 1) * 78.233) * 43758.5453) % 1 + 1) % 1;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-sm ${
                    compliance > 0.8 ? "bg-fitx-success" : compliance > 0.5 ? "bg-fitx-warning" : "bg-fitx-primary/40"
                  }`}
                  title={`Day ${i + 1}: ${Math.round(compliance * 100)}%`}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs font-mono text-fitx-text-secondary">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-fitx-success rounded-sm" />80%+</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-fitx-warning rounded-sm" />50-80%</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-fitx-primary/40 rounded-sm" />&lt;50%</span>
          </div>
        </FitxCard>
      )}

      {tab === "tasks" && (
        <FitxCard hover={false}>
          <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4">Task Completion Rate</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { cat: "Fitness", rate: 92 }, { cat: "Nutrition", rate: 78 },
              { cat: "Recovery", rate: 65 }, { cat: "Habits", rate: 85 },
              { cat: "Personal", rate: 70 }, { cat: "Goals", rate: 88 },
            ].map((c) => (
              <div key={c.cat} className="text-center p-4 bg-fitx-surface rounded-xl border border-fitx-border">
                <p className="text-xs font-heading text-fitx-text-secondary uppercase">{c.cat}</p>
                <p className={`text-2xl font-mono font-bold mt-1 ${c.rate >= 80 ? "text-fitx-success" : c.rate >= 60 ? "text-fitx-warning" : "text-fitx-primary"}`}>
                  {c.rate}%
                </p>
              </div>
            ))}
          </div>
        </FitxCard>
      )}
    </div>
  );
}
