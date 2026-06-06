"use client";

import { motion } from "framer-motion";
import {
  Flame, Dumbbell, Utensils, Heart, Bot, Calendar, Plus,
  TrendingUp, Trophy, Zap, Timer, ArrowRight,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";
import { MacroRing } from "@/components/ui/MacroRing";
import Link from "next/link";

// Deterministic intensity so server and client render identically (no hydration mismatch)
const seededIntensity = (n: number) => ((Math.sin(n * 12.9898) * 43758.5453) % 1 + 1) % 1;

const heatmapData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  active: [1, 2, 3, 5, 7, 8, 10, 12, 13, 15, 16, 17, 19, 20, 22, 24, 25, 26, 28, 29].includes(i + 1),
  intensity: seededIntensity(i + 1),
}));

const upcomingWorkouts = [
  { day: "Today", name: "Push Day — Chest & Shoulders", time: "6:00 PM", exercises: 8 },
  { day: "Tomorrow", name: "Pull Day — Back & Biceps", time: "6:00 PM", exercises: 7 },
  { day: "Thursday", name: "Leg Day — Quads & Glutes", time: "7:00 AM", exercises: 9 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase">
              Welcome back, Alex
            </h1>
            <div className="flex items-center gap-1 bg-orange-500/20 px-3 py-1 rounded-full">
              <Flame size={16} className="text-orange-400" />
              <span className="text-sm font-mono font-bold text-orange-400">14</span>
            </div>
          </div>
          <p className="text-sm text-fitx-text-secondary font-body mt-1">
            Level 24 — 2,450 / 3,000 XP to next level
          </p>
          <div className="mt-2 h-2 w-full max-w-xs bg-fitx-surface-variant rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "81.6%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-fitx-primary to-fitx-glow rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-fitx-primary/20 border-2 border-fitx-primary/40 flex items-center justify-center font-heading text-fitx-primary">
            AK
          </div>
          <div className="w-10 h-10 rounded-full bg-fitx-surface border border-fitx-border flex items-center justify-center text-fitx-text-secondary hover:text-fitx-text cursor-pointer transition-colors">
            <Bell size={18} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Workouts This Week", value: "4 / 5", icon: Dumbbell, color: "text-fitx-primary" },
          { label: "Current Streak", value: "14 days", icon: Flame, color: "text-orange-400" },
          { label: "Total Volume (Week)", value: "42,500 kg", icon: TrendingUp, color: "text-fitx-success" },
          { label: "XP Earned Today", value: "+320", icon: Zap, color: "text-fitx-gold" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <FitxCard className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-fitx-surface-variant flex items-center justify-center ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-mono font-bold text-fitx-text">{stat.value}</p>
              </div>
            </FitxCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <FitxCard variant="highlighted" className="h-full">
            <div className="flex items-center gap-2 mb-3">
              <Timer size={18} className="text-fitx-primary" />
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Today&apos;s Workout</h3>
            </div>
            <h4 className="text-xl font-display tracking-wider text-fitx-text uppercase mb-1">
              Push Day
            </h4>
            <p className="text-sm text-fitx-text-secondary font-body mb-4">
              Chest, Shoulders & Triceps — 8 exercises, ~60 min
            </p>
            <div className="h-2 bg-fitx-surface-variant rounded-full mb-4 overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-fitx-primary to-fitx-glow rounded-full" />
            </div>
            <Link href="/workouts/active">
              <FitxButton variant="primary" size="md" className="w-full" icon={<Dumbbell size={16} />}>
                Start Workout
              </FitxButton>
            </Link>
          </FitxCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <FitxCard className="h-full">
            <div className="flex items-center gap-2 mb-4">
              <Utensils size={18} className="text-fitx-primary" />
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Daily Nutrition</h3>
            </div>
            <div className="flex justify-center gap-6">
              <div className="relative">
                <MacroRing value={1680} max={2400} color="#E8160C" label="Calories" unit="kcal" size={100} />
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <MacroRing value={135} max={180} color="#3B82F6" label="Protein" size={60} strokeWidth={5} />
                <MacroRing value={190} max={260} color="#22C55E" label="Carbs" size={60} strokeWidth={5} />
                <MacroRing value={48} max={70} color="#EAB308" label="Fat" size={60} strokeWidth={5} />
              </div>
            </div>
            <Link href="/nutrition" className="mt-4 block">
              <FitxButton variant="outline" size="sm" className="w-full" icon={<Plus size={14} />}>
                Log Meal
              </FitxButton>
            </Link>
          </FitxCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <FitxCard className="h-full">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={18} className="text-fitx-success" />
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Recovery Score</h3>
            </div>
            <div className="flex items-center justify-center my-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 120 120" className="-rotate-90">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#22C55E" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 54}`} strokeDashoffset={`${2 * Math.PI * 54 * (1 - 0.78)}`}
                    style={{ filter: "drop-shadow(0 0 6px rgba(34,197,94,0.5))" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-mono font-bold text-fitx-success">78</span>
                  <span className="text-[10px] font-heading text-fitx-text-secondary uppercase">Good</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-fitx-surface rounded-lg p-2">
                <p className="font-heading text-fitx-text-secondary uppercase">Sleep</p>
                <p className="font-mono text-fitx-text font-bold">7.5h</p>
              </div>
              <div className="bg-fitx-surface rounded-lg p-2">
                <p className="font-heading text-fitx-text-secondary uppercase">Stress</p>
                <p className="font-mono text-fitx-text font-bold">Low</p>
              </div>
              <div className="bg-fitx-surface rounded-lg p-2">
                <p className="font-heading text-fitx-text-secondary uppercase">HRV</p>
                <p className="font-mono text-fitx-text font-bold">62ms</p>
              </div>
            </div>
          </FitxCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <FitxCard>
            <div className="flex items-center gap-2 mb-4">
              <Bot size={18} className="text-fitx-primary" />
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">AI Coach Insight</h3>
            </div>
            <div className="bg-fitx-surface rounded-xl p-4 border border-fitx-border">
              <p className="text-sm text-fitx-text font-body leading-relaxed">
                &ldquo;Great consistency this week, Alex! Your push volume is up 12% from last week.
                Today&apos;s session focuses on progressive overload — try adding 2.5kg to your bench press.
                Your protein intake yesterday was a bit low at 135g — aim for 180g today to support recovery.&rdquo;
              </p>
            </div>
            <Link href="/ai-coach" className="mt-3 block">
              <FitxButton variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
                Chat with AI Coach
              </FitxButton>
            </Link>
          </FitxCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <FitxCard>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-fitx-primary" />
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Activity Streak</h3>
            </div>
            <div className="grid grid-cols-10 gap-1.5">
              {heatmapData.map((d) => (
                <div
                  key={d.day}
                  className={`aspect-square rounded-sm ${
                    d.active
                      ? d.intensity > 0.7
                        ? "bg-fitx-primary"
                        : d.intensity > 0.4
                        ? "bg-fitx-primary/60"
                        : "bg-fitx-primary/30"
                      : "bg-fitx-surface-variant"
                  }`}
                  title={`Day ${d.day}`}
                />
              ))}
            </div>
            <p className="text-xs text-fitx-text-secondary font-body mt-3">20 of 30 days active this month</p>
          </FitxCard>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <FitxCard>
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell size={18} className="text-fitx-primary" />
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Upcoming Workouts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingWorkouts.map((w, i) => (
              <div key={i} className="bg-fitx-surface rounded-xl p-4 border border-fitx-border hover:border-fitx-primary/30 transition-all cursor-pointer">
                <p className="text-xs font-heading text-fitx-primary uppercase tracking-wider mb-1">{w.day}</p>
                <p className="text-sm font-heading text-fitx-text uppercase tracking-wider mb-2">{w.name}</p>
                <div className="flex items-center gap-3 text-xs text-fitx-text-secondary font-body">
                  <span>{w.time}</span>
                  <span>&middot;</span>
                  <span>{w.exercises} exercises</span>
                </div>
              </div>
            ))}
          </div>
        </FitxCard>
      </motion.div>
    </div>
  );
}

function Bell(props: { size: number }) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
