"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit3, Settings, Share2, Flame, Trophy, Dumbbell, TrendingUp,
  Calendar, MapPin, Award, Star, Users, Zap,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import Link from "next/link";

const stats = [
  { label: "Workouts", value: "142", icon: Dumbbell },
  { label: "Total Volume", value: "845K", icon: TrendingUp },
  { label: "Day Streak", value: "14", icon: Flame },
  { label: "PRs", value: "23", icon: Trophy },
];

const recentBadges = [
  { icon: <Trophy size={20} />, name: "100kg Bench", rarity: "Epic" as const, unlocked: true },
  { icon: <Flame size={20} />, name: "30-Day Streak", rarity: "Rare" as const, unlocked: true },
  { icon: <Star size={20} />, name: "Top 10", rarity: "Legendary" as const, unlocked: true },
  { icon: <Dumbbell size={20} />, name: "100 Workouts", rarity: "Epic" as const, unlocked: true },
];

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("Powerlifter chasing a 500kg total. PPL 6x/week. Coffee addict. Never skip leg day. 💪");

  return (
    <div className="pb-12">
      <div className="relative h-48 bg-gradient-to-br from-fitx-primary/30 via-fitx-surface-variant to-[#030000] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,22,12,0.2)_0%,transparent_60%)]" />
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <Share2 size={18} />
          </button>
          <Link href="/settings">
            <button className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
              <Settings size={18} />
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-16 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-fitx-primary/20 border-4 border-[#030000] flex items-center justify-center font-display text-fitx-primary text-4xl tracking-wider">
              AK
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-fitx-gold border-2 border-[#030000] flex items-center justify-center">
              <span className="text-xs font-mono font-bold text-black">24</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display tracking-wider text-fitx-text uppercase">Alex Knight</h1>
              <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-heading uppercase">Elite</span>
            </div>
            <p className="text-sm text-fitx-text-secondary font-body flex items-center gap-2 mt-1">
              <MapPin size={12} /> Mumbai, India
              <span className="text-fitx-text-disabled">·</span>
              <Calendar size={12} /> Joined Dec 2025
            </p>
          </div>
          <FitxButton variant="outline" size="sm" icon={<Edit3 size={14} />} onClick={() => setEditing(!editing)}>
            {editing ? "Save" : "Edit Profile"}
          </FitxButton>
        </div>

        <FitxCard hover={false} className="mb-6">
          {editing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-fitx-surface border border-fitx-border rounded-xl px-4 py-3 font-body text-fitx-text focus:outline-none focus:border-fitx-primary/60 resize-none"
            />
          ) : (
            <p className="text-sm text-fitx-text font-body">{bio}</p>
          )}
        </FitxCard>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <FitxCard hover={false} className="text-center">
                <stat.icon size={20} className="text-fitx-primary mx-auto mb-2" />
                <p className="text-xl font-mono font-bold text-fitx-text">{stat.value}</p>
                <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">{stat.label}</p>
              </FitxCard>
            </motion.div>
          ))}
        </div>

        <FitxCard hover={false} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-fitx-gold" />
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Level Progress</h3>
            </div>
            <span className="text-xs font-mono text-fitx-text-secondary">38,450 / 50,000 XP</span>
          </div>
          <div className="h-3 bg-fitx-surface-variant rounded-full overflow-hidden mb-2">
            <motion.div initial={{ width: 0 }} animate={{ width: "76.9%" }} transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-fitx-gold to-fitx-gold-bright rounded-full" />
          </div>
          <p className="text-[10px] font-mono text-fitx-text-disabled">Level 24 (Elite) → Level 30 (Legend)</p>
        </FitxCard>

        <FitxCard hover={false}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-fitx-gold" />
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Recent Badges</h3>
            </div>
            <Link href="/achievements" className="text-xs text-fitx-primary hover:text-fitx-primary-bright font-heading uppercase tracking-wider">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {recentBadges.map((badge, i) => (
              <motion.div key={badge.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
                <AchievementBadge {...badge} />
              </motion.div>
            ))}
          </div>
        </FitxCard>
      </div>
    </div>
  );
}
