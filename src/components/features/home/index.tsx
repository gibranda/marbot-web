/* eslint-disable react/no-array-index-key */
"use client";
import {
  CheckCircle,
  Users,
  Layout,
  Award,
  ChevronDown,
  Sparkles,
  Target,
  Heart,
  Star,
  ChevronRight,
  BookOpen,
  MessageCircle,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import CourseCard from "@/components/common/CourseCard";
import { MOCK_COURSES, MOCK_INSTRUCTORS, FAQS } from "@/constants/constants";

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for scroll reveal
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Handle hash scroll on initial load
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  const stats = [
    { label: "Materi Ringkas", value: "120+" },
    { label: "Pengajar Ahli", value: "40+" },
    { label: "Peserta Aktif", value: "10.000+" },
  ];

  const addToRevealRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="hero"
        className="reveal-section relative bg-[#FFFFFF] pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32"
        ref={addToRevealRefs}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#99F6E4] opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-[#14B8A6] opacity-10 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-4 py-2">
                <Sparkles size={16} className="text-[#14B8A6]" />
                <span className="text-[10px] font-bold tracking-wider text-[#0F766E] uppercase md:text-xs">
                  LMS No.1 Untuk Masjid
                </span>
              </div>
              <h1 className="mb-6 text-3xl leading-tight font-extrabold text-[#0F172A] sm:text-4xl md:text-5xl md:leading-[1.15] lg:text-6xl">
                Belajar mengelola masjid, jadi lebih <span className="text-[#14B8A6]">rapi & berdampak.</span>
              </h1>
              <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-[#64748B] md:text-lg lg:mx-0">
                Marbot membantu takmir, marbot, dan pengurus masjid belajar dari materi praktis: kebersihan,
                operasional, layanan jamaah, hingga manajemen kegiatan.
              </p>

              <div className="mb-12 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                <Link
                  href="/katalog"
                  className="tap-target flex w-full items-center justify-center rounded-xl bg-[#14B8A6] px-8 py-4 text-center font-bold text-white shadow-lg shadow-[#14B8A6]/30 transition-all hover:bg-[#0F766E] sm:w-auto"
                >
                  Mulai Belajar Sekarang
                </Link>
                <Link
                  href="/katalog"
                  className="tap-target flex w-full items-center justify-center rounded-xl border-2 border-[#E2E8F0] px-8 py-4 text-center font-bold text-[#0F172A] transition-all hover:border-[#14B8A6] hover:text-[#14B8A6] sm:w-auto"
                >
                  Lihat Pembelajaran
                </Link>
              </div>

              <div className="mx-auto grid max-w-md grid-cols-3 gap-2 border-t border-[#F1F5F9] pt-8 sm:gap-8 lg:mx-0">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-lg font-extrabold text-[#0F172A] sm:text-xl md:text-2xl">{s.value}</div>
                    <div className="text-[9px] leading-tight font-medium text-[#64748B] sm:text-[10px] md:text-xs">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Mockup - Hidden on smaller mobile, visible from lg */}
            <div className="group relative hidden lg:block">
              <div className="absolute inset-0 scale-105 rotate-3 rounded-2xl bg-gradient-to-tr from-[#14B8A6] to-[#99F6E4] opacity-20 blur-2xl transition-transform group-hover:rotate-6"></div>
              <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase">
                    Dashboard Peserta
                  </div>
                </div>
                <div className="space-y-6 p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0F172A]">SOP Kebersihan Karpet</h4>
                      <p className="text-xs text-[#64748B]">Sedang dipelajari • Modul 3/8</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6]">
                      <Target size={24} />
                    </div>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                    <div className="h-full w-[65%] rounded-full bg-[#14B8A6] shadow-[0_0_10px_rgba(20,184,166,0.4)]"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                      <Award size={20} className="mb-2 text-[#14B8A6]" />
                      <div className="text-xs font-bold">2 Sertifikat</div>
                      <div className="text-[10px] text-[#64748B]">Telah didapat</div>
                    </div>
                    <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                      <Users size={20} className="mb-2 text-[#14B8A6]" />
                      <div className="text-xs font-bold">85 Alumni</div>
                      <div className="text-[10px] text-[#64748B]">Masjid Terdekat</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-[#14B8A6] p-4 text-white">
                    <div className="text-xs font-bold">Lanjut Belajar: Layanan Prima</div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-6 -right-6 animate-bounce rounded-xl border border-[#F1F5F9] bg-white p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#99F6E4]">
                    <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  </div>
                  <div className="text-xs font-bold">Sertifikat Resmi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="reveal-section scroll-mt-20 bg-[#F8FAFC] py-16 md:py-24" ref={addToRevealRefs}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-extrabold text-[#0F172A] md:mb-6 md:text-4xl">
              Marbot, Akademi Kemasjidan Digital
            </h2>
            <p className="mb-4 text-sm leading-relaxed font-medium text-[#64748B] md:mb-6 md:text-base">
              Marbot adalah platform pembelajaran (LMS) untuk meningkatkan kapasitas pengelola masjid—marbot, takmir,
              dan pengurus—melalui kursus, workshop, and agenda kemasjidan yang terstruktur.
            </p>
            <p className="text-sm leading-relaxed text-[#64748B] md:text-base">
              Masjid membutuhkan pengelolaan yang rapi, profesional, and berkelanjutan. Marbot hadir sebagai akademi
              kemasjidan berbasis digital yang menyediakan pembelajaran praktis—mulai dari operasional harian,
              kebersihan, pelayanan jamaah, hingga manajemen kegiatan and pengembangan SDM masjid.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: <Sparkles className="text-[#14B8A6]" />,
                title: "Kursus Terstruktur",
                desc: "Materi pembelajaran kemasjidan dalam bentuk kursus online, disusun bertahap and mudah diikuti.",
              },
              {
                icon: <Target className="text-[#14B8A6]" />,
                title: "Agenda & Workshop",
                desc: "Informasi and pendaftaran workshop kemasjidan, baik online maupun offline, langsung dari satu platform.",
              },
              {
                icon: <Heart className="text-[#14B8A6]" />,
                title: "Sertifikasi & Pengembangan SDM",
                desc: "Setiap pembelajaran tercatat, progres terpantau, and sertifikat diterbitkan sebagai bukti peningkatan kapasitas.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="stagger-item rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-md md:p-8"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDFA]">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#0F172A] md:text-xl">{item.title}</h3>
                <p className="text-xs leading-relaxed text-[#64748B] md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section - Implement Horizontal Scroll */}
      <section
        id="kursus-populer"
        className="reveal-section bg-white pt-16 pb-10 md:pt-24 md:pb-16"
        ref={addToRevealRefs}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between md:mb-12 md:flex-row md:items-end">
            <div className="mb-4 md:mb-0">
              <h2 className="mb-2 text-2xl font-extrabold text-[#0F172A] md:mb-4 md:text-4xl">Kursus Populer</h2>
              <p className="text-sm text-[#64748B] md:text-base">
                Mulai dari materi yang paling dibutuhkan di lapangan.
              </p>
            </div>
            <Link
              href="/katalog"
              className="inline-flex items-center text-sm font-bold text-[#14B8A6] hover:underline md:text-base"
            >
              Lihat Semua di Pembelajaran <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>

          {/* Horizontal Scroll Area Implementation */}
          <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-10 sm:-mx-6 sm:px-6 md:gap-8 lg:-mx-8 lg:px-8">
            {MOCK_COURSES.slice(0, 5).map((course, idx) => (
              <div
                key={course.id}
                className="stagger-item w-[280px] shrink-0 snap-start transition-all duration-500 sm:w-[320px] md:w-[380px]"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Transition Divider */}
      <div className="reveal-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={addToRevealRefs}>
        <div className="stagger-item h-px w-full bg-[#E2E8F0]"></div>
      </div>

      {/* Redesigned Pengajar Section: "Our Team" Style */}
      <section
        id="pengajar-preview"
        className="reveal-section bg-white pt-10 pb-16 md:pt-16 md:pb-24"
        ref={addToRevealRefs}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Large Panel Container */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-12 lg:p-16">
            {/* Header Area */}
            <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-16 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="mb-4 text-2xl leading-tight font-extrabold text-[#0F172A] md:mb-6 md:text-4xl lg:text-5xl">
                  Belajar dari pengajar yang paham lapangan
                </h2>
                <p className="text-sm leading-relaxed text-[#64748B] md:text-base">
                  Tim ahli kami terdiri dari para praktisi kemasjidan berpengalaman yang siap membimbing Anda mengelola
                  masjid secara modern and profesional.
                </p>
              </div>
              <div className="hidden md:block">
                <Link
                  href="/pengajar"
                  className="tap-target inline-flex items-center rounded-xl border-2 border-[#E2E8F0] px-8 py-4 text-sm font-bold text-[#0F172A] transition-all hover:border-[#14B8A6] hover:text-[#14B8A6]"
                >
                  Lihat Semua Pengajar <ChevronRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-4">
              {MOCK_INSTRUCTORS.slice(0, 4).map((instructor, idx) => (
                <div
                  key={instructor.id}
                  className="stagger-item group flex flex-col"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {/* Portrait Photo Container */}
                  <div className="relative mb-8 aspect-[3/4] overflow-hidden rounded-xl bg-[#F8FAFC] shadow-sm transition-all group-hover:shadow-md">
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Floating Level Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="rounded-lg border border-white bg-white/95 px-3 py-1.5 text-[9px] font-bold tracking-widest text-[#14B8A6] uppercase shadow-sm backdrop-blur-md">
                        {instructor.role.split(" ")[0]}
                      </div>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="flex flex-grow flex-col text-center sm:text-left">
                    <h3 className="mb-1 text-lg font-extrabold text-[#0F172A] transition-colors group-hover:text-[#14B8A6] md:text-xl">
                      {instructor.name}
                    </h3>
                    <p className="mb-3 text-[10px] font-bold tracking-widest text-[#14B8A6] uppercase md:text-xs">
                      {instructor.role}
                    </p>
                    <p className="mb-6 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-[#64748B] md:text-sm">
                      {instructor.bio}
                    </p>

                    {/* Meta Info Bar */}
                    <div className="mb-6 grid grid-cols-3 gap-2 border-y border-[#F1F5F9] py-4">
                      <div className="flex flex-col items-center">
                        <div className="mb-1 flex items-center space-x-1">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-[#0F172A]">{instructor.rating}</span>
                        </div>
                        <span className="text-[9px] font-bold tracking-wider text-[#94A3B8] uppercase">Rating</span>
                      </div>
                      <div className="flex flex-col items-center border-x border-[#F1F5F9]">
                        <div className="mb-1 flex items-center space-x-1">
                          <Users size={12} className="text-[#14B8A6]" />
                          <span className="text-xs font-bold text-[#0F172A]">
                            {instructor.totalStudents.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold tracking-wider text-[#94A3B8] uppercase">Peserta</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="mb-1 flex items-center space-x-1">
                          <BookOpen size={12} className="text-[#64748B]" />
                          <span className="text-xs font-bold text-[#0F172A]">{instructor.totalCourses}</span>
                        </div>
                        <span className="text-[9px] font-bold tracking-wider text-[#94A3B8] uppercase">Kursus</span>
                      </div>
                    </div>

                    {/* Profile Link Button */}
                    <Link
                      href={`/pengajar/${instructor.id}`}
                      className="tap-target mt-auto inline-flex w-full items-center justify-center rounded-[10px] border-2 border-[#E2E8F0] py-3 text-xs font-bold text-[#475569] transition-all group-hover:shadow-lg group-hover:shadow-[#14B8A6]/5 hover:border-[#14B8A6] hover:bg-[#F0FDFA] hover:text-[#14B8A6]"
                    >
                      Lihat Profil{" "}
                      <ChevronRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile-only See All Button */}
            <div className="mt-12 md:hidden">
              <Link
                href="/pengajar"
                className="tap-target flex w-full items-center justify-center rounded-xl border-2 border-[#E2E8F0] bg-white py-4 font-bold text-[#0F172A] shadow-sm"
              >
                Lihat Semua Pengajar <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Teaser Section - FULL-BLEED */}
      <section
        id="teaser-katalog"
        className="reveal-section relative mb-16 overflow-hidden bg-[#0F766E] py-12 text-white md:mb-24 md:py-20 lg:py-24"
        ref={addToRevealRefs}
      >
        {/* Decorative background element - smaller on mobile */}
        <div className="pointer-events-none absolute top-0 right-0 p-8 opacity-10 md:p-24">
          <Layout
            size={120}
            strokeWidth={0.5}
            className="text-white md:h-[240px] md:w-[240px] lg:h-[300px] lg:w-[300px]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="stagger-item max-w-xl text-center transition-all duration-700 lg:text-left">
              <h2 className="mb-6 text-2xl leading-tight font-extrabold md:mb-8 md:text-4xl lg:text-5xl">
                Cari kursus sesuai kebutuhan masjid Anda.
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-white/80 md:mb-10 md:text-lg">
                Kami menyediakan sistem filter cerdas untuk membantu Anda menemukan materi berdasarkan tingkat
                kesulitan, durasi, hingga topik spesifik kemasjidan.
              </p>
              <Link
                href="/katalog"
                className="tap-target inline-flex w-full items-center justify-center rounded-xl bg-[#14B8A6] px-10 py-4 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#0F766E] sm:w-auto md:py-5 md:text-base"
              >
                Buka Pembelajaran Sekarang
              </Link>
            </div>

            <div className="stagger-item hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all delay-200 duration-700 md:block md:p-8">
              <div className="flex flex-col space-y-6">
                <div>
                  <label className="mb-3 block text-[10px] font-bold tracking-widest text-white/60 uppercase">
                    Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Semua", "Pemula", "Menengah"].map((l) => (
                      <span
                        key={l}
                        className={`cursor-pointer rounded-lg px-4 py-2 text-xs font-bold transition-colors ${l === "Pemula" ? "bg-[#14B8A6] text-white" : "bg-white/10 hover:bg-white/20"}`}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-[10px] font-bold tracking-widest text-white/60 uppercase">
                    Topik Populer
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Kebersihan", "Manajemen", "Teknis", "Layanan", "Adab"].map((t) => (
                      <span
                        key={t}
                        className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-xs font-bold hover:bg-white/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="reveal-section scroll-mt-20 bg-[#F8FAFC] py-16 md:py-24" ref={addToRevealRefs}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main FAQ Panel */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-12 lg:p-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Column 1 & 2: FAQ List */}
              <div className="space-y-8 lg:col-span-2">
                <div className="text-center lg:text-left">
                  <div className="mb-4 inline-flex items-center rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-3 py-1">
                    <HelpCircle size={14} className="mr-2 text-[#14B8A6]" />
                    <span className="text-[10px] font-bold tracking-wider text-[#0F766E] uppercase">Tanya Jawab</span>
                  </div>
                  <h2 className="mb-6 text-2xl font-extrabold text-[#0F172A] md:text-4xl">Pertanyaan Umum (FAQ)</h2>
                  <p className="mx-auto mb-10 max-w-lg text-sm text-[#64748B] md:text-base lg:mx-0">
                    Kami merangkum beberapa hal yang sering ditanyakan oleh calon peserta untuk membantu Anda memahami
                    Marbot LMS lebih cepat.
                  </p>
                </div>

                <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                    <div
                      key={idx}
                      className={`stagger-item rounded-xl border transition-all duration-300 ${
                        openFaq === idx
                          ? "border-[#14B8A6] bg-[#F0FDFA] shadow-sm"
                          : "border-[#E2E8F0] bg-white hover:border-[#14B8A6]/50"
                      }`}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="group tap-target flex w-full items-center justify-between px-4 py-4 text-left sm:px-6 sm:py-5"
                      >
                        <span
                          className={`text-sm font-bold transition-colors md:text-base ${
                            openFaq === idx ? "text-[#0F766E]" : "text-[#0F172A]"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                            openFaq === idx ? "rotate-180 bg-[#14B8A6] text-white" : "bg-[#F1F5F9] text-[#64748B]"
                          }`}
                        >
                          <ChevronDown size={18} />
                        </div>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openFaq === idx ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-4 pb-6 sm:px-6">
                          <p className="border-t border-[#14B8A6]/10 pt-2 text-xs leading-relaxed text-[#475569] md:text-sm">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Help Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-6">
                  <div className="relative overflow-hidden rounded-xl bg-[#0F766E] p-8 text-white shadow-xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <MessageCircle size={120} />
                    </div>
                    <div className="relative z-10">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#14B8A6] shadow-lg">
                        <MessageCircle size={24} className="text-white" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold">Masih ada pertanyaan?</h3>
                      <p className="mb-8 text-sm leading-relaxed text-white/80">
                        Tim admin kami siap membantu Anda memberikan informasi lebih detail seputar kursus and platform.
                      </p>
                      <a
                        href="#"
                        className="group tap-target flex w-full items-center justify-center rounded-[10px] bg-[#14B8A6] py-4 font-bold text-white shadow-md transition-all hover:bg-[#14B8A6]/90"
                      >
                        Hubungi Admin{" "}
                        <ArrowUpRight
                          size={18}
                          className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:p-8">
                    <h4 className="mb-4 text-sm font-bold text-[#0F172A]">Saluran Bantuan</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 rounded-[10px] border border-[#E2E8F0] bg-white p-3 shadow-sm">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                          <Users size={16} />
                        </div>
                        <div className="truncate text-xs">
                          <div className="font-bold">WhatsApp</div>
                          <div className="text-[#64748B]">0812-3456-7890</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 rounded-[10px] border border-[#E2E8F0] bg-white p-3 shadow-sm">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <BookOpen size={16} />
                        </div>
                        <div className="truncate text-xs">
                          <div className="font-bold">Email Support</div>
                          <div className="text-[#64748B]">bantuan@marbot.id</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
