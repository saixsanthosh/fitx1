"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Mail, Lock, Eye, Globe } from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxInput } from "@/components/ui/FitxInput";
import { FitxCard } from "@/components/ui/FitxCard";
import { BRAND } from "@/config/brand";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
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
        <p className="text-sm text-fitx-text-secondary font-body">Welcome back, warrior</p>
      </div>

      <FitxCard variant="glow" hover={false} className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FitxInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FitxInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock size={18} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-fitx-border bg-fitx-surface accent-[#E8160C]"
              />
              <span className="text-xs text-fitx-text-secondary font-body">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-xs text-fitx-primary hover:text-fitx-primary-bright transition-colors font-body">
              Forgot password?
            </Link>
          </div>

          <FitxButton variant="primary" size="lg" className="w-full" loading={loading}>
            Sign In
          </FitxButton>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-fitx-divider" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-fitx-card px-4 text-fitx-text-disabled font-body">or continue with</span>
          </div>
        </div>

        <div className="mt-6">
          <FitxButton variant="secondary" size="md" className="w-full" icon={<Globe size={18} />}>
            Continue with Google
          </FitxButton>
        </div>
      </FitxCard>

      <p className="mt-6 text-center text-sm text-fitx-text-secondary font-body">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-fitx-primary hover:text-fitx-primary-bright transition-colors font-semibold">
          Sign Up
        </Link>
      </p>
    </motion.div>
  );
}
