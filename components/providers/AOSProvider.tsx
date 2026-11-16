"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

export default function AOSProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      delay: 0,
      disable: prefersReducedMotion,
    });

    // First refresh after init
    const t1 = setTimeout(() => AOS.refreshHard(), 100);
    const t2 = setTimeout(() => AOS.refreshHard(), 400);
    const t3 = setTimeout(() => AOS.refreshHard(), 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Refresh on route change
  useEffect(() => {
    const t1 = setTimeout(() => AOS.refreshHard(), 150);
    const t2 = setTimeout(() => AOS.refreshHard(), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return children;
}