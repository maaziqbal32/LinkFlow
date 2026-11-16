
"use client";

import { useState, type FormEvent } from "react";
import { Link2, Plus } from "lucide-react";

type CreateLinkFormProps = {
  onCreate: (url: string) => void;
};

export default function CreateLinkForm({ onCreate }: CreateLinkFormProps) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let normalizedUrl = originalUrl.trim();

    if (!normalizedUrl) {
      setUrlError("Please enter a destination URL.");
      return;
    }

    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
      const parsedUrl = new URL(normalizedUrl);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid protocol");
      }

      onCreate(parsedUrl.toString());
      setOriginalUrl("");
      setUrlError("");
    } catch {
      setUrlError("Please enter a valid URL.");
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
          <h2 className="font-semibold text-white">Create a short link</h2>
          <p className="text-sm text-zinc-400">
            Paste a long URL to generate a shorter one.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
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

        {urlError && (
          <p className="text-sm text-red-400" role="alert">
            {urlError}
          </p>
        )}
      </form>
    </section>
  );
}
