import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

import { registerPageContent } from "@/data/auth";

export default function RegisterPage() {
  return (
    <AuthShell content={registerPageContent}>
      <RegisterForm />
    </AuthShell>
  );
}