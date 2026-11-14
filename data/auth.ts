import type { AuthPageContent } from "@/types/auth";

export const loginPageContent: AuthPageContent = {
  eyebrow: "WELCOME BACK TO LINKFLOW",
  title: "Welcome back",
  description: "Sign in to continue managing your short links.",
  footerText: "Don't have an account?",
  footerLinkText: "Create one",
  footerHref: "/register",
};

export const registerPageContent: AuthPageContent = {
  eyebrow: "GET STARTED WITH LINKFLOW",
  title: "Create your account",
  description: "Get started with a cleaner way to manage your links.",
  footerText: "Already have an account?",
  footerLinkText: "Sign in",
  footerHref: "/login",
};

export const authBrandContent = {
  name: "LinkFlow",
  headline: "Short links. Bigger possibilities.",
  description:
    "Keep your links organized and understand how people interact with them.",
  trustMessage:
    "A simple workspace for managing and tracking your links.",
  copyright: "© 2026 LinkFlow. All rights reserved.",
};