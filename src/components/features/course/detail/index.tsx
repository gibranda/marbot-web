"use client";
import {
  Star,
  Clock,
  BookOpen,
  User,
  Calendar,
  CheckCircle,
  PlayCircle,
  Globe,
  Award,
  Shield,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { MOCK_COURSES } from "@/constants/constants";

const CourseDetail: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const course = MOCK_COURSES.find((c) => c.id === id) || MOCK_COURSES[0];

  const curriculum = [
    { title: "Pendahuluan", items: ["Visi & Misi Pengelola Masjid", "Pengenalan Dashboard Belajar"], duration: "15m" },
    {
      title: "Modul Utama: Kebersihan Area Utama",
      items: ["Teknik Sapu & Pel Efisien", "Merawat Karpet dari Debu & Bau", "Wewangian Masjid Alami"],
      duration: "45m",
    },
    {
      title: "Modul Lanjutan: Sanitasi Toilet & Tempat Wudhu",
      items: ["Standar Operasional Kamar Mandi", "Manajemen Sampah Harian"],
      duration: "30m",
    },
    {
      title: "Evaluasi & Sertifikasi",
      items: ["Kuis Akhir Modul", "Penugasan Praktis Foto Lapangan"],
      duration: "30m",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      rating: 5,
      date: "12 Jan 2026",
      comment: "Materinya sangat praktis dan mudah dipahami. Sangat membantu untuk pengelolaan masjid sehari-hari.",
    },
    {
      id: 2,
      name: "Siti Rahma",
      rating: 4,
      date: "5 Jan 2026",
      comment: "Penyampaiannya jelas dan aplikatif. Akan lebih bagus jika ditambah contoh studi kasus.",
    },
    {
      id: 3,
      name: "Budi Santoso",
      rating: 5,
      date: "2 Jan 2026",
      comment: "Kursus ini membuka wawasan baru tentang manajemen masjid yang rapi dan profesional.",
    },
  ];

  const handleEnrollClick = () => {
    const userStr = localStorage.getItem("marbot_user");

    if (!userStr) {
      // Redirect to login with returnTo
      const returnPath = course.price === "Gratis" ? `/belajar/${course.id}` : `/checkout/${course.id}`;
      router.push(`/login?returnTo=${encodeURIComponent(returnPath)}`);
      return;
    }

    // Logic for logged in user
    if (course.price === "Gratis") {
      // Enrollment happens automatically in player if needed, or we could set it here
      const enrollments = JSON.parse(localStorage.getItem("marbot_enrollments") || "[]");
      if (!enrollments.find((e: any) => e.courseId === course.id)) {
        enrollments.push({ courseId: course.id, progress: 0, status: "Aktif" });
        localStorage.setItem("marbot_enrollments", JSON.stringify(enrollments));
      }
      router.push(`/belajar/${course.id}`);
    } else {
      // Check if already purchased
      const purchases = JSON.parse(localStorage.getItem("marbot_purchases") || "[]");

      if (purchases.includes(course.id)) {
        router.push(`/belajar/${course.id}`);
      } else {
        router.push(`/checkout/${course.id}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            {/* Breadcrumb */}
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center space-x-2 text-xs font-bold tracking-widest text-[#64748B] uppercase">
              <Link href="/katalog" className="hover:text-[#14B8A6]">
                Pembelajaran
              </Link>
              <span>/</span>
              <span className="text-[#0F172A]">{course.category}</span>
            </div>

            <h1 className="mb-6 text-3xl leading-tight font-extrabold text-[#0F172A] md:text-5xl">{course.title}</h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#64748B]">{course.description}</p>

            <div className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0F172A]">{course.rating}</span>
                  <span className="text-[10px] font-medium text-[#64748B]">Rating Kursus</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <User size={20} className="text-[#14B8A6]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0F172A]">{course.students.toLocaleString()}</span>
                  <span className="text-[10px] font-medium text-[#64748B]">Peserta Aktif</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={20} className="text-[#14B8A6]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0F172A]">{course.lastUpdate}</span>
                  <span className="text-[10px] font-medium text-[#64748B]">Update Terakhir</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Globe size={20} className="text-[#14B8A6]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0F172A]">Indonesia</span>
                  <span className="text-[10px] font-medium text-[#64748B]">Bahasa Pengantar</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="scrollbar-hide mb-10 flex space-x-8 overflow-x-auto border-b border-[#E2E8F0]">
              {["Overview", "Kurikulum", "Pengajar", "Ulasan"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-4 text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'text-[#14B8A6] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#14B8A6] after:content-[""]'
                      : "text-[#64748B]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
              {activeTab === "Overview" && (
                <div className="animate-fadeIn space-y-8">
                  <div>
                    <h3 className="mb-4 text-xl font-bold text-[#0F172A]">Deskripsi Kursus</h3>
                    <p className="mb-4 leading-relaxed text-[#64748B]">
                      Kursus ini dirancang khusus untuk Anda yang ingin melakukan perubahan nyata pada kebersihan dan
                      kenyamanan masjid. Kami tidak hanya memberikan teori, tapi langkah-langkah praktis yang bisa
                      langsung Anda terapkan bersama tim takmir atau marbot lainnya.
                    </p>
                    <p className="leading-relaxed text-[#64748B]">
                      Sepanjang materi, kita akan membahas mengenai manajemen waktu pembersihan, pemilihan alat yang
                      efektif tapi hemat biaya, hingga strategi melibatkan jamaah dalam menjaga kebersihan masjid
                      bersama.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-bold text-[#0F172A]">Apa yang akan Anda pelajari?</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {[
                        "Standard Operating Procedure (SOP) harian masjid",
                        "Teknik pembersihan karpet agar wangi tahan lama",
                        "Manajemen sanitasi area wudhu and toilet",
                        "Cara mengelola stok alat and bahan pembersih",
                        "Teknik komunikasi persuasif kepada jamaah",
                        "Pembuatan checklist monitoring kebersihan",
                      ].map((item) => (
                        <div key={item} className="flex items-start space-x-3">
                          <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#14B8A6]" />
                          <span className="text-sm text-[#475569]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Kurikulum" && (
                <div className="animate-fadeIn space-y-4">
                  {curriculum.map((section) => (
                    <div key={section.title} className="overflow-hidden rounded-xl border border-[#F1F5F9]">
                      <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC] px-6 py-4">
                        <h4 className="font-bold text-[#0F172A]">{section.title}</h4>
                        <span className="text-xs font-bold text-[#64748B]">{section.duration}</span>
                      </div>
                      <div className="space-y-3 p-4">
                        {section.items.map((item) => (
                          <div
                            key={item}
                            className="group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-[#F0FDFA]"
                          >
                            <div className="flex items-center space-x-3">
                              <PlayCircle size={18} className="text-[#64748B] group-hover:text-[#14B8A6]" />
                              <span className="text-sm text-[#475569]">{item}</span>
                            </div>
                            <span className="text-xs text-[#94A3B8]">Video</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Pengajar" && (
                <div className="animate-fadeIn">
                  <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                    <Image
                      src={course.instructor.avatar}
                      className="rounded-xl object-cover"
                      alt={course.instructor.name}
                      width={128}
                      height={128}
                    />
                    <div>
                      <h3 className="mb-1 text-xl font-bold text-[#0F172A]">{course.instructor.name}</h3>
                      <p className="mb-4 text-sm font-bold tracking-widest text-[#14B8A6] uppercase">
                        {course.instructor.role}
                      </p>
                      <p className="mb-6 text-sm leading-relaxed text-[#64748B]">{course.instructor.bio}</p>
                      <div className="flex space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#0F172A]">
                            {course.instructor.totalStudents.toLocaleString()}
                          </div>
                          <div className="text-[10px] font-bold text-[#64748B] uppercase">Peserta</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#0F172A]">{course.instructor.totalCourses}</div>
                          <div className="text-[10px] font-bold text-[#64748B] uppercase">Kursus</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#0F172A]">{course.instructor.rating}</div>
                          <div className="text-[10px] font-bold text-[#64748B] uppercase">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Ulasan" && (
                <div className="animate-fadeIn space-y-8">
                  <div className="flex flex-col gap-4 border-b border-[#F1F5F9] pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="mb-1 flex items-center space-x-2">
                        <span className="text-2xl font-extrabold text-[#0F172A]">{course.rating}</span>
                        <div className="flex text-yellow-400">
                          <Star size={18} fill="currentColor" />
                          <Star size={18} fill="currentColor" />
                          <Star size={18} fill="currentColor" />
                          <Star size={18} fill="currentColor" />
                          <Star size={18} fill="currentColor" className="opacity-30" />
                        </div>
                      </div>
                      <p className="text-sm font-bold tracking-wider text-[#64748B] uppercase">
                        Berdasarkan {reviews.length} Ulasan Peserta
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.id} className="border-b border-[#F1F5F9] pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start space-x-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CCFBF1] bg-[#F0FDFA] font-bold text-[#14B8A6]">
                              {review.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <h4 className="truncate font-bold text-[#0F172A]">{review.name}</h4>
                                <span className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                                  {review.date}
                                </span>
                              </div>
                              <div className="mb-3 flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={_}
                                    size={14}
                                    fill={i < review.rating ? "currentColor" : "none"}
                                    className={i >= review.rating ? "text-[#E2E8F0]" : ""}
                                  />
                                ))}
                              </div>
                              <p className="text-sm leading-relaxed text-[#475569] italic">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-10 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F8FAFC] text-[#94A3B8]">
                          <MessageSquare size={32} />
                        </div>
                        <h4 className="mb-2 text-lg font-bold text-[#0F172A]">Belum ada ulasan</h4>
                        <p className="mb-6 text-sm text-[#64748B]">
                          Jadilah yang pertama memberikan ulasan untuk kursus ini.
                        </p>
                        <button className="rounded-xl border-2 border-[#14B8A6] px-6 py-2 text-sm font-bold text-[#14B8A6] transition-all hover:bg-[#F0FDFA]">
                          Selesaikan Kursus untuk Memberi Ulasan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-96">
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="overflow-hidden rounded-2xl border-2 border-[#14B8A6] bg-white shadow-2xl shadow-[#14B8A6]/10">
                <div className="relative aspect-video">
                  <Image
                    src={course.thumbnail}
                    className="object-cover"
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110">
                      <PlayCircle size={48} fill="currentColor" className="text-white" />
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-8 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-[#64748B] uppercase">Harga Kursus</span>
                      <div className="mt-1 text-3xl font-extrabold text-[#0F172A]">{course.price}</div>
                    </div>
                    {course.price !== "Gratis" && (
                      <span className="text-xs text-[#94A3B8] line-through">Rp 150.000</span>
                    )}
                  </div>

                  <button
                    onClick={handleEnrollClick}
                    className="mb-8 w-full rounded-xl bg-[#14B8A6] py-5 font-bold text-white shadow-lg shadow-[#14B8A6]/30 transition-all hover:bg-[#0F766E]"
                  >
                    {course.price === "Gratis" ? "Mulai Kursus Sekarang" : "Beli Kursus"}
                  </button>

                  <div className="space-y-4">
                    <h5 className="text-sm font-bold text-[#0F172A]">Termasuk Dalam Kursus:</h5>
                    <ul className="space-y-3">
                      {[
                        { icon: <Clock size={16} />, text: `${course.duration} Total Pembelajaran` },
                        { icon: <BookOpen size={16} />, text: `${course.modules} Modul Pelatihan` },
                        { icon: <Award size={16} />, text: "Sertifikat Penyelesaian" },
                        { icon: <Shield size={16} />, text: "Akses Selamanya" },
                        { icon: <Globe size={16} />, text: "Akses di Mobile & Web" },
                      ].map((item) => (
                        <li key={item.text} className="flex items-center space-x-3 text-sm text-[#475569]">
                          <span className="text-[#14B8A6]">{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Share Card */}
              <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-white p-6">
                <span className="text-sm font-bold text-[#0F172A]">Bagikan ke Takmir Lain</span>
                <div className="flex space-x-2">
                  <button className="rounded-lg bg-[#F1F5F9] p-2 text-[#64748B] transition-colors hover:text-[#14B8A6]">
                    <LinkIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Floating CTA */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#E2E8F0] bg-white/80 p-4 backdrop-blur-lg lg:hidden">
        <button
          onClick={handleEnrollClick}
          className="w-full rounded-xl bg-[#14B8A6] py-4 font-bold text-white shadow-lg shadow-[#14B8A6]/30"
        >
          {course.price === "Gratis" ? "Mulai Kursus" : `Beli Kursus - ${course.price}`}
        </button>
      </div>
    </div>
  );
};

const LinkIcon = ({ size = 16 }: { size?: number }) => (
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
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export default CourseDetail;
