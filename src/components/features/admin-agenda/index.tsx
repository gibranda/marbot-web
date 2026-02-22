"use client";

import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  Clock,
  Edit,
  ExternalLink,
  Eye,
  Filter,
  Globe,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// Added ChevronRight to imports to fix error on line 221
import { MOCK_AGENDA } from "@/constants/constants";
import { Agenda } from "@/constants/types";

const AdminAgenda: React.FC = () => {
  const [agendas, setAgendas] = useState<Agenda[]>(MOCK_AGENDA);
  const [selectedAgenda, setSelectedAgenda] = useState<Agenda | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const handleDelete = () => {
    if (selectedAgenda) {
      setAgendas(agendas.filter((a) => a.id !== selectedAgenda.id));
      setIsDeleteOpen(false);
      setSelectedAgenda(null);
      triggerToast("Agenda berhasil dihapus");
    }
  };

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
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
        <div>
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Manajemen Agenda</h1>
          <p className="text-sm text-[#64748B]">Kelola jadwal workshop online and offline masjid.</p>
        </div>
        <Link
          href="/admin/agenda/baru"
          className="tap-target flex items-center justify-center rounded-xl bg-[#14B8A6] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
        >
          <Plus size={18} className="mr-2" />
          Buat Agenda Baru
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm md:flex-row">
        <div className="relative w-full flex-1">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input
            type="text"
            placeholder="Cari agenda..."
            className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pr-4 pl-12 text-sm transition-all outline-none focus:border-[#14B8A6]"
          />
        </div>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <button className="tap-target flex items-center rounded-[10px] border border-[#E2E8F0] p-2.5 text-[#64748B] hover:bg-[#F8FAFC]">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table Wrapped for Responsiveness */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="table-wrap">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Judul Agenda
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Tipe & Lokasi
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">Waktu</th>
                <th className="px-6 py-4 text-center text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Pendaftar
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">Harga</th>
                <th className="px-6 py-4 text-right text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {agendas.map((agenda) => (
                <tr key={agenda.id} className="group transition-colors hover:bg-[#F8FAFC]">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#F1F5F9]">
                        <Image
                          src={agenda.cover}
                          alt={agenda.title}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="line-clamp-1 text-sm font-bold text-[#0F172A]">{agenda.title}</div>
                        <div className="text-[10px] font-bold tracking-wider text-[#14B8A6] uppercase">
                          {agenda.status}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="mb-1 flex items-center space-x-2">
                      <span
                        className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase ${agenda.type === "Online" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}
                      >
                        {agenda.type}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-[#64748B]">
                      {agenda.type === "Online" ? (
                        <Globe size={12} className="mr-1" />
                      ) : (
                        <MapPin size={12} className="mr-1" />
                      )}
                      {agenda.locationName}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-bold text-[#0F172A]">{agenda.date}</div>
                    <div className="text-[10px] text-[#64748B]">{agenda.time} WIB</div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <Link
                      href={`/admin/agenda/${agenda.slug}/pendaftar`}
                      className="group/btn tap-target inline-flex flex-col items-center"
                    >
                      <span className="text-sm font-extrabold text-[#0F172A] group-hover/btn:text-[#14B8A6]">
                        {agenda.registrantsCount}
                      </span>
                      <span className="flex items-center text-[9px] font-bold text-[#94A3B8] uppercase">
                        <Users size={10} className="mr-1" /> Peserta
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`text-xs font-bold ${agenda.price === "Gratis" ? "text-green-600" : "text-[#0F172A]"}`}
                    >
                      {agenda.price}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-60 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setSelectedAgenda(agenda);
                          setIsViewOpen(true);
                        }}
                        className="tap-target flex items-center rounded-lg p-2 text-[#64748B] transition-all hover:bg-white hover:text-[#14B8A6]"
                        title="Pratinjau"
                      >
                        <Eye size={16} />
                      </button>
                      <Link
                        href={`/admin/agenda/${agenda.slug}/edit`}
                        className="tap-target flex items-center rounded-lg p-2 text-[#64748B] transition-all hover:bg-white hover:text-[#14B8A6]"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedAgenda(agenda);
                          setIsDeleteOpen(true);
                        }}
                        className="tap-target flex items-center rounded-lg p-2 text-[#64748B] transition-all hover:bg-white hover:text-red-500"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer View Detail Agenda */}
      {isViewOpen && selectedAgenda && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="animate-fadeIn absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsViewOpen(false)}
          ></div>
          <div className="animate-slideInRight relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6]">
                  <Calendar size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-[#0F172A]">Detail Agenda</h2>
                  <p className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                    ID: {selectedAgenda.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsViewOpen(false)}
                className="tap-target rounded-lg border border-[#E2E8F0] bg-white p-2 text-[#64748B] transition-all hover:text-[#0F172A]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-10 overflow-y-auto p-8">
              <div>
                <Image
                  src={selectedAgenda.cover}
                  alt={selectedAgenda.title}
                  width={480}
                  height={270}
                  className="mb-8 aspect-video w-full rounded-2xl border border-[#F1F5F9] object-cover shadow-lg"
                />
                <h3 className="mb-4 text-2xl leading-snug font-extrabold text-[#0F172A]">{selectedAgenda.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-lg px-3 py-1 text-[10px] font-bold uppercase ${selectedAgenda.type === "Online" ? "border border-blue-100 bg-blue-50 text-blue-600" : "border border-amber-100 bg-amber-50 text-amber-600"}`}
                  >
                    {selectedAgenda.type}
                  </span>
                  <span className="rounded-lg border border-green-100 bg-green-50 px-3 py-1 text-[10px] font-bold text-green-600 uppercase">
                    {selectedAgenda.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                    <Clock size={12} className="mr-1" /> Waktu
                  </div>
                  <div className="text-sm font-bold text-[#0F172A]">
                    {selectedAgenda.date}, {selectedAgenda.time} WIB
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                    <Users size={12} className="mr-1" /> Kuota
                  </div>
                  <div className="text-sm font-bold text-[#0F172A]">
                    {selectedAgenda.registrantsCount} / {selectedAgenda.quota} Peserta
                  </div>
                </div>
                <div className="col-span-2 space-y-1">
                  <div className="flex items-center text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                    {selectedAgenda.type === "Online" ? (
                      <Globe size={12} className="mr-1" />
                    ) : (
                      <MapPin size={12} className="mr-1" />
                    )}
                    {selectedAgenda.type === "Online" ? "Platform / Link" : "Lokasi"}
                  </div>
                  <div className="text-sm font-bold break-all text-[#0F172A]">{selectedAgenda.location}</div>
                  {selectedAgenda.type === "Online" && (
                    <a
                      href={selectedAgenda.location}
                      target="_blank"
                      className="mt-2 flex items-center text-xs font-bold text-[#14B8A6] hover:underline"
                    >
                      Buka Link <ExternalLink size={12} className="ml-1" />
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="flex items-center border-l-4 border-[#14B8A6] pl-3 text-sm font-bold text-[#0F172A]">
                  Deskripsi
                </h4>
                <p className="text-sm leading-relaxed text-[#64748B]">{selectedAgenda.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="flex items-center border-l-4 border-[#14B8A6] pl-3 text-sm font-bold text-[#0F172A]">
                  Narasumber
                </h4>
                <div className="flex items-center space-x-3 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#14B8A6] text-sm font-bold text-white">
                    {selectedAgenda.narasumber.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-[#0F172A]">{selectedAgenda.narasumber}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-[#F1F5F9] bg-[#F8FAFC] p-6">
              <Link
                href={`/admin/agenda/${selectedAgenda.slug}/pendaftar`}
                className="tap-target flex w-full items-center justify-center rounded-xl bg-[#14B8A6] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
              >
                Lihat Daftar Pendaftar <ChevronRight size={16} className="ml-2" />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`/admin/agenda/${selectedAgenda.slug}/edit`}
                  className="tap-target flex items-center justify-center rounded-xl border-2 border-[#E2E8F0] bg-white py-3 text-sm font-bold text-[#0F172A] transition-all hover:border-[#14B8A6]"
                >
                  Edit Agenda
                </Link>
                <button
                  onClick={() => setIsViewOpen(false)}
                  className="tap-target rounded-xl border-2 border-[#E2E8F0] bg-white py-3 text-sm font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC]"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus Agenda */}
      {isDeleteOpen && selectedAgenda && (
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
                <h3 className="mb-2 text-xl font-extrabold text-[#0F172A]">Hapus Agenda?</h3>
                <p className="px-4 text-sm leading-relaxed text-[#64748B]">
                  Agenda <span className="font-bold text-[#0F172A]">&quot;{selectedAgenda.title}&quot;</span> akan
                  dihapus and tidak bisa dikembalikan.
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
                  className="tap-target flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-600"
                >
                  Hapus Agenda
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAgenda;
