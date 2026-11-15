import Link from "next/link";
import { Plus } from "lucide-react";

import { dashboardStats } from "@/data/dashboard";
import StatCard from "./StatCard";
import RecentLinks from "./RecentLinks";

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header row */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          suppressHydrationWarning
        >
          <p className="text-sm text-violet-300">Your workspace</p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Overview</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Track and manage all your short links in one place.
          </p>
        </div>

        <Link
          href="/dashboard/links"
          data-aos="fade-up"
          data-aos-delay="200"
          suppressHydrationWarning
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          <Plus size={17} />
          Create new link
        </Link>
      </div>

      {/* Stat cards — staggered one by one */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <div
            key={stat.id}
            data-aos="fade-up"
            data-aos-delay={250 + index * 100}
            suppressHydrationWarning
          >
            <StatCard stat={stat} />
          </div>
        ))}
      </div>

      {/* Recent links table */}
      <div
        data-aos="fade-up"
        data-aos-delay={300}
        suppressHydrationWarning
      >
        <RecentLinks />
      </div>
    </div>
  );
}