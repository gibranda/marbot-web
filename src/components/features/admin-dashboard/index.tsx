/* eslint-disable sonarjs/no-nested-conditional */
import {
  BookOpen,
  Users,
  UserCircle,
  TrendingUp,
  Plus,
  ArrowRight,
  ChevronRight,
  MoreVertical,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { MOCK_COURSES, MOCK_ACTIVITIES } from "@/constants/constants";

const AdminDashboard: React.FC = () => {
  const kpis = [
    { label: "Total Kursus", value: "48", trend: "+4 bulan ini", icon: <BookOpen size={24} />, color: "bg-blue-500" },
    {
      label: "Total Pengajar",
      value: "22",
      trend: "+2 bulan ini",
      icon: <UserCircle size={24} />,
      color: "bg-purple-500",
    },
    {
      label: "Total Peserta",
      value: "12.540",
      trend: "+850 bulan ini",
      icon: <Users size={24} />,
      color: "bg-[#14B8A6]",
    },
    {
      label: "Pendapatan",
      value: "Rp 18.5M",
      trend: "+12% vs last month",
      icon: <TrendingUp size={24} />,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="animate-fadeIn space-y-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Beranda Dashboard</h1>
          <p className="text-sm text-[#64748B]">Ringkasan aktivitas Marbot LMS hari ini.</p>
        </div>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Link
            href="/admin/pengajar/baru"
            className="tap-target flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-bold text-[#0F172A] transition-all hover:bg-[#F8FAFC]"
          >
            <Plus size={18} className="mr-2" />
            Tambah Pengajar
          </Link>
          <Link
            href="/admin/kursus/baru"
            className="tap-target flex items-center justify-center rounded-xl bg-[#14B8A6] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
          >
            <Plus size={18} className="mr-2" />
            Buat Kursus
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.value}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className={`h-12 w-12 rounded-[10px] ${kpi.color} flex items-center justify-center text-white shadow-lg shadow-black/5`}
              >
                {kpi.icon}
              </div>
              <span className="text-[10px] font-extrabold tracking-widest text-green-500 uppercase">{kpi.trend}</span>
            </div>
            <div className="mb-1 text-3xl font-extrabold text-[#0F172A]">{kpi.value}</div>
            <div className="text-xs font-bold tracking-wider text-[#64748B] uppercase">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Table: Kursus Terbaru */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] p-6 sm:p-8">
            <h3 className="font-extrabold text-[#0F172A]">Kursus Terbaru</h3>
            <Link href="/admin/kursus" className="flex items-center text-sm font-bold text-[#14B8A6] hover:underline">
              Lihat Semua Pembelajaran <ChevronRight size={16} />
            </Link>
          </div>
          <div className="table-wrap">
            <table className="w-full min-w-[600px] text-left">
              <thead className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                    Kursus
                  </th>
                  <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                    Harga
                  </th>
                  <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                    Pengajar
                  </th>
                  <th className="px-8 py-4 text-right text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {MOCK_COURSES.map((course) => (
                  <tr key={course.id} className="group transition-colors hover:bg-[#F8FAFC]">
                    <td className="px-8 py-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          width={40}
                          height={40}
                          className="shrink-0 rounded-[10px] object-cover"
                        />
                        <div>
                          <div className="line-clamp-1 text-sm font-bold text-[#0F172A] transition-colors group-hover:text-[#14B8A6]">
                            {course.title}
                          </div>
                          <div className="text-[10px] font-medium text-[#64748B]">
                            {course.category} • {course.level}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase ${
                          course.status === "Published" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold whitespace-nowrap text-[#0F172A]">{course.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          width={24}
                          height={24}
                          className="shrink-0 rounded-full"
                        />
                        <span className="max-w-[80px] truncate text-xs text-[#64748B]">
                          {course.instructor.name.split(" ")[1]}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="tap-target rounded-lg p-2 text-[#64748B] transition-all hover:bg-white hover:text-[#14B8A6]">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="border-b border-[#F1F5F9] p-6 sm:p-8">
            <h3 className="font-extrabold text-[#0F172A]">Aktivitas Terbaru</h3>
          </div>
          <div className="space-y-6 p-6 sm:p-8">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex space-x-4">
                <div
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    activity.type === "transaction"
                      ? "bg-green-500"
                      : activity.type === "course"
                        ? "bg-blue-500"
                        : "bg-[#14B8A6]"
                  }`}
                ></div>
                <div>
                  <div className="mb-1 text-sm leading-snug font-bold text-[#0F172A]">{activity.title}</div>
                  <div className="flex items-center text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                    <Calendar size={10} className="mr-1" />
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <button className="tap-target mt-4 flex w-full items-center justify-center border-t border-[#F1F5F9] py-4 text-xs font-bold text-[#64748B] transition-colors hover:text-[#14B8A6]">
              Lihat Log Lengkap <ArrowRight size={14} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-extrabold text-[#0F172A]">Pembelajaran Terpopuler</h3>
            <span className="text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">Bulan Ini</span>
          </div>
          <div className="space-y-6">
            {MOCK_COURSES.slice(0, 4).map((course, idx) => (
              <div key={course.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 text-xs font-extrabold text-[#94A3B8]">{idx + 1}</div>
                  <div className="max-w-[150px] truncate text-sm font-bold text-[#475569] sm:max-w-none">
                    {course.title}
                  </div>
                </div>
                <div className="flex shrink-0 items-center space-x-2">
                  <span className="text-xs font-extrabold text-[#0F172A]">{course.students}</span>
                  <Users size={12} className="text-[#94A3B8]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0FDFA] text-[#14B8A6]">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="mb-2 font-extrabold text-[#0F172A]">Semua Sistem Normal</h4>
          <p className="mb-6 text-xs text-[#64748B]">
            Server LMS berjalan stabil tanpa kendala teknis dalam 24 jam terakhir.
          </p>
          <div className="flex items-center space-x-2 rounded-full border border-green-100 bg-green-50 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-[10px] font-extrabold tracking-wider text-green-600 uppercase">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
