"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Plus, ExternalLink } from "lucide-react";

import { getAllURLs, type BackendURL } from "@/lib/api";
import type { DashboardStat } from "@/types/dashboard";
import StatCard from "./StatCard";

const SHORT_URL_BASE =
  process.env.NEXT_PUBLIC_SHORT_URL_BASE ||
  "http://localhost:8001";

export default function DashboardOverview() {
  const [urls, setUrls] = useState<BackendURL[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getAllURLs()
      .then((data) => {
        if (ignore) return;

        setUrls(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (ignore) return;

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load dashboard data",
        );
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const dashboardStats: DashboardStat[] = useMemo(() => {
    const totalLinks = urls.length;

    const totalClicks = urls.reduce(
      (total, url) => total + (url.visitHistory?.length ?? 0),
      0,
    );

    const activeLinks = urls.filter(
      (url) => url.status !== "inactive",
    ).length;

    const averageClicks = totalLinks
      ? (totalClicks / totalLinks).toFixed(1)
      : "0.0";

    return [
      {
        id: "links",
        label: "Total Links",
        value: totalLinks.toLocaleString(),
        change: "Live",
        description: "Total created links",
      },
      {
        id: "clicks",
        label: "Total Clicks",
        value: totalClicks.toLocaleString(),
        change: "Live",
        description: "All recorded visits",
      },
      {
        id: "active",
        label: "Active Links",
        value: activeLinks.toLocaleString(),
        change: "Live",
        description: "Currently active",
      },
      {
        id: "engagement",
        label: "Average Clicks",
        value: averageClicks,
        change: "Live",
        description: "Per shortened link",
      },
    ];
  }, [urls]);

  const recentUrls = useMemo(() => {
    return [...urls]
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      )
      .slice(0, 5);
  }, [urls]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          suppressHydrationWarning
        >
          <p className="text-sm text-violet-300">Your workspace</p>

          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Overview
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Track and manage all your short links in one place.
          </p>
        </div>

        <Link
          href="/dashboard/links"
          data-aos="fade-up"
          data-aos-delay="200"
          suppressHydrationWarning
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <Plus size={17} />
          Create new link
        </Link>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </p>
      )}

      {/* Live statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <div
            key={stat.id}
            data-aos="fade-up"
            data-aos-delay={250 + index * 100}
            suppressHydrationWarning
          >
            <StatCard
              stat={{
                ...stat,
                value: isLoading ? "—" : stat.value,
              }}
            />
          </div>
        ))}
      </div>

      {/* Recent links */}
      <section
        data-aos="fade-up"
        data-aos-delay="300"
        suppressHydrationWarning
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#15121f]"
      >
        <div className="flex flex-col justify-between gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-white">Recent links</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Your latest created short URLs.
            </p>
          </div>

          <Link
            href="/dashboard/links"
            className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
          >
            View all links
          </Link>
        </div>

        {isLoading ? (
          <p className="px-5 py-10 text-center text-sm text-zinc-400">
            Loading recent links...
          </p>
        ) : recentUrls.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-zinc-400">
            No links created yet. Create your first short link.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Short link</th>
                  <th className="px-5 py-4 font-medium">Destination</th>
                  <th className="px-5 py-4 font-medium">Clicks</th>
                  <th className="px-5 py-4 font-medium">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {recentUrls.map((url) => (
                  <tr key={url.shortId} className="text-zinc-300">
                    <td className="whitespace-nowrap px-5 py-4">
                      <a
                        href={`${SHORT_URL_BASE}/${url.shortId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-medium text-violet-300 hover:text-violet-200"
                      >
                        {url.shortId}
                        <ExternalLink size={13} />
                      </a>
                    </td>

                    <td className="max-w-64 truncate px-5 py-4 text-zinc-400">
                      {url.redirectUrl}
                    </td>

                    <td className="px-5 py-4">
                      {(url.visitHistory?.length ?? 0).toLocaleString()}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-zinc-400">
                      {url.createdAt
                        ? new Date(url.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}