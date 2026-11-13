
"use client";

import { useState } from "react";
import Link from "next/link";
import { Link2, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0912]/90 backdrop-blur-xl">
      <nav
        className="container-main flex h-[72px] items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={closeMenu}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-600/20">
            <Link2 size={20} className="text-white" />
          </span>

          <span className="text-xl font-bold tracking-tight">
            Link<span className="text-gradient">Flow</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="text-sm text-zinc-300 transition-colors hover:text-white"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-0.5 hover:shadow-violet-600/40"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/10 md:hidden"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile navigation panel */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-[#100d19] px-4 py-5 md:hidden"
        >
          <div className="container-main flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-white/10" />

            <Link
              href="/login"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              Log in
            </Link>

            <Link
              href="/register"
              onClick={closeMenu}
              className="mt-1 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
