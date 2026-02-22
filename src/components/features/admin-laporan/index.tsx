"use client";

import { BarChart2, BookOpen, Download, PieChart, Users } from "lucide-react";
import React from "react";

const AdminLaporan: React.FC = () => {
  const reports = [
    { title: "Laporan Peserta Bulanan", type: "Users", icon: <Users className="text-blue-500" /> },
    { title: "Laporan Penjualan Kursus", type: "Finance", icon: <BarChart2 className="text-green-500" /> },
    { title: "Laporan Performa Pengajar", type: "Instructors", icon: <PieChart className="text-purple-500" /> },
    { title: "Laporan Kelulusan Alumni", type: "Academic", icon: <BookOpen className="text-amber-500" /> },
  ];

  return (
    <div className="animate-fadeIn space-y-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Laporan & Analitik</h1>
          <p className="text-sm text-[#64748B]">Data performa Marbot LMS dalam bentuk grafik and tabel.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reports.map((report) => (
          <div
            key={report.title}
            className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC]">{report.icon}</div>
            <h4 className="mb-2 text-sm font-bold text-[#0F172A]">{report.title}</h4>
            <p className="mb-6 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">{report.type}</p>
            <button className="mt-auto flex w-full items-center justify-center rounded-xl bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#64748B] transition-all hover:bg-[#14B8A6] hover:text-white">
              <Download size={14} className="mr-2" />
              Download PDF
            </button>
          </div>
        ))}
      </div>

      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center shadow-sm">
        <BarChart2 size={64} className="mb-6 text-[#E2E8F0]" />
        <h3 className="mb-2 text-lg font-extrabold text-[#0F172A]">Visualisasi Grafik Sedang Disiapkan</h3>
        <p className="max-w-md text-sm text-[#64748B]">
          Data analitik mendalam sedang dikumpulkan untuk periode bulan ini. Anda tetap bisa mengunduh laporan mentah
          dalam format CSV.
        </p>
        <button className="mt-8 rounded-xl bg-[#14B8A6] px-8 py-3 font-bold text-white shadow-lg shadow-[#14B8A6]/20">
          Ekspor Semua Data (CSV)
        </button>
      </div>
    </div>
  );
};

export default AdminLaporan;
