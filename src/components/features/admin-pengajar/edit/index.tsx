"use client";

import { ArrowLeft, Save, ShieldCheck, Star, User } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { MOCK_INSTRUCTORS } from "@/constants/constants";

const AdminEditInstructor: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const instructor = MOCK_INSTRUCTORS.find((i: { id: string }) => i.id === id) || MOCK_INSTRUCTORS[0];
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/admin/pengajar");
    }, 1500);
  };

  return (
    <div className="animate-fadeIn relative space-y-8 pb-24">
      {showToast && (
        <div className="animate-slideInRight fixed top-24 right-8 z-60 flex items-center space-x-3 rounded-xl bg-[#0F172A] px-6 py-4 text-white shadow-2xl">
          <div className="h-2 w-2 rounded-full bg-[#14B8A6]"></div>
          <span className="text-sm font-bold">Profil diperbarui</span>
        </div>
      )}

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
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Edit Pengajar</h1>
          <p className="text-sm text-[#64748B]">
            Perbarui profil <span className="font-bold text-[#0F172A]">{instructor.name}</span>
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center rounded-xl bg-[#14B8A6] px-10 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
          >
            <Save size={18} className="mr-2" />
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <User size={20} className="mr-2 text-[#14B8A6]" /> Profil Dasar
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    defaultValue={instructor.name}
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#14B8A6]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Role Utama
                  </label>
                  <input
                    type="text"
                    defaultValue={instructor.role}
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#14B8A6]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Bio Singkat
                </label>
                <textarea
                  rows={4}
                  defaultValue={instructor.bio}
                  className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#14B8A6]"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <Star size={20} className="mr-2 text-[#14B8A6]" /> Statistik Awal
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="mb-1 block text-[10px] font-bold text-[#475569] uppercase">Rating</label>
                <input
                  type="text"
                  defaultValue={instructor.rating}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm font-bold"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold text-[#475569] uppercase">Peserta</label>
                <input
                  type="text"
                  defaultValue={instructor.totalStudents}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm font-bold"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold text-[#475569] uppercase">Kursus</label>
                <input
                  type="text"
                  defaultValue={instructor.totalCourses}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <div>
              <label className="mb-4 block text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                Foto Profil
              </label>
              <Image
                src={instructor.avatar}
                alt={instructor.name}
                width={128}
                height={128}
                className="mx-auto mb-4 rounded-2xl border-4 border-white object-cover shadow-xl"
              />
              <button className="w-full rounded-lg border-2 border-[#E2E8F0] py-2.5 text-[10px] font-bold text-[#64748B] uppercase">
                Ganti Foto
              </button>
            </div>
            <div className="space-y-4 border-t border-[#F1F5F9] pt-6">
              <div className="mb-3 flex items-center space-x-2 text-[10px] font-bold tracking-widest text-[#14B8A6] uppercase">
                <ShieldCheck size={14} /> <span>Status: Terverifikasi</span>
              </div>
              <button
                onClick={handleSave}
                className="tap-target flex w-full items-center justify-center rounded-xl bg-[#14B8A6] py-4 font-bold text-white shadow-xl transition-all hover:bg-[#0F766E]"
              >
                <Save size={18} className="mr-2" /> Simpan Profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditInstructor;
