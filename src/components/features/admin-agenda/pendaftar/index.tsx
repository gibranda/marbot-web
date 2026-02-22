"use client";

import { ArrowLeft, Calendar, CheckCircle2, Download, Filter, Mail, MoreVertical, Search, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { MOCK_AGENDA, MOCK_STUDENTS } from "@/constants/constants";

const AdminAgendaRegistrants: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const agenda = MOCK_AGENDA.find((a) => a.slug === slug) || MOCK_AGENDA[0];

  return (
    <div className="animate-fadeIn space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="text-center md:text-left">
          <button
            onClick={() => router.back()}
            className="group tap-target mx-auto mb-2 flex items-center text-sm font-bold text-[#64748B] transition-colors hover:text-[#14B8A6] md:mx-0"
          >
            <ArrowLeft size={16} className="mr-1 transition-transform group-hover:-translate-x-1" />
            Kembali ke Manajemen Agenda
          </button>
          <h1 className="mb-1 max-w-md truncate text-2xl font-extrabold text-[#0F172A]">Daftar Pendaftar</h1>
          <p className="text-sm text-[#64748B]">{agenda.title}</p>
        </div>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <button className="tap-target flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-bold text-[#475569] shadow-sm transition-all hover:bg-[#F8FAFC]">
            <Download size={18} className="mr-2" /> Ekspor Peserta
          </button>
        </div>
      </div>

      {/* Stats Mini Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex items-center space-x-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6]">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#0F172A]">{agenda.registrantsCount}</div>
            <div className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase">Total Terdaftar</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#64748B]">
            <User size={24} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#0F172A]">{agenda.quota}</div>
            <div className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase">Total Kapasitas</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8FAFC] text-amber-500">
            <Calendar size={24} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#0F172A]">
              {Math.round((agenda.registrantsCount / agenda.quota) * 100)}%
            </div>
            <div className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase">Persentase Isi</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm md:flex-row">
        <div className="relative w-full flex-1">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input
            type="text"
            placeholder="Cari nama atau email peserta..."
            className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pr-4 pl-12 text-sm transition-all outline-none focus:border-[#14B8A6]"
          />
        </div>
        <button className="tap-target flex items-center rounded-[10px] border border-[#E2E8F0] p-2.5 text-[#64748B] hover:bg-[#F8FAFC]">
          <Filter size={18} />
        </button>
      </div>

      {/* Table Wrapped */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="table-wrap">
          <table className="w-full min-w-[700px] text-left">
            <thead className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Nama Peserta
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Email & Kontak
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Status Pembayaran
                </th>
                <th className="px-6 py-4 text-center text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Tgl Daftar
                </th>
                <th className="px-8 py-4 text-right text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_STUDENTS.slice(0, 5).map((st) => (
                <tr key={st.email} className="group transition-colors hover:bg-[#F8FAFC]">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#14B8A6]/10 bg-[#F0FDFA] font-bold text-[#14B8A6]">
                        {st.name.charAt(0)}
                      </div>
                      <div className="text-sm font-bold text-[#0F172A]">{st.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center text-xs text-[#0F172A]">
                      <Mail size={12} className="mr-1.5 text-[#94A3B8]" /> {st.email}
                    </div>
                    <div className="mt-1 text-[10px] text-[#64748B]">HP: {st.phone}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-[9px] font-extrabold tracking-wider uppercase ${
                        agenda.price === "Gratis" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {agenda.price === "Gratis" ? "Free Access" : "Paid / Lunas"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center text-xs whitespace-nowrap text-[#64748B]">{st.joinDate}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="tap-target flex w-full items-center justify-end rounded-lg p-2 text-[#64748B] transition-all hover:text-[#14B8A6]">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAgendaRegistrants;
