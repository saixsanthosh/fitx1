"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Check, Plus, Timer, Play, Pause, SkipForward, Calculator,
  TrendingUp, Flame, Trophy, Star, ChevronRight, Dumbbell,
} from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxCard } from "@/components/ui/FitxCard";
import { Confetti } from "@/components/ui/Confetti";
import Link from "next/link";

interface SetRow {
  setNumber: number;
  prevWeight: number;
  prevReps: number;
  weight: string;
  reps: string;
  rpe: number;
  completed: boolean;
  isPR: boolean;
}

interface ActiveExercise {
  id: string;
  name: string;
  sets: SetRow[];
}

const initialExercises: ActiveExercise[] = [
  {
    id: "ex-001", name: "Barbell Bench Press",
    sets: [
      { setNumber: 1, prevWeight: 80, prevReps: 10, weight: "80", reps: "10", rpe: 7, completed: false, isPR: false },
      { setNumber: 2, prevWeight: 80, prevReps: 9, weight: "82.5", reps: "8", rpe: 8, completed: false, isPR: false },
      { setNumber: 3, prevWeight: 82.5, prevReps: 8, weight: "82.5", reps: "8", rpe: 8, completed: false, isPR: false },
      { setNumber: 4, prevWeight: 82.5, prevReps: 7, weight: "85", reps: "6", rpe: 9, completed: false, isPR: false },
    ],
  },
  {
    id: "ex-020", name: "Overhead Press",
    sets: [
      { setNumber: 1, prevWeight: 50, prevReps: 8, weight: "50", reps: "8", rpe: 7, completed: false, isPR: false },
      { setNumber: 2, prevWeight: 50, prevReps: 7, weight: "52.5", reps: "6", rpe: 8, completed: false, isPR: false },
      { setNumber: 3, prevWeight: 52.5, prevReps: 6, weight: "52.5", reps: "6", rpe: 9, completed: false, isPR: false },
    ],
  },
  {
    id: "ex-021", name: "Lateral Raise",
    sets: [
      { setNumber: 1, prevWeight: 10, prevReps: 15, weight: "10", reps: "15", rpe: 7, completed: false, isPR: false },
      { setNumber: 2, prevWeight: 10, prevReps: 14, weight: "12", reps: "12", rpe: 8, completed: false, isPR: false },
      { setNumber: 3, prevWeight: 12, prevReps: 12, weight: "12", reps: "12", rpe: 8, completed: false, isPR: false },
    ],
  },
];

const PLATES = [25, 20, 15, 10, 5, 2.5, 1.25];

function PlateCalculator({ weight, barWeight = 20, onClose }: { weight: number; barWeight?: number; onClose: () => void }) {
  const perSide = Math.max(0, (weight - barWeight) / 2);
  const plates: number[] = [];
  let remaining = perSide;
  for (const plate of PLATES) {
    while (remaining >= plate) {
      plates.push(plate);
      remaining = Math.round((remaining - plate) * 100) / 100;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <FitxCard variant="glow" hover={false} className="max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Plate Calculator</h3>
          <button onClick={onClose} className="text-fitx-text-secondary hover:text-fitx-text"><X size={18} /></button>
        </div>
        <div className="text-center mb-4">
          <p className="text-3xl font-mono font-bold text-fitx-primary">{weight} kg</p>
          <p className="text-xs text-fitx-text-secondary font-body">Bar: {barWeight}kg &middot; Per side: {perSide}kg</p>
        </div>
        {plates.length > 0 ? (
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {plates.map((p, i) => (
              <span key={i} className="px-2 py-3 bg-fitx-primary/20 border border-fitx-primary/40 rounded-lg font-mono text-sm text-fitx-text font-bold">
                {p}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-fitx-text-secondary font-body">Just the bar</p>
        )}
      </FitxCard>
    </motion.div>
  );
}

function RestTimer({ seconds, onSkip, onClose }: { seconds: number; onSkip: () => void; onClose: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (remaining <= 0) { onClose(); return; }
    const timer = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining, paused, onClose]);

  const progress = remaining / seconds;
  const circ = 2 * Math.PI * 70;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-fitx-surface border-t border-fitx-primary/30 p-4"
    >
      <div className="max-w-md mx-auto flex items-center gap-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg viewBox="0 0 160 160" className="-rotate-90 w-full h-full">
            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
            <circle cx="80" cy="80" r="70" fill="none" stroke="#E8160C" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
              style={{ filter: "drop-shadow(0 0 6px rgba(232,22,12,0.5))", transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-mono font-bold text-fitx-text">{remaining}s</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-heading text-sm text-fitx-text uppercase tracking-wider">Rest Timer</p>
          <p className="text-xs text-fitx-text-secondary font-body">Next set coming up</p>
        </div>
        <button onClick={() => setPaused(!paused)} className="w-10 h-10 rounded-xl bg-fitx-surface-variant flex items-center justify-center text-fitx-text">
          {paused ? <Play size={18} /> : <Pause size={18} />}
        </button>
        <button onClick={onSkip} className="w-10 h-10 rounded-xl bg-fitx-primary flex items-center justify-center text-white">
          <SkipForward size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ActiveWorkoutPage() {
  const [exercises, setExercises] = useState(initialExercises);
  const [elapsed, setElapsed] = useState(0);
  const [showPlates, setShowPlates] = useState<number | null>(null);
  const [restActive, setRestActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [completed]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const updateSet = (exId: string, setNum: number, field: "weight" | "reps", value: string) => {
    setExercises((prev) => prev.map((ex) =>
      ex.id === exId ? { ...ex, sets: ex.sets.map((s) => s.setNumber === setNum ? { ...s, [field]: value } : s) } : ex
    ));
  };

  const completeSet = (exId: string, setNum: number) => {
    setExercises((prev) => prev.map((ex) =>
      ex.id === exId ? {
        ...ex, sets: ex.sets.map((s) => {
          if (s.setNumber !== setNum) return s;
          const w = parseFloat(s.weight) || 0;
          const isPR = w > s.prevWeight;
          return { ...s, completed: !s.completed, isPR: !s.completed && isPR };
        })
      } : ex
    ));
    setRestActive(true);
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const doneSets = exercises.reduce((sum, ex) => sum + ex.sets.filter((s) => s.completed).length, 0);
  const totalVolume = exercises.reduce((sum, ex) =>
    sum + ex.sets.filter((s) => s.completed).reduce((v, s) => v + (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0), 0), 0
  );
  const prCount = exercises.reduce((sum, ex) => sum + ex.sets.filter((s) => s.isPR).length, 0);

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <Confetti active={true} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,22,12,0.15)_0%,transparent_60%)]" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative z-10 max-w-md w-full text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Flame className="h-20 w-20 text-fitx-primary mx-auto mb-4" />
          </motion.div>
          <h1 className="text-5xl font-display tracking-wider text-fitx-text uppercase mb-2">
            Workout <span className="text-gradient-red">Complete</span>
          </h1>
          <p className="text-fitx-text-secondary font-body mb-6">Push Day — crushed it! 💪</p>

          <FitxCard variant="glow" hover={false} className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-mono font-bold text-fitx-text">{formatTime(elapsed)}</p>
                <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">Duration</p>
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-fitx-text">{Math.round(totalVolume).toLocaleString()} kg</p>
                <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">Volume</p>
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-fitx-text">{doneSets}</p>
                <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">Sets</p>
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-fitx-gold">{prCount}</p>
                <p className="text-[10px] font-heading text-fitx-text-secondary uppercase">New PRs</p>
              </div>
            </div>
          </FitxCard>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="flex items-center justify-center gap-2 bg-fitx-gold/10 border border-fitx-gold/30 rounded-xl p-3 mb-4"
          >
            <Star className="h-5 w-5 text-fitx-gold fill-fitx-gold" />
            <span className="font-mono text-fitx-gold font-bold">+320 XP earned</span>
          </motion.div>

          <FitxCard hover={false} className="mb-6 text-left">
            <p className="text-xs font-heading text-fitx-primary uppercase tracking-wider mb-1">AI Coach</p>
            <p className="text-sm text-fitx-text font-body">
              Excellent session! You hit {prCount} new PR{prCount !== 1 ? "s" : ""} and pushed your volume up 6% from last week.
              Make sure to get 30g+ protein in the next hour for optimal recovery.
            </p>
          </FitxCard>

          <div className="flex gap-3">
            <Link href="/dashboard" className="flex-1">
              <FitxButton variant="outline" size="lg" className="w-full">Done</FitxButton>
            </Link>
            <FitxButton variant="primary" size="lg" className="flex-1" icon={<TrendingUp size={18} />}>
              Share Card
            </FitxButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="sticky top-0 z-30 bg-[#030000]/90 backdrop-blur-xl border-b border-fitx-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/workouts" className="text-fitx-text-secondary hover:text-fitx-text">
            <X size={22} />
          </Link>
          <div className="text-center">
            <p className="font-heading text-sm text-fitx-text uppercase tracking-wider">Push Day</p>
            <p className="text-xs font-mono text-fitx-primary">{formatTime(elapsed)}</p>
          </div>
          <FitxButton variant="primary" size="sm" onClick={() => setCompleted(true)}>
            Finish
          </FitxButton>
        </div>
        <div className="h-1 bg-fitx-surface-variant">
          <motion.div
            className="h-full bg-gradient-to-r from-fitx-primary to-fitx-glow"
            animate={{ width: `${(doneSets / totalSets) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {exercises.map((ex, exIndex) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: exIndex * 0.1 }}
          >
            <FitxCard hover={false}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-fitx-surface flex items-center justify-center">
                    <Dumbbell size={18} className="text-fitx-primary" />
                  </div>
                  <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">{ex.name}</h3>
                </div>
                <button
                  onClick={() => setShowPlates(parseFloat(ex.sets[0].weight) || 0)}
                  className="text-fitx-text-secondary hover:text-fitx-primary transition-colors"
                >
                  <Calculator size={18} />
                </button>
              </div>

              <div className="grid grid-cols-[40px_1fr_1fr_1fr_44px] gap-2 mb-2 px-2">
                <span className="text-[10px] font-heading text-fitx-text-disabled uppercase">Set</span>
                <span className="text-[10px] font-heading text-fitx-text-disabled uppercase text-center">Prev</span>
                <span className="text-[10px] font-heading text-fitx-text-disabled uppercase text-center">Kg</span>
                <span className="text-[10px] font-heading text-fitx-text-disabled uppercase text-center">Reps</span>
                <span></span>
              </div>

              <div className="space-y-2">
                {ex.sets.map((set) => (
                  <div
                    key={set.setNumber}
                    className={`grid grid-cols-[40px_1fr_1fr_1fr_44px] gap-2 items-center p-2 rounded-lg transition-colors ${
                      set.completed ? "bg-fitx-success/10" : "bg-fitx-surface/50"
                    }`}
                  >
                    <span className="text-sm font-mono text-fitx-text-secondary text-center flex items-center justify-center gap-1">
                      {set.setNumber}
                      {set.isPR && <Trophy size={10} className="text-fitx-gold" />}
                    </span>
                    <span className="text-[11px] font-mono text-fitx-text-disabled text-center">
                      {set.prevWeight}×{set.prevReps}
                    </span>
                    <input
                      value={set.weight}
                      onChange={(e) => updateSet(ex.id, set.setNumber, "weight", e.target.value)}
                      inputMode="decimal"
                      className="bg-fitx-surface border border-fitx-border rounded-lg py-1.5 text-center text-sm font-mono text-fitx-text focus:outline-none focus:border-fitx-primary/60"
                    />
                    <input
                      value={set.reps}
                      onChange={(e) => updateSet(ex.id, set.setNumber, "reps", e.target.value)}
                      inputMode="numeric"
                      className="bg-fitx-surface border border-fitx-border rounded-lg py-1.5 text-center text-sm font-mono text-fitx-text focus:outline-none focus:border-fitx-primary/60"
                    />
                    <button
                      onClick={() => completeSet(ex.id, set.setNumber)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                        set.completed ? "bg-fitx-success text-white" : "bg-fitx-surface-variant text-fitx-text-disabled hover:text-fitx-text"
                      }`}
                    >
                      <Check size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button className="mt-3 w-full py-2 rounded-lg border border-dashed border-fitx-border text-xs font-heading text-fitx-text-secondary uppercase tracking-wider hover:border-fitx-primary/40 hover:text-fitx-text transition-all flex items-center justify-center gap-1">
                <Plus size={14} /> Add Set
              </button>
            </FitxCard>
          </motion.div>
        ))}

        <FitxButton variant="outline" size="lg" className="w-full" icon={<Plus size={18} />}>
          Add Exercise
        </FitxButton>
      </div>

      <AnimatePresence>
        {showPlates !== null && (
          <PlateCalculator weight={showPlates} onClose={() => setShowPlates(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {restActive && (
          <RestTimer seconds={90} onSkip={() => setRestActive(false)} onClose={() => setRestActive(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
