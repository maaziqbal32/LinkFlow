"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import AuthInput from "@/components/ui/AuthInput";
import PasswordInput from "@/components/ui/PasswordInput";
import AuthButton from "@/components/ui/AuthButton";

import { validateRegister } from "@/lib/validation/auth";

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
  const [values, setValues] =
    useState<RegisterFormValues>(INITIAL_VALUES);

  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField<K extends keyof RegisterFormValues>(
    field: K,
    value: RegisterFormValues[K]
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

    const validationErrors = validateRegister(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    // DEMO ONLY: No account is created.
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

          Demo validation passed. No account has been created.
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

      <p
        data-aos="fade-in"
        data-aos-delay="650"
        suppressHydrationWarning
        className="text-center text-xs leading-5 text-zinc-500"
      >
        Demo UI only. Your details are not sent to a server or stored.
      </p>
    </form>
  );
}