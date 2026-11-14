"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Link as LinkIcon,
  ChartNoAxesCombined,
  Settings,
  Link2,
} from "lucide-react";

import { dashboardNavigation } from "@/data/dashboard";

const icons = {
  "layout-dashboard": LayoutDashboard,
  link: LinkIcon,
  "chart-no-axes-combined": ChartNoAxesCombined,
  settings: Settings,
};

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-white/10 bg-[#120f1b] p-5 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <Link href="/dashboard" className="mb-8 flex items-center gap-3 text-xl font-bold">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
          <Link2 size={21} />
        </span>
        LinkFlow
      </Link>

      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        Workspace
      </p>

      <nav className="flex gap-2 overflow-x-auto lg:flex-col">
        {dashboardNavigation.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons];
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="mt-8 hidden text-sm text-zinc-500 hover:text-white lg:block"
      >
        ← Back to website
      </Link>
    </aside>
  );
}