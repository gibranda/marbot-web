import { BookOpen, Users, UserCircle, TrendingUp } from "lucide-react";
import React from "react";

export interface KpiItem {
  id: string;
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
}

export const ADMIN_DASHBOARD_KPI_DATA: KpiItem[] = [
  {
    id: "total-kursus",
    label: "Total Kursus",
    value: "48",
    trend: "+4 bulan ini",
    icon: React.createElement(BookOpen, { size: 24 }),
    color: "bg-blue-500",
  },
  {
    id: "total-pengajar",
    label: "Total Pengajar",
    value: "22",
    trend: "+2 bulan ini",
    icon: React.createElement(UserCircle, { size: 24 }),
    color: "bg-purple-500",
  },
  {
    id: "total-peserta",
    label: "Total Peserta",
    value: "12.540",
    trend: "+850 bulan ini",
    icon: React.createElement(Users, { size: 24 }),
    color: "bg-[#14B8A6]",
  },
  {
    id: "pendapatan",
    label: "Pendapatan",
    value: "Rp 18.5M",
    trend: "+12% bulan lalu",
    icon: React.createElement(TrendingUp, { size: 24 }),
    color: "bg-amber-500",
  },
];
