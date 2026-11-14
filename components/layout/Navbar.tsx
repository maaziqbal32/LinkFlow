"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, Menu, X } from "lucide-react";
import { loginLink, navLinks, registerLink } from "@/data/navigation";
import { scrollToTop } from "@/lib/scroll";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  // Logo click: if already on the home page, smoothly scroll to the top
  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    closeMenu();

    if (pathname === "/") {
      event.preventDefault();
      scrollToTop();
    }
  }

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close with Escape key, and when screen grows to desktop size
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    function onChange(event: MediaQueryListEvent) {
      if (event.matches) setIsMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    mediaQuery.addEventListener("change", onChange);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0912]/90 backdrop-blur-xl">
        <nav
          className="container-main flex h-[72px] items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            onClick={handleLogoClick}
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
              href={loginLink.href}
              className="text-sm text-zinc-300 transition-colors hover:text-white"
            >
              {loginLink.label}
            </Link>

            <Link
              href={registerLink.href}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-0.5 hover:shadow-violet-600/40"
            >
              {registerLink.label}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/10 md:hidden"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>
      </header>

      {/*
        Full-screen mobile menu.
        It is placed OUTSIDE <header> on purpose: the header has backdrop-blur,
        which would trap a "fixed" child inside the header's height.
      */}
      <div
        id="mobile-navigation"
        inert={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 flex h-dvh flex-col overflow-y-auto overflow-x-hidden bg-[#0b0912] pt-[72px] transition-all duration-300 ease-out md:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* soft glow so the menu doesn't feel flat */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-32 top-24 h-72 w-72 rounded-full bg-fuchsia-700/15 blur-[100px]" />
          <div className="absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-violet-700/20 blur-[100px]" />
        </div>

        <div
          className={`container-main relative flex w-full flex-1 flex-col pb-8 pt-6 transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 60}ms` : "0ms",
                }}
                className={`border-b border-white/5 py-4 text-base font-medium text-zinc-200 transition-all duration-300 hover:text-white ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions pinned to the bottom of the screen */}
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Link
              href={loginLink.href}
              onClick={closeMenu}
              className="rounded-xl border border-white/15 px-4 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              {loginLink.label}
            </Link>

            <Link
              href={registerLink.href}
              onClick={closeMenu}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-violet-600/20"
            >
              {registerLink.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}