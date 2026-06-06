"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell, Timer, Play, Plus, Calendar, TrendingUp, Flame,
  ChevronRight, Clock, Zap, Target, Star,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";
import { SmartImage } from "@/components/ui/SmartImage";
import { IMG } from "@/data/images";
import Link from "next/link";

const programImages = [IMG.training, IMG.athlete, IMG.workoutMan, IMG.gymEquipment];

const todayWorkout = {
  name: "Push Day — Chest, Shoulders & Triceps",
  exercises: [
    { name: "Barbell Bench Press", sets: "4×8-10", target: "80-85 kg", rest: "2 min" },
    { name: "Incline Dumbbell Press", sets: "3×10-12", target: "30 kg", rest: "90 sec" },
    { name: "Cable Crossover", sets: "3×12-15", target: "15 kg", rest: "60 sec" },
    { name: "Overhead Press", sets: "4×6-8", target: "50 kg", rest: "2 min" },
    { name: "Lateral Raise", sets: "4×12-15", target: "10 kg", rest: "60 sec" },
    { name: "Skull Crusher", sets: "3×10-12", target: "25 kg", rest: "90 sec" },
    { name: "Tricep Pushdown", sets: "3×12-15", target: "25 kg", rest: "60 sec" },
    { name: "Push-Ups", sets: "2×AMRAP", target: "Bodyweight", rest: "60 sec" },
  ],
};

const programs = [
  { name: "PPL — Push Pull Legs", weeks: 12, level: "Intermediate", rating: 4.8, enrolled: 12500, active: true },
  { name: "Starting Strength", weeks: 8, level: "Beginner", rating: 4.9, enrolled: 28000, active: false },
  { name: "PHUL — Power Hypertrophy", weeks: 16, level: "Advanced", rating: 4.7, enrolled: 8200, active: false },
  { name: "Full Body 3x/Week", weeks: 8, level: "Beginner", rating: 4.6, enrolled: 15000, active: false },
];

const history = [
  { date: "May 31", name: "Pull Day", duration: "58 min", volume: "14,200 kg", exercises: 7, prs: 1 },
  { date: "May 30", name: "Push Day", duration: "62 min", volume: "12,800 kg", exercises: 8, prs: 0 },
  { date: "May 28", name: "Leg Day", duration: "72 min", volume: "18,500 kg", exercises: 9, prs: 2 },
  { date: "May 27", name: "Pull Day", duration: "55 min", volume: "13,900 kg", exercises: 7, prs: 0 },
  { date: "May 25", name: "Push Day", duration: "60 min", volume: "12,500 kg", exercises: 8, prs: 1 },
];

export default function WorkoutsPage() {
  const [tab, setTab] = useState<"plan" | "programs" | "history">("plan");

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase">Workouts</h1>
        <FitxButton variant="primary" size="md" icon={<Plus size={16} />}>Build Workout</FitxButton>
      </div>

      <div className="flex gap-3 mb-6">
        {(["plan", "programs", "history"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl font-heading text-sm uppercase tracking-wider transition-all ${
              tab === t ? "bg-fitx-primary/20 text-fitx-text border border-fitx-primary/40" : "text-fitx-text-secondary border border-transparent"
            }`}
          >
            {t === "plan" ? "My Plan" : t === "programs" ? "Programs" : "History"}
          </button>
        ))}
      </div>

      {tab === "plan" && (
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <FitxCard variant="highlighted">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-heading text-fitx-primary uppercase tracking-wider">Today&apos;s Workout</p>
                  <h2 className="text-xl font-display tracking-wider text-fitx-text uppercase mt-1">
                    {todayWorkout.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-fitx-text-secondary">
                  <Clock size={14} />
                  <span className="text-xs font-mono">~60 min</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {todayWorkout.exercises.map((ex, i) => (
                  <motion.div
                    key={ex.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-fitx-surface/50 rounded-xl border border-fitx-border"
                  >
                    <span className="w-6 h-6 rounded-full bg-fitx-primary/20 flex items-center justify-center text-[10px] font-mono text-fitx-primary font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-heading text-fitx-text uppercase tracking-wider truncate">{ex.name}</p>
                    </div>
                    <span className="text-xs font-mono text-fitx-text-secondary">{ex.sets}</span>
                    <span className="text-xs font-mono text-fitx-primary">{ex.target}</span>
                    <span className="text-[10px] font-mono text-fitx-text-disabled">{ex.rest}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/workouts/active">
                <FitxButton variant="primary" size="lg" className="w-full" icon={<Play size={18} />}>
                  Start Workout
                </FitxButton>
              </Link>
            </FitxCard>
          </motion.div>

          <FitxCard hover={false}>
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4">This Week</h3>
            <div className="grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const workouts = ["Push", "Pull", "", "Legs", "Push", "", ""];
                const done = i < 2;
                const today = i === 2;
                return (
                  <div key={day} className={`text-center p-3 rounded-xl border transition-all ${
                    today ? "border-fitx-primary bg-fitx-primary/10" : done ? "border-fitx-success/30 bg-fitx-success/5" : "border-fitx-border"
                  }`}>
                    <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">{day}</p>
                    <p className={`text-xs font-heading mt-1 uppercase ${
                      done ? "text-fitx-success" : today ? "text-fitx-primary" : workouts[i] ? "text-fitx-text" : "text-fitx-text-disabled"
                    }`}>
                      {done ? "Done" : workouts[i] || "Rest"}
                    </p>
                  </div>
                );
              })}
            </div>
          </FitxCard>
        </div>
      )}

      {tab === "programs" && (
        <div className="space-y-4">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <FitxCard className={`flex items-center gap-4 ${prog.active ? "border-fitx-primary/40" : ""}`}>
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <SmartImage
                    src={programImages[i % programImages.length]}
                    alt={prog.name}
                    className="w-full h-full"
                    fallbackGradient="from-fitx-primary/30 to-fitx-surface"
                    fallbackIcon={<Dumbbell size={20} />}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider truncate">{prog.name}</h3>
                    {prog.active && (
                      <span className="text-[10px] bg-fitx-primary/20 text-fitx-primary px-2 py-0.5 rounded-full font-heading uppercase">Active</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-mono text-fitx-text-secondary">{prog.weeks} weeks</span>
                    <span className="text-[10px] font-mono text-fitx-text-secondary">{prog.level}</span>
                    <span className="text-[10px] font-mono text-fitx-gold flex items-center gap-0.5">
                      <Star size={10} className="fill-fitx-gold" />{prog.rating}
                    </span>
                    <span className="text-[10px] font-mono text-fitx-text-disabled">{prog.enrolled.toLocaleString()} enrolled</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-fitx-text-disabled" />
              </FitxCard>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-3">
          {history.map((h, i) => (
            <motion.div
              key={`${h.date}-${h.name}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <FitxCard className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-fitx-surface flex items-center justify-center flex-shrink-0">
                  <Dumbbell size={20} className="text-fitx-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">{h.name}</h3>
                    {h.prs > 0 && (
                      <span className="text-[10px] bg-fitx-gold/20 text-fitx-gold px-2 py-0.5 rounded-full font-heading uppercase">
                        {h.prs} PR{h.prs > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-mono text-fitx-text-secondary">{h.date}</span>
                    <span className="text-[10px] font-mono text-fitx-text-secondary">{h.duration}</span>
                    <span className="text-[10px] font-mono text-fitx-text-secondary">{h.volume}</span>
                    <span className="text-[10px] font-mono text-fitx-text-disabled">{h.exercises} exercises</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-fitx-text-disabled" />
              </FitxCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
