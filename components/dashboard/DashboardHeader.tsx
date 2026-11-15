import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 px-5 sm:px-8">
      <div>
        <p className="text-sm text-zinc-400">Workspace</p>
        <h1 className="font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Search"
          className="rounded-xl border border-white/10 p-2.5 text-zinc-400 hover:text-white"
        >
          <Search size={18} />
        </button>

        <button
          aria-label="Notifications"
          className="rounded-xl border border-white/10 p-2.5 text-zinc-400 hover:text-white"
        >
          <Bell size={18} />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold">
          M
        </div>
      </div>
    </header>
  );
}