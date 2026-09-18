"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, Calendar } from "lucide-react";
import { CENTRE_INFO } from "@/data/centre";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Doctors", href: "/doctors" },
    { label: "Tests & Services", href: "/tests" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur-md border-b border-line transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-blue rounded-lg py-1"
          aria-label="Maruti Diagnostic Centre Home"
        >
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 shadow-xs border border-line/80">
            <Image
              src="/maruti_diagnostic_centre_logo.png"
              alt="Maruti Diagnostic Centre Logo"
              width={44}
              height={44}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-lg sm:text-xl text-ink leading-tight tracking-tight group-hover:text-red transition-colors">
              {CENTRE_INFO.name}
            </span>
            <span className="text-xs text-ink-soft font-normal">
              Ghungoor · Opp. SMCH
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-ink hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-blue rounded-md px-1 py-0.5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${CENTRE_INFO.phones.primary}`}
            className="flex items-center gap-2 text-sm font-medium text-ink hover:text-red px-3 py-2 rounded-full hover:bg-clay/30 transition-colors"
            title="Call Maruti Diagnostic Centre"
          >
            <Phone className="w-4 h-4 text-red stroke-[2]" />
            <span>{CENTRE_INFO.phones.displayPrimary}</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-red hover:bg-red-deep text-white font-medium text-sm px-5 py-2.5 rounded-full transition-colors shadow-xs active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-blue min-h-[44px]"
          >
            <Calendar className="w-4 h-4 stroke-[2]" />
            <span>Book a test</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${CENTRE_INFO.phones.primary}`}
            className="p-2.5 text-ink hover:text-red rounded-full bg-surface border border-line"
            aria-label="Call Maruti Diagnostic Centre"
          >
            <Phone className="w-4 h-4 text-red" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-ink hover:text-red rounded-full bg-surface border border-line focus-visible:outline-2 focus-visible:outline-blue"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-line bg-surface/98 backdrop-blur-lg px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center h-12 text-lg font-medium text-ink hover:text-red px-3 rounded-lg hover:bg-paper transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-line flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-red hover:bg-red-deep text-white font-medium h-12 rounded-full transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4 stroke-[2]" />
                <span>Book a test</span>
              </Link>
              <a
                href={`tel:${CENTRE_INFO.phones.primary}`}
                className="w-full flex items-center justify-center gap-2 border-1.5 border-line text-ink font-medium h-12 rounded-full hover:bg-paper transition-colors"
              >
                <Phone className="w-4 h-4 text-red stroke-[2]" />
                <span>Call {CENTRE_INFO.phones.displayPrimary}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

