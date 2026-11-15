export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  change: string;
  description: string;
};

export type ShortLink = {
  id: string;
  shortId: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
  status: "active" | "inactive";
};

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: string;
};