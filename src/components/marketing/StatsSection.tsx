"use client";

import { Users, Dumbbell, TrendingUp, Award } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

const stats = [
  { value: 50000, suffix: "+", label: "Athletes Worldwide", icon: <Users size={28} /> },
  { value: 2000000, suffix: "+", label: "Workouts Logged", icon: <Dumbbell size={28} /> },
  { value: 98, suffix: "%", label: "Retention Rate", icon: <TrendingUp size={28} /> },
  { value: 500, suffix: "+", label: "Gym Partners", icon: <Award size={28} /> },
];

export function StatsSection() {
  return (
    <section className="relative py-20 bg-fitx-surface border-y border-fitx-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
