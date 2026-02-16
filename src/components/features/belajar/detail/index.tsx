/* eslint-disable sonarjs/pseudo-random */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { Play, CheckCircle, ChevronRight, ChevronLeft, Award, FileText, Info, ArrowLeft, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import { MOCK_COURSES } from "@/constants/constants";

const CoursePlayer: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const course = MOCK_COURSES.find((c) => c.id === id) || MOCK_COURSES[0];

  const [activeModule, setActiveModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("Ringkasan");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load progress from storage
  useEffect(() => {
    const enrollments = JSON.parse(localStorage.getItem("marbot_enrollments") || "[]");
    const current = enrollments.find((e: any) => e.courseId === course.id);
    if (current && current.completedModules) {
      setCompletedModules(current.completedModules);
    }
  }, [course.id]);

  const modules = [
    { title: "Pendahuluan: Visi Pengelola Masjid", duration: "10:00" },
    { title: "Standard Operasional Harian", duration: "15:20" },
    { title: "Teknik Kebersihan Area Utama", duration: "20:45" },
    { title: "Manajemen Sanitasi & Limbah", duration: "12:30" },
    { title: "Pelayanan Jamaah & Tamu Allah", duration: "18:15" },
    { title: "Evaluasi Akhir & Penutup", duration: "05:00" },
  ];

  const handleMarkComplete = () => {
    if (!completedModules.includes(activeModule)) {
      const newCompleted = [...completedModules, activeModule];
      setCompletedModules(newCompleted);

      // Save progress to storage
      const enrollments = JSON.parse(localStorage.getItem("marbot_enrollments") || "[]");
      const courseIdx = enrollments.findIndex((e: any) => e.courseId === course.id);

      const progressPercent = Math.round((newCompleted.length / modules.length) * 100);

      if (courseIdx >= 0) {
        enrollments[courseIdx].progress = progressPercent;
        enrollments[courseIdx].completedModules = newCompleted;
        if (progressPercent === 100) {
          enrollments[courseIdx].status = "Selesai";
          // Auto add certificate
          const certs = JSON.parse(localStorage.getItem("marbot_certificates") || "[]");
          if (!certs.find((c: any) => c.courseTitle === course.title)) {
            certs.push({
              id: `cert-${Date.now()}`,
              studentName: "Ahmad", // Mock logged in user name
              courseTitle: course.title,
              certNumber: `MARBOT/CERT/2024/${Math.floor(Math.random() * 9000) + 1000}`,
              issueDate: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
            });
            localStorage.setItem("marbot_certificates", JSON.stringify(certs));
          }
        }
        localStorage.setItem("marbot_enrollments", JSON.stringify(enrollments));
      }
    }

    // Auto next if not last
    if (activeModule < modules.length - 1) {
      setActiveModule(activeModule + 1);
    }
  };

  const progress = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      {/* Sub Header for Player */}
      <div className="sticky top-16 z-40 border-b border-white/10 bg-[#0F172A] py-3 text-white sm:py-4 md:top-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div className="flex min-w-0 items-center space-x-3 sm:space-x-4">
            <Link
              href="/akun/kursus"
              className="tap-target flex shrink-0 items-center rounded-lg p-2 transition-colors hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="min-w-0">
              <h2 className="max-w-37.5 truncate text-xs font-bold sm:max-w-md sm:text-sm">{course.title}</h2>
              <p className="truncate text-[9px] font-bold tracking-widest text-white/60 uppercase sm:text-[10px]">
                Modul {activeModule + 1}: {modules[activeModule].title}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center space-x-3 sm:space-x-4">
            <div className="hidden flex-col items-end sm:flex">
              <span className="mb-1 text-[10px] font-bold text-white/60 uppercase">Progress Belajar</span>
              <div className="flex items-center space-x-2">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10 lg:w-32">
                  <div className="h-full bg-[#14B8A6]" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-[#14B8A6]">{progress}%</span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="tap-target flex items-center rounded-lg bg-white/10 p-2 lg:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Main Player Area */}
        <main className="min-h-0 flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="mx-auto max-w-5xl p-4 sm:p-6 md:p-8">
            {/* Video Placeholder */}
            <div className="group relative mb-6 aspect-video overflow-hidden rounded-xl bg-black shadow-2xl sm:mb-8">
              <Image src={course.thumbnail} alt={course.title} fill className="object-cover opacity-40 blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-white/50 bg-white/20 text-white backdrop-blur-md transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                  <Play size={28} fill="white" />
                </div>
              </div>
              <div className="absolute right-4 bottom-4 left-4 sm:right-6 sm:bottom-6 sm:left-6">
                <div className="rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md sm:p-4">
                  <h4 className="text-xs font-bold text-white sm:text-sm">{modules[activeModule].title}</h4>
                  <p className="mt-1 text-[10px] text-white/60">
                    Video Pembelajaran • {modules[activeModule].duration}
                  </p>
                </div>
              </div>
            </div>

            {/* Completion Banner */}
            {progress === 100 && (
              <div className="animate-fadeIn mb-8 flex flex-col items-center justify-between gap-6 rounded-xl border-2 border-[#14B8A6] bg-[#F0FDFA] p-4 sm:p-6 md:flex-row">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#14B8A6] text-white shadow-lg sm:h-12 sm:w-12">
                    <Award size={20} className="sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F766E] sm:text-base">Kursus Selesai!</h4>
                    <p className="text-xs text-[#0F766E]/80 sm:text-sm">
                      Selamat, Anda telah menyelesaikan seluruh materi. Sertifikat Anda kini tersedia.
                    </p>
                  </div>
                </div>
                <Link
                  href="/akun/sertifikat"
                  className="tap-target flex w-full items-center justify-center rounded-xl bg-[#14B8A6] px-8 py-3 text-center font-bold text-white shadow-md transition-all hover:bg-[#0F766E] sm:w-auto"
                >
                  Lihat Sertifikat
                </Link>
              </div>
            )}

            {/* Navigation & Controls - Stacked on tiny mobile */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] py-4 sm:mb-12 sm:gap-4 sm:py-6">
              <button
                disabled={activeModule === 0}
                onClick={() => setActiveModule(activeModule - 1)}
                className={`tap-target order-2 flex items-center rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:order-1 sm:px-6 sm:py-3 sm:text-sm ${activeModule === 0 ? "cursor-not-allowed text-[#CBD5E1]" : "border border-[#E2E8F0] text-[#64748B] hover:bg-white"}`}
              >
                <ChevronLeft size={18} className="mr-1 sm:mr-2" /> <span className="xs:inline hidden">Sebelumnya</span>
              </button>

              <button
                onClick={handleMarkComplete}
                className="tap-target order-1 flex w-full items-center justify-center rounded-xl bg-[#14B8A6] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E] sm:order-2 sm:w-auto sm:px-10 sm:py-3.5"
              >
                {completedModules.includes(activeModule) ? "Tandai Selesai" : "Selesai & Lanjut"}{" "}
                <ChevronRight size={18} className="ml-2" />
              </button>

              <button
                disabled={activeModule === modules.length - 1}
                onClick={() => setActiveModule(activeModule + 1)}
                className={`tap-target order-3 flex items-center rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:px-6 sm:py-3 sm:text-sm ${activeModule === modules.length - 1 ? "cursor-not-allowed text-[#CBD5E1]" : "border border-[#E2E8F0] text-[#64748B] hover:bg-white"}`}
              >
                <span className="xs:inline hidden">Berikutnya</span> <ChevronRight size={18} className="ml-1 sm:ml-2" />
              </button>
            </div>

            {/* Content Tabs - Scrollable on mobile */}
            <div className="space-y-6">
              <div className="scrollbar-hide flex space-x-6 overflow-x-auto border-b border-[#E2E8F0] sm:space-x-8">
                {["Ringkasan", "Materi Pendukung", "Diskusi"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-4 text-xs font-bold whitespace-nowrap transition-all sm:text-sm ${activeTab === tab ? 'text-[#14B8A6] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#14B8A6] after:content-[""]' : "text-[#64748B]"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-50 rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
                {activeTab === "Ringkasan" && (
                  <div className="animate-fadeIn">
                    <h3 className="mb-4 text-base font-bold text-[#0F172A] sm:text-lg">Tentang Modul Ini</h3>
                    <p className="text-xs leading-relaxed text-[#64748B] sm:text-sm">
                      Pada modul {activeModule + 1}, kita membahas topik {modules[activeModule].title}. Pastikan Anda
                      memperhatikan poin-poin krusial yang dijelaskan untuk mempermudah implementasi di masjid
                      masing-masing.
                    </p>
                  </div>
                )}
                {activeTab === "Materi Pendukung" && (
                  <div className="animate-fadeIn space-y-3 sm:space-y-4">
                    <div className="flex cursor-pointer items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 transition-all hover:border-[#14B8A6] sm:p-4">
                      <div className="flex min-w-0 items-center space-x-3 sm:space-x-4">
                        <div className="shrink-0 rounded-lg bg-red-50 p-2 text-red-500">
                          <FileText size={18} />
                        </div>
                        <span className="truncate text-xs font-bold text-[#475569] sm:text-sm">
                          Checklist_Monitoring_Harian.pdf
                        </span>
                      </div>
                      <ChevronRight size={18} className="shrink-0 text-[#94A3B8]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Curriculum - Mobile Overlay */}
        <aside
          className={`${isSidebarOpen ? "translate-x-0" : "translate-x-full"} fixed inset-y-0 right-0 z-50 w-[80%] overflow-y-auto border-l border-[#E2E8F0] bg-white transition-transform duration-300 ease-in-out sm:w-87.5 lg:static lg:translate-x-0`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC] p-5 sm:p-6">
            <h3 className="flex items-center text-sm font-extrabold text-[#0F172A] sm:text-base">
              <Info size={18} className="mr-2 text-[#14B8A6]" /> Kurikulum
            </h3>
            <div className="flex items-center space-x-3">
              <span className="text-[9px] font-bold tracking-widest text-[#64748B] uppercase sm:text-[10px]">
                {modules.length} Modul
              </span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="tap-target flex items-center p-1 text-[#64748B] hover:text-[#0F172A] lg:hidden"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="divide-y divide-[#F1F5F9]">
            {modules.map((module, idx) => (
              <button
                key={module.title}
                onClick={() => {
                  setActiveModule(idx);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex w-full items-start space-x-3 p-5 text-left transition-all hover:bg-[#F8FAFC] sm:space-x-4 sm:p-6 ${activeModule === idx ? "border-l-4 border-[#14B8A6] bg-[#F0FDFA]" : ""} tap-target`}
              >
                <div
                  className={`mt-0.5 shrink-0 transition-colors ${completedModules.includes(idx) ? "text-[#14B8A6]" : "text-[#CBD5E1]"}`}
                >
                  <CheckCircle
                    size={18}
                    className="sm:h-5 sm:w-5"
                    fill={completedModules.includes(idx) ? "currentColor" : "none"}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1">
                    <span
                      className={`block truncate text-xs leading-tight font-bold sm:text-sm ${activeModule === idx ? "text-[#0F766E]" : "text-[#475569]"}`}
                    >
                      {module.title}
                    </span>
                  </div>
                  <div className="flex items-center text-[9px] font-bold tracking-wider text-[#94A3B8] uppercase sm:text-[10px]">
                    <Play size={10} className="mr-1" /> {module.duration}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div
            className="animate-fadeIn fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
