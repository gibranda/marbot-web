"use client";
import { Mail, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import { LOGO_URL } from "@/constants/constants";

const RegisterVerify: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] p-4">
      <div className="animate-fadeIn w-full max-w-md overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xl">
        <div className="border-b border-[#F1F5F9] p-8 text-center">
          <img src={LOGO_URL} alt="Marbot LMS" className="mx-auto mb-8 h-10 w-auto" />

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F0FDFA] text-[#14B8A6]">
            <Mail size={40} />
          </div>

          <h1 className="mb-3 text-2xl font-extrabold text-[#0F172A]">Cek email untuk verifikasi</h1>
          <p className="text-sm leading-relaxed text-[#64748B]">
            Kami telah mengirim tautan verifikasi ke email Anda. Silakan buka inbox (dan folder spam) untuk mengaktifkan
            akun.
          </p>
        </div>

        <div className="space-y-4 p-8">
          <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4 text-center">
            <p className="mb-2 text-xs font-bold tracking-widest text-[#94A3B8] uppercase">Belum menerima email?</p>
            <button className="mx-auto flex items-center justify-center text-sm font-bold text-[#14B8A6] transition-colors hover:text-[#0F766E]">
              <RefreshCw size={14} className="mr-2" /> Kirim ulang tautan
            </button>
          </div>

          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-xl border-2 border-[#E2E8F0] bg-white py-4 font-bold text-[#475569] transition-all hover:border-[#14B8A6] hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
          >
            <ArrowLeft size={18} className="mr-2" /> Kembali ke Masuk
          </Link>
        </div>
      </div>

      <p className="mt-8 text-sm text-[#94A3B8]">
        Butuh bantuan?{" "}
        <a href="#" className="font-bold text-[#14B8A6] hover:underline">
          Hubungi Support
        </a>
      </p>
    </div>
  );
};

export default RegisterVerify;
