
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Save, UserRound } from "lucide-react";
import AOS from "aos";

import {
  getCurrentUser,
  updateProfile,
  changePassword,
} from "@/lib/api";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0c0a12] px-4 py-3 text-sm text-white outline-none focus:border-violet-500 disabled:opacity-50";

export default function SettingsPanel() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load current user profile
  useEffect(() => {
    let ignore = false;

    getCurrentUser()
      .then(({ user }) => {
        if (ignore) return;

        setName(user.name);
        setEmail(user.email);
      })
      .catch((error: unknown) => {
        if (!ignore) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Failed to load profile.",
          );
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Refresh AOS animations
  useEffect(() => {
    AOS.refreshHard();
  }, []);

  // Save profile
  async function handleSaveProfile(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setMessage("");

    if (name.trim().length < 2) {
      setMessage("Name must contain at least 2 characters.");
      return;
    }

    try {
      setSaving(true);

      const result = await updateProfile(name.trim());

      setName(result.user.name);
      setMessage(result.message);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to update profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  // Change password
  async function handleChangePassword(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setMessage("");

    if (!currentPassword) {
      setMessage("Enter your current password.");
      return;
    }

    if (
      newPassword.length < 8 ||
      !/[A-Za-z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      setMessage(
        "New password must contain at least 8 characters, a letter and a number.",
      );
      return;
    }

    try {
      setSaving(true);

      await changePassword(currentPassword, newPassword);

      setCurrentPassword("");
      setNewPassword("");

      // Backend clears the authentication cookie.
      router.replace("/login");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to change password.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div data-aos="fade-up" suppressHydrationWarning>
        <p className="text-sm font-medium text-violet-400">
          PREFERENCES
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Manage your profile and account security.
        </p>
      </div>

      {/* Feedback */}
      {message && (
        <div
          role="status"
          className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm text-violet-200"
        >
          {message}
        </div>
      )}

      {/* Profile Information */}
      <section
        className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
        data-aos="fade-up"
        suppressHydrationWarning
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
            <UserRound size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Profile information
            </h2>
            <p className="text-sm text-zinc-400">
              Update your personal details.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSaveProfile}
          className="max-w-2xl space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="profile-name"
              className="text-sm text-zinc-300"
            >
              Full name
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={loading || saving}
              required
              minLength={2}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="profile-email"
              className="text-sm text-zinc-300"
            >
              Email address
            </label>

            <input
              id="profile-email"
              type="email"
              value={email}
              readOnly
              disabled={loading}
              className={`${inputClass} cursor-not-allowed text-zinc-400`}
            />

            <p className="text-xs text-zinc-500">
              Email address cannot currently be changed.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving || loading}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save profile"}
          </button>
        </form>
      </section>

      {/* Password */}
      <section
        className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
        data-aos="fade-up"
        suppressHydrationWarning
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
            <LockKeyhole size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Password
            </h2>
            <p className="text-sm text-zinc-400">
              Update your account password.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleChangePassword}
          className="max-w-2xl space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="current-password"
              className="text-sm text-zinc-300"
            >
              Current password
            </label>

            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.target.value)
              }
              autoComplete="current-password"
              required
              disabled={saving}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="new-password"
              className="text-sm text-zinc-300"
            >
              New password
            </label>

            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              autoComplete="new-password"
              minLength={8}
              required
              disabled={saving}
              className={inputClass}
            />

            <p className="text-xs text-zinc-500">
              At least 8 characters, including a letter and a number.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LockKeyhole size={16} />
            {saving ? "Updating..." : "Update password"}
          </button>
        </form>
      </section>
    </div>
  );
}
