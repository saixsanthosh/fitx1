"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxCard } from "@/components/ui/FitxCard";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/config/brand";
import Link from "next/link";

export default function VerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < data.length; i++) {
      newOtp[i] = data[i];
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(data.length, 5)]?.focus();
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/onboarding";
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <Logo size={44} className="mx-auto mb-4" />
        <h1 className="text-2xl font-display tracking-wider text-fitx-text uppercase mb-2">
          Verify Your Email
        </h1>
        <p className="text-sm text-fitx-text-secondary font-body">
          We&apos;ve sent a 6-digit code to your email. Enter it below.
        </p>
      </div>

      <FitxCard variant="glow" hover={false} className="p-8">
        <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="w-12 h-14 text-center text-xl font-mono font-bold text-fitx-text bg-fitx-surface border-2 border-fitx-border rounded-xl focus:outline-none focus:border-fitx-primary focus:shadow-[0_0_12px_rgba(232,22,12,0.3)] transition-all"
            />
          ))}
        </div>

        <FitxButton
          variant="primary"
          size="lg"
          className="w-full"
          loading={loading}
          onClick={handleVerify}
          disabled={otp.some((d) => !d)}
        >
          Verify & Continue
        </FitxButton>

        <div className="mt-6 text-center">
          <p className="text-xs text-fitx-text-disabled font-body mb-2">Didn&apos;t receive the code?</p>
          <button className="text-xs text-fitx-primary hover:text-fitx-primary-bright transition-colors font-heading uppercase tracking-wider">
            Resend Code
          </button>
        </div>
      </FitxCard>

      <div className="mt-6 text-center">
        <Link href="/signup" className="inline-flex items-center gap-1 text-sm text-fitx-text-secondary hover:text-fitx-text transition-colors font-body">
          <ArrowLeft size={14} />
          Back to Sign Up
        </Link>
      </div>
    </motion.div>
  );
}
