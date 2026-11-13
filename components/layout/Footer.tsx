
import Link from "next/link";
import { Link2 } from "lucide-react";

const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container-main flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500">
            <Link2 size={17} />
          </span>
          <span className="font-bold">
            Link<span className="text-gradient">Flow</span>
          </span>
        </Link>

        <p className="text-xs text-zinc-500">
          © {CURRENT_YEAR} LinkFlow. Built with care.
        </p>

        <p className="text-xs text-zinc-500">
          Shorten links. Track clicks. Grow faster.
        </p>
      </div>
    </footer>
  );
}
