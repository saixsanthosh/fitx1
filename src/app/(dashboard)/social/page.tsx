"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Trophy, MessageCircle, Heart, Flame, Zap, Award,
  TrendingUp, ChevronRight, Star, Send, Crown,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";

const posts = [
  {
    id: "1", user: "Alex Knight", avatar: "AK", level: 24, time: "2h ago",
    content: "Just hit a new PR on bench press — 100 kg! 🔥 The PPL program is paying off big time.",
    type: "PR", stats: "Bench Press: 100 kg × 5", reactions: 42, comments: 8,
  },
  {
    id: "2", user: "Sarah Chen", avatar: "SC", level: 31, time: "4h ago",
    content: "Completed my 30-day streak! Consistency is everything. 💪",
    type: "Streak", stats: "30-day workout streak", reactions: 67, comments: 12,
  },
  {
    id: "3", user: "Marcus Johnson", avatar: "MJ", level: 28, time: "6h ago",
    content: "Leg day was brutal but hit 140 kg squat for 3. Getting closer to that 4-plate goal!",
    type: "Workout", stats: "Leg Day — 72 min, 18,500 kg volume", reactions: 38, comments: 5,
  },
  {
    id: "4", user: "Priya Sharma", avatar: "PS", level: 19, time: "8h ago",
    content: "6-month transformation update. Down 12 kg, up in confidence. This platform changed my life.",
    type: "Transformation", stats: "6-month progress", reactions: 124, comments: 28,
  },
];

const leaderboard = [
  { rank: 1, name: "Sarah Chen", avatar: "SC", xp: 48200, level: 31, streak: 45 },
  { rank: 2, name: "Marcus Johnson", avatar: "MJ", xp: 42800, level: 28, streak: 32 },
  { rank: 3, name: "Alex Knight", avatar: "AK", xp: 38450, level: 24, streak: 14 },
  { rank: 4, name: "Elena Rodriguez", avatar: "ER", xp: 35100, level: 22, streak: 21 },
  { rank: 5, name: "Arjun Mehta", avatar: "AM", xp: 31500, level: 20, streak: 10 },
];

const challenges = [
  { name: "100 Push-Up Challenge", participants: 2400, daysLeft: 12, progress: 68 },
  { name: "30-Day Streak Warriors", participants: 5100, daysLeft: 16, progress: 47 },
  { name: "Protein King — Hit 180g Daily", participants: 1800, daysLeft: 8, progress: 72 },
];

const reactions = ["🔥", "💪", "👏", "⚡"];

export default function SocialPage() {
  const [tab, setTab] = useState<"feed" | "leaderboard" | "challenges">("feed");

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase mb-6">Community</h1>

      <div className="flex gap-3 mb-6">
        {(["feed", "leaderboard", "challenges"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl font-heading text-sm uppercase tracking-wider transition-all ${
              tab === t ? "bg-fitx-primary/20 text-fitx-text border border-fitx-primary/40" : "text-fitx-text-secondary border border-transparent"
            }`}
          >
            {t === "feed" ? "Activity Feed" : t === "leaderboard" ? "Leaderboard" : "Challenges"}
          </button>
        ))}
      </div>

      {tab === "feed" && (
        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <FitxCard hover={false}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-fitx-primary/20 border-2 border-fitx-primary/40 flex items-center justify-center font-heading text-fitx-primary text-xs">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-heading text-fitx-text uppercase tracking-wider">{post.user}</span>
                      <span className="text-[10px] bg-fitx-primary/10 text-fitx-primary px-2 py-0.5 rounded-full font-mono">
                        Lv.{post.level}
                      </span>
                    </div>
                    <span className="text-[10px] text-fitx-text-disabled font-body">{post.time}</span>
                  </div>
                  {post.type === "PR" && <Trophy size={16} className="text-fitx-gold" />}
                  {post.type === "Streak" && <Flame size={16} className="text-orange-400" />}
                </div>
                <p className="text-sm text-fitx-text font-body mb-3">{post.content}</p>
                {post.stats && (
                  <div className="bg-fitx-surface rounded-lg p-3 mb-3 border border-fitx-border">
                    <p className="text-xs font-mono text-fitx-primary">{post.stats}</p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {reactions.map((r) => (
                      <button key={r} className="px-2 py-1 rounded-full bg-fitx-surface hover:bg-fitx-surface-variant transition-colors text-sm">
                        {r}
                      </button>
                    ))}
                    <span className="text-xs text-fitx-text-secondary font-mono self-center ml-2">{post.reactions}</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-fitx-text-secondary font-body hover:text-fitx-text transition-colors">
                    <MessageCircle size={14} />{post.comments} comments
                  </button>
                </div>
              </FitxCard>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "leaderboard" && (
        <FitxCard hover={false}>
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={18} className="text-fitx-gold" />
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Global Leaderboard</h3>
          </div>
          <div className="space-y-2">
            {leaderboard.map((user, i) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  user.rank <= 3 ? "bg-fitx-gold/5 border-fitx-gold/20" : "bg-fitx-surface border-fitx-border"
                }`}
              >
                <span className={`w-8 text-center font-mono font-bold text-lg ${
                  user.rank === 1 ? "text-fitx-gold" : user.rank === 2 ? "text-gray-400" : user.rank === 3 ? "text-orange-600" : "text-fitx-text-disabled"
                }`}>
                  {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                </span>
                <div className="w-10 h-10 rounded-full bg-fitx-primary/20 border-2 border-fitx-primary/40 flex items-center justify-center font-heading text-fitx-primary text-xs">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-heading text-fitx-text uppercase tracking-wider">{user.name}</p>
                  <p className="text-[10px] text-fitx-text-secondary font-mono">
                    Level {user.level} &middot; {user.streak}-day streak
                  </p>
                </div>
                <span className="text-sm font-mono font-bold text-fitx-gold">{user.xp.toLocaleString()} XP</span>
              </motion.div>
            ))}
          </div>
        </FitxCard>
      )}

      {tab === "challenges" && (
        <div className="space-y-4">
          {challenges.map((ch, i) => (
            <motion.div
              key={ch.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <FitxCard>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">{ch.name}</h3>
                  <span className="text-[10px] bg-fitx-warning/20 text-fitx-warning px-2 py-0.5 rounded-full font-mono">
                    {ch.daysLeft} days left
                  </span>
                </div>
                <div className="h-3 bg-fitx-surface-variant rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ch.progress}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-fitx-primary to-fitx-glow rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-fitx-text-secondary">{ch.progress}% complete</span>
                  <span className="text-xs font-mono text-fitx-text-disabled">{ch.participants.toLocaleString()} participants</span>
                </div>
              </FitxCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
