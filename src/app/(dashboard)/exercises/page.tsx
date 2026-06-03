"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Grid3x3, List, Heart, Dumbbell, ChevronDown } from "lucide-react";
import { exercises, muscleGroups, equipmentList } from "@/data/exercises";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxInput } from "@/components/ui/FitxInput";
import Link from "next/link";
import type { MuscleGroup, Equipment, Difficulty, ExerciseType } from "@/types";

export default function ExerciseLibraryPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "">("");
  const [selectedType, setSelectedType] = useState<ExerciseType | "">("");
  const [sort, setSort] = useState("name");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let result = exercises.filter((ex) => {
      if (search && !ex.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedMuscles.length && !selectedMuscles.includes(ex.muscleGroup)) return false;
      if (selectedEquipment.length && !ex.equipment.some((e) => selectedEquipment.includes(e))) return false;
      if (selectedDifficulty && ex.difficulty !== selectedDifficulty) return false;
      if (selectedType && ex.type !== selectedType) return false;
      return true;
    });

    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "difficulty") {
      const order = { Beginner: 0, Intermediate: 1, Advanced: 2 };
      result.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    }

    return result;
  }, [search, selectedMuscles, selectedEquipment, selectedDifficulty, selectedType, sort]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFilter = <T,>(item: T, list: T[], setter: (v: T[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const difficultyColor: Record<string, string> = {
    Beginner: "bg-fitx-success/20 text-fitx-success",
    Intermediate: "bg-fitx-warning/20 text-fitx-warning",
    Advanced: "bg-fitx-primary/20 text-fitx-primary",
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase mb-1">
          Exercise Library
        </h1>
        <p className="text-sm text-fitx-text-secondary font-body">
          {exercises.length} exercises &middot; {filtered.length} matching your filters
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <FitxInput
            placeholder="Search exercises..."
            icon={<Search size={18} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-heading text-sm uppercase tracking-wider ${
              showFilters ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text" : "bg-fitx-surface border-fitx-border text-fitx-text-secondary"
            }`}
          >
            <Filter size={16} /> Filters <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-fitx-surface border border-fitx-border rounded-xl px-4 py-2.5 font-heading text-sm text-fitx-text-secondary uppercase tracking-wider focus:outline-none focus:border-fitx-primary/60"
          >
            <option value="name">A-Z</option>
            <option value="difficulty">Difficulty</option>
          </select>
          <div className="flex border border-fitx-border rounded-xl overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-2.5 ${view === "grid" ? "bg-fitx-primary/20 text-fitx-text" : "text-fitx-text-secondary"}`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2.5 ${view === "list" ? "bg-fitx-primary/20 text-fitx-text" : "text-fitx-text-secondary"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-6"
          >
            <FitxCard hover={false} className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-2">Muscle Group</p>
                  <div className="flex flex-wrap gap-2">
                    {muscleGroups.map((mg) => (
                      <button
                        key={mg}
                        onClick={() => toggleFilter(mg as MuscleGroup, selectedMuscles, setSelectedMuscles)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider transition-all border ${
                          selectedMuscles.includes(mg as MuscleGroup)
                            ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text"
                            : "bg-fitx-surface border-fitx-border text-fitx-text-secondary"
                        }`}
                      >
                        {mg}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-2">Equipment</p>
                  <div className="flex flex-wrap gap-2">
                    {equipmentList.map((eq) => (
                      <button
                        key={eq}
                        onClick={() => toggleFilter(eq as Equipment, selectedEquipment, setSelectedEquipment)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider transition-all border ${
                          selectedEquipment.includes(eq as Equipment)
                            ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text"
                            : "bg-fitx-surface border-fitx-border text-fitx-text-secondary"
                        }`}
                      >
                        {eq}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-2">Difficulty</p>
                    <div className="flex gap-2">
                      {["Beginner", "Intermediate", "Advanced"].map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDifficulty(selectedDifficulty === d ? "" : d as Difficulty)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider transition-all border ${
                            selectedDifficulty === d ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text" : "bg-fitx-surface border-fitx-border text-fitx-text-secondary"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-2">Type</p>
                    <div className="flex gap-2">
                      {["Compound", "Isolation", "Isometric", "Cardio"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedType(selectedType === t ? "" : t as ExerciseType)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider transition-all border ${
                            selectedType === t ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text" : "bg-fitx-surface border-fitx-border text-fitx-text-secondary"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FitxCard>
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Dumbbell className="h-16 w-16 text-fitx-text-disabled mx-auto mb-4" />
          <h3 className="text-lg font-heading text-fitx-text uppercase tracking-wider mb-2">No exercises found</h3>
          <p className="text-sm text-fitx-text-secondary font-body">Try adjusting your filters or search term.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((ex, i) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
            >
              <Link href={`/exercises/${ex.id}`}>
                <FitxCard className="group cursor-pointer h-full">
                  <div className="relative aspect-video bg-fitx-surface rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <Dumbbell className="h-12 w-12 text-fitx-text-disabled group-hover:text-fitx-primary/40 transition-colors" />
                    <button
                      onClick={(e) => { e.preventDefault(); toggleFavorite(ex.id); }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm"
                    >
                      <Heart size={14} className={favorites.has(ex.id) ? "text-fitx-primary fill-fitx-primary" : "text-white/60"} />
                    </button>
                  </div>
                  <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-2 group-hover:text-fitx-primary transition-colors">
                    {ex.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[10px] bg-fitx-primary/15 text-fitx-primary px-2 py-0.5 rounded-full font-mono">
                      {ex.muscleGroup}
                    </span>
                    {ex.secondaryMuscles.slice(0, 2).map((m) => (
                      <span key={m} className="text-[10px] bg-fitx-surface-variant text-fitx-text-secondary px-2 py-0.5 rounded-full font-mono">
                        {m}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-heading uppercase ${difficultyColor[ex.difficulty]}`}>
                      {ex.difficulty}
                    </span>
                    <span className="text-[10px] text-fitx-text-disabled font-mono">{ex.type}</span>
                  </div>
                </FitxCard>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((ex, i) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.3) }}
            >
              <Link href={`/exercises/${ex.id}`}>
                <div className="flex items-center gap-4 p-4 bg-fitx-card border border-fitx-border rounded-xl hover:border-fitx-primary/30 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-fitx-surface flex items-center justify-center flex-shrink-0">
                    <Dumbbell size={20} className="text-fitx-text-disabled group-hover:text-fitx-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm text-fitx-text uppercase tracking-wider truncate group-hover:text-fitx-primary transition-colors">
                      {ex.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-fitx-primary/15 text-fitx-primary px-2 py-0.5 rounded-full font-mono">{ex.muscleGroup}</span>
                      <span className="text-[10px] text-fitx-text-disabled font-mono">{ex.equipment.join(", ")}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-heading uppercase flex-shrink-0 ${difficultyColor[ex.difficulty]}`}>
                    {ex.difficulty}
                  </span>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(ex.id); }}
                    className="flex-shrink-0"
                  >
                    <Heart size={16} className={favorites.has(ex.id) ? "text-fitx-primary fill-fitx-primary" : "text-fitx-text-disabled"} />
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
