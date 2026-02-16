"use client";
import { ArrowLeft, Star, Users, BookOpen, MapPin, Globe, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import CourseCard from "@/components/common/CourseCard";
import { MOCK_INSTRUCTORS, MOCK_COURSES } from "@/constants/constants";

const InstructorProfile: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const instructor = MOCK_INSTRUCTORS.find((ins) => ins.id === id) || MOCK_INSTRUCTORS[0];

  // Filter courses by this instructor
  const instructorCourses = MOCK_COURSES.filter((course) => course.instructor.id === instructor.id);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Back Button */}
        <Link
          href="/pengajar"
          className="group tap-target mb-8 inline-flex items-center space-x-2 text-sm font-bold text-[#64748B] transition-colors hover:text-[#14B8A6]"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Daftar Pengajar</span>
        </Link>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Sidebar Profil */}
          <aside className="w-full shrink-0 lg:w-96">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-sm sm:p-8">
              <div className="relative mx-auto mb-6 h-32 w-32 sm:h-40 sm:w-40">
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  fill
                  className="rounded-xl object-cover shadow-xl"
                  sizes="(max-width: 640px) 128px, 160px"
                />
              </div>
              <h1 className="mb-2 text-xl font-extrabold text-[#0F172A] sm:text-2xl">{instructor.name}</h1>
              <div className="mb-8 inline-flex rounded-full bg-[#F0FDFA] px-4 py-1.5">
                <span className="text-[10px] font-extrabold tracking-wider text-[#0F766E] uppercase sm:text-xs">
                  {instructor.role}
                </span>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#F8FAFC] p-4">
                  <div className="text-lg font-extrabold text-[#0F172A]">{instructor.rating}</div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Rating</div>
                </div>
                <div className="rounded-xl bg-[#F8FAFC] p-4">
                  <div className="text-lg font-extrabold text-[#0F172A]">
                    {instructor.totalStudents.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Peserta</div>
                </div>
              </div>

              <div className="space-y-4 border-t border-[#F1F5F9] pt-8 text-left">
                <div className="flex items-center space-x-3 text-[#64748B]">
                  <MapPin size={18} className="shrink-0 text-[#14B8A6]" />
                  <span className="truncate text-sm font-medium">{instructor.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-[#64748B]">
                  <Globe size={18} className="shrink-0 text-[#14B8A6]" />
                  <span className="truncate text-sm font-medium">www.marbot.id/{instructor.id}</span>
                </div>
              </div>

              <button className="tap-target mt-10 flex w-full items-center justify-center space-x-2 rounded-xl bg-[#14B8A6] py-4 font-bold text-white transition-all hover:bg-[#0F766E]">
                <Share2 size={18} />
                <span>Bagikan Profil</span>
              </button>
            </div>
          </aside>

          {/* Konten Utama */}
          <main className="min-w-0 flex-1">
            <div className="mb-12 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8 md:p-12">
              <h2 className="mb-6 text-xl font-extrabold text-[#0F172A] sm:text-2xl">Tentang Pengajar</h2>
              <p className="mb-8 text-sm leading-relaxed text-[#64748B] sm:text-lg">
                {instructor.bio} {instructor.bio} {instructor.bio}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                {[
                  { icon: <Star className="text-yellow-400" />, label: "Review Positif", value: "450+" },
                  { icon: <Users className="text-[#14B8A6]" />, label: "Masjid Terbantu", value: "120+" },
                  {
                    icon: <BookOpen className="text-[#14B8A6]" />,
                    label: "Materi Praktis",
                    value: instructor.totalCourses.toString(),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-3 rounded-xl bg-[#F8FAFC] p-4">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-[#0F172A]">{item.value}</div>
                      <div className="text-[10px] font-bold text-[#64748B] uppercase">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-8 text-xl font-extrabold text-[#0F172A] sm:text-2xl">Kursus Oleh {instructor.name}</h2>
              {instructorCourses.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
                  {instructorCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center text-[#64748B]">
                  Belum ada kursus yang diterbitkan oleh pengajar ini.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
