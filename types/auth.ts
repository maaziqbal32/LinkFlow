import type { ReactNode } from "react";
import type { InputHTMLAttributes } from "react";

export type AuthFieldName =
  | "name"
  | "email"
  | "password"
  | "confirmPassword";

export type AuthErrors = Partial<
  Record<AuthFieldName, string>
>;

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
};

export type AuthShellProps = {
  children: ReactNode;
  content: AuthPageContent;
};

export type AuthInputProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    hint?: string;
  };

export type PasswordInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
};