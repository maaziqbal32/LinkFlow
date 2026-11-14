"use client";

import { useState } from "react";
import { Check, Tag } from "lucide-react";
import { plans } from "@/data/pricing";


export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="container-main py-20 sm:py-24">
      {/* Heading */}
      <div
        className="mx-auto max-w-2xl text-center"
        data-aos="fade-up"
        suppressHydrationWarning
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
          <Tag size={13} className="text-violet-400" />
          Simple Pricing
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Plans that grow with{" "}
          <span className="text-gradient">your links</span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-zinc-400 sm:text-base">
          Start for free and upgrade when you need more powerful
          link management and analytics.
        </p>
      </div>

      {/* Billing toggle */}
      <div
        className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm"
        data-aos="fade-up"
        data-aos-delay="100"
        suppressHydrationWarning
      >
        <span className={!yearly ? "text-white" : "text-zinc-500"}>
          Monthly
        </span>

        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          aria-label="Switch between monthly and yearly billing"
          onClick={() => setYearly((value) => !value)}
          className="relative h-6 w-11 rounded-full bg-violet-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${yearly ? "translate-x-5" : "translate-x-0"
              }`}
          />
        </button>

        <span className={yearly ? "text-white" : "text-zinc-500"}>
          Yearly
        </span>

        <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[11px] font-medium text-emerald-300">
          Save 20%
        </span>
      </div>

      {/* Pricing cards */}
      <div className="mx-auto mt-12 grid max-w-md gap-5 md:max-w-none md:grid-cols-3">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const price = yearly ? plan.yearly : plan.monthly;

          return (
            /* AOS lives on this plain wrapper so it never fights the hover animation */
            <div
              key={plan.name}
              data-aos="fade-up"
              data-aos-delay={String(index * 100)}
              suppressHydrationWarning
              className="h-full"
            >
              <article
                className={`glass-card relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 sm:p-7 ${plan.highlighted
                    ? "border-violet-500/50 shadow-[0_0_60px_-15px_rgba(139,92,246,0.45)] hover:shadow-[0_0_70px_-12px_rgba(139,92,246,0.6)]"
                    : "hover:border-violet-500/30"
                  }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}

                <span
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${plan.highlighted
                      ? "bg-violet-600 text-white"
                      : "bg-violet-500/15 text-violet-300"
                    }`}
                >
                  <Icon size={21} />
                </span>

                <h3 className="text-xl font-semibold">{plan.name}</h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">
                  {plan.description}
                </p>

                <div className="mt-6 flex min-h-12 items-baseline gap-1">
                  {plan.custom ? (
                    <span className="text-3xl font-bold text-gradient">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold tracking-tight text-gradient">
                        ${price?.toFixed(2)}
                      </span>
                      {price !== 0 && (
                        <span className="text-sm text-zinc-400">/month</span>
                      )}
                    </>
                  )}
                </div>

                <p className="mt-1 min-h-5 text-xs text-zinc-500">
                  {plan.custom
                    ? "Tailored for your organization"
                    : price === 0
                      ? "Free forever"
                      : yearly
                        ? "Billed annually"
                        : "Billed monthly"}
                </p>

                <div className="my-6 border-t border-white/10" />

                <p className="text-sm font-medium text-zinc-200">
                  What&apos;s included:
                </p>

                <ul className="mt-5 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-violet-400"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`mt-8 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${plan.highlighted
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/20 hover:-translate-y-0.5 hover:shadow-violet-600/40"
                      : "border border-white/10 bg-white/5 text-white hover:border-violet-500/40 hover:bg-white/10"
                    }`}
                >
                  {plan.cta}
                </button>
              </article>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-zinc-500">
        Pricing is illustrative for this portfolio project and is not a live
        subscription offer.
      </p>
    </section>
  );
}