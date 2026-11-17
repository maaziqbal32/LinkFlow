
"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ShortLink } from "@/types/dashboard";
import CreateLinkForm from "./CreateLinkForm";
import LinksTable from "./LinksTable";
import AOS from "aos";

import {
  getAllURLs,
  createShortURL,
  deleteShortURL,
  type BackendURL,
} from "@/lib/api";

type Filter = "all" | "active" | "inactive";

// Convert backend URL data into frontend ShortLink format
const mapBackendURL = (url: BackendURL): ShortLink => {
  return {
    id: url._id ?? url.shortId,
    shortId: url.shortId,
    originalUrl: url.redirectUrl,
    clicks: url.visitHistory?.length ?? 0,
    createdAt: url.createdAt
      ? new Date(url.createdAt).toLocaleDateString()
      : "—",
    status: "active",
  };
};

export default function LinksManager() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

// Fetch URLs when component mounts
useEffect(() => {
  let ignore = false;

  getAllURLs()
    .then((data) => {
      if (ignore) return;

      setError(null);
      setLinks(data.map(mapBackendURL));
    })
    .catch((err: unknown) => {
      if (ignore) return;

      setError(
        err instanceof Error ? err.message : "Failed to load links",
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

  // Create a new short URL
 const handleCreateLink = async (url: string) => {
  try {
    setError(null);

    await createShortURL(url);

    const data = await getAllURLs();
    setLinks(data.map(mapBackendURL));
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to create link",
    );
  }
};

  // Delete a URL from backend
  const handleDeleteLink = async (shortId: string) => {
    try {
      setError(null);

      await deleteShortURL(shortId);

      setLinks((currentLinks) =>
        currentLinks.filter((link) => link.shortId !== shortId),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete link",
      );
    }
  };

  // Refresh AOS animations
  useEffect(() => {
    const timers = [
      setTimeout(() => AOS.refreshHard(), 50),
      setTimeout(() => AOS.refreshHard(), 200),
      setTimeout(() => AOS.refreshHard(), 500),
      setTimeout(() => AOS.refreshHard(), 900),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Search and filter URLs
  const filteredLinks = useMemo(() => {
    return links.filter((link) => {
      const matchesFilter =
        filter === "all" || link.status === filter;

      const query = search.toLowerCase();

      const matchesSearch =
        link.originalUrl.toLowerCase().includes(query) ||
        link.shortId.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [links, filter, search]);

  // Toggle status (currently frontend-only)
  function handleToggleStatus(id: string) {
    setLinks((current) =>
      current.map((link) =>
        link.id === id
          ? {
            ...link,
            status:
              link.status === "active" ? "inactive" : "active",
          }
          : link,
      ),
    );
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

        {/* API loading and error states */}
        {isLoading && (
          <p className="text-sm text-zinc-400" role="status">
            Loading your links...
          </p>
        )}

        {error && (
          <p
            className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

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
              className={`rounded-lg px-4 py-2 text-sm capitalize transition ${filter === item
                  ? "bg-violet-600 text-white"
                  : "border border-white/10 bg-[#15121f] text-zinc-400 hover:text-white"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {!isLoading && (
          <LinksTable
            links={filteredLinks}
            onDelete={handleDeleteLink}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </section>
    </div>
  );
}
