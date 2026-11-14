import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { recentLinks } from "@/data/dashboard";

export default function RecentLinks() {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#171321]">
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <div>
          <h2 className="font-semibold">Recent Links</h2>
          <p className="mt-1 text-xs text-zinc-500">Your latest shortened URLs</p>
        </div>

        <Link
          href="/dashboard/links"
          className="flex items-center gap-1 text-sm text-violet-300 hover:text-violet-200"
        >
          View all <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-white/[0.02] text-xs text-zinc-500">
            <tr>
              <th className="px-5 py-4 font-medium">Short link</th>
              <th className="px-5 py-4 font-medium">Destination</th>
              <th className="px-5 py-4 font-medium">Clicks</th>
              <th className="px-5 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentLinks.map((link) => (
              <tr key={link.id} className="border-t border-white/5">
                <td className="px-5 py-4 font-medium text-violet-300">
                  /{link.shortId}
                </td>

                <td className="max-w-xs truncate px-5 py-4 text-zinc-400">
                  {link.originalUrl}
                </td>

                <td className="px-5 py-4">{link.clicks.toLocaleString()}</td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      link.status === "active"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {link.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}