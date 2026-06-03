"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, LayoutDashboard, Dumbbell, Utensils, ListChecks, Timer,
  TrendingUp, Bot, Users, Settings, Building2, ChevronLeft, ChevronRight,
  Trophy, LogOut, User,
} from "lucide-react";
import { BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/exercises", label: "Exercises", icon: Dumbbell },
  { href: "/nutrition", label: "Nutrition", icon: Utensils },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/workouts", label: "Workouts", icon: Timer },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/ai-coach", label: "AI Coach", icon: Bot },
  { href: "/social", label: "Community", icon: Users },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/admin", label: "Gym Admin", icon: Building2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen bg-fitx-surface border-r border-fitx-border flex flex-col transition-all duration-300 z-30",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex items-center gap-2 p-4 border-b border-fitx-divider">
        <Flame className="h-8 w-8 text-fitx-primary flex-shrink-0" />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-display tracking-[0.2em] text-fitx-text"
          >
            {BRAND.name}
          </motion.span>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                isActive
                  ? "bg-fitx-primary/15 text-fitx-text"
                  : "text-fitx-text-secondary hover:text-fitx-text hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-fitx-primary rounded-r-full"
                />
              )}
              <item.icon size={20} className={cn("flex-shrink-0", isActive && "text-fitx-primary")} />
              {!collapsed && (
                <span className="text-sm font-heading uppercase tracking-wider truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-fitx-divider">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-fitx-primary/20 border-2 border-fitx-primary/40 flex items-center justify-center font-heading text-fitx-primary text-xs">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-heading text-fitx-text truncate">Alex Knight</p>
              <p className="text-[10px] text-fitx-text-secondary font-body">Level 24 — Elite</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-fitx-text-secondary hover:text-fitx-text hover:bg-white/5 transition-all"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-xs font-heading uppercase tracking-wider">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
