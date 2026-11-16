"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ShortLink } from "@/types/dashboard";
import { recentLinks } from "@/data/dashboard";
import CreateLinkForm from "./CreateLinkForm";
import LinksTable from "./LinksTable";
import AOS from "aos";

type Filter = "all" | "active" | "inactive";

export default function LinksManager() {
  const [links, setLinks] = useState<ShortLink[]>(recentLinks);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  // Strong refresh when this page/tab becomes visible
  useEffect(() => {
    // Multiple refreshes with different delays to cover different mount timings
    const timers = [
      setTimeout(() => AOS.refreshHard(), 50),
      setTimeout(() => AOS.refreshHard(), 200),
      setTimeout(() => AOS.refreshHard(), 500),
      setTimeout(() => AOS.refreshHard(), 900),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const filteredLinks = useMemo(() => {
    return links.filter((link) => {
      const matchesFilter = filter === "all" || link.status === filter;
      const query = search.toLowerCase();

      const matchesSearch =
        link.originalUrl.toLowerCase().includes(query) ||
        link.shortId.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [links, filter, search]);

  function handleCreateLink(url: string) {
    const shortId = crypto.randomUUID().replaceAll("-", "").slice(0, 8);

    const newLink: ShortLink = {
      id: shortId,
      shortId,
      originalUrl: url,
      clicks: 0,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "active",
    };

    setLinks((current) => [newLink, ...current]);
  }

  function handleToggleStatus(id: string) {
    setLinks((current) =>
      current.map((link) =>
        link.id === id
          ? {
              ...link,
              status: link.status === "active" ? "inactive" : "active",
            }
          : link
      )
    );
  }

  function handleDelete(id: string) {
    setLinks((current) => current.filter((link) => link.id !== id));
  }

  return (
    <div className="space-y-8">
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        suppressHydrationWarning
      >
        <p className="text-sm font-medium text-violet-400">
          LINK MANAGEMENT
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          My Links
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Create, organize and manage all your shortened URLs.
        </p>
      </div>

      <CreateLinkForm onCreate={handleCreateLink} />

      <section
        className="space-y-5"
        data-aos="fade-up"
        data-aos-delay="250"
        suppressHydrationWarning
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              All links
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              {links.length} links in your workspace
            </p>
          </div>

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search links..."
              aria-label="Search links"
              className="w-full rounded-xl border border-white/10 bg-[#15121f] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-violet-500 sm:w-64"
            />
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2"
          data-aos="fade-up"
          data-aos-delay="350"
          suppressHydrationWarning
        >
          {(["all", "active", "inactive"] as Filter[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 text-sm capitalize transition ${
                filter === item
                  ? "bg-violet-600 text-white"
                  : "border border-white/10 bg-[#15121f] text-zinc-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <LinksTable
          links={filteredLinks}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </section>
    </div>
  );
}