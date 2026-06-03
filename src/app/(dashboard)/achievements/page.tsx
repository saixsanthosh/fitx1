"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy, Flame, Dumbbell, Zap, Target, Award, Star, Crown,
  TrendingUp, Heart, Utensils, Users, Medal, Shield, Rocket,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { AchievementBadge } from "@/components/ui/AchievementBadge";

const levels = [
  { range: "1-9", title: "Rookie", color: "text-fitx-text-secondary" },
  { range: "10-19", title: "Warrior", color: "text-blue-400" },
  { range: "20-29", title: "Elite", color: "text-purple-400" },
  { range: "30-39", title: "Legend", color: "text-fitx-gold" },
  { range: "40-50", title: "Immortal", color: "text-fitx-primary" },
];

const categories = ["All", "Workout", "Strength", "Streaks", "Nutrition", "Social"] as const;

const achievements = [
  { icon: <Dumbbell size={20} />, name: "First Workout", rarity: "Common" as const, unlocked: true, category: "Workout" },
  { icon: <Flame size={20} />, name: "7-Day Streak", rarity: "Common" as const, unlocked: true, category: "Streaks" },
  { icon: <Flame size={20} />, name: "30-Day Streak", rarity: "Rare" as const, unlocked: true, category: "Streaks" },
  { icon: <Flame size={20} />, name: "100-Day Streak", rarity: "Epic" as const, unlocked: false, progress: 14, target: 100, category: "Streaks" },
  { icon: <Trophy size={20} />, name: "First PR", rarity: "Common" as const, unlocked: true, category: "Strength" },
  { icon: <Trophy size={20} />, name: "10 PRs", rarity: "Rare" as const, unlocked: true, category: "Strength" },
  { icon: <Crown size={20} />, name: "100kg Bench", rarity: "Epic" as const, unlocked: true, category: "Strength" },
  { icon: <Crown size={20} />, name: "2x Bodyweight Squat", rarity: "Legendary" as const, unlocked: false, progress: 140, target: 150, category: "Strength" },
  { icon: <Dumbbell size={20} />, name: "50 Workouts", rarity: "Rare" as const, unlocked: true, category: "Workout" },
  { icon: <Dumbbell size={20} />, name: "100 Workouts", rarity: "Epic" as const, unlocked: true, category: "Workout" },
  { icon: <Rocket size={20} />, name: "500 Workouts", rarity: "Legendary" as const, unlocked: false, progress: 142, target: 500, category: "Workout" },
  { icon: <Utensils size={20} />, name: "Perfect Macros", rarity: "Rare" as const, unlocked: true, category: "Nutrition" },
  { icon: <Utensils size={20} />, name: "30-Day Logging", rarity: "Epic" as const, unlocked: false, progress: 20, target: 30, category: "Nutrition" },
  { icon: <Users size={20} />, name: "10 Friends", rarity: "Common" as const, unlocked: true, category: "Social" },
  { icon: <Medal size={20} />, name: "Challenge Winner", rarity: "Epic" as const, unlocked: false, progress: 0, target: 1, category: "Social" },
  { icon: <Shield size={20} />, name: "Top 10 Leaderboard", rarity: "Legendary" as const, unlocked: true, category: "Social" },
  { icon: <Zap size={20} />, name: "10,000 XP", rarity: "Rare" as const, unlocked: true, category: "Workout" },
  { icon: <Star size={20} />, name: "50,000 XP", rarity: "Legendary" as const, unlocked: false, progress: 38450, target: 50000, category: "Workout" },
];

export default function AchievementsPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const filtered = filter === "All" ? achievements : achievements.filter((a) => a.category === filter);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Trophy size={28} className="text-fitx-gold" />
        <div>
          <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase">Achievements</h1>
          <p className="text-xs text-fitx-text-secondary font-body">{unlockedCount} of {achievements.length} unlocked &middot; 200+ total available</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <FitxCard variant="glow" hover={false} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 100 100" className="-rotate-90 w-full h-full">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#D4A040" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 44} strokeDashoffset={2 * Math.PI * 44 * (1 - 0.816)}
                    style={{ filter: "drop-shadow(0 0 6px rgba(212,160,64,0.5))" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-display text-fitx-gold">24</span>
                  <span className="text-[8px] font-heading text-fitx-text-secondary uppercase">Level</span>
                </div>
              </div>
              <div>
                <p className="text-lg font-display tracking-wider text-purple-400 uppercase">Elite</p>
                <p className="text-xs font-mono text-fitx-text-secondary">38,450 / 50,000 XP</p>
                <p className="text-[10px] font-mono text-fitx-text-disabled">11,550 XP to Level 30 (Legend)</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-3xl font-mono font-bold text-fitx-gold">{unlockedCount}</p>
              <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">Badges Earned</p>
            </div>
          </div>
          <div className="h-2 bg-fitx-surface-variant rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "81.6%" }} transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-fitx-gold to-fitx-gold-bright rounded-full" />
          </div>
        </FitxCard>
      </motion.div>

      <FitxCard hover={false} className="mb-6">
        <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-3">Level Tiers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {levels.map((lvl) => (
            <div key={lvl.title} className="text-center p-3 bg-fitx-surface rounded-xl border border-fitx-border">
              <p className={`text-sm font-display tracking-wider uppercase ${lvl.color}`}>{lvl.title}</p>
              <p className="text-[10px] font-mono text-fitx-text-disabled">Lvl {lvl.range}</p>
            </div>
          ))}
        </div>
      </FitxCard>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-heading uppercase tracking-wider transition-all border ${
              filter === cat ? "bg-fitx-gold/20 border-fitx-gold text-fitx-text" : "bg-fitx-surface border-fitx-border text-fitx-text-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <FitxCard hover={false}>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {filtered.map((ach, i) => (
            <motion.div
              key={ach.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.04, 0.5) }}
            >
              <AchievementBadge {...ach} />
            </motion.div>
          ))}
        </div>
      </FitxCard>
    </div>
  );
}
