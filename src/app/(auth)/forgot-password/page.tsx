"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxInput } from "@/components/ui/FitxInput";
import { FitxCard } from "@/components/ui/FitxCard";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/config/brand";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="text-center mb-8">
        <Logo size={44} className="mx-auto mb-4" />
        <h1 className="text-2xl font-display tracking-wider text-fitx-text uppercase mb-2">
          {sent ? "Check Your Email" : "Reset Password"}
        </h1>
        <p className="text-sm text-fitx-text-secondary font-body">
          {sent
            ? "We've sent a reset link to your email address."
            : "Enter your email and we'll send you a reset link."}
        </p>
      </div>

      <FitxCard variant="glow" hover={false} className="p-8">
        {sent ? (
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-16 h-16 mx-auto rounded-full bg-fitx-success/20 border-2 border-fitx-success/40 flex items-center justify-center mb-4"
            >
              <Check className="h-8 w-8 text-fitx-success" />
            </motion.div>
            <p className="text-sm text-fitx-text-secondary font-body mb-6">
              If an account exists for <strong className="text-fitx-text">{email}</strong>,
              you&apos;ll receive an email with instructions to reset your password.
            </p>
            <Link href="/signin">
              <FitxButton variant="primary" size="md">Back to Sign In</FitxButton>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <FitxInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail size={18} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FitxButton variant="primary" size="lg" className="w-full" loading={loading}>
              Send Reset Link
            </FitxButton>
          </form>
        )}
      </FitxCard>

      {!sent && (
        <div className="mt-6 text-center">
          <Link href="/signin" className="inline-flex items-center gap-1 text-sm text-fitx-text-secondary hover:text-fitx-text transition-colors font-body">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      )}
    </motion.div>
  );
}
