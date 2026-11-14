import {
  Link2,
  BarChart3,
  Building2,
} from "lucide-react";

import type { Plan } from "@/types/pricing";

export const plans: Plan[] = [
  {
    name: "Free",
    description: "Everything you need to start shortening links.",
    monthly: 0,
    yearly: 0,
    icon: Link2,
    features: [
      "Up to 25 short links",
      "Basic click tracking",
      "Standard short URLs",
      "Link management",
      "Basic analytics",
      "Community support",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    description: "More control and insights for growing projects.",
    monthly: 9.99,
    yearly: 7.99,
    icon: BarChart3,
    features: [
      "Unlimited short links",
      "Advanced click analytics",
      "Custom short aliases",
      "Link performance insights",
      "Organized link management",
      "Priority support",
    ],
    cta: "Choose Pro",
    highlighted: true,
  },
  {
    name: "Business",
    description: "Flexible link management for larger organizations.",
    monthly: null,
    yearly: null,
    custom: true,
    icon: Building2,
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Advanced reporting",
      "Custom domain support",
      "Dedicated account support",
      "Tailored integrations",
    ],
    cta: "Contact Sales",
  },
];