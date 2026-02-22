"use client";

import { AlertTriangle, BookOpen, Eye, Mail, MoreVertical, Phone, RefreshCw, Search, ShieldOff, X } from "lucide-react";
import React, { useState } from "react";

import { MOCK_STUDENTS } from "@/constants/constants";
import { Student } from "@/constants/types";

const AdminPeserta: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleAction = (msg: string) => {
    setIsResetOpen(false);
    setIsStatusOpen(false);
    triggerToast(msg);
  };

  return (
    <div className="animate-fadeIn relative space-y-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="animate-slideInRight fixed top-24 right-8 z-[60] flex items-center space-x-3 rounded-xl bg-[#0F172A] px-6 py-4 text-white shadow-2xl">
          <div className="h-2 w-2 rounded-full bg-[#14B8A6]"></div>
          <span className="text-sm font-bold">{showToast}</span>
        </div>
      )}

      <div className="text-center md:text-left">
        <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Manajemen Peserta</h1>
        <p className="text-sm text-[#64748B]">Daftar jamaah and takmir yang aktif belajar.</p>
      </div>

      <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pr-4 pl-12 text-sm transition-all outline-none focus:border-[#14B8A6]"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="table-wrap">
          <table className="w-full min-w-[700px] text-left">
            <thead className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Peserta
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Kursus
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Progress
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Tgl Daftar
                </th>
                <th className="px-8 py-4 text-right text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_STUDENTS.map((st) => (
                <tr key={st.id} className="group transition-colors hover:bg-[#F8FAFC]">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#F0FDFA] font-bold text-[#14B8A6]">
                        {st.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0F172A]">{st.name}</div>
                        <div className="max-w-[120px] truncate text-[10px] font-medium text-[#64748B]">{st.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-bold text-[#475569]">{st.coursesJoined}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-16 flex-1 overflow-hidden rounded-full bg-[#F1F5F9] sm:w-20">
                        <div className="h-full bg-[#14B8A6]" style={{ width: `${st.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-[#475569]">{st.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase ${
                        st.status === "Aktif" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs whitespace-nowrap text-[#64748B]">{st.joinDate}</td>
                  <td className="relative px-8 py-5 text-right">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === st.id ? null : st.id)}
                      className="tap-target flex w-full items-center justify-end rounded-lg p-2 text-[#64748B] transition-all hover:text-[#14B8A6]"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === st.id && (
                      <div className="animate-fadeIn absolute top-12 right-8 z-20 w-48 rounded-xl border border-[#E2E8F0] bg-white py-2 text-left shadow-xl">
                        <button
                          onClick={() => {
                            setSelectedStudent(st);
                            setIsViewOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                        >
                          <Eye size={16} /> <span>View Detail</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStudent(st);
                            setIsResetOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                        >
                          <RefreshCw size={16} /> <span>Reset Akses</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStudent(st);
                            setIsStatusOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                        >
                          <ShieldOff size={16} /> <span>Nonaktifkan</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal View Peserta */}
      {isViewOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="animate-fadeIn absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsViewOpen(false)}
          ></div>
          <div className="animate-slideInUp relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="relative p-10 text-center">
              <button
                onClick={() => setIsViewOpen(false)}
                className="tap-target absolute top-6 right-6 rounded-lg p-2 text-[#94A3B8] hover:text-[#0F172A]"
              >
                <X size={20} />
              </button>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#14B8A6]/10 bg-[#F0FDFA] text-3xl font-extrabold text-[#14B8A6] shadow-lg">
                {selectedStudent.name.charAt(0)}
              </div>
              <h3 className="mb-1 text-xl font-extrabold text-[#0F172A]">{selectedStudent.name}</h3>
              <p className="mb-8 text-xs font-bold tracking-widest text-[#64748B] uppercase">
                Terdaftar: {selectedStudent.joinDate}
              </p>

              <div className="space-y-4 border-t border-[#F1F5F9] pt-8 text-left">
                <div className="flex items-center text-sm text-[#475569]">
                  <Mail size={16} className="mr-3 text-[#14B8A6]" />
                  <span className="font-medium">{selectedStudent.email}</span>
                </div>
                <div className="flex items-center text-sm text-[#475569]">
                  <Phone size={16} className="mr-3 text-[#14B8A6]" />
                  <span className="font-medium">{selectedStudent.phone}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center font-bold text-[#0F172A]">
                    <BookOpen size={16} className="mr-2 text-[#14B8A6]" /> Kursus Diikuti
                  </span>
                  <span className="rounded-lg bg-[#F1F5F9] px-2 py-1 text-xs font-bold text-[#64748B]">
                    {selectedStudent.coursesJoined} Kursus
                  </span>
                </div>
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Rata-rata Progress</span>
                    <span className="text-xs font-bold text-[#14B8A6]">{selectedStudent.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full border border-[#E2E8F0] bg-white">
                    <div className="h-full bg-[#14B8A6]" style={{ width: `${selectedStudent.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-10 pb-10">
              <button
                onClick={() => setIsViewOpen(false)}
                className="tap-target w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] py-3.5 text-sm font-bold text-[#0F172A] transition-all hover:bg-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation (Reset/Nonaktif) */}
      {(isResetOpen || isStatusOpen) && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="animate-fadeIn absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsResetOpen(false);
              setIsStatusOpen(false);
            }}
          ></div>
          <div className="animate-slideInUp relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="space-y-6 p-8 text-center">
              <div
                className={`h-16 w-16 ${isResetOpen ? "bg-[#F0FDFA] text-[#14B8A6]" : "bg-red-50 text-red-500"} mx-auto mb-2 flex items-center justify-center rounded-full`}
              >
                {isResetOpen ? <RefreshCw size={32} /> : <AlertTriangle size={32} />}
              </div>
              <div>
                <h3 className="mb-2 text-xl font-extrabold text-[#0F172A]">
                  {isResetOpen ? "Reset Akses?" : "Nonaktifkan Peserta?"}
                </h3>
                <p className="px-4 text-sm leading-relaxed text-[#64748B]">
                  {isResetOpen
                    ? `Akses kursus peserta ${selectedStudent.name} akan diatur ulang ke kondisi awal.`
                    : `Peserta ${selectedStudent.name} tidak akan bisa mengakses materi sampai diaktifkan kembali.`}
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <button
                  onClick={() => {
                    setIsResetOpen(false);
                    setIsStatusOpen(false);
                  }}
                  className="tap-target flex-1 rounded-xl border-2 border-[#E2E8F0] py-3 text-sm font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC]"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleAction(isResetOpen ? "Akses direset" : "Peserta dinonaktifkan")}
                  className={`flex-1 py-3 ${isResetOpen ? "bg-[#14B8A6] hover:bg-[#0F766E]" : "bg-red-500 hover:bg-red-600"} tap-target rounded-xl text-sm font-bold text-white shadow-lg transition-all`}
                >
                  Ya, Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPeserta;
