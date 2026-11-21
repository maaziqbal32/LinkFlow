
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import LogoutButton from "@/components/auth/LogoutButton";
import { getCurrentUser } from "@/lib/api";
import { useDashboardSearch } from "./DashboardSearchContext";

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const { searchQuery, setSearchQuery } = useDashboardSearch();

  const [searchOpen, setSearchOpen] = useState(false);
  const [avatarInitials, setAvatarInitials] = useState("U");

  // Fetch logged-in user for avatar initials
  useEffect(() => {
    let isMounted = true;

    getCurrentUser()
      .then(({ user }) => {
        if (!isMounted) return;

        const initials = user.name
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part.charAt(0))
          .join("")
          .toUpperCase();

        setAvatarInitials(initials || "U");
      })
      .catch(() => {
        // Keep fallback avatar if user cannot be fetched
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchToggle = () => {
    const nextState = !searchOpen;

    setSearchOpen(nextState);

    if (nextState && pathname !== "/dashboard/links") {
      router.push("/dashboard/links");
    }
  };

  return (
    <header className="flex min-h-20 items-center justify-between gap-3 border-b border-white/10 px-5 py-3 sm:px-8">
      <div>
        <p className="text-sm text-zinc-400">Workspace</p>
        <h1 className="font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        {searchOpen && (
          <input
            type="search"
            autoFocus
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search your links..."
            aria-label="Search your links"
            className="w-36 rounded-xl border border-white/10 bg-[#15121f] px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500 sm:w-70"
          />
        )}

        <button
          type="button"
          onClick={handleSearchToggle}
          aria-label={searchOpen ? "Close search" : "Search links"}
          aria-expanded={searchOpen}
          className={`rounded-xl border border-white/10 p-2.5 transition-colors ${
            searchOpen
              ? "bg-violet-600 text-white"
              : "text-zinc-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Search size={18} />
        </button>

        <div
          aria-label="User avatar"
          title="Your account"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold"
        >
          {avatarInitials}
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}
