"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/config/brand";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/exercises", label: "Exercises" },
  { href: "/pricing", label: "Pricing" },
  { href: "/for-gyms", label: "For Gyms" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2.5 transition-all duration-500 sm:px-4",
          scrolled ? "liquid-glass-strong" : "liquid-glass"
        )}
      >
        <Link href="/" className="flex items-center gap-2 pl-1">
          <Logo size={30} />
          <span className="font-display text-2xl tracking-tight text-fitx-text">{BRAND.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-fitx-text-secondary transition-colors hover:bg-white/5 hover:text-fitx-text"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/signin"
            className="rounded-full px-4 py-2 text-sm font-medium text-fitx-text transition-colors hover:bg-white/5"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-fitx-primary px-5 py-2.5 text-sm font-semibold text-[#0b1400] transition-colors hover:bg-fitx-primary-bright"
          >
            Start free
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-full text-fitx-text md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="liquid-glass-strong mx-auto mt-2 max-w-6xl rounded-3xl p-3 md:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-fitx-text transition-colors hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-white/5 px-4 py-3 text-center text-sm font-medium text-fitx-text"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-fitx-primary px-4 py-3 text-center text-sm font-semibold text-[#0b1400]"
                >
                  Start free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
