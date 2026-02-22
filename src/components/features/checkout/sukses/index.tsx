"use client";

import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import { MOCK_COURSES } from "@/constants/constants";

interface EnrollmentData {
  courseId: string;
  progress: number;
  status: string;
}

const CheckoutSuccess: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const course = MOCK_COURSES.find((c) => c.id === id) || MOCK_COURSES[0];

  useEffect(() => {
    // Record purchase & enrollment in dummy storage
    const purchases = JSON.parse(localStorage.getItem("marbot_purchases") || "[]");
    if (!purchases.includes(course.id)) {
      purchases.push(course.id);
      localStorage.setItem("marbot_purchases", JSON.stringify(purchases));
    }

    const enrollments: EnrollmentData[] = JSON.parse(localStorage.getItem("marbot_enrollments") || "[]");
    if (!enrollments.find((e) => e.courseId === course.id)) {
      enrollments.push({ courseId: course.id, progress: 0, status: "Aktif" });
      localStorage.setItem("marbot_enrollments", JSON.stringify(enrollments));
    }
  }, [course.id]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-24">
      <div className="w-full max-w-xl px-4 text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-[#F0FDFA]">
          <CheckCircle2 size={48} className="text-[#14B8A6]" />
        </div>

        <h1 className="mb-4 text-3xl font-extrabold text-[#0F172A] md:text-4xl">Pembayaran Berhasil!</h1>
        <p className="mb-12 text-lg text-[#64748B]">
          Terima kasih. Akses kursus <strong>&quot;{course.title}&quot;</strong> Anda sudah aktif. Anda bisa mulai
          belajar sekarang.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={`/belajar/${course.id}`}
            className="flex items-center justify-center rounded-xl bg-[#14B8A6] px-10 py-4 font-bold text-white shadow-lg shadow-[#14B8A6]/30 transition-all hover:bg-[#0F766E]"
          >
            Mulai Belajar Sekarang <PlayCircle size={20} className="ml-2" />
          </Link>
          <Link
            href="/akun/kursus"
            className="flex items-center justify-center rounded-xl border-2 border-[#E2E8F0] px-10 py-4 font-bold text-[#0F172A] transition-all hover:border-[#14B8A6]"
          >
            Lihat Kursus Saya <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>

        <div className="mt-16 border-t border-[#F1F5F9] pt-12">
          <Link href="/katalog" className="text-sm font-bold text-[#14B8A6] hover:underline">
            Cari Kursus Lainnya
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
