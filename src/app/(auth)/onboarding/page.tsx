"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Target, Dumbbell, CalendarDays, Ruler, Camera, Sparkles,
  ArrowLeft, ArrowRight, Check,
} from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxCard } from "@/components/ui/FitxCard";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/config/brand";

const steps = [
  { title: "Your Goals", icon: Target },
  { title: "Experience", icon: Dumbbell },
  { title: "Equipment", icon: Dumbbell },
  { title: "Schedule", icon: CalendarDays },
  { title: "Body Metrics", icon: Ruler },
  { title: "Progress Photos", icon: Camera },
  { title: "Your Plan", icon: Sparkles },
];

const goalOptions = [
  "Build Muscle", "Lose Fat", "Gain Strength", "Improve Endurance",
  "Increase Flexibility", "Athletic Performance", "Rehabilitation", "General Health",
];

const equipmentOptions = [
  "No Equipment", "Dumbbells", "Barbell & Rack", "Full Gym",
  "Resistance Bands", "Cables", "Kettlebells", "Pull-up Bar",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Wed", "Fri"]);
  const [duration, setDuration] = useState(60);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleItem = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setShowConfetti(true);
      setTimeout(() => { window.location.href = "/dashboard"; }, 2000);
    }
  };

  const prev = () => { if (step > 0) setStep(step - 1); };

  const ChipButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-3 rounded-xl text-sm font-heading uppercase tracking-wider transition-all border ${
        active
          ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text"
          : "bg-fitx-surface border-fitx-border text-fitx-text-secondary hover:border-fitx-primary/30"
      }`}
    >
      {label}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8 relative">
      {showConfetti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center"
          >
            <Flame className="h-24 w-24 text-fitx-primary mx-auto mb-4 animate-fire-flicker" style={{ animation: "fire-flicker 0.5s ease-in-out infinite" }} />
            <h2 className="text-5xl font-display tracking-wider text-fitx-text uppercase mb-2">
              LET&apos;S GO!
            </h2>
            <p className="text-lg text-fitx-text-secondary font-body">Your journey starts now.</p>
          </motion.div>
        </div>
      )}

      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <Logo size={36} className="mx-auto mb-2" />
          <span className="text-xl font-display tracking-[0.2em] text-fitx-text">{BRAND.name}</span>
        </div>

        <div className="flex gap-1 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-fitx-primary" : "bg-fitx-surface-variant"}`} />
          ))}
        </div>
        <p className="text-center text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-6">
          Step {step + 1} of {steps.length} — {steps[step].title}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <FitxCard variant="glow" hover={false} className="p-8">
              {step === 0 && (
                <div>
                  <h2 className="text-2xl font-display tracking-wider text-fitx-text uppercase mb-2">
                    What are your goals?
                  </h2>
                  <p className="text-sm text-fitx-text-secondary font-body mb-6">Select all that apply.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {goalOptions.map((g) => (
                      <ChipButton key={g} label={g} active={goals.includes(g)} onClick={() => toggleItem(g, goals, setGoals)} />
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-display tracking-wider text-fitx-text uppercase mb-2">
                    Your Experience Level
                  </h2>
                  <p className="text-sm text-fitx-text-secondary font-body mb-6">This helps us tailor your programs.</p>
                  <div className="space-y-3">
                    {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                      <motion.button
                        key={lvl}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setExperience(lvl)}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${
                          experience === lvl
                            ? "bg-fitx-primary/20 border-fitx-primary"
                            : "bg-fitx-surface border-fitx-border hover:border-fitx-primary/30"
                        }`}
                      >
                        <p className="font-heading text-sm text-fitx-text uppercase tracking-wider">{lvl}</p>
                        <p className="text-xs text-fitx-text-secondary font-body mt-1">
                          {lvl === "Beginner" && "New to working out or less than 6 months"}
                          {lvl === "Intermediate" && "6 months to 2 years of consistent training"}
                          {lvl === "Advanced" && "2+ years of serious training experience"}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-display tracking-wider text-fitx-text uppercase mb-2">
                    Available Equipment
                  </h2>
                  <p className="text-sm text-fitx-text-secondary font-body mb-6">Select all equipment you have access to.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {equipmentOptions.map((e) => (
                      <ChipButton key={e} label={e} active={equipment.includes(e)} onClick={() => toggleItem(e, equipment, setEquipment)} />
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-display tracking-wider text-fitx-text uppercase mb-2">
                    Your Schedule
                  </h2>
                  <p className="text-sm text-fitx-text-secondary font-body mb-6">Which days and how long?</p>
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {days.map((d) => (
                      <ChipButton key={d} label={d} active={selectedDays.includes(d)} onClick={() => toggleItem(d, selectedDays, setSelectedDays)} />
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-heading text-fitx-text-secondary mb-2 uppercase tracking-wider">
                      Session Duration: {duration} min
                    </label>
                    <input
                      type="range" min={15} max={120} step={15} value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full accent-[#E8160C]"
                    />
                    <div className="flex justify-between text-xs text-fitx-text-disabled font-mono">
                      <span>15 min</span><span>60 min</span><span>120 min</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-display tracking-wider text-fitx-text uppercase mb-2">
                    Body Metrics
                  </h2>
                  <p className="text-sm text-fitx-text-secondary font-body mb-6">Used to calculate your targets.</p>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      {["Male", "Female", "Other"].map((g) => (
                        <ChipButton key={g} label={g} active={gender === g} onClick={() => setGender(g)} />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-heading text-fitx-text-secondary mb-1 uppercase">Age</label>
                        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="25"
                          className="w-full bg-fitx-surface border border-fitx-border rounded-xl px-4 py-3 font-mono text-fitx-text focus:outline-none focus:border-fitx-primary/60 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-heading text-fitx-text-secondary mb-1 uppercase">Height (cm)</label>
                        <input value={height} onChange={(e) => setHeight(e.target.value)} type="number" placeholder="175"
                          className="w-full bg-fitx-surface border border-fitx-border rounded-xl px-4 py-3 font-mono text-fitx-text focus:outline-none focus:border-fitx-primary/60 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-heading text-fitx-text-secondary mb-1 uppercase">Weight (kg)</label>
                        <input value={weight} onChange={(e) => setWeight(e.target.value)} type="number" placeholder="75"
                          className="w-full bg-fitx-surface border border-fitx-border rounded-xl px-4 py-3 font-mono text-fitx-text focus:outline-none focus:border-fitx-primary/60 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-heading text-fitx-text-secondary mb-1 uppercase">Target Weight (kg)</label>
                        <input value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} type="number" placeholder="80"
                          className="w-full bg-fitx-surface border border-fitx-border rounded-xl px-4 py-3 font-mono text-fitx-text focus:outline-none focus:border-fitx-primary/60 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 className="text-2xl font-display tracking-wider text-fitx-text uppercase mb-2">
                    Progress Photos
                  </h2>
                  <p className="text-sm text-fitx-text-secondary font-body mb-6">
                    Optional but highly recommended for tracking transformation.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {["Front", "Side", "Back"].map((angle) => (
                      <div key={angle} className="aspect-[3/4] bg-fitx-surface border-2 border-dashed border-fitx-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-fitx-primary/40 transition-all">
                        <Camera size={24} className="text-fitx-text-disabled mb-2" />
                        <span className="text-xs font-heading text-fitx-text-disabled uppercase">{angle}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-fitx-text-disabled font-body mt-3 text-center">
                    Your photos are private and encrypted. Only you can see them.
                  </p>
                </div>
              )}

              {step === 6 && (
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-fitx-gold mx-auto mb-4" />
                  <h2 className="text-2xl font-display tracking-wider text-fitx-text uppercase mb-2">
                    Your AI Plan Preview
                  </h2>
                  <p className="text-sm text-fitx-text-secondary font-body mb-6">
                    Based on your goals and preferences, here&apos;s your personalized plan:
                  </p>
                  <div className="space-y-3 text-left mb-6">
                    <div className="bg-fitx-surface rounded-xl p-4 border border-fitx-border">
                      <p className="text-xs font-heading text-fitx-primary uppercase tracking-wider mb-1">Workout Plan</p>
                      <p className="text-sm text-fitx-text font-body">
                        {selectedDays.length} days/week, {duration} min sessions — Push/Pull/Legs split
                      </p>
                    </div>
                    <div className="bg-fitx-surface rounded-xl p-4 border border-fitx-border">
                      <p className="text-xs font-heading text-fitx-gold uppercase tracking-wider mb-1">Nutrition Target</p>
                      <p className="text-sm text-fitx-text font-body">
                        ~2,400 kcal/day — 180g Protein, 260g Carbs, 70g Fat
                      </p>
                    </div>
                    <div className="bg-fitx-surface rounded-xl p-4 border border-fitx-border">
                      <p className="text-xs font-heading text-fitx-success uppercase tracking-wider mb-1">Weekly Goals</p>
                      <p className="text-sm text-fitx-text font-body">
                        {goals.slice(0, 3).join(", ")} — progressive overload focus
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </FitxCard>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <FitxButton variant="ghost" size="md" icon={<ArrowLeft size={16} />} onClick={prev}>
              Back
            </FitxButton>
          )}
          <FitxButton
            variant="primary"
            size="lg"
            className="flex-1"
            icon={step === steps.length - 1 ? <Sparkles size={16} /> : <ArrowRight size={16} />}
            onClick={next}
          >
            {step === steps.length - 1 ? "LET'S GO!" : "Continue"}
          </FitxButton>
        </div>
      </div>
    </div>
  );
}
