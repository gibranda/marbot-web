/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable sonarjs/no-nested-conditional */
"use client";

import { Search, Calendar, MapPin, Globe, ChevronRight, Users, LayoutGrid, List, Clock, Ticket } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { MOCK_AGENDA } from "@/constants/constants";

const AgendaList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const savedView = localStorage.getItem("marbot_agenda_view") as "grid" | "list";
    if (savedView) {
      setViewMode(savedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("marbot_agenda_view", viewMode);
  }, [viewMode]);

  const filteredAgenda = MOCK_AGENDA.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "Semua" ||
      (filter === "Online" && item.type === "Online") ||
      (filter === "Offline" && item.type === "Offline") ||
      (filter === "Gratis" && item.price === "Gratis") ||
      (filter === "Berbayar" && item.price !== "Gratis");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header Mini */}
      <section className="border-b border-[#E2E8F0] bg-white pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-3xl font-extrabold text-[#0F172A] md:mb-6 md:text-5xl">
              Agenda Workshop Kemasjidan
            </h1>
            <p className="mb-10 text-sm leading-relaxed text-[#64748B] md:text-lg">
              Pilih workshop online atau offline dari para praktisi terbaik, lalu daftar untuk meningkatkan kualitas
              layanan masjid Anda.
            </p>

            {/* Search Bar */}
            <div className="group relative max-w-2xl">
              <Search className="absolute top-1/2 left-5 -translate-y-1/2 text-[#64748B] transition-colors group-focus-within:text-[#14B8A6]" />
              <input
                type="text"
                placeholder="Cari workshop..."
                className="tap-target w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] py-4 pr-6 pl-14 text-sm font-medium transition-all outline-none focus:border-[#14B8A6] focus:ring-0 md:py-5 md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar & Filter */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="scrollbar-hide w-full overflow-x-auto pb-2 md:w-auto md:pb-0">
            <div className="flex space-x-2">
              {["Semua", "Online", "Offline", "Gratis", "Berbayar"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`tap-target flex items-center justify-center rounded-full border-2 px-6 py-2.5 text-sm font-bold whitespace-nowrap transition-all ${
                    filter === f
                      ? "border-[#14B8A6] bg-[#14B8A6] text-white shadow-md"
                      : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#14B8A6]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full shrink-0 items-center space-x-4 md:w-auto">
            {/* View Mode Toggle */}
            <div className="flex rounded-[12px] border border-[#E2E8F0] bg-white p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`tap-target flex items-center justify-center rounded-lg p-1.5 transition-all ${viewMode === "grid" ? "bg-[#14B8A6] text-white shadow-sm" : "text-[#94A3B8] hover:text-[#14B8A6]"}`}
                aria-label="Tampilan Grid"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`tap-target flex items-center justify-center rounded-lg p-1.5 transition-all ${viewMode === "list" ? "bg-[#14B8A6] text-white shadow-sm" : "text-[#94A3B8] hover:text-[#14B8A6]"}`}
                aria-label="Tampilan List"
              >
                <List size={18} />
              </button>
            </div>

            <div className="flex flex-1 items-center space-x-3 md:flex-none">
              <span className="hidden text-sm font-bold text-[#64748B] sm:inline">Urutkan:</span>
              <select className="tap-target flex-1 cursor-pointer appearance-none rounded-xl border-2 border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-bold text-[#0F172A] shadow-sm outline-none focus:border-[#14B8A6] md:flex-none">
                <option>Terdekat</option>
                <option>Terbaru</option>
                <option>Paling Populer</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda Area */}
      <section className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        {filteredAgenda.length > 0 ? (
          viewMode === "grid" ? (
            <div className="animate-fadeIn grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAgenda.map((agenda) => (
                <div
                  key={agenda.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all hover:border-[#14B8A6] hover:shadow-xl"
                >
                  <div className="relative aspect-video">
                    <img
                      src={agenda.cover}
                      alt={agenda.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className={`rounded-lg px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase shadow-sm ${
                          agenda.type === "Online" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {agenda.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col p-6 md:p-8">
                    <div className="mb-3 flex items-center space-x-2 text-[10px] font-bold tracking-[0.15em] text-[#14B8A6] uppercase">
                      <Calendar size={12} />
                      <span>
                        {agenda.date} • {agenda.time} WIB
                      </span>
                    </div>

                    <h3 className="mb-4 line-clamp-2 min-h-[3.5rem] text-xl font-extrabold text-[#0F172A] transition-colors group-hover:text-[#14B8A6]">
                      {agenda.title}
                    </h3>

                    <div className="mb-8 space-y-3">
                      <div className="flex items-center space-x-3 text-sm text-[#64748B]">
                        {agenda.type === "Online" ? (
                          <Globe size={16} className="shrink-0" />
                        ) : (
                          <MapPin size={16} className="shrink-0" />
                        )}
                        <span className="truncate">{agenda.locationName}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-[#64748B]">
                        <Users size={16} className="shrink-0" />
                        <span className="font-medium">Sisa {agenda.remainingQuota} Kuota</span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-[#F1F5F9] pt-6">
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Harga</div>
                        <div
                          className={`text-lg font-extrabold ${agenda.price === "Gratis" ? "text-[#14B8A6]" : "text-[#0F172A]"}`}
                        >
                          {agenda.price}
                        </div>
                      </div>
                      <Link
                        href={`/agenda/${agenda.slug}`}
                        className="tap-target flex items-center rounded-xl bg-[#14B8A6] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
                      >
                        Lihat Detail <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-fadeIn space-y-4">
              {filteredAgenda.map((agenda) => (
                <div
                  key={agenda.id}
                  className="group flex flex-col items-center gap-6 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all hover:border-[#14B8A6] hover:shadow-md sm:p-6 md:flex-row"
                >
                  {/* Date Column (Desktop Only) */}
                  <div className="hidden h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#F1F5F9] bg-[#F8FAFC] transition-colors group-hover:bg-[#F0FDFA] md:flex">
                    <span className="mb-1 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                      {agenda.date.split(" ")[2]}
                    </span>
                    <span className="text-2xl font-extrabold text-[#0F172A]">{agenda.date.split(" ")[0]}</span>
                    <span className="text-[10px] font-bold text-[#14B8A6] uppercase">{agenda.date.split(" ")[1]}</span>
                  </div>

                  {/* Image Column (Mobile Only) */}
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl md:hidden">
                    <img src={agenda.cover} className="h-full w-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span
                        className={`rounded-lg bg-white/90 px-3 py-1 text-[9px] font-extrabold uppercase shadow-sm backdrop-blur ${agenda.type === "Online" ? "text-blue-600" : "text-amber-600"}`}
                      >
                        {agenda.type}
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span
                        className={`hidden rounded-lg px-3 py-1 text-[9px] font-extrabold tracking-widest uppercase md:inline-block ${
                          agenda.type === "Online" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {agenda.type}
                      </span>
                      <div className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.1em] text-[#64748B] uppercase">
                        <Clock size={12} className="text-[#14B8A6]" />
                        <span>{agenda.time} WIB</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.1em] text-[#64748B] uppercase md:hidden">
                        <Calendar size={12} className="text-[#14B8A6]" />
                        <span>{agenda.date}</span>
                      </div>
                    </div>

                    <h3 className="mb-2 truncate text-lg leading-tight font-extrabold text-[#0F172A] transition-colors group-hover:text-[#14B8A6] sm:text-xl">
                      {agenda.title}
                    </h3>

                    <div className="flex flex-col gap-4 text-xs text-[#64748B] sm:flex-row sm:items-center">
                      <div className="flex items-center space-x-2">
                        {agenda.type === "Online" ? (
                          <Globe size={14} className="shrink-0 text-[#14B8A6]" />
                        ) : (
                          <MapPin size={14} className="shrink-0 text-[#14B8A6]" />
                        )}
                        <span className="max-w-[200px] truncate">{agenda.locationName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={14} className="shrink-0 text-[#14B8A6]" />
                        <span className="font-bold text-[#0F172A]">
                          {agenda.remainingQuota} <span className="font-normal text-[#64748B]">Kuota Tersisa</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between gap-4 border-t border-[#F1F5F9] pt-4 md:w-56 md:flex-col md:justify-center md:border-t-0 md:border-l md:pt-0 md:pl-8">
                    <div className="text-center md:mb-4">
                      <div className="mb-1 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                        Pendaftaran
                      </div>
                      <div
                        className={`text-lg font-extrabold ${agenda.price === "Gratis" ? "text-[#14B8A6]" : "text-[#0F172A]"}`}
                      >
                        {agenda.price}
                      </div>
                    </div>
                    <Link
                      href={`/agenda/${agenda.slug}`}
                      className="tap-target flex flex-1 items-center justify-center rounded-xl bg-[#14B8A6] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E] md:w-full"
                    >
                      <Ticket size={14} className="mr-2" /> Daftar Workshop
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-16 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#94A3B8]">
              <Search size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#0F172A]">Agenda Tidak Ditemukan</h3>
            <p className="text-[#64748B]">Coba gunakan kata kunci pencarian yang berbeda.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AgendaList;
