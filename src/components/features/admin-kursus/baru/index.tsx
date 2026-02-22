"use client";

import { ArrowLeft, CheckCircle, ChevronDown, ExternalLink, Info, Monitor, Plus, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { MOCK_INSTRUCTORS } from "@/constants/constants";

const AdminAddCourse: React.FC = () => {
  const router = useRouter();
  const [courseType, setCourseType] = useState<"Gratis" | "Berbayar">("Gratis");
  const [modules, setModules] = useState([
    { id: 1, title: "Pengenalan & Visi Misi", duration: "15" },
    { id: 2, title: "Modul Inti Bagian 1", duration: "30" },
    { id: 3, title: "Penugasan Praktis", duration: "45" },
  ]);

  const handleAddModule = () => {
    setModules([...modules, { id: modules.length + 1, title: "", duration: "" }]);
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  return (
    <div className="animate-fadeIn space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <button
            onClick={() => router.back()}
            className="group tap-target mb-2 flex items-center text-sm font-bold text-[#64748B] transition-colors hover:text-[#14B8A6]"
          >
            <ArrowLeft size={16} className="mr-1 transition-transform group-hover:-translate-x-1" />
            Kembali
          </button>
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Buat Kursus Baru</h1>
          <p className="text-sm text-[#64748B]">Lengkapi informasi kursus sebelum dipublish.</p>
        </div>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <button className="tap-target flex items-center justify-center rounded-xl border-2 border-[#E2E8F0] px-6 py-2.5 text-sm font-bold text-[#475569] transition-all hover:border-[#14B8A6]">
            Simpan Draft
          </button>
          <button className="tap-target flex items-center justify-center rounded-xl bg-[#14B8A6] px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]">
            Publish Kursus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Form Area */}
        <div className="space-y-8 lg:col-span-2">
          {/* 1. Informasi Dasar */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <Info size={20} className="mr-2 text-[#14B8A6]" />
              Informasi Dasar
            </h3>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Judul Kursus
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Manajemen Kebersihan Area Wudhu"
                  className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    placeholder="Otomatis dari judul..."
                    className="w-full cursor-not-allowed rounded-[10px] border border-[#E2E8F0] bg-[#F1F5F9] px-4 py-3 text-sm text-[#94A3B8] outline-none"
                    readOnly
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Kategori
                  </label>
                  <div className="relative">
                    <select className="tap-target w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]">
                      <option>Kebersihan</option>
                      <option>Manajemen</option>
                      <option>Teknis</option>
                      <option>Layanan</option>
                      <option>Adab</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#64748B]"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Tingkat
                  </label>
                  <div className="relative">
                    <select className="tap-target w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]">
                      <option>Pemula</option>
                      <option>Menengah</option>
                      <option>Lanjut</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#64748B]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">Bahasa</label>
                  <div className="relative">
                    <select className="tap-target w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]">
                      <option>Bahasa Indonesia</option>
                      <option>English</option>
                      <option>Arabic</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#64748B]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Estimasi Durasi
                  </label>
                  <input
                    type="text"
                    placeholder="2 Jam 30 Menit"
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Ringkasan Singkat
                </label>
                <textarea
                  rows={2}
                  placeholder="Tuliskan 1-2 kalimat deskripsi singkat..."
                  className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                ></textarea>
              </div>
            </div>
          </div>

          {/* 2. Konten & Kurikulum */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <Plus size={20} className="mr-2 text-[#14B8A6]" />
              Konten & Kurikulum
            </h3>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Deskripsi Lengkap
                </label>
                <textarea
                  rows={6}
                  placeholder="Tuliskan detail materi..."
                  className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                ></textarea>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Daftar Modul
                  </label>
                  <button
                    onClick={handleAddModule}
                    className="tap-target flex items-center text-xs font-bold text-[#14B8A6] hover:underline"
                  >
                    <Plus size={14} className="mr-1" /> Tambah Modul
                  </button>
                </div>
                <div className="space-y-3">
                  {modules.map((module, idx) => (
                    <div
                      key={module.id}
                      className="group flex flex-col items-start gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex w-full items-center space-x-3 sm:w-auto">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-xs font-bold text-[#64748B]">
                          {idx + 1}
                        </div>
                        <input
                          type="text"
                          placeholder="Judul Modul"
                          defaultValue={module.title}
                          className="flex-1 bg-transparent text-sm font-bold text-[#0F172A] outline-none focus:text-[#14B8A6] sm:hidden"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Judul Modul"
                        defaultValue={module.title}
                        className="hidden flex-1 bg-transparent text-sm font-bold text-[#0F172A] outline-none focus:text-[#14B8A6] sm:block"
                      />
                      <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
                        <div className="flex items-center rounded-lg border border-[#E2E8F0] bg-white px-3 py-1">
                          <input
                            type="text"
                            defaultValue={module.duration}
                            className="w-8 text-center text-xs font-bold outline-none"
                          />
                          <span className="ml-1 text-[10px] font-bold text-[#94A3B8] uppercase">Menit</span>
                        </div>
                        <button
                          onClick={() => handleRemoveModule(module.id)}
                          className="tap-target flex items-center p-2 text-[#94A3B8] transition-colors hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Media */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <Upload size={20} className="mr-2 text-[#14B8A6]" />
              Media Pembelajaran
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Thumbnail Kursus
                </label>
                <div className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-all hover:border-[#14B8A6] hover:bg-[#F0FDFA] sm:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] shadow-sm transition-colors group-hover:text-[#14B8A6]">
                    <Upload size={24} />
                  </div>
                  <span className="text-sm font-bold text-[#475569] group-hover:text-[#14B8A6]">Klik untuk Upload</span>
                  <span className="mt-1 text-center text-[10px] font-medium text-[#94A3B8]">Max 2MB (JPG/PNG)</span>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Video Promo URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="YouTube/Vimeo URL"
                      className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                    />
                    <ExternalLink size={16} className="absolute top-1/2 right-4 -translate-y-1/2 text-[#94A3B8]" />
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed font-medium text-[#94A3B8] italic">
                    *Video ini akan ditampilkan di halaman detail.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Harga & Akses */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <CheckCircle size={20} className="mr-2 text-[#14B8A6]" />
              Harga & Akses
            </h3>
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setCourseType("Gratis")}
                  className={`tap-target flex items-start space-x-3 rounded-xl border-2 p-4 text-left transition-all ${
                    courseType === "Gratis"
                      ? "border-[#14B8A6] bg-[#F0FDFA]"
                      : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      courseType === "Gratis" ? "border-[#14B8A6]" : "border-[#CBD5E1]"
                    }`}
                  >
                    {courseType === "Gratis" && <div className="h-2.5 w-2.5 rounded-full bg-[#14B8A6]"></div>}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">Kursus Gratis</div>
                    <div className="mt-1 text-[10px] leading-tight font-medium text-[#64748B]">
                      Sangat bagus untuk edukasi umum.
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setCourseType("Berbayar")}
                  className={`tap-target flex items-start space-x-3 rounded-xl border-2 p-4 text-left transition-all ${
                    courseType === "Berbayar"
                      ? "border-[#14B8A6] bg-[#F0FDFA]"
                      : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      courseType === "Berbayar" ? "border-[#14B8A6]" : "border-[#CBD5E1]"
                    }`}
                  >
                    {courseType === "Berbayar" && <div className="h-2.5 w-2.5 rounded-full bg-[#14B8A6]"></div>}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">Kursus Berbayar</div>
                    <div className="mt-1 text-[10px] leading-tight font-medium text-[#64748B]">
                      Gunakan untuk materi eksklusif.
                    </div>
                  </div>
                </button>
              </div>

              {courseType === "Berbayar" && (
                <div className="animate-slideInDown">
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Harga Jual (Rp)
                  </label>
                  <div className="relative">
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 text-sm font-bold text-[#94A3B8]">Rp</div>
                    <input
                      type="text"
                      placeholder="50.000"
                      className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-4 pl-12 text-sm font-bold transition-all outline-none focus:border-[#14B8A6]"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="pr-4">
                  <div className="text-sm font-bold text-[#0F172A]">Sertifikat Kelulusan</div>
                  <div className="mt-0.5 text-[10px] leading-tight font-medium text-[#64748B]">
                    Otomatis setelah lulus kursus.
                  </div>
                </div>
                <div className="relative h-6 w-12 shrink-0 cursor-pointer rounded-full bg-[#14B8A6] shadow-inner">
                  <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-white shadow-md transition-all"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Pengajar */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <Plus size={20} className="mr-2 text-[#14B8A6]" />
              Pengajar
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Pilih Pengajar
                </label>
                <div className="relative">
                  <select className="tap-target w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]">
                    <option disabled selected>
                      -- Pilih Pengajar --
                    </option>
                    {MOCK_INSTRUCTORS.map((ins) => (
                      <option key={ins.id} value={ins.id}>
                        {ins.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#64748B]"
                  />
                </div>
              </div>
              <div className="flex justify-start">
                <Link
                  href="/admin/pengajar/baru"
                  className="tap-target flex items-center text-xs font-bold text-[#14B8A6] hover:underline"
                >
                  <Plus size={14} className="mr-1" /> Tambah Pengajar Baru
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Status Info */}
        <div className="space-y-6 lg:col-span-1">
          <div className="sticky top-28 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h4 className="mb-6 text-sm font-extrabold tracking-[0.15em] text-[#0F172A] uppercase">Preview Status</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
                <span className="text-xs font-bold text-[#64748B]">Status</span>
                <span className="rounded-lg border border-amber-100 bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-amber-600 uppercase">
                  Draft
                </span>
              </div>

              <div className="space-y-4">
                <span className="block text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                  Progres Data
                </span>
                <div className="space-y-3">
                  {[
                    { label: "Informasi Dasar", completed: true },
                    { label: "Thumbnail Kursus", completed: false },
                    { label: "Materi & Modul", completed: true },
                    { label: "Data Pengajar", completed: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#475569]">{item.label}</span>
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${item.completed ? "border border-green-100 bg-green-50 text-green-500" : "border border-[#E2E8F0] bg-[#F8FAFC] text-[#CBD5E1]"}`}
                      >
                        <CheckCircle size={12} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button className="tap-target flex w-full items-center justify-center rounded-xl border-2 border-[#E2E8F0] py-3.5 text-xs font-bold text-[#475569] transition-all hover:bg-[#F8FAFC]">
                  <Monitor size={14} className="mr-2" /> Preview Halaman
                </button>
                <p className="text-center text-[10px] font-medium text-[#94A3B8] italic">
                  Tersimpan: 2 menit yang lalu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCourse;
