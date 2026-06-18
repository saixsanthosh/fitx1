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
    { label: "AI Coach", href: "/ai-coach" },
    { label: "Exercise Library", href: "/exercises" },
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
  { icon: Globe, href: BRAND.creator.instagramUrl, label: "Instagram" },
  { icon: Hash, href: "#", label: "Twitter" },
  { icon: Tv, href: "#", label: "YouTube" },
  { icon: ExternalLink, href: "https://github.com/saixsanthosh/fitx1", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-fitx-divider bg-fitx-bg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Logo size={36} />
              <span className="font-display text-2xl tracking-tight text-fitx-text">{BRAND.name}</span>
            </Link>
            <p className="mb-6 max-w-sm font-body text-sm text-fitx-text-secondary">
              The all-in-one fitness operating system. Track workouts, scan food barcodes, log
              nutrition, follow guided exercise videos, and watch your progress compound — with AI
              coaching. White-label ready for gym owners.
            </p>

            <div className="mb-6">
              <p className="mb-3 text-xs font-heading uppercase tracking-wider text-fitx-text-secondary">
                Join our newsletter
              </p>
              <div className="flex gap-2">
                <div className="min-w-0 flex-1">
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
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-fitx-text-secondary transition-all hover:text-fitx-primary"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-heading text-sm uppercase tracking-wider text-fitx-text">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-fitx-text-secondary transition-colors hover:text-fitx-text"
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <p className="font-body text-xs text-fitx-text-disabled">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-2 font-mono text-xs text-fitx-text-secondary sm:flex-row">
            <span>
              Designed &amp; Built by <strong className="text-fitx-text">{BRAND.creator.name}</strong>
            </span>
            <span className="hidden text-fitx-text-disabled sm:inline">&middot;</span>
            <a
              href={BRAND.creator.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-fitx-primary"
            >
              @{BRAND.creator.instagram}
            </a>
            <span className="hidden text-fitx-text-disabled sm:inline">&middot;</span>
            <a
              href={`mailto:${BRAND.creator.email}`}
              className="flex items-center gap-1 transition-colors hover:text-fitx-primary"
            >
              <Mail size={12} />
              {BRAND.creator.email}
            </a>
            <span className="hidden text-fitx-text-disabled sm:inline">&middot;</span>
            <a
              href={`tel:${BRAND.creator.phone}`}
              className="flex items-center gap-1 transition-colors hover:text-fitx-primary"
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
