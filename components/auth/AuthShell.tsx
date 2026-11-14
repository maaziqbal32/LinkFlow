import Link from "next/link";
import type { ReactNode } from "react";

import {
  ArrowLeft,
  Link2,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { authBrandContent } from "@/data/auth";
import type { AuthPageContent } from "@/types/auth";

type AuthShellProps = {
  children: ReactNode;
  content: AuthPageContent;
};

export default function AuthShell({
  children,
  content,
}: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0a12] px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-700/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-fuchsia-700/15 blur-[120px]" />

      <Link
        href="/"
        scroll={false}
        className="absolute left-5 top-5 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white sm:left-8 sm:top-8"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#120f1b] shadow-2xl shadow-black/40 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Branding panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-950 via-[#21143a] to-[#120f1b] p-10 lg:flex">
          <div className="absolute -right-20 top-24 h-64 w-64 rounded-full border border-white/10" />

          <Link
            href="/"
            className="relative inline-flex items-center gap-2 text-xl font-bold"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Link2 size={21} />
            </span>

            {authBrandContent.name}
          </Link>

          <div className="relative max-w-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
              <Zap size={27} className="text-violet-200" />
            </div>

            <h2 className="text-3xl font-bold leading-tight">
              {authBrandContent.headline}
            </h2>

            <p className="mt-4 text-sm leading-7 text-violet-100/70">
              {authBrandContent.description}
            </p>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <ShieldCheck
                className="shrink-0 text-emerald-300"
                size={22}
              />

              <p className="text-xs leading-5 text-violet-100/75">
                {authBrandContent.trustMessage}
              </p>
            </div>
          </div>

          <p className="relative text-xs text-violet-200/45">
            {authBrandContent.copyright}
          </p>
        </aside>

        {/* Form panel */}
        <section className="px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-lg font-bold"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
                  <Link2 size={19} />
                </span>

                {authBrandContent.name}
              </Link>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                {content.eyebrow}
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {content.title}
              </h1>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {content.description}
              </p>
            </div>

            {children}

            <p className="mt-8 text-center text-sm text-zinc-500">
              {content.footerText}{" "}
              <Link
                href={content.footerHref}
                className="font-semibold text-violet-300 transition hover:text-violet-200"
              >
                {content.footerLinkText}
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-zinc-600">
              {authBrandContent.copyright}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}