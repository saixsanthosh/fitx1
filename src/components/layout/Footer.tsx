"use client";

import Link from "next/link";
import { Mail, Phone, Globe, ExternalLink, Tv, Hash } from "lucide-react";
import { BRAND } from "@/config/brand";
import { FitxButton } from "@/components/ui/FitxButton";
import { FitxInput } from "@/components/ui/FitxInput";
import { Logo } from "@/components/ui/Logo";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "For Gyms", href: "/for-gyms" },
    { label: "AI Coach", href: "/features#ai-coach" },
    { label: "Exercise Library", href: "/features#exercises" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/about#contact" },
    { label: "Careers", href: "/about#careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/about#press" },
  ],
  Support: [
    { label: "Help Center", href: "/support" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "API Docs", href: "/api-docs" },
    { label: "Status", href: "/status" },
  ],
};

const socials = [
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: Hash, href: "#", label: "Twitter" },
  { icon: Tv, href: "#", label: "YouTube" },
  { icon: ExternalLink, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-[#030000] border-t border-fitx-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo size={36} />
              <span className="text-2xl font-display tracking-[0.2em] text-fitx-text">
                {BRAND.name}
              </span>
            </Link>
            <p className="text-fitx-text-secondary font-body text-sm max-w-sm mb-6">
              The ultimate fitness and gym management platform. Track workouts, nutrition, habits,
              and progress with AI-powered coaching. White-label ready for gym owners.
            </p>

            <div className="mb-6">
              <p className="text-xs font-heading text-fitx-text-secondary uppercase tracking-wider mb-3">
                Join our newsletter
              </p>
              <div className="flex gap-2">
                <div className="flex-1 min-w-0">
                  <FitxInput placeholder="Enter your email" className="text-sm" />
                </div>
                <FitxButton variant="primary" size="md" className="flex-shrink-0">
                  Subscribe
                </FitxButton>
              </div>
            </div>

            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-fitx-surface border border-fitx-border flex items-center justify-center text-fitx-text-secondary hover:text-fitx-primary hover:border-fitx-primary/40 transition-all"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading text-sm text-fitx-text uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-fitx-text-secondary hover:text-fitx-text transition-colors font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-fitx-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-fitx-text-disabled font-body">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs font-mono text-fitx-text-secondary">
            <span>Designed &amp; Developed by <strong className="text-fitx-text">{BRAND.creator.name}</strong></span>
            <span className="hidden sm:inline text-fitx-text-disabled">&middot;</span>
            <a
              href={`mailto:${BRAND.creator.email}`}
              className="flex items-center gap-1 hover:text-fitx-primary transition-colors"
            >
              <Mail size={12} />
              {BRAND.creator.email}
            </a>
            <span className="hidden sm:inline text-fitx-text-disabled">&middot;</span>
            <a
              href={`tel:${BRAND.creator.phone}`}
              className="flex items-center gap-1 hover:text-fitx-primary transition-colors"
            >
              <Phone size={12} />
              {BRAND.creator.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
