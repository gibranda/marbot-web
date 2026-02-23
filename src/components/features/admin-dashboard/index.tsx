import { ArrowRight, Calendar, CheckCircle2, ChevronRight, MoreVertical, Plus, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ADMIN_DASHBOARD_KPI_DATA } from "@/constants/admin-dashboard.constants";
import { MOCK_COURSES, MOCK_ACTIVITIES } from "@/constants/constants";
import {
  PATH_ADMIN_AKTIVITAS,
  PATH_ADMIN_KURSUS,
  PATH_ADMIN_KURSUS_BARU,
  PATH_ADMIN_PENGAJAR_BARU,
} from "@/constants/uri-path";

import { formatInstructorName, getActivityDotColor, getCourseStatusStyle } from "./admin-dashboard.helpers";

const AdminDashboard: React.FC = React.memo(function AdminDashboard() {
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
            href={PATH_ADMIN_PENGAJAR_BARU}
            className="tap-target flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-bold text-[#0F172A] transition-all hover:bg-[#F8FAFC]"
          >
            <Plus size={18} className="mr-2" />
            Tambah Pengajar
          </Link>
          <Link
            href={PATH_ADMIN_KURSUS_BARU}
            className="tap-target flex items-center justify-center rounded-xl bg-[#14B8A6] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
          >
            <Plus size={18} className="mr-2" />
            Buat Kursus
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_DASHBOARD_KPI_DATA.map((kpi) => (
          <div
            key={kpi.id}
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
            <h2 className="font-extrabold text-[#0F172A]">Kursus Terbaru</h2>
            <Link
              href={PATH_ADMIN_KURSUS}
              className="flex items-center text-sm font-bold text-[#14B8A6] hover:underline"
            >
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
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase ${getCourseStatusStyle(
                          course.status as "Published" | "Draft",
                        )}`}
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
                          {formatInstructorName(course.instructor.name)}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button
                        className="tap-target rounded-lg p-2 text-[#64748B] transition-all hover:bg-white hover:text-[#14B8A6]"
                        aria-label={`Opsi untuk kursus ${course.title}`}
                        title={`Opsi untuk ${course.title}`}
                      >
                        <MoreVertical size={16} aria-hidden="true" />
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
            <h2 className="font-extrabold text-[#0F172A]">Aktivitas Terbaru</h2>
          </div>
          <div className="space-y-6 p-6 sm:p-8">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex space-x-4">
                <div
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${getActivityDotColor(
                    activity.type as "transaction" | "course" | "student" | "instructor" | "certificate" | "agenda",
                  )}`}
                  aria-hidden="true"
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
            <Link
              href={PATH_ADMIN_AKTIVITAS}
              className="tap-target mt-4 flex w-full items-center justify-center border-t border-[#F1F5F9] py-4 text-xs font-bold text-[#64748B] transition-colors hover:text-[#14B8A6]"
            >
              Lihat Log Lengkap <ArrowRight size={14} className="ml-2" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="border-b border-[#F1F5F9] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-[#0F172A]">Pembelajaran Terpopuler</h2>
              <span className="text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">Bulan Ini</span>
            </div>
          </div>
          <div className="space-y-4 p-6 sm:p-8">
            {MOCK_COURSES.slice(0, 4).map((course, idx) => (
              <div key={course.id} className="flex min-w-0 items-center justify-between gap-2">
                <div className="flex min-w-0 items-center space-x-2 sm:space-x-3">
                  <div className="shrink-0 text-xs font-extrabold text-[#94A3B8]">{idx + 1}</div>
                  <div className="min-w-0 truncate text-sm font-bold text-[#475569]">{course.title}</div>
                </div>
                <div className="flex shrink-0 items-center space-x-1 sm:space-x-2">
                  <span className="text-xs font-extrabold text-[#0F172A]">{course.students}</span>
                  <Users size={12} className="text-[#94A3B8]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0FDFA] text-[#14B8A6]">
            <CheckCircle2 size={32} aria-hidden="true" />
          </div>
          <h2 className="mb-2 font-extrabold text-[#0F172A]">Semua Sistem Normal</h2>
          <p className="mb-6 text-xs text-[#64748B]">
            Server LMS berjalan stabil tanpa kendala teknis dalam 24 jam terakhir.
          </p>
          <div
            className="flex items-center space-x-2 rounded-full border border-green-100 bg-green-50 px-4 py-2"
            role="status"
            aria-live="polite"
            aria-label="Status sistem: Operational"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" aria-hidden="true"></div>
            <span className="text-[10px] font-extrabold tracking-wider text-green-600 uppercase">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminDashboard;
