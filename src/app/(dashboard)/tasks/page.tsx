"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Calendar, CheckCircle2, Circle, Flame, Trash2,
  Dumbbell, Utensils, Heart, Target, User, Star,
  ListChecks, Clock, AlertCircle,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxInput } from "@/components/ui/FitxInput";

type TaskCategory = "Fitness" | "Nutrition" | "Recovery" | "Habit" | "Personal" | "Goal";
type TaskPriority = "Critical" | "High" | "Medium" | "Low";

interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  dueTime?: string;
  linkedWorkout?: string;
}

const categoryIcons: Record<TaskCategory, React.ElementType> = {
  Fitness: Dumbbell, Nutrition: Utensils, Recovery: Heart,
  Habit: Flame, Personal: User, Goal: Target,
};

const categoryColors: Record<TaskCategory, string> = {
  Fitness: "border-l-fitx-primary", Nutrition: "border-l-fitx-success",
  Recovery: "border-l-blue-400", Habit: "border-l-orange-400",
  Personal: "border-l-purple-400", Goal: "border-l-fitx-gold",
};

const priorityBadges: Record<TaskPriority, { label: string; class: string }> = {
  Critical: { label: "Critical", class: "bg-red-500/20 text-red-400" },
  High: { label: "High", class: "bg-yellow-500/20 text-yellow-400" },
  Medium: { label: "Medium", class: "bg-blue-500/20 text-blue-400" },
  Low: { label: "Low", class: "bg-gray-500/20 text-gray-400" },
};

const initialTasks: Task[] = [
  { id: "t1", title: "Complete Push Day Workout", category: "Fitness", priority: "High", completed: false, dueTime: "6:00 PM", linkedWorkout: "Push Day" },
  { id: "t2", title: "Log all meals for today", category: "Nutrition", priority: "Medium", completed: false },
  { id: "t3", title: "Take daily vitamins", category: "Habit", priority: "Low", completed: true },
  { id: "t4", title: "Drink 3L water", category: "Habit", priority: "Medium", completed: false },
  { id: "t5", title: "10-minute stretching session", category: "Recovery", priority: "Medium", completed: false, dueTime: "7:00 AM" },
  { id: "t6", title: "Log post-workout meal", category: "Nutrition", priority: "High", completed: false },
  { id: "t7", title: "Review weekly progress photos", category: "Goal", priority: "Low", completed: false },
  { id: "t8", title: "Meditate 5 minutes", category: "Habit", priority: "Low", completed: true },
  { id: "t9", title: "Prepare meal prep for tomorrow", category: "Nutrition", priority: "High", completed: false, dueTime: "8:00 PM" },
  { id: "t10", title: "Sleep by 10:30 PM", category: "Recovery", priority: "Critical", completed: false, dueTime: "10:30 PM" },
];

const habits = [
  { name: "Take Daily Vitamins", streak: 28, best: 42, todayDone: true },
  { name: "Drink 3L Water", streak: 14, best: 21, todayDone: false },
  { name: "Sleep 8 Hours", streak: 5, best: 18, todayDone: false },
  { name: "Stretch 10 Min", streak: 7, best: 15, todayDone: false },
  { name: "Log All Meals", streak: 20, best: 35, todayDone: true },
  { name: "Meditate 5 Min", streak: 3, best: 10, todayDone: true },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [tab, setTab] = useState<"today" | "habits">("today");
  const [filterCat, setFilterCat] = useState<TaskCategory | "All">("All");

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filtered = tasks.filter((t) => filterCat === "All" || t.category === filterCat);
  const done = filtered.filter((t) => t.completed).length;
  const pending = filtered.filter((t) => !t.completed).length;
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase">Tasks</h1>
          <p className="text-sm text-fitx-text-secondary font-body mt-1">{today} — {pending} tasks remaining</p>
        </div>
        <FitxButton variant="primary" size="md" icon={<Plus size={16} />}>New Task</FitxButton>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTab("today")}
          className={`px-5 py-2.5 rounded-xl font-heading text-sm uppercase tracking-wider transition-all ${
            tab === "today" ? "bg-fitx-primary/20 text-fitx-text border border-fitx-primary/40" : "text-fitx-text-secondary border border-transparent"
          }`}
        >
          <ListChecks size={14} className="inline mr-2" />Today
        </button>
        <button
          onClick={() => setTab("habits")}
          className={`px-5 py-2.5 rounded-xl font-heading text-sm uppercase tracking-wider transition-all ${
            tab === "habits" ? "bg-fitx-primary/20 text-fitx-text border border-fitx-primary/40" : "text-fitx-text-secondary border border-transparent"
          }`}
        >
          <Flame size={14} className="inline mr-2" />Habits
        </button>
      </div>

      {tab === "today" && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <FitxCard hover={false} className="text-center py-4">
              <p className="text-2xl font-mono font-bold text-fitx-success">{done}</p>
              <p className="text-xs font-heading text-fitx-text-secondary uppercase">Done</p>
            </FitxCard>
            <FitxCard hover={false} className="text-center py-4">
              <p className="text-2xl font-mono font-bold text-fitx-primary">{pending}</p>
              <p className="text-xs font-heading text-fitx-text-secondary uppercase">Pending</p>
            </FitxCard>
            <FitxCard hover={false} className="text-center py-4">
              <p className="text-2xl font-mono font-bold text-fitx-warning">0</p>
              <p className="text-xs font-heading text-fitx-text-secondary uppercase">Overdue</p>
            </FitxCard>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {(["All", "Fitness", "Nutrition", "Recovery", "Habit", "Personal", "Goal"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider transition-all border ${
                  filterCat === cat ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text" : "bg-fitx-surface border-fitx-border text-fitx-text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <AnimatePresence>
              {filtered.map((task, i) => {
                const Icon = categoryIcons[task.category];
                const badge = priorityBadges[task.priority];
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div className={`flex items-center gap-3 p-4 bg-fitx-card border border-fitx-border rounded-xl border-l-4 ${categoryColors[task.category]} group hover:border-fitx-primary/30 transition-all`}>
                      <button onClick={() => toggleTask(task.id)} className="flex-shrink-0">
                        {task.completed ? (
                          <CheckCircle2 size={22} className="text-fitx-success" />
                        ) : (
                          <Circle size={22} className="text-fitx-text-disabled hover:text-fitx-primary transition-colors" />
                        )}
                      </button>
                      <Icon size={16} className="text-fitx-text-disabled flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-body ${task.completed ? "line-through text-fitx-text-disabled" : "text-fitx-text"}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {task.dueTime && (
                            <span className="text-[10px] font-mono text-fitx-text-secondary flex items-center gap-1">
                              <Clock size={10} />{task.dueTime}
                            </span>
                          )}
                          {task.linkedWorkout && (
                            <span className="text-[10px] font-mono text-fitx-primary flex items-center gap-1">
                              <Dumbbell size={10} />{task.linkedWorkout}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-heading uppercase ${badge.class}`}>
                        {badge.label}
                      </span>
                      <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-fitx-text-disabled hover:text-red-400 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </>
      )}

      {tab === "habits" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map((habit, i) => (
            <motion.div
              key={habit.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <FitxCard className="flex items-center gap-4">
                <button className="flex-shrink-0">
                  {habit.todayDone ? (
                    <CheckCircle2 size={24} className="text-fitx-success" />
                  ) : (
                    <Circle size={24} className="text-fitx-text-disabled hover:text-fitx-primary transition-colors" />
                  )}
                </button>
                <div className="flex-1">
                  <p className="text-sm font-heading text-fitx-text uppercase tracking-wider">{habit.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono text-orange-400 flex items-center gap-1">
                      <Flame size={12} />{habit.streak} day streak
                    </span>
                    <span className="text-[10px] font-mono text-fitx-text-disabled">
                      Best: {habit.best} days
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <Star size={16} className={habit.streak >= 14 ? "text-fitx-gold" : "text-fitx-text-disabled"} />
                </div>
              </FitxCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
