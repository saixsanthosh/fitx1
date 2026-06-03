"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Dumbbell, Utensils, ListChecks, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/exercises", label: "Train", icon: Dumbbell },
  { href: "/nutrition", label: "Food", icon: Utensils },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#030000]/95 backdrop-blur-xl border-t border-fitx-border">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1.5 relative"
            >
              {active && (
                <motion.div
                  layoutId="bottomnav-active"
                  className="absolute -top-2 w-8 h-1 bg-fitx-primary rounded-full"
                />
              )}
              <item.icon size={20} className={cn(active ? "text-fitx-primary" : "text-fitx-text-secondary")} />
              <span className={cn("text-[9px] font-heading uppercase tracking-wider", active ? "text-fitx-text" : "text-fitx-text-disabled")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
