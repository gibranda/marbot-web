"use client";

import {
  AlertTriangle,
  Edit,
  Eye,
  Mail,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  ShieldOff,
  Star,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { MOCK_INSTRUCTORS } from "@/constants/constants";
import { Instructor } from "@/constants/types";

const AdminPengajar: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>(MOCK_INSTRUCTORS);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleDelete = () => {
    if (selectedInstructor) {
      setInstructors(instructors.filter((i) => i.id !== selectedInstructor.id));
      setIsDeleteOpen(false);
      setSelectedInstructor(null);
      triggerToast("Pengajar berhasil dihapus");
    }
  };

  const toggleStatus = () => {
    // In dummy state, we don't have active property in Instructor interface yet,
    // but we can simulate the UI feedback
    setIsStatusModalOpen(false);
    triggerToast("Status pengajar diperbarui");
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

      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="text-center md:text-left">
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Manajemen Pengajar</h1>
          <p className="text-sm text-[#64748B]">Atur akun pengajar, keahlian, dan reputasi.</p>
        </div>
        <Link
          href="/admin/pengajar/baru"
          className="tap-target flex items-center justify-center rounded-xl bg-[#14B8A6] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
        >
          <Plus size={18} className="mr-2" />
          Tambah Pengajar Baru
        </Link>
      </div>

      {/* Toolbar */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input
            type="text"
            placeholder="Cari nama pengajar..."
            className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pr-4 pl-12 text-sm transition-all outline-none focus:border-[#14B8A6]"
          />
        </div>
      </div>

      {/* Table Wrapped for Responsiveness */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="table-wrap">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Pengajar
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Keahlian
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Rating
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Kursus
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Lokasi
                </th>
                <th className="px-8 py-4 text-right text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {instructors.map((ins) => (
                <tr key={ins.id} className="group transition-colors hover:bg-[#F8FAFC]">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={ins.avatar}
                        alt={ins.name}
                        width={40}
                        height={40}
                        className="shrink-0 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#0F172A]">{ins.name}</div>
                        <div className="text-[10px] font-medium text-[#64748B] lowercase">ins-{ins.id}@marbot.id</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#475569]">{ins.role}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-1 text-xs font-bold text-[#0F172A]">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span>{ins.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#475569]">{ins.totalCourses}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-1 text-xs text-[#64748B]">
                      <MapPin size={14} className="shrink-0" />
                      <span className="max-w-[120px] truncate">{ins.location}</span>
                    </div>
                  </td>
                  <td className="relative px-8 py-5 text-right">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === ins.id ? null : ins.id)}
                      className="tap-target flex w-full items-center justify-end rounded-lg p-2 text-[#64748B] transition-all hover:text-[#14B8A6]"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === ins.id && (
                      <div className="animate-fadeIn absolute top-12 right-8 z-20 w-48 rounded-xl border border-[#E2E8F0] bg-white py-2 shadow-xl">
                        <button
                          onClick={() => {
                            setSelectedInstructor(ins);
                            setIsViewOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
                        >
                          <Eye size={16} /> <span>View Detail</span>
                        </button>
                        <Link
                          href={`/admin/pengajar/${ins.id}/edit`}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
                        >
                          <Edit size={16} /> <span>Edit Profil</span>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedInstructor(ins);
                            setIsStatusModalOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                        >
                          <ShieldOff size={16} /> <span>Nonaktifkan</span>
                        </button>
                        <div className="mx-2 my-1 h-px bg-[#F1F5F9]"></div>
                        <button
                          onClick={() => {
                            setSelectedInstructor(ins);
                            setIsDeleteOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                        >
                          <Trash2 size={16} /> <span>Hapus</span>
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

      {/* Modal View Pengajar */}
      {isViewOpen && selectedInstructor && (
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
              <Image
                src={selectedInstructor.avatar}
                alt={selectedInstructor.name}
                width={96}
                height={96}
                className="mx-auto mb-6 rounded-2xl border-4 border-white object-cover shadow-xl"
              />
              <h3 className="mb-1 text-xl font-extrabold text-[#0F172A]">{selectedInstructor.name}</h3>
              <p className="mb-8 text-xs font-bold tracking-[0.2em] text-[#14B8A6] uppercase">
                {selectedInstructor.role}
              </p>

              <div className="mb-8 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3">
                  <div className="text-lg font-extrabold text-[#0F172A]">{selectedInstructor.rating}</div>
                  <div className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase">Rating</div>
                </div>
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3">
                  <div className="text-lg font-extrabold text-[#0F172A]">{selectedInstructor.totalStudents}</div>
                  <div className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase">Peserta</div>
                </div>
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3">
                  <div className="text-lg font-extrabold text-[#0F172A]">{selectedInstructor.totalCourses}</div>
                  <div className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase">Kursus</div>
                </div>
              </div>

              <div className="space-y-4 border-t border-[#F1F5F9] pt-8 text-left">
                <div className="flex items-center text-sm text-[#475569]">
                  <Mail size={16} className="mr-3 text-[#14B8A6]" />
                  <span className="font-medium">ins-{selectedInstructor.id}@marbot.id</span>
                </div>
                <div className="flex items-center text-sm text-[#475569]">
                  <MapPin size={16} className="mr-3 text-[#14B8A6]" />
                  <span className="font-medium">{selectedInstructor.location}</span>
                </div>
                <div className="rounded-xl bg-[#F8FAFC] p-4 text-xs leading-relaxed text-[#64748B] italic">
                  &quot;{selectedInstructor.bio}&quot;
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-10 pb-10">
              <Link
                href={`/admin/pengajar/${selectedInstructor.id}/edit`}
                className="tap-target flex-1 rounded-xl bg-[#14B8A6] py-3.5 text-center text-sm font-bold text-white hover:bg-[#0F766E]"
              >
                Edit Profil
              </Link>
              <button
                onClick={() => setIsViewOpen(false)}
                className="tap-target flex-1 rounded-xl border-2 border-[#E2E8F0] py-3.5 text-sm font-bold text-[#64748B] hover:bg-[#F8FAFC]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus Pengajar */}
      {isDeleteOpen && selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="animate-fadeIn absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDeleteOpen(false)}
          ></div>
          <div className="animate-slideInUp relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="space-y-6 p-8 text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-extrabold text-[#0F172A]">Hapus Pengajar?</h3>
                <p className="px-4 text-sm leading-relaxed text-[#64748B]">
                  Data pengajar <span className="font-bold text-[#0F172A]">&quot;{selectedInstructor.name}&quot;</span>{" "}
                  akan dihapus dari sistem and akses login akan dicabut.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="tap-target flex-1 rounded-xl border-2 border-[#E2E8F0] py-3 text-sm font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC]"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="tap-target flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white transition-all hover:bg-red-600"
                >
                  Hapus Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nonaktifkan Pengajar */}
      {isStatusModalOpen && selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="animate-fadeIn absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsStatusModalOpen(false)}
          ></div>
          <div className="animate-slideInUp relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="space-y-6 p-8 text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <ShieldOff size={32} />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-extrabold text-[#0F172A]">Nonaktifkan Pengajar?</h3>
                <p className="px-4 text-sm leading-relaxed text-[#64748B]">
                  Pengajar tidak akan bisa login and semua kursus milik pengajar ini akan disembunyikan sementara.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <button
                  onClick={() => setIsStatusModalOpen(false)}
                  className="tap-target flex-1 rounded-xl border-2 border-[#E2E8F0] py-3 text-sm font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC]"
                >
                  Batal
                </button>
                <button
                  onClick={toggleStatus}
                  className="tap-target flex-1 rounded-xl bg-amber-600 py-3 text-sm font-bold text-white transition-all hover:bg-amber-700"
                >
                  Ya, Nonaktifkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPengajar;
