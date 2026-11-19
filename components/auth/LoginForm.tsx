
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import AuthInput from "@/components/ui/AuthInput";
import PasswordInput from "@/components/ui/PasswordInput";
import AuthButton from "@/components/ui/AuthButton";

import { validateLogin } from "@/lib/validation/auth";
import { loginUser } from "@/lib/api";

import type {
  AuthErrors,
  LoginFormValues,
} from "@/types/auth";

const INITIAL_VALUES: LoginFormValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();

  const [values, setValues] =
    useState<LoginFormValues>(INITIAL_VALUES);

  const [errors, setErrors] = useState<AuthErrors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof LoginFormValues>(
    field: K,
    value: LoginFormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setFormError("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const validationErrors = validateLogin(values);

    setErrors(validationErrors);
    setFormError("");

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      await loginUser({
        email: values.email.trim(),
        password: values.password,
      });

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
        >
          {formError}
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
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <span className="text-xs text-zinc-500">
            Forgot password?{" "}
            <span className="text-zinc-400">Coming soon</span>
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
    </form>
  );
}
