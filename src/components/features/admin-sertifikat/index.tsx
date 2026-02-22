"use client";

import { Award, Download, Eye, Search } from "lucide-react";
import React from "react";

import { MOCK_CERTIFICATES } from "@/constants/constants";

const AdminSertifikat: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-8">
      <div className="text-center md:text-left">
        <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Manajemen Sertifikat</h1>
        <p className="text-sm text-[#64748B]">Daftar sertifikat yang telah diterbitkan untuk alumni.</p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm md:flex-row">
        <div className="relative w-full flex-1">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input
            type="text"
            placeholder="Cari nama atau nomor sertifikat..."
            className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pr-4 pl-12 text-sm transition-all outline-none focus:border-[#14B8A6]"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="table-wrap">
          <table className="w-full min-w-[750px] text-left">
            <thead className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Peserta
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Kursus
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  No. Sertifikat
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Tgl Terbit
                </th>
                <th className="px-8 py-4 text-right text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_CERTIFICATES.map((cert) => (
                <tr key={cert.id} className="group transition-colors hover:bg-[#F8FAFC]">
                  <td className="px-8 py-5 text-sm font-bold whitespace-nowrap text-[#0F172A]">{cert.studentName}</td>
                  <td className="px-6 py-5 text-xs text-[#64748B]">{cert.courseTitle}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Award size={14} className="shrink-0 text-[#14B8A6]" />
                      <span className="text-[10px] font-bold text-[#475569]">{cert.certNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs whitespace-nowrap text-[#64748B]">{cert.issueDate}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="tap-target flex items-center rounded-lg p-2 text-[#64748B] transition-all hover:text-[#14B8A6]"
                        title="Lihat"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="tap-target flex items-center rounded-lg p-2 text-[#64748B] transition-all hover:text-[#14B8A6]"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                    </div>
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

export default AdminSertifikat;
