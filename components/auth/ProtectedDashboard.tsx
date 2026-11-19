
"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api";

type ProtectedDashboardProps = {
  children: ReactNode;
};

export default function ProtectedDashboard({
  children,
}: ProtectedDashboardProps) {
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let ignore = false;

    getCurrentUser()
      .then(() => {
        if (!ignore) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        if (!ignore) {
          setIsAuthenticated(false);
          router.replace("/login");
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsChecking(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [router]);

  if (isChecking || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c0a12] text-white">
        <p className="text-sm text-zinc-400">
          Verifying your session...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
