import Link from "next/link";
import { Plus } from "lucide-react";

import { dashboardStats } from "@/data/dashboard";
import StatCard from "./StatCard";
import RecentLinks from "./RecentLinks";

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-violet-300">Your workspace</p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Overview</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Track and manage all your short links in one place.
          </p>
        </div>

        <Link
          href="/dashboard/links"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          <Plus size={17} />
          Create new link
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <RecentLinks />
    </div>
  );
}