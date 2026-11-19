
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  MousePointerClick,
  Link2,
  TrendingUp,
} from "lucide-react";

import { getAllURLs, type BackendURL } from "@/lib/api";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

const getDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export default function AnalyticsOverview() {
  const [urls, setUrls] = useState<BackendURL[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [referenceTime, setReferenceTime] = useState<number | null>(null);
  // Fetch URL and visit history data from backend
  useEffect(() => {
    let ignore = false;

    getAllURLs()
      .then((data) => {
        if (ignore) return;


        console.log(
          "RAW VISIT HISTORY:",
          data.map((url) => ({
            shortId: url.shortId,
            visitHistory: url.visitHistory,
          })),
        );
        setUrls(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (ignore) return;

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load analytics",
        );
      })
      .finally(() => {
        if (!ignore) {
          setReferenceTime(Date.now());
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Calculate analytics from actual visit history
  const analytics = useMemo(() => {
    const allVisits = urls.flatMap((url) =>
      (url.visitHistory ?? []).map((visit) => {
        const rawTimestamp = visit.timestamp;

        const timestamp =
          typeof rawTimestamp === "number"
            ? rawTimestamp
            : Number.isFinite(Number(rawTimestamp))
              ? Number(rawTimestamp)
              : new Date(rawTimestamp).getTime();

        return {
          shortId: url.shortId,
          redirectUrl: url.redirectUrl,
          timestamp,
        };
      }),
    );

    const validVisits = allVisits.filter(
      (visit) => Number.isFinite(visit.timestamp),
    );

    const totalClicks = urls.reduce(
      (total, url) => total + (url.visitHistory?.length ?? 0),
      0,
    );
    const totalLinks = urls.length;

    const today = new Date(referenceTime ?? 0);
    today.setHours(0, 0, 0, 0);

    // Last 7 days, including today
    const weeklyClicks = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));

      return {
        date,
        key: getDateKey(date),
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        clicks: 0,
      };
    });

    const weeklyMap = new Map(
      weeklyClicks.map((day) => [day.key, day]),
    );

    const currentWeekStart = weeklyClicks[0].date;
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(
      previousWeekStart.getDate() - 7,
    );

    let previousWeekClicks = 0;
    let currentWeekTotal = 0;

    validVisits.forEach((visit) => {
      const visitDate = new Date(visit.timestamp);

      if (
        visitDate >= previousWeekStart &&
        visitDate < currentWeekStart
      ) {
        previousWeekClicks++;
      }

      const key = getDateKey(visitDate);
      const day = weeklyMap.get(key);

      if (day) {
        day.clicks++;
        currentWeekTotal++;
      }
    });

    // Most clicked links
    const topLinks = urls
      .map((url) => ({
        shortId: url.shortId,
        redirectUrl: url.redirectUrl,
        clicks: url.visitHistory?.length ?? 0,
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 4);

    const topDay = [...weeklyClicks].sort(
      (a, b) => b.clicks - a.clicks,
    )[0];

    let trendText = "No recent activity";
    let trendGrowing = false;

    if (previousWeekClicks === 0 && currentWeekTotal > 0) {
      trendText = "New activity this week";
      trendGrowing = true;
    } else if (previousWeekClicks > 0) {
      const change =
        ((currentWeekTotal - previousWeekClicks) /
          previousWeekClicks) *
        100;

      trendGrowing = change >= 0;

      trendText = `${change >= 0 ? "+" : ""}${change.toFixed(1)}% vs previous 7 days`;
    }

    return {
      totalClicks,
      totalLinks,
      averageClicks: totalLinks
        ? (totalClicks / totalLinks).toFixed(1)
        : "0.0",
      linksWithClicks: urls.filter(
        (url) => (url.visitHistory?.length ?? 0) > 0,
      ).length,
      weeklyClicks,
      maxWeeklyClicks: Math.max(
        1,
        ...weeklyClicks.map((day) => day.clicks),
      ),
      topLinks,
      topDay,
      trendText,
      trendGrowing,
    };
  },[urls, referenceTime]);

  const stats = [
    {
      label: "Total clicks",
      value: formatNumber(analytics.totalClicks),
      description: "All recorded visits",
      icon: MousePointerClick,
    },
    {
      label: "Total links",
      value: formatNumber(analytics.totalLinks),
      description: "Stored in database",
      icon: Link2,
    },
    {
      label: "Avg. clicks per link",
      value: analytics.averageClicks,
      description: "Average across all links",
      icon: TrendingUp,
    },
    {
      label: "Links with clicks",
      value: formatNumber(analytics.linksWithClicks),
      description: "Received at least one visit",
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        suppressHydrationWarning
      >
        <p className="text-sm font-medium text-violet-400">
          PERFORMANCE
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Understand how your shortened links are performing.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
        >
          {error}
        </p>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={200 + index * 100}
              suppressHydrationWarning
              className="rounded-2xl border border-white/10 bg-[#15121f] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">
                  {stat.label}
                </span>

                <Icon size={19} className="text-violet-400" />
              </div>

              <p className="mt-4 text-2xl font-bold text-white">
                {isLoading ? "—" : stat.value}
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Weekly clicks */}
        <section
          className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
          data-aos="fade-up"
          data-aos-delay="300"
          suppressHydrationWarning
        >
          <div className="mb-8">
            <h2 className="font-semibold text-white">
              Weekly click activity
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Actual clicks recorded over the last 7 days
            </p>
          </div>

          {isLoading ? (
            <p className="py-12 text-center text-sm text-zinc-400">
              Loading analytics...
            </p>
          ) : (
            <div className="flex h-64 items-end justify-between gap-3">
              {analytics.weeklyClicks.map((item, index) => (
                <div
                  key={item.key}
                  data-aos="zoom-in-up"
                  data-aos-delay={400 + index * 70}
                  suppressHydrationWarning
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <span className="text-xs text-zinc-400">
                    {item.clicks}
                  </span>

                  <div className="flex h-[78%] w-full items-end">
                    <div
                      className="w-full rounded-t-lg bg-violet-500/80 transition hover:bg-violet-400"
                      style={{
                        height: `${(item.clicks / analytics.maxWeeklyClicks) * 100}%`,
                        minHeight: item.clicks > 0 ? "4px" : "0px",
                      }}
                      title={`${item.clicks} clicks`}
                    />
                  </div>

                  <span className="text-xs text-zinc-500">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Top performing links */}
        <section
          className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
          data-aos="fade-up"
          data-aos-delay="350"
          suppressHydrationWarning
        >
          <div className="mb-7 flex items-center gap-2">
            <Link2 size={18} className="text-violet-400" />

            <h2 className="font-semibold text-white">
              Top performing links
            </h2>
          </div>

          {isLoading ? (
            <p className="text-sm text-zinc-400">
              Loading links...
            </p>
          ) : analytics.topLinks.length === 0 ? (
            <p className="text-sm text-zinc-400">
              No links available yet.
            </p>
          ) : (
            <div className="space-y-5">
              {analytics.topLinks.map((link, index) => (
                <div
                  key={link.shortId}
                  data-aos="fade-up"
                  data-aos-delay={450 + index * 80}
                  suppressHydrationWarning
                >
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="truncate text-zinc-300">
                        {link.shortId}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {link.redirectUrl}
                      </p>
                    </div>

                    <span className="shrink-0 text-zinc-400">
                      {formatNumber(link.clicks)} clicks
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-violet-500"
                      style={{
                        width: `${analytics.topLinks[0].clicks > 0
                          ? (link.clicks /
                            analytics.topLinks[0].clicks) *
                          100
                          : 0
                          }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Insights */}
      <section className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <MousePointerClick
            size={18}
            className="text-violet-400"
          />

          <h2 className="font-semibold text-white">
            Analytics insights
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white/3 p-4">
            <p className="text-sm text-zinc-400">
              Top performing day
            </p>

            <p className="mt-2 text-xl font-semibold text-white">
              {isLoading
                ? "Loading..."
                : analytics.topDay.clicks > 0
                  ? analytics.topDay.day
                  : "No clicks yet"}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Based on the last 7 days
            </p>
          </div>

          <div className="rounded-xl bg-white/3 p-4">
            <p className="text-sm text-zinc-400">
              Weekly engagement trend
            </p>

            <p
              className={`mt-2 flex items-center gap-2 text-xl font-semibold ${analytics.trendGrowing
                ? "text-emerald-400"
                : "text-zinc-300"
                }`}
            >
              <TrendingUp size={20} />
              {isLoading ? "Loading..." : analytics.trendText}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Compared with the previous 7 days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
