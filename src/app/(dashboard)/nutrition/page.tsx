"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Plus, Trash2, Droplets, Utensils,
  Camera, ScanLine, Sparkles, Apple, Coffee, UtensilsCrossed, Cookie,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";
import { MacroRing } from "@/components/ui/MacroRing";

const mealIcons: Record<string, React.ElementType> = {
  Breakfast: Coffee, Lunch: UtensilsCrossed, Dinner: Utensils, Snack: Cookie,
};

const sampleMeals = {
  Breakfast: [
    { name: "Oatmeal with Banana", calories: 350, protein: 12, carbs: 58, fat: 7 },
    { name: "Whey Protein Shake", calories: 130, protein: 25, carbs: 3, fat: 2 },
  ],
  Lunch: [
    { name: "Grilled Chicken + Rice", calories: 620, protein: 52, carbs: 68, fat: 8 },
    { name: "Mixed Green Salad", calories: 80, protein: 3, carbs: 8, fat: 4 },
  ],
  Dinner: [
    { name: "Salmon Fillet + Sweet Potato", calories: 580, protein: 42, carbs: 48, fat: 18 },
  ],
  Snack: [
    { name: "Greek Yogurt + Almonds", calories: 220, protein: 18, carbs: 12, fat: 10 },
  ],
};

const totals = { calories: 1980, protein: 152, carbs: 197, fat: 49 };
const targets = { calories: 2400, protein: 180, carbs: 260, fat: 70 };

export default function NutritionPage() {
  const [date, setDate] = useState(new Date());
  const [waterMl, setWaterMl] = useState(1750);
  const waterGoal = 3000;

  const dateStr = date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase">Nutrition</h1>
          <div className="flex items-center gap-3 mt-2">
            <button onClick={() => setDate(new Date(date.getTime() - 86400000))} className="text-fitx-text-secondary hover:text-fitx-text">
              <ChevronLeft size={20} />
            </button>
            <span className="font-heading text-sm text-fitx-text uppercase tracking-wider">{dateStr}</span>
            <button onClick={() => setDate(new Date(date.getTime() + 86400000))} className="text-fitx-text-secondary hover:text-fitx-text">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <FitxButton variant="secondary" size="sm" icon={<Camera size={14} />}>Photo</FitxButton>
          <FitxButton variant="secondary" size="sm" icon={<ScanLine size={14} />}>Scan</FitxButton>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <FitxCard className="mb-6">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="relative">
              <MacroRing value={totals.calories} max={targets.calories} color="#E8160C" label="Calories" unit="kcal" size={140} strokeWidth={10} />
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <MacroRing value={totals.protein} max={targets.protein} color="#3B82F6" label="Protein" size={80} strokeWidth={6} />
              <MacroRing value={totals.carbs} max={targets.carbs} color="#22C55E" label="Carbs" size={80} strokeWidth={6} />
              <MacroRing value={totals.fat} max={targets.fat} color="#EAB308" label="Fat" size={80} strokeWidth={6} />
            </div>
          </div>
          <div className="text-center mt-4">
            <span className="text-sm font-mono text-fitx-text-secondary">
              {targets.calories - totals.calories} kcal remaining
            </span>
          </div>
        </FitxCard>
      </motion.div>

      <div className="space-y-4 mb-6">
        {(Object.keys(sampleMeals) as Array<keyof typeof sampleMeals>).map((meal, mi) => {
          const MealIcon = mealIcons[meal];
          const items = sampleMeals[meal];
          const mealCalories = items.reduce((sum, f) => sum + f.calories, 0);

          return (
            <motion.div
              key={meal}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mi * 0.1 }}
            >
              <FitxCard hover={false}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MealIcon size={18} className="text-fitx-primary" />
                    <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">{meal}</h3>
                    <span className="text-xs font-mono text-fitx-text-secondary">{mealCalories} kcal</span>
                  </div>
                  <FitxButton variant="ghost" size="sm" icon={<Plus size={14} />}>Add</FitxButton>
                </div>
                <div className="space-y-2">
                  {items.map((food, fi) => (
                    <div key={fi} className="flex items-center justify-between py-2 px-3 bg-fitx-surface rounded-lg group">
                      <div className="flex-1">
                        <p className="text-sm text-fitx-text font-body">{food.name}</p>
                        <div className="flex gap-3 mt-0.5">
                          <span className="text-[10px] font-mono text-fitx-primary">{food.calories} kcal</span>
                          <span className="text-[10px] font-mono text-blue-400">P: {food.protein}g</span>
                          <span className="text-[10px] font-mono text-green-400">C: {food.carbs}g</span>
                          <span className="text-[10px] font-mono text-yellow-400">F: {food.fat}g</span>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 text-fitx-text-disabled hover:text-red-400 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </FitxCard>
            </motion.div>
          );
        })}
      </div>

      <FitxCard hover={false} className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Droplets size={18} className="text-fitx-info" />
          <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">Water Intake</h3>
          <span className="text-xs font-mono text-fitx-text-secondary ml-auto">
            {waterMl} / {waterGoal} ml
          </span>
        </div>
        <div className="h-4 bg-fitx-surface-variant rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((waterMl / waterGoal) * 100, 100)}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-fitx-info to-blue-400 rounded-full"
          />
        </div>
        <div className="flex gap-2">
          {[250, 500, 750].map((ml) => (
            <FitxButton key={ml} variant="secondary" size="sm" onClick={() => setWaterMl(Math.min(waterMl + ml, 5000))}>
              +{ml}ml
            </FitxButton>
          ))}
        </div>
      </FitxCard>

      <FitxCard hover={false}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className="text-fitx-gold" />
          <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">AI Meal Suggestion</h3>
        </div>
        <p className="text-sm text-fitx-text-secondary font-body mb-3">
          You&apos;re 420 kcal and 28g protein short. Try adding a grilled chicken breast (165g) with rice for a perfect finish.
        </p>
        <FitxButton variant="gold" size="sm" icon={<Sparkles size={14} />}>
          Generate Full Meal Plan
        </FitxButton>
      </FitxCard>
    </div>
  );
}
