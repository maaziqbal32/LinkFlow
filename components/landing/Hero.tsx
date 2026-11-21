
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Link2,
  MousePointerClick,
} from "lucide-react";

import { createShortURL } from "@/lib/api";

export default function Hero() {
  const router = useRouter();

  const [longUrl, setLongUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const SHORT_URL_BASE = (
    process.env.NEXT_PUBLIC_SHORT_URL_BASE ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8001"
  ).replace(/\/$/, "");

  const handleShorten = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedUrl = longUrl.trim();

    if (!trimmedUrl) {
      setError("Please enter a URL.");
      return;
    }

    setIsLoading(true);
    setError("");
    setGeneratedUrl("");
    setCopied(false);

    try {
      const result = await createShortURL(trimmedUrl);

      if (!result.id) {
        throw new Error("The server did not return a short URL.");
      }

      const shortUrl = `${SHORT_URL_BASE}/${result.id}`;

      setGeneratedUrl(shortUrl);
    } catch (err) {
      const apiError = err as Error & { status?: number };

      const requiresLogin =
        apiError.status === 401 ||
        apiError.status === 403 ||
        /authentication|required|session/i.test(apiError.message);

      if (requiresLogin) {
        router.push("/login");
        return;
      }

      setError(
        apiError.message || "Unable to shorten this URL. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedUrl) return;

    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
    } catch {
      setError("Unable to copy the link. Please copy it manually.");
    }
  };

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute -right-40 -top-40 -z-10 h-137.5 w-137.5 rounded-full bg-fuchsia-700/15 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute -left-40 top-40 -z-10 h-[450px] w-[450px] rounded-full bg-violet-700/15 blur-[130px]"
        style={{ animationDelay: "2s" }}
      />

      <div className="container-main grid min-h-162.5 items-center gap-14 py-5 lg:grid-cols-2 lg:py-16">
        {/* Left content */}
        <div>
          <div
            data-aos="fade-down"
            data-aos-duration="700"
            suppressHydrationWarning
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
            </span>
            Smarter links. Better insights.
          </div>

          <h1 className="max-w-xl text-5xl leading-[1.12] font-bold tracking-tight sm:text-6xl lg:text-[68px]">
            <span
              data-aos="fade-up"
              data-aos-delay="100"
              suppressHydrationWarning
              className="block"
            >
              Shorten Links.
            </span>

            <span
              data-aos="fade-up"
              data-aos-delay="250"
              suppressHydrationWarning
              className="text-gradient block"
            >
              Track Clicks.
            </span>

            <span
              data-aos="fade-up"
              data-aos-delay="400"
              suppressHydrationWarning
              className="block"
            >
              Grow Faster.
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="550"
            suppressHydrationWarning
            className="mt-7 max-w-lg text-base leading-7 text-zinc-400 sm:text-lg"
          >
            Create powerful short links, understand your audience, and
            manage every click with simple, actionable analytics.
          </p>

          {/* Functional URL Shortener */}
          <div
            data-aos="fade-up"
            data-aos-delay="700"
            suppressHydrationWarning
            className="mt-9 max-w-xl"
          >
            <form
              onSubmit={handleShorten}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="long-url" className="sr-only">
                Enter your long URL
              </label>

              <input
                id="long-url"
                type="text"
                inputMode="url"
                required
                value={longUrl}
                onChange={(event) => setLongUrl(event.target.value)}
                placeholder="Paste your long URL here..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />

              <button
                type="submit"
                disabled={isLoading || !longUrl.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-700/20 transition-all hover:-translate-y-0.5 hover:shadow-violet-600/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isLoading ? "Shortening..." : "Shorten"}
                {!isLoading && <ArrowRight size={17} />}
              </button>
            </form>

            {/* Error message */}
            {error && (
              <p
                role="alert"
                className="mt-3 text-sm text-red-400"
              >
                {error}
              </p>
            )}

            {/* Generated short URL */}
            {generatedUrl && (
              <div
                aria-live="polite"
                className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4"
              >
                <p className="mb-2 text-sm font-medium text-emerald-400">
                  Your short link is ready!
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 flex-1 break-all text-sm text-white transition-colors hover:text-violet-300"
                  >
                    {generatedUrl}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="850"
            suppressHydrationWarning
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/30"
            >
              Start Free
              <ArrowRight size={16} />
            </Link>

            <Link
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Explore Features
            </Link>
          </div>

          <p
            data-aos="fade-in"
            data-aos-delay="1000"
            suppressHydrationWarning
            className="mt-6 text-xs text-zinc-500"
          >
            No credit card required · Simple link management
          </p>
        </div>

        {/* Right visual */}
        <div
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-duration="900"
          suppressHydrationWarning
          className="relative mx-auto w-full max-w-[540px]"
        >
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 blur-3xl" />

          <div className="glass-card relative rounded-3xl p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                  <BarChart3 size={19} />
                </span>

                <div>
                  <p className="text-sm font-semibold">Link Analytics</p>
                  <p className="text-xs text-zinc-500">Overview preview</p>
                </div>
              </div>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                Preview
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                data-aos="zoom-in"
                data-aos-delay="700"
                suppressHydrationWarning
                className="rounded-xl border border-white/5 bg-white/[0.04] p-4"
              >
                <div className="mb-3 flex items-center gap-2 text-zinc-400">
                  <MousePointerClick size={15} />
                  <span className="text-xs">Total clicks</span>
                </div>

                <p className="text-2xl font-bold">24.8K</p>
                <p className="mt-1 text-xs text-emerald-400">
                  +12.8% growth
                </p>
              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="850"
                suppressHydrationWarning
                className="rounded-xl border border-white/5 bg-white/[0.04] p-4"
              >
                <div className="mb-3 flex items-center gap-2 text-zinc-400">
                  <Link2 size={15} />
                  <span className="text-xs">Active links</span>
                </div>

                <p className="text-2xl font-bold">1,284</p>
                <p className="mt-1 text-xs text-violet-300">
                  Link overview
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.04] p-4">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium">Click activity</p>
                <span className="text-xs text-zinc-500">
                  Illustrative data
                </span>
              </div>

              <div
                className="flex h-40 items-end justify-between gap-2"
                aria-label="Illustrative click activity bar chart"
              >
                {[
                  42, 65, 48, 82, 58, 95, 70, 100, 76, 88, 60, 92,
                ].map((height, index) => (
                  <div
                    key={index}
                    style={{
                      height: `${height}%`,
                      animationDelay: `${900 + index * 70}ms`,
                    }}
                    className="animate-bar w-full origin-bottom rounded-t-md bg-gradient-to-t from-violet-700 to-fuchsia-400 opacity-80 transition-opacity hover:opacity-100"
                  />
                ))}
              </div>

              <div className="mt-3 flex justify-between text-[10px] text-zinc-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Floating card */}
          <div
            data-aos="fade-up"
            data-aos-delay="1100"
            suppressHydrationWarning
            className="absolute -bottom-7 -left-4 sm:-left-8"
          >
            <div className="glass-card animate-float flex items-center gap-3 rounded-2xl p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <MousePointerClick size={20} />
              </span>

              <div>
                <p className="text-xs text-zinc-400">Clicks tracked</p>
                <p className="text-lg font-bold">Real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
