"use client";

import { useState } from "react";
import { Bell, LockKeyhole, Save, UserRound } from "lucide-react";

export default function SettingsPanel() {
  const [name, setName] = useState("Maaz Iqbal");
  const [email, setEmail] = useState("maaz@example.com");
  const [productUpdates, setProductUpdates] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Profile changes saved in this demo.");
  }

  function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (newPassword.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (!currentPassword) {
      setMessage("Enter your current password first.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setMessage("Demo validation complete. No real password was changed.");
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        suppressHydrationWarning
      >
        <p className="text-sm font-medium text-violet-400">PREFERENCES</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Manage your profile and dashboard preferences.
        </p>
      </div>

      {message && (
        <div
          role="status"
          data-aos="fade-down"
          data-aos-duration="400"
          suppressHydrationWarning
          className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm text-violet-200"
        >
          {message}
        </div>
      )}

      {/* Profile section */}
      <section
        className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
        data-aos="fade-up"
        data-aos-delay="200"
        suppressHydrationWarning
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
            <UserRound size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Profile information</h2>
            <p className="text-sm text-zinc-400">Update your personal details.</p>
          </div>
        </div>

        <form onSubmit={saveProfile} className="max-w-2xl space-y-5">
          <div
            className="space-y-2"
            data-aos="fade-up"
            data-aos-delay="300"
            suppressHydrationWarning
          >
            <label htmlFor="profile-name" className="text-sm text-zinc-300">
              Full name
            </label>
            <input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0c0a12] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
            />
          </div>

          <div
            className="space-y-2"
            data-aos="fade-up"
            data-aos-delay="350"
            suppressHydrationWarning
          >
            <label htmlFor="profile-email" className="text-sm text-zinc-300">
              Email address
            </label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0c0a12] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
            />
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="400"
            suppressHydrationWarning
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              <Save size={16} />
              Save profile
            </button>
          </div>
        </form>
      </section>

      {/* Notifications section */}
      <section
        className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
        data-aos="fade-up"
        data-aos-delay="250"
        suppressHydrationWarning
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
            <Bell size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Notifications</h2>
            <p className="text-sm text-zinc-400">Choose which updates you want to receive.</p>
          </div>
        </div>

        <div className="max-w-2xl divide-y divide-white/5">
          <label
            className="flex cursor-pointer items-center justify-between gap-4 py-4"
            data-aos="fade-up"
            data-aos-delay="350"
            suppressHydrationWarning
          >
            <span>
              <span className="block text-sm font-medium text-white">Product updates</span>
              <span className="mt-1 block text-xs text-zinc-500">
                News about LinkFlow features and improvements.
              </span>
            </span>
            <input
              type="checkbox"
              checked={productUpdates}
              onChange={(event) => setProductUpdates(event.target.checked)}
              className="h-4 w-4 accent-violet-500"
            />
          </label>

          <label
            className="flex cursor-pointer items-center justify-between gap-4 py-4"
            data-aos="fade-up"
            data-aos-delay="400"
            suppressHydrationWarning
          >
            <span>
              <span className="block text-sm font-medium text-white">Weekly reports</span>
              <span className="mt-1 block text-xs text-zinc-500">
                A weekly summary of your link activity.
              </span>
            </span>
            <input
              type="checkbox"
              checked={weeklyReports}
              onChange={(event) => setWeeklyReports(event.target.checked)}
              className="h-4 w-4 accent-violet-500"
            />
          </label>
        </div>
      </section>

      {/* Password section */}
      <section
        className="rounded-2xl border border-white/10 bg-[#15121f] p-5 sm:p-6"
        data-aos="fade-up"
        data-aos-delay="300"
        suppressHydrationWarning
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
            <LockKeyhole size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Password</h2>
            <p className="text-sm text-zinc-400">Update your account password.</p>
          </div>
        </div>

        <form onSubmit={updatePassword} className="max-w-2xl space-y-5">
          <div
            className="space-y-2"
            data-aos="fade-up"
            data-aos-delay="400"
            suppressHydrationWarning
          >
            <label htmlFor="current-password" className="text-sm text-zinc-300">
              Current password
            </label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-[#0c0a12] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
            />
          </div>

          <div
            className="space-y-2"
            data-aos="fade-up"
            data-aos-delay="450"
            suppressHydrationWarning
          >
            <label htmlFor="new-password" className="text-sm text-zinc-300">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              className="w-full rounded-xl border border-white/10 bg-[#0c0a12] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
            />
            <p className="text-xs text-zinc-500">Use at least 8 characters.</p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="500"
            suppressHydrationWarning
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              <LockKeyhole size={16} />
              Update password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}