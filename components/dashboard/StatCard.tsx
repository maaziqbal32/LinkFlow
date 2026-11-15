import type { DashboardStat } from "@/types/dashboard";
import { TrendingUp } from "lucide-react";

export default function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#171321] p-5">
      <p className="text-sm text-zinc-400">{stat.label}</p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>

        <span className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
          <TrendingUp size={13} />
          {stat.change}
        </span>
      </div>

      <p className="mt-3 text-xs text-zinc-500">{stat.description}</p>
    </article>
  );
}