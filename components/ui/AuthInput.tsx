import type { AuthInputProps } from "@/types/auth";

export default function AuthInput({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: AuthInputProps) {
  const inputId = id ?? props.name ?? "auth-input";
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-zinc-200"
      >
        {label}
      </label>

      <input
        {...props}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? errorId : hint ? hintId : undefined
        }
        className={`h-12 w-full rounded-xl border bg-[#171321] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:ring-2 focus:ring-violet-500/30 ${
          error
            ? "border-rose-500/70 focus:border-rose-400"
            : "border-white/10 focus:border-violet-400"
        } ${className}`}
      />

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-rose-400"
        >
          {error}
        </p>
      )}

      {!error && hint && (
        <p id={hintId} className="text-xs text-zinc-500">
          {hint}
        </p>
      )}
    </div>
  );
}