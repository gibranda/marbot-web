"use client";

import { ArrowRight, CheckCircle2, Home, Ticket } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { MOCK_AGENDA } from "@/constants/constants";

const AgendaSuccess: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const agenda = MOCK_AGENDA.find((a) => a.slug === slug) || MOCK_AGENDA[0];

  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-24">
      <div className="w-full max-w-2xl px-6 text-center">
        <div className="mx-auto mb-10 flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-[#F0FDFA]">
          <CheckCircle2 size={48} className="text-[#14B8A6]" />
        </div>

        <h1 className="mb-4 text-3xl font-extrabold text-[#0F172A] md:text-5xl">Pendaftaran Berhasil!</h1>
        <p className="mb-12 text-lg text-[#64748B] md:text-xl">
          Anda telah terdaftar di workshop <strong>&quot;{agenda.title}&quot;</strong>. Tiket and detail agenda sudah
          dikirim ke email Anda.
        </p>

        <div className="mb-12 space-y-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 text-left">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
            <span className="text-sm font-medium text-[#64748B]">Tanggal</span>
            <span className="text-sm font-bold text-[#0F172A]">{agenda.date}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
            <span className="text-sm font-medium text-[#64748B]">Waktu</span>
            <span className="text-sm font-bold text-[#0F172A]">{agenda.time} WIB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#64748B]">Jenis</span>
            <span
              className={`rounded-lg px-3 py-1 text-[10px] font-extrabold uppercase ${agenda.type === "Online" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}
            >
              {agenda.type}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/akun/agenda"
            className="tap-target flex items-center justify-center rounded-xl bg-[#14B8A6] px-10 py-5 font-bold text-white shadow-lg shadow-[#14B8A6]/30 transition-all hover:bg-[#0F766E]"
          >
            Lihat Tiket & Agenda Saya <Ticket size={20} className="ml-2" />
          </Link>
          <Link
            href="/agenda"
            className="tap-target flex items-center justify-center rounded-xl border-2 border-[#E2E8F0] px-10 py-5 font-bold text-[#0F172A] transition-all hover:border-[#14B8A6]"
          >
            Kembali ke Daftar Agenda <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>

        <div className="mt-20 border-t border-[#F1F5F9] pt-12">
          <Link href="/" className="flex items-center justify-center text-sm font-bold text-[#14B8A6] hover:underline">
            <Home size={16} className="mr-2" /> Beranda Marbot LMS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgendaSuccess;
