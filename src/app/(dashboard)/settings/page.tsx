"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Bell, Dumbbell, Utensils, Shield, Link2, CreditCard,
  HelpCircle, Info, Sun, Moon, Scale, Home, TreePine, Flame,
  Zap, Bot, Volume2, VolumeX,
} from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxInput } from "@/components/ui/FitxInput";
import Link from "next/link";

function Toggle({ enabled, onChange, label }: { enabled: boolean; onChange: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-fitx-text font-body">{label}</span>
      <button
        onClick={onChange}
        className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? "bg-fitx-primary" : "bg-fitx-surface-variant"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${enabled ? "left-5.5 translate-x-0" : "left-0.5"}`}
          style={{ left: enabled ? "22px" : "2px" }} />
      </button>
    </div>
  );
}

function SettingGroup({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <FitxCard hover={false} className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-fitx-primary" />
        <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider">{title}</h3>
      </div>
      <div className="divide-y divide-fitx-divider">{children}</div>
    </FitxCard>
  );
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [metric, setMetric] = useState(true);
  const [workoutMode, setWorkoutMode] = useState<"Gym" | "Home" | "Outdoor">("Gym");
  const [dietMode, setDietMode] = useState<"Bulking" | "Cutting" | "Maintenance" | "Performance">("Maintenance");
  const [experience, setExperience] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [aiCoach, setAiCoach] = useState(true);
  const [sound, setSound] = useState(true);
  const [socialPrivacy, setSocialPrivacy] = useState(false);
  const [notifications, setNotifications] = useState({
    workout: true, nutrition: true, tasks: true, habits: true,
    social: true, achievements: true, ai: true, system: true,
  });

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-display tracking-wider text-fitx-text uppercase mb-6">Settings</h1>

      <SettingGroup title="Profile" icon={User}>
        <div className="flex items-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-fitx-primary/20 border-2 border-fitx-primary/40 flex items-center justify-center font-heading text-fitx-primary text-xl">
            AK
          </div>
          <div className="flex-1">
            <p className="font-heading text-sm text-fitx-text uppercase tracking-wider">Alex Knight</p>
            <p className="text-xs text-fitx-text-secondary font-body">Level 24 &middot; Elite</p>
          </div>
          <Link href="/profile">
            <FitxButton variant="secondary" size="sm">Edit Profile</FitxButton>
          </Link>
        </div>
      </SettingGroup>

      <SettingGroup title="Training" icon={Dumbbell}>
        <div className="py-3">
          <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-2">Workout Mode</p>
          <div className="flex gap-2">
            {(["Gym", "Home", "Outdoor"] as const).map((m) => (
              <button key={m} onClick={() => setWorkoutMode(m)}
                className={`flex-1 py-2 rounded-xl text-xs font-heading uppercase tracking-wider border transition-all ${
                  workoutMode === m ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text" : "border-fitx-border text-fitx-text-secondary"
                }`}>{m}</button>
            ))}
          </div>
        </div>
        <div className="py-3">
          <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-2">Experience Level</p>
          <div className="flex gap-2">
            {(["Beginner", "Intermediate", "Advanced"] as const).map((e) => (
              <button key={e} onClick={() => setExperience(e)}
                className={`flex-1 py-2 rounded-xl text-xs font-heading uppercase tracking-wider border transition-all ${
                  experience === e ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text" : "border-fitx-border text-fitx-text-secondary"
                }`}>{e}</button>
            ))}
          </div>
        </div>
        <Toggle label="Auto-start rest timer" enabled={true} onChange={() => {}} />
        <Toggle label="Show previous weights" enabled={true} onChange={() => {}} />
      </SettingGroup>

      <SettingGroup title="Nutrition" icon={Utensils}>
        <div className="py-3">
          <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-2">Diet Mode</p>
          <div className="flex gap-2">
            {(["Bulking", "Cutting", "Maintenance", "Performance"] as const).map((d) => (
              <button key={d} onClick={() => setDietMode(d)}
                className={`flex-1 py-2 rounded-xl text-[10px] font-heading uppercase tracking-wider border transition-all ${
                  dietMode === d ? "bg-fitx-primary/20 border-fitx-primary text-fitx-text" : "border-fitx-border text-fitx-text-secondary"
                }`}>{d}</button>
            ))}
          </div>
        </div>
        <Toggle label={metric ? "Metric (kg/cm)" : "Imperial (lbs/ft)"} enabled={metric} onChange={() => setMetric(!metric)} />
      </SettingGroup>

      <SettingGroup title="Appearance" icon={Sun}>
        <Toggle label={darkMode ? "Dark Mode" : "Light Mode"} enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <Toggle label={sound ? "Sound Effects On" : "Silent Mode"} enabled={sound} onChange={() => setSound(!sound)} />
      </SettingGroup>

      <SettingGroup title="AI & Features" icon={Bot}>
        <Toggle label="AI Coach" enabled={aiCoach} onChange={() => setAiCoach(!aiCoach)} />
        <Toggle label="Wearable Sync" enabled={false} onChange={() => {}} />
        <Toggle label="Voice Commands" enabled={false} onChange={() => {}} />
        <Toggle label="Streak Protection" enabled={true} onChange={() => {}} />
      </SettingGroup>

      <SettingGroup title="Notifications" icon={Bell}>
        {Object.entries(notifications).map(([key, value]) => (
          <Toggle
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            enabled={value}
            onChange={() => setNotifications({ ...notifications, [key]: !value })}
          />
        ))}
      </SettingGroup>

      <SettingGroup title="Privacy" icon={Shield}>
        <Toggle label="Social Profile (Public/Stealth)" enabled={!socialPrivacy} onChange={() => setSocialPrivacy(!socialPrivacy)} />
      </SettingGroup>

      <SettingGroup title="Subscription" icon={CreditCard}>
        <div className="py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-heading text-fitx-gold uppercase tracking-wider">Elite Plan</p>
            <p className="text-xs text-fitx-text-secondary font-body">Next billing: Jul 2, 2026</p>
          </div>
          <Link href="/subscription">
            <FitxButton variant="secondary" size="sm">Manage</FitxButton>
          </Link>
        </div>
      </SettingGroup>
    </div>
  );
}
