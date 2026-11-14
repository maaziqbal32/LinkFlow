"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import AuthInput from "@/components/ui/AuthInput";
import type { PasswordInputProps } from "@/types/auth";


export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  error,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  hint,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <AuthInput
        label={label}
        name={name}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        error={error}
        hint={hint}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="pr-12"
      />

      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-[38px] rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}