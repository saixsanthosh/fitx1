"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, Share2, Plus, Dumbbell, AlertTriangle,
  Lightbulb, TrendingUp, Repeat, Play,
} from "lucide-react";
import { exercises } from "@/data/exercises";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";
import { SmartImage } from "@/components/ui/SmartImage";
import { muscleImage, muscleGradient } from "@/data/images";
import Link from "next/link";

const tabs = ["How To", "Tips", "Muscles", "History", "Alternatives"] as const;

const sampleHistory = [
  { date: "May 30", sets: "4×10", weight: "80 kg", volume: "3,200 kg" },
  { date: "May 27", sets: "4×8", weight: "82.5 kg", volume: "2,640 kg" },
  { date: "May 23", sets: "5×5", weight: "90 kg", volume: "2,250 kg" },
  { date: "May 20", sets: "4×10", weight: "77.5 kg", volume: "3,100 kg" },
];

export default function ExerciseDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const exercise = exercises.find((ex) => ex.id === id);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("How To");
  const [favorite, setFavorite] = useState(false);

  if (!exercise) {
    return (
      <div className="p-8 text-center">
        <Dumbbell className="h-16 w-16 text-fitx-text-disabled mx-auto mb-4" />
        <h2 className="text-xl font-heading text-fitx-text uppercase mb-2">Exercise Not Found</h2>
        <Link href="/exercises">
          <FitxButton variant="outline" size="md" icon={<ArrowLeft size={16} />}>Back to Library</FitxButton>
        </Link>
      </div>
    );
  }

  const difficultyColor: Record<string, string> = {
    Beginner: "bg-fitx-success/20 text-fitx-success border-fitx-success/30",
    Intermediate: "bg-fitx-warning/20 text-fitx-warning border-fitx-warning/30",
    Advanced: "bg-fitx-primary/20 text-fitx-primary border-fitx-primary/30",
  };

  const alternatives = exercises.filter(
    (ex) => ex.muscleGroup === exercise.muscleGroup && ex.id !== exercise.id
  ).slice(0, 6);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/exercises" className="text-fitx-text-secondary hover:text-fitx-text transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <span className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider">Exercise Library</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative aspect-video rounded-2xl mb-6 border border-fitx-border overflow-hidden">
          <SmartImage
            src={muscleImage[exercise.muscleGroup] ?? muscleImage.Chest}
            alt={exercise.name}
            className="w-full h-full"
            fallbackGradient={muscleGradient[exercise.muscleGroup] ?? "from-fitx-primary/30 to-fitx-surface"}
            fallbackIcon={<Dumbbell size={64} />}
            overlay
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-16 h-16 rounded-full bg-fitx-primary/80 flex items-center justify-center cursor-pointer hover:bg-fitx-primary transition-colors group">
              <Play size={28} className="text-white ml-1 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <span className="absolute bottom-3 left-3 z-10 text-[10px] font-heading uppercase tracking-widest bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white/80">
            Form Demo
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase">
              {exercise.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-fitx-primary/15 text-fitx-primary px-3 py-1 rounded-full font-mono">
                {exercise.muscleGroup}
              </span>
              {exercise.secondaryMuscles.map((m) => (
                <span key={m} className="text-xs bg-fitx-surface-variant text-fitx-text-secondary px-3 py-1 rounded-full font-mono">
                  {m}
                </span>
              ))}
              <span className={`text-xs px-3 py-1 rounded-full font-heading uppercase border ${difficultyColor[exercise.difficulty]}`}>
                {exercise.difficulty}
              </span>
              <span className="text-xs bg-fitx-surface-variant text-fitx-text-secondary px-3 py-1 rounded-full font-mono">
                {exercise.type}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <FitxButton
              variant={favorite ? "primary" : "secondary"}
              size="sm"
              icon={<Heart size={14} className={favorite ? "fill-white" : ""} />}
              onClick={() => setFavorite(!favorite)}
            >
              {favorite ? "Saved" : "Favorite"}
            </FitxButton>
            <FitxButton variant="secondary" size="sm" icon={<Share2 size={14} />}>
              Share
            </FitxButton>
            <FitxButton variant="primary" size="sm" icon={<Plus size={14} />}>
              Add to Workout
            </FitxButton>
          </div>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-heading uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-fitx-primary/20 text-fitx-text border border-fitx-primary/40"
                  : "text-fitx-text-secondary hover:text-fitx-text border border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "How To" && (
          <div className="space-y-6">
            <FitxCard hover={false}>
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4 flex items-center gap-2">
                <Dumbbell size={16} className="text-fitx-primary" /> Instructions
              </h3>
              <ol className="space-y-3">
                {exercise.instructions.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-fitx-primary/20 border border-fitx-primary/30 flex items-center justify-center font-mono text-xs text-fitx-primary font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-fitx-text-secondary font-body leading-relaxed pt-0.5">{step}</p>
                  </motion.li>
                ))}
              </ol>
            </FitxCard>

            <FitxCard hover={false}>
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertTriangle size={16} className="text-fitx-warning" /> Common Mistakes
              </h3>
              <div className="space-y-2">
                {exercise.commonMistakes.map((mistake, i) => (
                  <div key={i} className="flex items-start gap-2 bg-fitx-warning/5 border border-fitx-warning/10 rounded-lg p-3">
                    <AlertTriangle size={14} className="text-fitx-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-fitx-text-secondary font-body">{mistake}</p>
                  </div>
                ))}
              </div>
            </FitxCard>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider">Equipment:</span>
              {exercise.equipment.map((eq) => (
                <span key={eq} className="text-xs bg-fitx-surface border border-fitx-border px-3 py-1 rounded-full font-mono text-fitx-text-secondary">
                  {eq}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Tips" && (
          <div className="space-y-3">
            {exercise.tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <FitxCard hover={false} className="flex items-start gap-3">
                  <Lightbulb size={18} className="text-fitx-gold flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-fitx-text font-body">{tip}</p>
                </FitxCard>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "Muscles" && (
          <FitxCard hover={false}>
            <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4">Muscles Worked</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-heading text-fitx-primary uppercase tracking-wider mb-2">Primary</p>
                <div className="space-y-2">
                  {exercise.musclesWorked.slice(0, 2).map((m) => (
                    <div key={m} className="flex items-center gap-3">
                      <div className="h-2 flex-1 bg-fitx-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-fitx-primary rounded-full" style={{ width: "90%" }} />
                      </div>
                      <span className="text-xs font-mono text-fitx-text w-32 text-right">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-2">Secondary</p>
                <div className="space-y-2">
                  {exercise.musclesWorked.slice(2).map((m) => (
                    <div key={m} className="flex items-center gap-3">
                      <div className="h-2 flex-1 bg-fitx-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-fitx-gold/60 rounded-full" style={{ width: "50%" }} />
                      </div>
                      <span className="text-xs font-mono text-fitx-text-secondary w-32 text-right">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FitxCard>
        )}

        {activeTab === "History" && (
          <FitxCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider flex items-center gap-2">
                <TrendingUp size={16} className="text-fitx-primary" /> Personal History
              </h3>
              <div className="text-right">
                <p className="text-xs font-heading text-fitx-gold uppercase">Personal Best</p>
                <p className="text-lg font-mono font-bold text-fitx-gold">90 kg × 5</p>
              </div>
            </div>
            <div className="space-y-2">
              {sampleHistory.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-fitx-surface rounded-xl border border-fitx-border">
                  <span className="text-xs font-mono text-fitx-text-secondary">{h.date}</span>
                  <span className="text-xs font-mono text-fitx-text">{h.sets}</span>
                  <span className="text-sm font-mono font-bold text-fitx-text">{h.weight}</span>
                  <span className="text-xs font-mono text-fitx-text-secondary">{h.volume}</span>
                </div>
              ))}
            </div>
          </FitxCard>
        )}

        {activeTab === "Alternatives" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alternatives.map((alt) => (
              <Link key={alt.id} href={`/exercises/${alt.id}`}>
                <FitxCard className="group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-fitx-surface flex items-center justify-center">
                      <Repeat size={16} className="text-fitx-text-disabled group-hover:text-fitx-primary transition-colors" />
                    </div>
                    <div>
                      <p className="font-heading text-xs text-fitx-text uppercase tracking-wider group-hover:text-fitx-primary transition-colors">
                        {alt.name}
                      </p>
                      <p className="text-[10px] text-fitx-text-secondary font-mono">
                        {alt.difficulty} &middot; {alt.type}
                      </p>
                    </div>
                  </div>
                </FitxCard>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
