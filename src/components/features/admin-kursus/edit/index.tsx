"use client";

import { ArrowLeft, ChevronDown, Info, Plus, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { MOCK_COURSES } from "@/constants/constants";

const AdminEditCourse: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  // Find current course data or use dummy
  const course = MOCK_COURSES.find((c) => c.id === id) || MOCK_COURSES[0];

  const [modules, setModules] = useState([
    { id: 1, title: "Pendahuluan: Visi Pengelola Masjid", duration: "15" },
    { id: 2, title: "Teknik Dasar Sanitasi", duration: "30" },
    { id: 3, title: "Pelayanan Jamaah", duration: "45" },
  ]);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/admin/kursus");
    }, 1500);
  };

  const handleAddModule = () => {
    setModules([...modules, { id: modules.length + 1, title: "", duration: "" }]);
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  return (
    <div className="animate-fadeIn relative space-y-8 pb-24">
      {showToast && (
        <div className="animate-slideInRight fixed top-24 right-8 z-[60] flex items-center space-x-3 rounded-xl bg-[#0F172A] px-6 py-4 text-white shadow-2xl">
          <div className="h-2 w-2 rounded-full bg-[#14B8A6]"></div>
          <span className="text-sm font-bold">Perubahan tersimpan</span>
        </div>
      )}

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
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Edit Kursus</h1>
          <p className="text-sm text-[#64748B]">
            Perbarui informasi untuk kursus <span className="font-bold text-[#0F172A]">&quot;{course.title}&quot;</span>
          </p>
        </div>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleSave}
            className="tap-target flex items-center justify-center rounded-xl border-2 border-[#E2E8F0] px-6 py-2.5 text-sm font-bold text-[#475569] transition-all hover:border-[#14B8A6]"
          >
            Simpan Draft
          </button>
          <button
            onClick={handleSave}
            className="tap-target flex items-center justify-center rounded-xl bg-[#14B8A6] px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
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
                  defaultValue={course.title}
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
                    defaultValue={course.id}
                    className="w-full cursor-not-allowed rounded-[10px] border border-[#E2E8F0] bg-[#F1F5F9] px-4 py-3 text-sm text-[#94A3B8] outline-none"
                    readOnly
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Kategori
                  </label>
                  <div className="relative">
                    <select
                      className="w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                      defaultValue={course.category}
                    >
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Tingkat
                  </label>
                  <div className="relative">
                    <select
                      className="w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                      defaultValue={course.level}
                    >
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
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Estimasi Durasi
                  </label>
                  <input
                    type="text"
                    defaultValue={course.duration}
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Ringkasan Singkat
                </label>
                <textarea
                  rows={3}
                  defaultValue={course.description}
                  className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium transition-all outline-none focus:border-[#14B8A6]"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <Plus size={20} className="mr-2 text-[#14B8A6]" /> Kurikulum
            </h3>
            <div className="space-y-4">
              {modules.map((module, idx) => (
                <div
                  key={module.id}
                  className="flex flex-col items-center gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:flex-row"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-xs font-bold text-[#64748B]">
                    {idx + 1}
                  </div>
                  <input
                    type="text"
                    defaultValue={module.title}
                    className="flex-1 bg-transparent text-sm font-bold text-[#0F172A] outline-none"
                  />
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-[#E2E8F0] bg-white px-3 py-1">
                      <input
                        type="text"
                        defaultValue={module.duration}
                        className="w-8 text-center text-xs font-bold outline-none"
                      />
                      <span className="ml-1 text-[10px] font-bold text-[#94A3B8] uppercase">Mnt</span>
                    </div>
                    <button
                      onClick={() => handleRemoveModule(module.id)}
                      className="p-2 text-red-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddModule}
                className="w-full rounded-xl border-2 border-dashed border-[#E2E8F0] py-3 text-xs font-bold text-[#64748B] transition-all hover:border-[#14B8A6] hover:text-[#14B8A6]"
              >
                + Tambah Modul
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-1">
          <div className="sticky top-28 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h4 className="mb-6 text-xs font-extrabold tracking-widest text-[#0F172A] uppercase">Informasi Publik</h4>
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                  Cover Kursus
                </label>
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={400}
                  height={225}
                  className="mb-4 aspect-video w-full rounded-xl border border-[#F1F5F9] object-cover"
                />
                <button className="w-full rounded-lg border-2 border-[#E2E8F0] py-2.5 text-[10px] font-bold text-[#64748B] uppercase hover:bg-[#F8FAFC]">
                  Ganti Cover
                </button>
              </div>
              <div className="space-y-4 border-t border-[#F1F5F9] pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#475569]">Sertifikat Aktif</span>
                  <div className="relative h-5 w-10 cursor-pointer rounded-full bg-[#14B8A6]">
                    <div className="absolute top-1 right-1 h-3 w-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="tap-target flex w-full items-center justify-center rounded-xl bg-[#14B8A6] py-4 font-bold text-white shadow-xl shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
                >
                  <Save size={18} className="mr-2" /> Simpan Perubahan
                </button>
                <button
                  onClick={() => router.back()}
                  className="w-full text-center text-xs font-bold text-red-500 hover:underline"
                >
                  Batal dan Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditCourse;
