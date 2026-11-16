import {
  Activity,
  MousePointerClick,
  Link2,
  TrendingUp,
  Globe2,
} from "lucide-react";

const stats = [
  { label: "Total clicks", value: "24,892", change: "+18.2%", icon: MousePointerClick },
  { label: "Total links", value: "128", change: "+12.5%", icon: Link2 },
  { label: "Avg. clicks per link", value: "194", change: "+5.6%", icon: TrendingUp },
  { label: "Active links", value: "116", change: "+8.4%", icon: Activity },
];

const weeklyClicks = [
  { day: "Mon", clicks: 42 },
  { day: "Tue", clicks: 68 },
  { day: "Wed", clicks: 54 },
  { day: "Thu", clicks: 85 },
  { day: "Fri", clicks: 62 },
  { day: "Sat", clicks: 96 },
  { day: "Sun", clicks: 74 },
];

const sources = [
  { name: "Direct", value: 48, color: "bg-violet-500" },
  { name: "Social media", value: 27, color: "bg-blue-500" },
  { name: "Search", value: 16, color: "bg-emerald-500" },
  { name: "Other", value: 9, color: "bg-amber-500" },
];

export default function AnalyticsOverview() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        suppressHydrationWarning
      >
        <p className="text-sm font-medium text-violet-400">PERFORMANCE</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Analytics</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Understand how your shortened links are performing.
        </p>
      </div>

      {/* Stat cards — staggered cascade */}
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
                <span className="text-sm text-zinc-400">{stat.label}</span>
                <Icon size={19} className="text-violet-400" />
              </div>
              <p className="mt-4 text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-2 text-xs text-emerald-400">
                {stat.change} <span className="text-zinc-500">vs last month</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Weekly chart */}
        <section
          className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
          data-aos="fade-up"
          data-aos-delay="300"
          suppressHydrationWarning
        >
          <div className="mb-8">
            <h2 className="font-semibold text-white">Weekly click activity</h2>
            <p className="mt-1 text-sm text-zinc-400">Sample clicks over the last 7 days</p>
          </div>

          <div className="flex h-64 items-end justify-between gap-3">
            {weeklyClicks.map((item, index) => (
              <div
                key={item.day}
                data-aos="zoom-in-up"
                data-aos-delay={400 + index * 70}
                suppressHydrationWarning
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <span className="text-xs text-zinc-400">{item.clicks}</span>
                <div className="flex h-[78%] w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-violet-500/80 transition hover:bg-violet-400"
                    style={{ height: `${item.clicks}%` }}
                    title={`${item.clicks} clicks`}
                  />
                </div>
                <span className="text-xs text-zinc-500">{item.day}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Traffic sources */}
        <section
          className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
          data-aos="fade-up"
          data-aos-delay="350"
          suppressHydrationWarning
        >
          <div className="mb-7 flex items-center gap-2">
            <Globe2 size={18} className="text-violet-400" />
            <h2 className="font-semibold text-white">Traffic sources</h2>
          </div>

          <div className="space-y-6">
            {sources.map((source, index) => (
              <div
                key={source.name}
                data-aos="fade-up"
                data-aos-delay={450 + index * 80}
                suppressHydrationWarning
              >
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-zinc-300">{source.name}</span>
                  <span className="text-zinc-400">{source.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${source.color}`}
                    style={{ width: `${source.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Insights */}
      <section
        className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <MousePointerClick size={18} className="text-violet-400" />
          <h2 className="font-semibold text-white">Analytics insights</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div
            className="rounded-xl bg-white/3 p-4"
          >
            <p className="text-sm text-zinc-400">Top performing period</p>
            <p className="mt-2 text-xl font-semibold text-white">Saturday</p>
            <p className="mt-1 text-xs text-zinc-500">Based on sample weekly activity</p>
          </div>
          <div
            className="rounded-xl bg-white/3 p-4"
          >
            <p className="text-sm text-zinc-400">Engagement trend</p>
            <p className="mt-2 flex items-center gap-2 text-xl font-semibold text-emerald-400">
              <TrendingUp size={20} /> Growing
            </p>
            <p className="mt-1 text-xs text-zinc-500">Illustrative dashboard insight</p>
          </div>
        </div>
      </section>
    </div>
  );
}