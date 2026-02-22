"use client";

import { ArrowRight, Award, BookOpen, Calendar, Target, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import CourseCard from "@/components/common/CourseCard";
import { MOCK_COURSES } from "@/constants/constants";

interface EnrollmentData {
  id: string;
  courseId: string;
  status: string;
  progress: number;
}

interface CertificateData {
  id: string;
  courseTitle: string;
  certNumber: string;
  issueDate: string;
}

interface RegistrationData {
  id: string;
  agendaId: string;
  status: string;
  dateRegistered: string;
  isPaid: boolean;
}

export default function Summary() {
  const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setEnrollments(JSON.parse(localStorage.getItem("marbot_enrollments") || "[]"));
      setCertificates(JSON.parse(localStorage.getItem("marbot_certificates") || "[]"));
      setRegistrations(JSON.parse(localStorage.getItem("marbot_agenda_registrations") || "[]"));
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) return null;

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
            key={kpi.label}
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
              <Image
                src={lastCourse.thumbnail}
                width={256}
                height={144}
                className="h-full w-full object-cover"
                alt={lastCourse.title}
              />
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
}
