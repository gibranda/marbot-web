/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  Layout,
  BookOpen,
  History,
  Award,
  User as UserIcon,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle,
  Lock,
  ArrowRight,
  TrendingUp,
  Target,
  Calendar,
  Ticket,
  MapPin,
  Globe,
  Menu,
  X,
  ArrowLeftCircle,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import CourseCard from "@/components/common/CourseCard";
import { MOCK_COURSES, MOCK_AGENDA, LOGO_URL } from "@/constants/constants";

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ringkasan");
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("marbot_user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const menuItems = [
    { id: "ringkasan", name: "Ringkasan", icon: <Layout size={20} /> },
    { id: "kursus", name: "Kursus Saya", icon: <BookOpen size={20} /> },
    { id: "agenda", name: "Agenda Saya", icon: <Calendar size={20} /> },
    { id: "sertifikat", name: "Sertifikat", icon: <Award size={20} /> },
    { id: "profil", name: "Profil", icon: <UserIcon size={20} /> },
    { id: "pengaturan", name: "Pengaturan", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("marbot_user");
    router.push("/");
  };

  if (!user) return null;

  const currentTab = menuItems.find((item) => activeTab === item.id) || { name: "Dashboard" };

  const sidebarContent = (
    <>
      <div className="border-b border-[#F1F5F9] p-8">
        <Link href="/" className="flex items-center">
          <img src={LOGO_URL} alt="Marbot LMS" className="h-10 w-auto object-contain" />
        </Link>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-6">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left font-bold transition-all ${
                isActive
                  ? "bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/20"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </button>
          );
        })}

        <div className="mt-6 space-y-2 border-t border-[#F1F5F9] pt-6">
          <Link
            href="/"
            className="flex items-center space-x-3 rounded-xl px-4 py-3 font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
          >
            <ArrowLeftCircle size={20} />
            <span className="text-sm">Kembali ke Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left font-bold text-red-500 transition-all hover:bg-red-50"
          >
            <LogOut size={20} />
            <span className="text-sm">Keluar</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Desktop */}
      <aside className="fixed z-30 hidden h-full w-72 flex-col border-r border-[#E2E8F0] bg-white lg:flex">
        {sidebarContent}
      </aside>

      {/* Sidebar Mobile (Drawer) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          <div
            className="animate-fadeIn fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="animate-slideInLeft relative flex h-full w-72 flex-col bg-white shadow-2xl">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-[#64748B] hover:text-[#0F172A]">
                <X size={24} />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-1 flex-col lg:ml-72">
        {/* Topbar Internal */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 sm:px-6 md:h-20 md:px-10">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-[#64748B] hover:text-[#0F172A] lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="truncate text-lg font-extrabold text-[#0F172A] md:text-xl">{currentTab.name}</h2>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 rounded-xl p-1 transition-all hover:bg-[#F8FAFC] sm:space-x-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#14B8A6]/10 bg-[#F0FDFA] text-sm font-bold text-[#14B8A6] md:h-10 md:w-10">
                {user.name.charAt(0)}
              </div>
              <div className="hidden text-left sm:block">
                <div className="mb-0.5 text-xs leading-none font-extrabold text-[#0F172A]">{user.name}</div>
                <div className="text-[9px] font-bold tracking-wider text-[#14B8A6] uppercase">Peserta</div>
              </div>
              <ChevronDown
                size={16}
                className={`text-[#64748B] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setIsDropdownOpen(false)}></div>
                <div className="animate-fadeIn absolute right-0 z-50 mt-2 w-48 rounded-xl border border-[#E2E8F0] bg-white py-2 shadow-xl">
                  <button
                    onClick={() => {
                      setActiveTab("profil");
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center space-x-3 px-4 py-2.5 text-left text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
                  >
                    <UserIcon size={18} />
                    <span>Akun Saya</span>
                  </button>
                  <div className="mx-2 my-1 h-px bg-[#F1F5F9]"></div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center space-x-3 px-4 py-2.5 text-left text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span>Keluar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 p-4 sm:p-6 md:p-10">
          {activeTab === "ringkasan" && <Summary />}
          {activeTab === "kursus" && <MyCourses />}
          {activeTab === "agenda" && <MyAgendas />}
          {activeTab === "sertifikat" && <Certificates />}
          {activeTab === "profil" && <Profile user={user} />}
          {activeTab === "riwayat" && <LearningHistory />}
          {activeTab === "pengaturan" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

// --- Sub-components ---

const Summary = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    setEnrollments(JSON.parse(localStorage.getItem("marbot_enrollments") || "[]"));
    setCertificates(JSON.parse(localStorage.getItem("marbot_certificates") || "[]"));
    setRegistrations(JSON.parse(localStorage.getItem("marbot_agenda_registrations") || "[]"));
  }, []);

  const activeEnrollments = enrollments.filter((e) => e.status === "Aktif");

  const kpis = [
    {
      label: "Kursus Aktif",
      value: activeEnrollments.length.toString(),
      icon: <BookOpen className="text-[#14B8A6]" />,
    },
    { label: "Agenda", value: registrations.length.toString(), icon: <Calendar className="text-purple-500" /> },
    { label: "Sertifikat", value: certificates.length.toString(), icon: <Award className="text-amber-500" /> },
  ];

  const recommendations = MOCK_COURSES.slice(2, 5);

  const lastEnrollment = activeEnrollments[0];
  const lastCourse = lastEnrollment ? MOCK_COURSES.find((c) => c.id === lastEnrollment.courseId) : null;

  return (
    <div className="animate-fadeIn space-y-8 md:space-y-10">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.value}
            className="flex flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white p-4 text-center shadow-sm md:flex-row md:space-x-4 md:p-6 md:text-left"
          >
            <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC] md:mb-0 md:h-12 md:w-12">
              {kpi.icon}
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#0F172A] md:text-2xl">{kpi.value}</div>
              <div className="text-[9px] font-bold tracking-widest text-[#64748B] uppercase md:text-[10px]">
                {kpi.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lanjutkan Belajar */}
      {lastCourse ? (
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm md:p-8">
          <h3 className="mb-6 flex items-center text-lg font-bold text-[#0F172A]">
            <TrendingUp size={20} className="mr-2 text-[#14B8A6]" />
            Lanjutkan Belajar
          </h3>

          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl shadow-md md:w-64">
              <img src={lastCourse.thumbnail} className="h-full w-full object-cover" alt={lastCourse.title} />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="w-full flex-1">
              <div className="mb-2 text-[10px] font-bold tracking-[0.2em] text-[#14B8A6] uppercase">
                Sedang Berlangsung
              </div>
              <h4 className="mb-4 text-lg leading-snug font-extrabold text-[#0F172A] md:text-xl">{lastCourse.title}</h4>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#64748B]">Progress Belajar</span>
                  <span className="text-[10px] font-bold text-[#14B8A6]">{lastEnrollment.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                  <div
                    className="h-full rounded-full bg-[#14B8A6]"
                    style={{ width: `${lastEnrollment.progress}%` }}
                  ></div>
                </div>
              </div>

              <Link
                href={`/belajar/${lastCourse.id}`}
                className="inline-flex w-full items-center justify-center rounded-[10px] bg-[#14B8A6] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#0F766E] md:w-auto"
              >
                Lanjutkan Sekarang <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-[#E2E8F0] bg-white p-8 text-center md:p-12">
          <BookOpen className="mx-auto mb-4 text-[#CBD5E1]" size={48} />
          <p className="text-sm font-medium text-[#64748B]">Belum ada kursus yang sedang dipelajari.</p>
          <Link href="/katalog" className="mt-2 block text-sm font-bold text-[#14B8A6] hover:underline">
            Mulai Belajar Sekarang
          </Link>
        </div>
      )}

      {/* Rekomendasi */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="flex items-center text-lg font-bold text-[#0F172A]">
            <Target size={20} className="mr-2 text-[#14B8A6]" />
            Rekomendasi
          </h3>
          <Link href="/katalog" className="text-xs font-bold text-[#14B8A6] hover:underline">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("Aktif");
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    setEnrollments(JSON.parse(localStorage.getItem("marbot_enrollments") || "[]"));
  }, []);

  const filtered = enrollments
    .filter((e) => e.status === activeTab)
    .map((e) => ({
      ...e,
      data: MOCK_COURSES.find((c) => c.id === e.courseId),
    }))
    .filter((e) => e.data);

  return (
    <div className="animate-fadeIn space-y-8">
      <div>
        <div className="scrollbar-hide flex w-full space-x-2 overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-sm md:w-max">
          {["Aktif", "Selesai"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-[10px] px-6 py-1.5 text-sm font-bold whitespace-nowrap transition-all md:flex-none ${
                activeTab === tab ? "bg-[#14B8A6] text-white shadow-md" : "text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.courseId}
              className="group flex flex-col gap-6 rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:border-[#14B8A6] md:flex-row md:p-6"
            >
              <div className="aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl md:w-56">
                <img
                  src={item.data.thumbnail}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={item.data.title}
                />
              </div>
              <div className="flex w-full flex-1 flex-col justify-center">
                <div className="mb-2 flex items-center space-x-2 text-[10px] font-bold tracking-widest text-[#14B8A6] uppercase">
                  <span>{item.data.instructor.name}</span>
                </div>
                <h4 className="mb-4 text-lg leading-tight font-extrabold text-[#0F172A] transition-colors group-hover:text-[#14B8A6]">
                  {item.data.title}
                </h4>

                <div className="mb-6">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
                      {item.progress === 100 ? "Selesai" : `${item.progress}% Selesai`}
                    </span>
                    <span className="text-[10px] font-bold text-[#14B8A6]">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                    <div className="h-full bg-[#14B8A6]" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <Link
                    href={item.status === "Selesai" ? `/course/${item.courseId}` : `/belajar/${item.courseId}`}
                    className="flex w-full items-center justify-center rounded-lg border border-[#14B8A6] px-4 py-2 text-center text-xs font-bold text-[#14B8A6] transition-all hover:bg-[#14B8A6] hover:text-white sm:w-auto"
                  >
                    {item.status === "Selesai" ? "Lihat Detail" : "Lanjutkan Belajar"}{" "}
                    <ChevronRight size={14} className="ml-1" />
                  </Link>
                  {item.status === "Selesai" && (
                    <span className="inline-flex items-center rounded-lg border border-green-100 bg-green-50 px-3 py-1 text-[10px] font-bold text-green-600 uppercase">
                      <CheckCircle size={10} className="mr-1.5" /> Selesai
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center shadow-sm md:p-16">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#94A3B8]">
              <BookOpen size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#0F172A]">Belum Ada Kursus</h3>
            <p className="mb-8 text-sm text-[#64748B]">Anda belum memiliki kursus di kategori ini.</p>
            <Link
              href="/katalog"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#14B8A6] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 md:w-auto"
            >
              Cari Pembelajaran Sekarang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const MyAgendas = () => {
  const [activeTab, setActiveTab] = useState("Terdaftar");
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    setRegistrations(JSON.parse(localStorage.getItem("marbot_agenda_registrations") || "[]"));
  }, []);

  const filtered = registrations
    .filter((r) => r.status === activeTab)
    .map((r) => ({
      ...r,
      data: MOCK_AGENDA.find((a) => a.id === r.agendaId),
    }))
    .filter((r) => r.data);

  return (
    <div className="animate-fadeIn space-y-8">
      <div>
        <div className="scrollbar-hide flex w-full space-x-2 overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-sm md:w-max">
          {["Terdaftar", "Selesai"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-[10px] px-6 py-1.5 text-sm font-bold whitespace-nowrap transition-all md:flex-none ${
                activeTab === tab ? "bg-[#14B8A6] text-white shadow-md" : "text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-6 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:border-[#14B8A6] md:flex-row md:gap-8 md:p-6"
            >
              <div className="aspect-video w-full shrink-0 overflow-hidden rounded-xl shadow-sm md:w-56">
                <img src={item.data.cover} className="h-full w-full object-cover" alt={item.data.title} />
              </div>
              <div className="w-full flex-1">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span
                    className={`rounded-lg px-3 py-1 text-[9px] font-extrabold tracking-widest uppercase ${item.data.type === "Online" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}
                  >
                    {item.data.type}
                  </span>
                  <span className="rounded-lg bg-green-100 px-3 py-1 text-[9px] font-extrabold tracking-widest text-green-600 uppercase">
                    {item.status}
                  </span>
                </div>
                <h4 className="mb-4 text-lg leading-tight font-extrabold text-[#0F172A] md:text-xl">
                  {item.data.title}
                </h4>

                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mb-8">
                  <div className="flex items-center text-xs text-[#64748B]">
                    <Calendar size={14} className="mr-2 shrink-0 text-[#14B8A6]" />
                    <span className="font-medium">{item.data.date}</span>
                  </div>
                  <div className="flex items-center text-xs text-[#64748B]">
                    <Clock size={14} className="mr-2 shrink-0 text-[#14B8A6]" />
                    <span className="font-medium">{item.data.time} WIB</span>
                  </div>
                  <div className="flex items-center text-xs text-[#64748B] sm:col-span-2">
                    {item.data.type === "Online" ? (
                      <Globe size={14} className="mr-2 shrink-0 text-[#14B8A6]" />
                    ) : (
                      <MapPin size={14} className="mr-2 shrink-0 text-[#14B8A6]" />
                    )}
                    <span className="truncate font-medium">
                      {item.data.type === "Online" ? item.data.locationName : item.data.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {item.data.type === "Online" ? (
                    <a
                      href={item.data.location}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center rounded-xl bg-[#14B8A6] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
                    >
                      <Globe size={14} className="mr-2" /> Masuk Workshop
                    </a>
                  ) : (
                    <button className="flex flex-1 items-center justify-center rounded-xl bg-[#14B8A6] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]">
                      <Ticket size={14} className="mr-2" /> Lihat E-Tiket
                    </button>
                  )}
                  <Link
                    href={`/agenda/${item.data.slug}`}
                    className="flex flex-1 items-center justify-center rounded-xl border-2 border-[#E2E8F0] py-3.5 text-xs font-bold text-[#475569] transition-all hover:bg-[#F8FAFC]"
                  >
                    Detail Info
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center shadow-sm md:p-16">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#94A3B8]">
              <Calendar size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#0F172A]">Belum Ada Agenda</h3>
            <p className="mb-8 text-sm text-[#64748B]">Anda belum mendaftar di workshop mana pun.</p>
            <Link
              href="/agenda"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#14B8A6] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 md:w-auto"
            >
              Lihat Daftar Agenda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Certificates = () => {
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    setCertificates(JSON.parse(localStorage.getItem("marbot_certificates") || "[]"));
  }, []);

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="group rounded-2xl border border-t-4 border-[#E2E8F0] border-t-[#14B8A6] bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6] shadow-sm">
                <Award size={24} />
              </div>
              <h4 className="mb-2 line-clamp-2 leading-snug font-extrabold text-[#0F172A]">{cert.courseTitle}</h4>
              <div className="mb-8 space-y-2">
                <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Nomor Sertifikat</div>
                <div className="text-xs font-bold text-[#475569]">{cert.certNumber}</div>
                <div className="mt-4 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Diterbitkan</div>
                <div className="text-xs font-bold text-[#475569]">{cert.issueDate}</div>
              </div>
              <button className="flex w-full items-center justify-center rounded-xl bg-[#F8FAFC] py-3 text-xs font-bold text-[#14B8A6] transition-all hover:bg-[#14B8A6] hover:text-white">
                Unduh Sertifikat (PDF)
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-[#E2E8F0] bg-white p-16 text-center shadow-sm">
            <Award className="mx-auto mb-6 text-[#CBD5E1]" size={64} />
            <h3 className="mb-2 text-xl font-bold text-[#0F172A]">Belum Ada Sertifikat</h3>
            <p className="text-sm text-[#64748B]">Selesaikan kursus Anda untuk mendapatkan sertifikat resmi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Profile = ({ user }: { user: any }) => {
  return (
    <div className="animate-fadeIn max-w-2xl space-y-8">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
        <div className="mb-10 flex items-center space-x-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[#14B8A6]/10 bg-[#F0FDFA] text-3xl font-extrabold text-[#14B8A6] shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="mb-1 text-2xl font-extrabold text-[#0F172A]">{user.name}</h3>
            <p className="text-xs font-bold tracking-widest text-[#14B8A6] uppercase">Peserta Terdaftar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Nama Lengkap</label>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#0F172A]">
              {user.name}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Email</label>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#0F172A]">
              {user.email}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Role</label>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#0F172A] uppercase">
              {user.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LearningHistory = () => {
  return (
    <div className="animate-fadeIn rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
      <History className="mx-auto mb-6 text-[#CBD5E1]" size={64} />
      <h3 className="mb-2 text-xl font-bold text-[#0F172A]">Riwayat Pembelajaran</h3>
      <p className="text-sm text-[#64748B]">Fitur riwayat aktivitas sedang dikembangkan.</p>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="animate-fadeIn max-w-2xl space-y-8">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
        <h3 className="mb-6 flex items-center text-lg font-bold text-[#0F172A]">
          <Lock size={18} className="mr-2 text-[#14B8A6]" /> Keamanan Akun
        </h3>
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-xs font-bold text-[#475569]">Password Lama</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm outline-none focus:border-[#14B8A6]"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold text-[#475569]">Password Baru</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm outline-none focus:border-[#14B8A6]"
            />
          </div>
          <button className="w-full rounded-xl bg-[#14B8A6] py-4 font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]">
            Perbarui Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
