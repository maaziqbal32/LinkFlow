import type {
  AuthErrors,
  LoginFormValues,
  RegisterFormValues,
} from "@/types/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(
  values: LoginFormValues
): AuthErrors {
  const errors: AuthErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function validateRegister(
  values: RegisterFormValues
): AuthErrors {
  const errors: AuthErrors = {};

  if (!values.name.trim()) {
    errors.name = "Your name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (
    !/[A-Za-z]/.test(values.password) ||
    !/[0-9]/.test(values.password)
  ) {
    errors.password = "Use at least one letter and one number.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}