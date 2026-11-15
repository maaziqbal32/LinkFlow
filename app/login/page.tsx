import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

import { loginPageContent } from "@/data/auth";

export default function LoginPage() {
  return (
    <AuthShell content={loginPageContent}>
      <LoginForm />
    </AuthShell>
  );
}