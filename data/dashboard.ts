import type {
  ShortLink,
  DashboardNavItem,
} from "@/types/dashboard";



export const recentLinks: ShortLink[] = [
  {
    id: "1",
    shortId: "linkflow01",
    originalUrl: "https://www.youtube.com/",
    clicks: 1240,
    createdAt: "Nov 12, 2026",
    status: "active",
  },
  {
    id: "2",
    shortId: "linkflow02",
    originalUrl: "https://github.com/",
    clicks: 856,
    createdAt: "Nov 11, 2026",
    status: "active",
  },
  {
    id: "3",
    shortId: "linkflow03",
    originalUrl: "https://nextjs.org/",
    clicks: 642,
    createdAt: "Nov 10, 2026",
    status: "active",
  },
  {
    id: "4",
    shortId: "linkflow04",
    originalUrl: "https://react.dev/",
    clicks: 318,
    createdAt: "Nov 09, 2026",
    status: "inactive",
  },
];

export const dashboardNavigation: DashboardNavItem[] = [
  { label: "Overview", href: "/dashboard", icon: "layout-dashboard" },
  { label: "My Links", href: "/dashboard/links", icon: "link" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "chart-no-axes-combined" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];