"use client";
import { Search, Star, Users, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { MOCK_INSTRUCTORS } from "@/constants/constants";

const Instructors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("Semua");

  const roles = [
    "Semua",
    "Praktisi Kemasjidan",
    "Takmir & Manajemen",
    "Kebersihan & Sanitasi",
    "Layanan Jamaah & Adab",
    "Keuangan & Inventaris",
    "Teknis & Operasional",
  ];

  const filteredInstructors = MOCK_INSTRUCTORS.filter((instructor) => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "Semua" || instructor.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header Section */}
      <section className="border-b border-[#E2E8F0] bg-white pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-3xl font-extrabold text-[#0F172A] md:text-5xl">Daftar Pengajar</h1>
            <p className="mb-10 text-lg leading-relaxed text-[#64748B]">
              Belajar dari pengajar yang paham lapangan kemasjidan. Mereka adalah praktisi yang telah bertahun-tahun
              mengelola rumah Allah dengan baik.
            </p>

            {/* Search Bar Utama */}
            <div className="group relative max-w-2xl">
              <Search className="absolute top-1/2 left-5 -translate-y-1/2 text-[#64748B] transition-colors group-focus-within:text-[#14B8A6]" />
              <input
                type="text"
                placeholder="Cari pengajar atau keahlian (mis. 'Kebersihan', 'Haji')..."
                className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] py-5 pr-6 pl-14 font-medium transition-all outline-none focus:border-[#14B8A6] focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Sorting Toolbar */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          {/* Filter Chips - Scrollable on mobile */}
          <div className="scrollbar-hide w-full overflow-x-auto pb-2 lg:w-auto lg:pb-0">
            <div className="flex space-x-2">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`rounded-full border-2 px-6 py-2.5 text-sm font-bold whitespace-nowrap transition-all ${
                    selectedRole === role
                      ? "border-[#14B8A6] bg-[#14B8A6] text-white"
                      : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#14B8A6] hover:text-[#14B8A6]"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting */}
          <div className="flex w-full shrink-0 items-center space-x-4 lg:w-auto">
            <span className="text-sm font-bold whitespace-nowrap text-[#64748B]">Urutkan:</span>
            <div className="relative flex-1 lg:flex-none">
              <select className="w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-bold text-[#0F172A] outline-none focus:border-[#14B8A6] lg:w-48">
                <option>Terpopuler</option>
                <option>Rating Tertinggi</option>
                <option>Pengajar Baru</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#64748B]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Pengajar */}
      <section className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        {filteredInstructors.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInstructors.map((instructor) => (
              <div
                key={instructor.id}
                className="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-all hover:border-[#14B8A6] hover:shadow-xl"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="relative">
                    <img src={instructor.avatar} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="absolute -right-2 -bottom-2 flex h-7 w-7 items-center justify-center rounded-lg border-2 border-white bg-[#14B8A6] text-white">
                      <Star size={12} className="fill-white" />
                    </div>
                  </div>
                  <div className="rounded-full bg-[#F0FDFA] px-3 py-1">
                    <span className="text-[10px] font-extrabold tracking-wider text-[#0F766E] uppercase">
                      {instructor.role}
                    </span>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-bold text-[#0F172A] transition-colors group-hover:text-[#14B8A6]">
                  {instructor.name}
                </h3>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-[#64748B]">{instructor.bio}</p>

                <div className="grid grid-cols-3 gap-4 border-t border-[#F1F5F9] py-6">
                  <div className="border-r border-[#F1F5F9] text-center">
                    <div className="mb-1 flex items-center justify-center space-x-1 text-[#0F172A]">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">{instructor.rating}</span>
                    </div>
                    <div className="text-[10px] font-bold text-[#64748B] uppercase">Rating</div>
                  </div>
                  <div className="border-r border-[#F1F5F9] text-center">
                    <div className="mb-1 text-sm font-bold text-[#0F172A]">
                      {instructor.totalStudents.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-bold text-[#64748B] uppercase">Peserta</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-sm font-bold text-[#0F172A]">{instructor.totalCourses}</div>
                    <div className="text-[10px] font-bold text-[#64748B] uppercase">Kursus</div>
                  </div>
                </div>

                <Link
                  href={`/pengajar/${instructor.id}`}
                  className="flex w-full items-center justify-center rounded-[10px] border-2 border-[#14B8A6] py-3 text-sm font-bold text-[#14B8A6] transition-all hover:bg-[#14B8A6] hover:text-white"
                >
                  Lihat Profil
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-16 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#F8FAFC]">
              <Users size={32} className="text-[#94A3B8]" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#0F172A]">Pengajar Tidak Ditemukan</h3>
            <p className="text-[#64748B]">Coba gunakan kata kunci pencarian yang berbeda.</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredInstructors.length > 0 && (
          <div className="mt-16 text-center">
            <button className="mx-auto flex items-center space-x-2 rounded-xl border-2 border-[#E2E8F0] bg-white px-10 py-4 font-bold text-[#0F172A] transition-all hover:border-[#14B8A6] hover:text-[#14B8A6]">
              <span>Muat Lebih Banyak</span>
              <ChevronDown size={18} />
            </button>
          </div>
        )}
      </section>

      {/* Become Teacher CTA */}
      <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="group relative overflow-hidden rounded-2xl bg-[#0F766E] p-8 md:p-16">
          <div className="pointer-events-none absolute top-0 right-0 p-24 opacity-5 transition-transform duration-700 group-hover:scale-110">
            <Sparkles size={300} strokeWidth={0.5} className="text-white" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">Ingin menjadi pengajar di Marbot?</h2>
              <p className="max-w-xl text-lg leading-relaxed text-white/80">
                Bantu berbagi praktik baik pengelolaan masjid. Salurkan ilmu Anda untuk menciptakan kemasjidan yang
                lebih rapi dan berdampak. Profil Anda akan ditampilkan di pembelajaran publik Marbot.
              </p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
              <button className="rounded-xl bg-[#14B8A6] px-8 py-4 text-center font-bold text-white transition-all hover:bg-white hover:text-[#0F766E]">
                Daftar Jadi Pengajar
              </button>
              <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-center font-bold text-white transition-all hover:bg-white/20">
                Pelajari Syaratnya
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Instructors;
