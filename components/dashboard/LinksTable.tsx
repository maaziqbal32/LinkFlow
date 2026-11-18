
"use client";

import { useState } from "react";
import {
  Copy,
  ExternalLink,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Check,
} from "lucide-react";
import type { ShortLink } from "@/types/dashboard";

const BASE_URL =
  process.env.NEXT_PUBLIC_SHORT_URL_BASE ||
  "http://localhost:8001";

type LinksTableProps = {
  links: ShortLink[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

export default function LinksTable({
  links,
  onDelete,
  onToggleStatus,
}: LinksTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState("");

  async function handleCopy(shortId: string) {
    const shortUrl = `${BASE_URL}/${shortId}`;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(shortId);
      setCopyError("");

      window.setTimeout(() => {
        setCopiedId((current) => current === shortId ? null : current);
      }, 1800);
    } catch {
      setCopyError("Clipboard unavailable. Please copy the URL manually.");
    }
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#15121f]"
      data-aos="fade-up"
      data-aos-delay="400"
      suppressHydrationWarning
    >
      {copyError && (
        <p className="border-b border-white/10 px-5 py-3 text-sm text-red-400">
          {copyError}
        </p>
      )}

      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-5 py-4 font-medium">Short link</th>
              <th className="px-5 py-4 font-medium">Destination</th>
              <th className="px-5 py-4 font-medium">Clicks</th>
              <th className="px-5 py-4 font-medium">Created</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {links.map((link, index) => (
              <tr
                key={link.id}
                className="animate-row-in text-zinc-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="whitespace-nowrap px-5 py-4">
                  <span className="font-medium text-violet-300">
                    {BASE_URL}/{link.shortId}
                  </span>
                </td>

                <td className="max-w-57.5 truncate px-5 py-4 text-zinc-400">
                  {link.originalUrl}
                </td>

                <td className="px-5 py-4">
                  {link.clicks.toLocaleString()}
                </td>

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
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(link.shortId)}
                      title="Copy short link"
                      aria-label="Copy short link"
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-violet-500/10 hover:text-violet-400"
                    >
                      {copiedId === link.shortId
                        ? <Check size={17} />
                        : <Copy size={17} />}
                    </button>

                    <a
                      href={`${BASE_URL}/${link.shortId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open short link"
                      aria-label="Open short link"
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-violet-500/10 hover:text-violet-400"
                    >
                      <ExternalLink size={17} />
                    </a>

                    <button
                      type="button"
                      onClick={() => onToggleStatus(link.shortId)}
                      title="Toggle status"
                      aria-label="Toggle link status"
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-violet-500/10 hover:text-violet-400"
                    >
                      {link.status === "active"
                        ? <ToggleRight size={19} />
                        : <ToggleLeft size={19} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(link.shortId)}
                      title="Delete link"
                      aria-label="Delete link"
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {links.length === 0 && (
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
  );
}
