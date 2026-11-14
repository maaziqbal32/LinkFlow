import type { LucideIcon } from "lucide-react";

export type Plan = {
  name: string;
  description: string;
  monthly: number | null;
  yearly: number | null;
  custom?: boolean;
  icon: LucideIcon;
  features: string[];
  cta: string;
  highlighted?: boolean;
};