
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import AuthInput from "@/components/ui/AuthInput";
import PasswordInput from "@/components/ui/PasswordInput";
import AuthButton from "@/components/ui/AuthButton";

import { validateRegister } from "@/lib/validation/auth";
import { registerUser } from "@/lib/api";

import type {
  AuthErrors,
  RegisterFormValues,
} from "@/types/auth";

const INITIAL_VALUES: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const router = useRouter();

  const [values, setValues] =
    useState<RegisterFormValues>(INITIAL_VALUES);

  const [errors, setErrors] = useState<AuthErrors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof RegisterFormValues>(
    field: K,
    value: RegisterFormValues[K],
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

    const validationErrors = validateRegister(values);

    setErrors(validationErrors);
    setFormError("");

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      await registerUser({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
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
          label="Full name"
          name="name"
          type="text"
          value={values.name}
          onChange={(event) =>
            updateField("name", event.target.value)
          }
          placeholder="Your full name"
          autoComplete="name"
          error={errors.name}
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="200"
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
        data-aos="fade-up"
        data-aos-delay="300"
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
          autoComplete="new-password"
          hint="At least 8 characters, including a letter and a number."
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="400"
        suppressHydrationWarning
      >
        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={(value) =>
            updateField("confirmPassword", value)
          }
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="500"
        suppressHydrationWarning
      >
        <AuthButton type="submit" loading={loading}>
          Create your account
        </AuthButton>
      </div>
    </form>
  );
}
