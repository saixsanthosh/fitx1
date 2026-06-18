"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { BlurText } from "@/components/ui/BlurText";
import { VIDEO } from "@/data/media";
import { IMG } from "@/data/images";

const stats = [
  { value: "50K+", label: "Athletes" },
  { value: "1.2M", label: "Workouts logged" },
  { value: "4.9★", label: "App rating" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-fitx-bg grain">
      {/* Cinematic background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={IMG.heroGym}
        className="absolute inset-0 h-full w-full object-cover animate-hero-zoom"
      >
        <source src={VIDEO.heroLoop} type="video/mp4" />
      </video>

      {/* Legibility: subtle top→bottom gradient + soft vignette (no flat dark wash) */}
      <div className="absolute inset-0 bg-gradient-to-b from-fitx-bg/70 via-fitx-bg/25 to-fitx-bg/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_35%,rgba(7,8,9,0.6)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-5 pt-28 pb-24 text-center">
        <div
          className="liquid-glass animate-blur-fade-up mb-7 flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{ animationDelay: "60ms" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-fitx-primary" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-fitx-text/80">
            AI-Powered Fitness OS
          </span>
        </div>

        <h1 className="font-display leading-[0.92] tracking-tight text-white text-[clamp(3rem,11vw,8.5rem)]">
          <BlurText text="Forge Your" delay={150} step={120} />{" "}
          <span
            className="italic text-gradient-volt inline-block animate-blur-fade-up"
            style={{ animationDelay: "520ms" }}
          >
            Legacy
          </span>
        </h1>

        <p
          className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-fitx-text-secondary animate-blur-fade-up"
          style={{ animationDelay: "720ms" }}
        >
          Track every rep, scan every meal, follow guided exercise videos, and watch
          your progress compound. One cinematic operating system for athletes — and
          the gyms that train them.
        </p>

        <div
          className="mt-9 flex flex-col sm:flex-row items-center gap-3.5 animate-blur-fade-up"
          style={{ animationDelay: "900ms" }}
        >
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-fitx-primary px-8 py-4 text-sm font-semibold text-[#0b1400] transition-colors hover:bg-fitx-primary-bright"
          >
            Start free
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/dashboard"
            className="liquid-glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            <Play size={16} className="fill-current" /> Live demo
          </Link>
        </div>

        <div
          className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-4 animate-blur-fade-up"
          style={{ animationDelay: "1100ms" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="liquid-glass rounded-2xl px-3 py-5">
              <div className="font-display text-3xl sm:text-4xl text-white">{s.value}</div>
              <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-fitx-text-secondary">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 animate-blur-fade-up"
        style={{ animationDelay: "1300ms" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-fitx-text-secondary">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-fitx-divider">
          <div className="absolute inset-x-0 h-1/3 bg-fitx-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
