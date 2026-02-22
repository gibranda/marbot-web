"use client";

import { ArrowLeft, CheckCircle, Info, Mail, MapPin, Phone, Save, ShieldCheck, Star, Upload, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const AdminAddInstructor: React.FC = () => {
  const router = useRouter();

  return (
    <div className="animate-fadeIn space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <button
            onClick={() => router.back()}
            className="group mb-2 flex items-center text-sm font-bold text-[#64748B] transition-colors hover:text-[#14B8A6]"
          >
            <ArrowLeft size={16} className="mr-1 transition-transform group-hover:-translate-x-1" />
            Kembali
          </button>
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Tambah Pengajar Baru</h1>
          <p className="text-sm text-[#64748B]">Tambahkan profil pengajar untuk ditampilkan di pembelajaran.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => router.back()}
            className="rounded-xl border-2 border-[#E2E8F0] px-6 py-2.5 text-sm font-bold text-[#475569] transition-all hover:border-red-400 hover:text-red-500"
          >
            Batal
          </button>
          <button className="flex items-center rounded-xl bg-[#14B8A6] px-10 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]">
            <Save size={18} className="mr-2" />
            Simpan Profil
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="space-y-8 lg:col-span-2">
          {/* 1. Profil Pengajar */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <User size={20} className="mr-2 text-[#14B8A6]" />
              Profil Dasar Pengajar
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Nama Lengkap & Gelar
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Ustadz Dr. H. Ahmad Fauzi, M.A."
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Role / Keahlian Utama
                  </label>
                  <select className="w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]">
                    <option>Praktisi Kemasjidan</option>
                    <option>Takmir & Manajemen</option>
                    <option>Layanan Jamaah & Adab</option>
                    <option>Keuangan & Inventaris</option>
                    <option>Teknis & Operasional</option>
                    <option>Kebersihan & Sanitasi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-4">
                <div className="md:col-span-1">
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Foto Profil
                  </label>
                  <div className="group relative mx-auto h-32 w-32 md:mx-0">
                    <div className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-[#94A3B8] transition-all group-hover:border-[#14B8A6] group-hover:bg-[#F0FDFA]">
                      <Upload size={24} />
                    </div>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-all group-hover:opacity-100">
                      <span className="text-[10px] font-bold text-white uppercase">Upload</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Bio Singkat (Tagline)
                  </label>
                  <textarea
                    rows={1}
                    placeholder="Contoh: Praktisi manajemen masjid modern selama 15 tahun di Jogokaryan."
                    className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                  ></textarea>
                  <label className="mt-4 mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Bio Lengkap / Pengalaman
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Jelaskan latar belakang pendidikan, pengalaman organisasi masjid, dan keahlian spesifik..."
                    className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Kredensial & Kontak */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <Mail size={20} className="mr-2 text-[#14B8A6]" />
              Kredensial & Kontak
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={16} />
                  <input
                    type="email"
                    placeholder="ustadz@marbot.id"
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-4 pl-11 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  No. HP / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={16} />
                  <input
                    type="text"
                    placeholder="0812-3456-7890"
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-4 pl-11 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Domisili / Lokasi
                </label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={16} />
                  <input
                    type="text"
                    placeholder="Yogyakarta, Indonesia"
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-4 pl-11 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Statistik (Initial Set) */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <Star size={20} className="mr-2 text-[#14B8A6]" />
              Data Statistik (Opsional)
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Rating Awal
                </label>
                <input
                  type="number"
                  step="0.1"
                  max="5"
                  defaultValue="5.0"
                  className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold outline-none focus:border-[#14B8A6]"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Jumlah Peserta Awal
                </label>
                <input
                  type="number"
                  defaultValue="0"
                  className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold outline-none focus:border-[#14B8A6]"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Jumlah Kursus Diterbitkan
                </label>
                <input
                  type="number"
                  defaultValue="0"
                  className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>
            <p className="mt-4 text-[10px] font-medium text-[#94A3B8] italic">
              *Statistik ini akan ditampilkan di profil pembelajaran publik pengajar.
            </p>
          </div>
        </div>

        {/* Side Card Info */}
        <div className="space-y-6 lg:col-span-1">
          <div className="sticky top-28 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h4 className="mb-6 flex items-center text-sm font-extrabold tracking-[0.15em] text-[#0F172A] uppercase">
              <Info size={16} className="mr-2 text-[#14B8A6]" />
              Tips Profil
            </h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-500">
                  <CheckCircle size={10} />
                </div>
                <p className="text-xs leading-relaxed text-[#475569]">
                  Gunakan foto portrait dengan background yang rapi (masjid atau studio).
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-500">
                  <CheckCircle size={10} />
                </div>
                <p className="text-xs leading-relaxed text-[#475569]">
                  Tuliskan bio yang ringkas and menonjolkan kredibilitas di bidang kemasjidan.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-500">
                  <CheckCircle size={10} />
                </div>
                <p className="text-xs leading-relaxed text-[#475569]">
                  Pilih role/tag yang paling mencerminkan keahlian utama untuk memudahkan filter.
                </p>
              </div>

              <div className="border-t border-[#F1F5F9] pt-6">
                <div className="mb-3 flex items-center space-x-2 text-[10px] font-bold tracking-widest text-[#14B8A6] uppercase">
                  <ShieldCheck size={14} />
                  <span>Verifikasi Data</span>
                </div>
                <p className="mb-4 text-[10px] leading-relaxed text-[#94A3B8]">
                  Profil pengajar baru akan ditinjau oleh tim Admin Marbot sebelum muncul secara publik di daftar
                  pengajar.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
            <h5 className="mb-2 text-xs font-extrabold tracking-wider text-[#0F172A] uppercase">Catatan Internal</h5>
            <textarea
              rows={4}
              placeholder="Tambahkan catatan khusus admin tentang pengajar ini..."
              className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-white px-4 py-3 text-[10px] font-medium transition-all outline-none focus:border-[#14B8A6]"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddInstructor;
