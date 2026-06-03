"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Mail, Lock, User, Globe, Check, X } from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxInput } from "@/components/ui/FitxInput";
import { FitxCard } from "@/components/ui/FitxCard";
import { BRAND } from "@/config/brand";

function PasswordStrength({ password }: { password: string }) {
  const checks = useMemo(() => [
    { label: "8+ characters", met: password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Lowercase letter", met: /[a-z]/.test(password) },
    { label: "Number", met: /\d/.test(password) },
    { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
  ], [password]);

  const strength = checks.filter((c) => c.met).length;
  const colors = ["bg-red-500", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-fitx-success"];
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < strength ? colors[strength - 1] : "bg-fitx-surface-variant"}`}
          />
        ))}
      </div>
      <p className="text-xs text-fitx-text-secondary font-body">{labels[strength]}</p>
      <div className="space-y-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5 text-[11px] font-body">
            {c.met ? <Check size={12} className="text-fitx-success" /> : <X size={12} className="text-fitx-text-disabled" />}
            <span className={c.met ? "text-fitx-text-secondary" : "text-fitx-text-disabled"}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/verify";
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <Flame className="h-10 w-10 text-fitx-primary" />
          <span className="text-3xl font-display tracking-[0.2em] text-fitx-text">{BRAND.name}</span>
        </Link>
        <p className="text-sm text-fitx-text-secondary font-body">Begin your transformation</p>
      </div>

      <FitxCard variant="glow" hover={false} className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FitxInput
            label="Full Name"
            placeholder="Your full name"
            icon={<User size={18} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FitxInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <FitxInput
              label="Password"
              type="password"
              placeholder="Create a password"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordStrength password={password} />
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-fitx-border bg-fitx-surface accent-[#E8160C]"
              required
            />
            <span className="text-xs text-fitx-text-secondary font-body">
              I agree to the{" "}
              <Link href="/terms" className="text-fitx-primary hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-fitx-primary hover:underline">Privacy Policy</Link>
            </span>
          </label>

          <FitxButton variant="primary" size="lg" className="w-full" loading={loading}>
            Create Account
          </FitxButton>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-fitx-divider" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-fitx-card px-4 text-fitx-text-disabled font-body">or</span>
          </div>
        </div>

        <div className="mt-6">
          <FitxButton variant="secondary" size="md" className="w-full" icon={<Globe size={18} />}>
            Sign up with Google
          </FitxButton>
        </div>
      </FitxCard>

      <p className="mt-6 text-center text-sm text-fitx-text-secondary font-body">
        Already have an account?{" "}
        <Link href="/signin" className="text-fitx-primary hover:text-fitx-primary-bright transition-colors font-semibold">
          Sign In
        </Link>
      </p>
    </motion.div>
  );
}
