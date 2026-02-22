"use client";

import { BookOpen, CheckCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MOCK_COURSES } from "@/constants/constants";

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState("Aktif");
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setEnrollments(JSON.parse(localStorage.getItem("marbot_enrollments") || "[]"));
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) return null;

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
                <Image
                  src={item.data.thumbnail}
                  alt={item.data.title}
                  width={224}
                  height={140}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
}
