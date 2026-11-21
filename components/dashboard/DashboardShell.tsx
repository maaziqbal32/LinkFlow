
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { DashboardSearchProvider } from "./DashboardSearchContext";

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  // Prevent document/body scrolling while dashboard is mounted
  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  // Reset inner scroll when dashboard route changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <DashboardSearchProvider>
      <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#0c0a12] text-white lg:flex-row">
        <aside className="z-30 shrink-0 lg:h-dvh">
          <DashboardSidebar />
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="z-20 shrink-0">
            <DashboardHeader />
          </div>

          <main
            ref={mainRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-none"
          >
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DashboardSearchProvider>
  );
}
