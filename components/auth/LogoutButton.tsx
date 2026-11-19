"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { logoutUser } from "@/lib/api";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setLoading(true);
      setError("");

      await logoutUser();

      router.replace("/login");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Logout failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
      >
        <LogOut size={16} />
        {loading ? "Signing out..." : "Logout"}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}