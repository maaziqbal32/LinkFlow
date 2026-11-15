"use client";

import { useMemo, useState } from "react";
import {
  Copy,
  ExternalLink,
  Link2,
  Plus,
  Search,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Check,
} from "lucide-react";
import type { ShortLink } from "@/types/dashboard";
import { recentLinks } from "@/data/dashboard";

type Filter = "all" | "active" | "inactive";

const BASE_URL = "https://linkflow.app";

export default function LinksManager() {
  const [links, setLinks] = useState<ShortLink[]>(recentLinks);
  const [originalUrl, setOriginalUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [success, setSuccess] = useState("");

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

  function handleCreateLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");

    let normalizedUrl = originalUrl.trim();

    if (!normalizedUrl) {
      setUrlError("Please enter a destination URL.");
      return;
    }

    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      setUrlError("Please enter a valid URL.");
      return;
    }

    const shortId = crypto.randomUUID().replaceAll("-", "").slice(0, 8);

    const newLink: ShortLink = {
      id: shortId,
      shortId,
      originalUrl: normalizedUrl,
      clicks: 0,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "active",
    };

    setLinks((current) => [newLink, ...current]);
    setOriginalUrl("");
    setUrlError("");
    setSuccess("Your short link has been created.");
  }

  async function handleCopy(shortId: string) {
    const shortUrl = `${BASE_URL}/${shortId}`;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(shortId);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setSuccess("Clipboard access was unavailable. Please copy the URL manually.");
    }
  }

  function toggleStatus(id: string) {
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

  function deleteLink(id: string) {
    setLinks((current) => current.filter((link) => link.id !== id));
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        suppressHydrationWarning
      >
        <p className="text-sm font-medium text-violet-400">LINK MANAGEMENT</p>
        <h1 className="mt-2 text-3xl font-bold text-white">My Links</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Create, organize and manage all your shortened URLs.
        </p>
      </div>

      {/* Create link card */}
      <section
        className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
        data-aos="fade-up"
        data-aos-delay="200"
        suppressHydrationWarning
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
            <Plus size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Create a short link</h2>
            <p className="text-sm text-zinc-400">
              Paste a long URL to generate a shorter one.
            </p>
          </div>
        </div>

        <form onSubmit={handleCreateLink} className="space-y-3">
          <label htmlFor="destination-url" className="text-sm text-zinc-300">
            Destination URL
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="destination-url"
              type="text"
              value={originalUrl}
              onChange={(event) => {
                setOriginalUrl(event.target.value);
                setUrlError("");
                setSuccess("");
              }}
              placeholder="https://example.com/your-long-url"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0c0a12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              <Link2 size={17} />
              Generate link
            </button>
          </div>

          {urlError && <p className="text-sm text-red-400">{urlError}</p>}
          {success && <p className="text-sm text-emerald-400">{success}</p>}
        </form>
      </section>

      {/* All links section */}
      <section
        className="space-y-5"
        data-aos="fade-up"
        data-aos-delay="300"
        suppressHydrationWarning
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">All links</h2>
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

        <div
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#15121f]"
          data-aos="fade-up"
          data-aos-delay="400"
          suppressHydrationWarning
        >
          {/* ...filter buttons aur table container waisa hi rahega... */}

          <div
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#15121f]"
            data-aos="fade-up"
            data-aos-delay="400"
            suppressHydrationWarning
          >
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full min-w-190 text-left text-sm">
                <thead className="border-b border-white/10 bg-white/3 text-xs uppercase tracking-wide text-zinc-500">
                  <tr>
                    <th className="px-5 py-4 font-medium">Short link</th>
                    <th className="px-5 py-4 font-medium">Destination</th>
                    <th className="px-5 py-4 font-medium">Clicks</th>
                    <th className="px-5 py-4 font-medium">Created</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>

                {/* key={filter} — tab switch pe rows re-mount hoti hain aur animation smoothly replay hoti hai */}
                <tbody key={filter} className="divide-y divide-white/5">
                  {filteredLinks.map((link, index) => (
                    <tr
                      key={link.id}
                      className="animate-row-in text-zinc-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* ...baqi row content bilkul waisa hi... */}
                      <td className="px-5 py-4">
                        <span className="font-medium text-violet-300">
                          {BASE_URL}/{link.shortId}
                        </span>
                      </td>
                      <td className="max-w-[230px] truncate px-5 py-4 text-zinc-400">
                        {link.originalUrl}
                      </td>
                      <td className="px-5 py-4">{link.clicks.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-zinc-400">
                        {link.createdAt}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs ${link.status === "active"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-zinc-500/10 text-zinc-400"
                            }`}
                        >
                          {link.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {/* actions waisa hi */}
                      </td>
                    </tr>
                  ))}

                  {filteredLinks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-zinc-500">
                        No links found. Try another search or create a new link.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}