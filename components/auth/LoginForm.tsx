"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import AuthInput from "@/components/ui/AuthInput";
import PasswordInput from "@/components/ui/PasswordInput";
import AuthButton from "@/components/ui/AuthButton";

import { validateLogin } from "@/lib/validation/auth";

import type {
  AuthErrors,
  LoginFormValues,
} from "@/types/auth";

const INITIAL_VALUES: LoginFormValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [values, setValues] =
    useState<LoginFormValues>(INITIAL_VALUES);

  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField<K extends keyof LoginFormValues>(
    field: K,
    value: LoginFormValues[K]
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setSuccess(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateLogin(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    // DEMO ONLY: No API request is made.
    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 700);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {success && (
        <div
          role="status"
          data-aos="fade-down"
          data-aos-duration="400"
          suppressHydrationWarning
          className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300"
        >
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />

          Demo validation passed. Authentication is not connected yet.
        </div>
      )}

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        suppressHydrationWarning
      >
        <AuthInput
          label="Email address"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) =>
            updateField("email", event.target.value)
          }
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <div
        className="space-y-2"
        data-aos="fade-up"
        data-aos-delay="200"
        suppressHydrationWarning
      >
        <PasswordInput
          label="Password"
          name="password"
          value={values.password}
          onChange={(value) =>
            updateField("password", value)
          }
          error={errors.password}
        />

        <div className="flex justify-end">
          <span className="text-xs text-zinc-500">
            Forgot password?{" "}
            <span className="text-zinc-400">
              Coming soon
            </span>
          </span>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        suppressHydrationWarning
      >
        <AuthButton type="submit" loading={loading}>
          Sign in to LinkFlow
        </AuthButton>
      </div>

      <p
        data-aos="fade-in"
        data-aos-delay="450"
        suppressHydrationWarning
        className="text-center text-xs leading-5 text-zinc-500"
      >
        Demo UI only. No credentials are sent or stored.
      </p>
    </form>
  );
}