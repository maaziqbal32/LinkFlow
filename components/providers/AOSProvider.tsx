
"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      delay: 0,
      disable: prefersReducedMotion,
    });

    return () => {
      AOS.refreshHard();
    };
  }, []);

  return children;
}
