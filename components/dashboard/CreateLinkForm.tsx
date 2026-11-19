"use client";

import { useState, type FormEvent } from "react";
import { Link2, Plus } from "lucide-react";

type CreateLinkFormProps = {
  onCreate: (url: string) => Promise<void>;
};

export default function CreateLinkForm({
  onCreate,
}: CreateLinkFormProps) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

 let normalizedUrl = originalUrl.trim();

if (!normalizedUrl) {
  setUrlError("Please enter a destination URL.");
  return;
}

// Handle pasted Markdown links: [label](https://example.com)
const markdownMatch = normalizedUrl.match(
  /^\[[^\]]+\]\((https?:\/\/[^)\s]+)\)$/i,
);

if (markdownMatch) {
  normalizedUrl = markdownMatch[1];
}

// Add HTTPS if protocol is missing
if (!/^https?:\/\//i.test(normalizedUrl)) {
  normalizedUrl = `https://${normalizedUrl}`;
}

let parsedUrl: URL;

try {
  parsedUrl = new URL(normalizedUrl);

  const validHostname =
    parsedUrl.hostname === "localhost" ||
    parsedUrl.hostname.includes(".");

  if (
    !["http:", "https:"].includes(parsedUrl.protocol) ||
    !validHostname
  ) {
    throw new Error("Invalid URL");
  }
} catch {
  setUrlError("Please enter a valid URL.");
  return;
}

try {
  setIsSubmitting(true);
  setUrlError("");

  await onCreate(parsedUrl.toString());

  setOriginalUrl("");
} catch (error) {
  setUrlError(
    error instanceof Error
      ? error.message
      : "Failed to create short link.",
  );
} finally {
  setIsSubmitting(false);
}

  }

  return (
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
          <h2 className="font-semibold text-white">
            Create a short link
          </h2>
          <p className="text-sm text-zinc-400">
            Paste a long URL to generate a shorter one.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          htmlFor="destination-url"
          className="text-sm text-zinc-300"
        >
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
            }}
            placeholder="https://example.com/your-long-url"
            disabled={isSubmitting}
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0c0a12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Link2 size={17} />
            {isSubmitting ? "Creating..." : "Generate link"}
          </button>
        </div>

        {urlError && (
          <p className="text-sm text-red-400" role="alert">
            {urlError}
          </p>
        )}
      </form>
    </section>
  );
}