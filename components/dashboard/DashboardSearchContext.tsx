
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type DashboardSearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const DashboardSearchContext =
  createContext<DashboardSearchContextType | null>(null);

export function DashboardSearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardSearchContext.Provider
      value={{ searchQuery, setSearchQuery }}
    >
      {children}
    </DashboardSearchContext.Provider>
  );
}

export function useDashboardSearch() {
  const context = useContext(DashboardSearchContext);

  if (!context) {
    throw new Error(
      "useDashboardSearch must be used inside DashboardSearchProvider",
    );
  }

  return context;
}
