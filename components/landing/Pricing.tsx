"use client";

import { useState } from "react";
import { CheckCircle2, Layers, LayoutGrid, Sparkles, Tag } from "lucide-react";

type Plan = {
  name: string;
  icon: typeof Layers;
  description: string;
  monthly: string | null; // null = text price
  yearly: string | null;
  textPrice?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Basic",
    icon: Layers,
    description:
      "Perfect for individuals looking to streamline their scheduling with essential features.",
    monthly: null,
    yearly: null,
    textPrice: "Free",
    features: [
      "Automated Meeting Scheduling",
      "Basic Calendar Sync",
      "Daily Schedule Overview",
      "Email Reminders",
      "Task Management",
      "24/7 Customer Support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    icon: LayoutGrid,
    description:
      "Ideal for small teams needing advanced scheduling and customization options.",
    monthly: "$9.99",
    yearly: "$7.99", // 20% off
    features: [
      "All Basic Plan Features",
      "Advanced Calendar Integrations",
      "Customizable Notifications",
      "Priority Support",
      "Analytics and Insights",
      "Group Scheduling",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: Sparkles,
    description:
      "Tailored for large organizations requiring enterprise-grade features and integrations.",
    monthly: null,
    yearly: null,
    textPrice: "Custom",
    features: [
      "All Pro Plan Features",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Advanced Security Features",
      "Team Collaboration Tools",
      "Onboarding and Training",
    ],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="container-main py-24">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
          <Tag size={12} className="text-violet-400" />
          Pricing
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Flexible Pricing Plans <span className="text-gradient">for Every Need</span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm text-zinc-400 sm:text-base">
          Choose the plan that best fits your requirements and start optimizing
          your time today!
        </p>
      </div>

      {/* Billing toggle */}
      <div className="mt-10 flex items-center justify-center gap-3 text-sm">
        <span className={yearly ? "text-zinc-500" : "text-white"}>Monthly</span>

        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          aria-label="Switch between monthly and annual billing"
          onClick={() => setYearly((v) => !v)}
          className="relative h-6 w-11 rounded-full bg-violet-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
              yearly ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>

        <span className={yearly ? "text-white" : "text-zinc-500"}>Annually</span>

        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-300">
          20% Off
        </span>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-12 grid max-w-md gap-5 md:max-w-none md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const price = yearly ? plan.yearly : plan.monthly;

          return (
            <article
              key={plan.name}
              className={`glass-card relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
                plan.highlighted
                  ? "border border-violet-500/40 shadow-[0_0_60px_-15px_rgba(139,92,246,0.55)]"
                  : "hover:border-violet-500/30"
              }`}
            >
              <span
                className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                  plan.highlighted
                    ? "bg-violet-600 text-white"
                    : "bg-violet-500/15 text-violet-300"
                }`}
              >
                <Icon size={20} />
              </span>

              <h3 className="text-xl font-semibold">{plan.name}</h3>

              <p className="mt-2 min-h-[2.5rem] text-sm leading-5 text-zinc-400">
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-gradient text-4xl font-bold tracking-tight">
                  {plan.textPrice ?? price}
                </span>
                {!plan.textPrice && (
                  <span className="text-sm text-zinc-400">/month</span>
                )}
              </div>

              {!plan.textPrice && (
                <p className="mt-1 h-4 text-xs text-zinc-500">
                  {yearly ? "Billed annually" : "Billed monthly"}
                </p>
              )}

              <p className="mt-6 text-sm font-medium text-zinc-200">Features:</p>

              <ul className="mt-4 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-violet-400"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-8 w-full rounded-full py-2.5 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                  plan.highlighted
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500"
                    : "border border-white/10 bg-white/5 text-white hover:border-violet-500/40 hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}