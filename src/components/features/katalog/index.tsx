/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  Star,
  Clock,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import CourseCard from "@/components/common/CourseCard";
import { MOCK_COURSES } from "@/constants/constants";

const Catalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const savedMode = localStorage.getItem("marbot_catalog_view") as "grid" | "list";
    if (savedMode) {
      setViewMode(savedMode);
    }
  }, []);

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    localStorage.setItem("marbot_catalog_view", mode);
  };

  const categories = ["Semua", "Kebersihan", "Manajemen", "Teknis", "Layanan", "Adab"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Catalog Hero */}
      <section className="border-b border-[#E2E8F0] bg-white pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
            <h1 className="mb-4 text-3xl font-extrabold text-[#0F172A] md:mb-6 md:text-5xl">Katalog Pembelajaran</h1>
            <p className="mb-8 text-sm leading-relaxed text-[#64748B] md:mb-10 md:text-lg">
              Temukan berbagai modul pembelajaran praktis untuk meningkatkan standar pengelolaan masjid Anda.
            </p>

            {/* Search Bar */}
            <div className="group relative mx-auto max-w-2xl md:mx-0">
              <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-[#64748B] transition-colors group-focus-within:text-[#14B8A6] md:left-5" />
              <input
                type="text"
                placeholder="Cari pembelajaran..."
                className="tap-target w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] py-4 pr-6 pl-12 text-sm font-medium transition-all outline-none focus:border-[#14B8A6] focus:ring-0 md:py-5 md:pl-14 md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filter (Desktop) */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-32 space-y-8">
              <div>
                <h4 className="mb-5 flex items-center font-bold text-[#0F172A]">
                  <Filter size={18} className="mr-2 text-[#14B8A6]" />
                  Kategori Pembelajaran
                </h4>
                <div className="flex flex-col space-y-3">
                  {categories.map((cat) => (
                    <label key={cat} className="group tap-target flex cursor-pointer items-center">
                      <input
                        type="radio"
                        name="cat"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="hidden"
                      />
                      <span
                        className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${
                          selectedCategory === cat
                            ? "border-[#14B8A6] bg-[#14B8A6]"
                            : "border-[#E2E8F0] group-hover:border-[#14B8A6]"
                        }`}
                      >
                        {selectedCategory === cat && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </span>
                      <span
                        className={`font-medium transition-colors ${selectedCategory === cat ? "text-[#14B8A6]" : "text-[#64748B] group-hover:text-[#0F172A]"}`}
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] pt-8">
                <h4 className="mb-5 font-bold text-[#0F172A]">Tingkat Kesulitan</h4>
                <div className="space-y-3">
                  {["Pemula", "Menengah", "Lanjut"].map((level) => (
                    <label key={level} className="group tap-target flex cursor-pointer items-center space-x-3">
                      <div className="h-5 w-5 rounded-md border-2 border-[#E2E8F0] transition-all group-hover:border-[#14B8A6]"></div>
                      <span className="text-sm font-medium text-[#64748B] group-hover:text-[#0F172A]">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Catalog Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:flex-row md:mb-8">
              <div className="text-center text-xs text-[#64748B] sm:text-left md:text-sm">
                Menampilkan <span className="font-bold text-[#0F172A]">{MOCK_COURSES.length} pembelajaran</span>{" "}
                tersedia
              </div>
              <div className="flex w-full items-center space-x-4 sm:w-auto">
                {/* View Switcher Toggle */}
                <div className="flex shrink-0 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] p-1">
                  <button
                    onClick={() => handleViewModeChange("grid")}
                    className={`tap-target flex items-center justify-center rounded-lg p-1 transition-all ${viewMode === "grid" ? "bg-[#14B8A6] text-white shadow-sm" : "text-[#94A3B8] hover:text-[#14B8A6]"}`}
                    aria-label="Tampilan Grid"
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    onClick={() => handleViewModeChange("list")}
                    className={`tap-target flex items-center justify-center rounded-lg p-1 transition-all ${viewMode === "list" ? "bg-[#14B8A6] text-white shadow-sm" : "text-[#94A3B8] hover:text-[#14B8A6]"}`}
                    aria-label="Tampilan List"
                  >
                    <List size={18} />
                  </button>
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <select className="tap-target w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-2.5 text-xs font-bold text-[#0F172A] outline-none focus:border-[#14B8A6] sm:w-48 md:text-sm">
                    <option>Terpopuler</option>
                    <option>Terbaru</option>
                    <option>Rating Tertinggi</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#64748B]"
                  />
                </div>
                <button className="tap-target flex shrink-0 items-center justify-center rounded-[10px] bg-[#14B8A6] p-2.5 text-white lg:hidden">
                  <SlidersHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Filter Chips (Mobile/Tablet) */}
            <div className="scrollbar-hide mb-6 flex space-x-2 overflow-x-auto pb-4 lg:hidden">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`tap-target flex items-center justify-center rounded-full border-2 px-5 py-2 text-xs font-bold whitespace-nowrap transition-all md:text-sm ${
                    selectedCategory === cat
                      ? "border-[#14B8A6] bg-[#14B8A6] text-white"
                      : "border-[#E2E8F0] bg-white text-[#64748B]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Conditional Rendering based on viewMode */}
            {viewMode === "grid" ? (
              <div className="animate-fadeIn grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
                {MOCK_COURSES.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="animate-fadeIn space-y-4">
                {MOCK_COURSES.map((course) => (
                  <div
                    key={course.id}
                    className="group flex flex-col gap-6 rounded-2xl border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#14B8A6] hover:shadow-md sm:p-5 md:flex-row"
                  >
                    <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-xl shadow-sm md:aspect-auto md:h-40 md:w-56">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`rounded bg-white/90 px-2 py-0.5 text-[9px] font-extrabold uppercase shadow-sm backdrop-blur ${course.level === "Pemula" ? "text-[#0F766E]" : "text-[#475569]"}`}
                        >
                          {course.level}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="mb-2 flex items-center space-x-2">
                          <span className="text-[10px] font-bold tracking-widest text-[#14B8A6] uppercase">
                            {course.category}
                          </span>
                          <span className="text-[10px] text-[#CBD5E1]">•</span>
                          <div className="flex items-center space-x-1">
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-[10px] font-bold text-[#0F172A]">{course.rating}</span>
                          </div>
                        </div>
                        <h3 className="mb-2 text-lg leading-tight font-bold text-[#0F172A] transition-colors group-hover:text-[#14B8A6]">
                          {course.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-[#64748B]">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              width={24}
                              height={24}
                              className="rounded-full border border-[#F1F5F9]"
                            />
                            <span className="text-xs font-medium text-[#475569]">{course.instructor.name}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-[#94A3B8]">
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span className="text-xs font-medium">{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BookOpen size={14} />
                              <span className="text-xs font-medium">{course.modules} modul</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-[#F1F5F9] pt-4 md:w-48 md:flex-col md:justify-center md:border-t-0 md:border-l md:pt-0 md:pl-6">
                      <div className="text-center md:mb-4">
                        <div className="mb-1 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Harga</div>
                        <div
                          className={`text-lg font-extrabold ${course.price === "Gratis" ? "text-[#14B8A6]" : "text-[#0F172A]"}`}
                        >
                          {course.price}
                        </div>
                      </div>
                      <Link
                        href={`/course/${course.id}`}
                        className="tap-target flex flex-1 items-center justify-center rounded-xl bg-[#14B8A6] py-2 text-xs font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E] md:w-full"
                      >
                        Lihat Detail <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center space-x-2 md:mt-16">
              <button className="tap-target flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-white text-[#64748B] transition-all hover:border-[#14B8A6] hover:text-[#14B8A6]">
                <ChevronLeft size={20} />
              </button>
              <button className="tap-target flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#14B8A6] font-bold text-white">
                1
              </button>
              <button className="tap-target flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-white text-[#64748B] transition-all hover:border-[#14B8A6] hover:text-[#14B8A6]">
                2
              </button>
              <button className="tap-target flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-white text-[#64748B] transition-all hover:border-[#14B8A6] hover:text-[#14B8A6]">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ChevronLeft = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export default Catalog;
