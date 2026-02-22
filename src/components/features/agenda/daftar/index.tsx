"use client";

import {
  ArrowLeft,
  Building,
  Calendar,
  CreditCard,
  ChevronRight,
  Mail,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

// Added missing 'Calendar' icon to the lucide-react imports
import { MOCK_AGENDA } from "@/constants/constants";

interface UserData {
  name: string;
  email: string;
}

interface RegistrationData {
  id: string;
  agendaId: string;
  status: string;
  dateRegistered: string;
  isPaid: boolean;
}

const AgendaCheckout: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const agenda = MOCK_AGENDA.find((a) => a.slug === slug) || MOCK_AGENDA[0];
  const [user] = useState<UserData | null>(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("marbot_user");
      if (userStr) {
        return JSON.parse(userStr);
      }
    }
    return null;
  });

  const handlePayment = () => {
    // Save registration to dummy storage
    const registrations: RegistrationData[] = JSON.parse(localStorage.getItem("marbot_agenda_registrations") || "[]");
    if (!registrations.find((r) => r.agendaId === agenda.id)) {
      registrations.push({
        id: `reg-${Date.now()}`,
        agendaId: agenda.id,
        status: "Terdaftar",
        dateRegistered: new Date().toLocaleDateString("id-ID"),
        isPaid: agenda.price !== "Gratis",
      });
      localStorage.setItem("marbot_agenda_registrations", JSON.stringify(registrations));
    }
    router.push(`/agenda/${agenda.slug}/daftar/sukses`);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="group tap-target flex items-center text-sm font-bold text-[#64748B] transition-colors hover:text-[#14B8A6]"
          >
            <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Kembali ke Detail Agenda
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Panel */}
          <div className="space-y-8 lg:col-span-2">
            <h1 className="text-3xl font-extrabold text-[#0F172A]">Pendaftaran Workshop</h1>

            {/* User Data Card */}
            <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
                <h3 className="font-bold text-[#0F172A]">Informasi Peserta</h3>
                <button className="text-xs font-bold text-[#14B8A6] hover:underline">Ubah Data</button>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6]">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Nama Lengkap</div>
                      <div className="text-sm font-bold text-[#0F172A]">{user.name}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6]">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Alamat Email</div>
                      <div className="text-sm font-bold text-[#0F172A]">{user.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
              <div className="border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
                <h3 className="font-bold text-[#0F172A]">Ringkasan Agenda</h3>
              </div>
              <div className="p-8">
                <div className="flex flex-col items-start gap-8 md:flex-row">
                  <div className="aspect-video w-full shrink-0 overflow-hidden rounded-xl shadow-md md:w-48">
                    <Image
                      src={agenda.cover}
                      alt={agenda.title}
                      width={192}
                      height={108}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2 text-xl leading-tight font-extrabold text-[#0F172A]">{agenda.title}</h4>
                    <div className="mb-6 flex items-center space-x-4 text-sm text-[#64748B]">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1.5 text-[#14B8A6]" /> {agenda.date}
                      </span>
                      <span className="flex items-center">
                        <Building size={14} className="mr-1.5 text-[#14B8A6]" /> {agenda.type}
                      </span>
                    </div>

                    <div className="space-y-3 border-t border-[#F1F5F9] pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-[#475569]">Biaya Registrasi</span>
                        <span className="font-bold text-[#0F172A]">{agenda.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-[#475569]">Pajak & Biaya Admin</span>
                        <span className="font-bold text-[#14B8A6]">Rp 0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods (Berbayar Only) */}
            {agenda.price !== "Gratis" && (
              <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                <div className="border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
                  <h3 className="font-bold text-[#0F172A]">Metode Pembayaran</h3>
                </div>
                <div className="space-y-4 p-8">
                  {[
                    { id: "qris", name: "QRIS / E-Wallet", icon: <Smartphone className="text-[#14B8A6]" /> },
                    {
                      id: "va",
                      name: "Virtual Account (Bank Transfer)",
                      icon: <Building className="text-[#14B8A6]" />,
                    },
                    { id: "cc", name: "Kartu Kredit / Debit", icon: <CreditCard className="text-[#14B8A6]" /> },
                  ].map((method, idx) => (
                    <label
                      key={method.id}
                      className="group flex cursor-pointer items-center justify-between rounded-xl border-2 border-[#E2E8F0] p-4 transition-all hover:border-[#14B8A6]"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0FDFA]">
                          {method.icon}
                        </div>
                        <span className="font-bold text-[#0F172A] group-hover:text-[#14B8A6]">{method.name}</span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={idx === 0}
                        className="h-5 w-5 text-[#14B8A6] focus:ring-[#14B8A6]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Total */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 rounded-2xl border-2 border-[#E2E8F0] bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-[#0F172A]">Total Pembayaran</h3>
              <div
                className={`mb-8 text-4xl font-extrabold ${agenda.price === "Gratis" ? "text-[#14B8A6]" : "text-[#0F172A]"}`}
              >
                {agenda.price}
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex items-start space-x-2 text-xs text-[#64748B]">
                  <ShieldCheck size={16} className="shrink-0 text-[#14B8A6]" />
                  <span>Data Anda aman and terenkripsi sesuai standar privasi Marbot LMS.</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="tap-target flex w-full items-center justify-center rounded-xl bg-[#14B8A6] py-5 font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
              >
                {agenda.price === "Gratis" ? "Konfirmasi Pendaftaran" : "Bayar Sekarang"}{" "}
                <ChevronRight size={18} className="ml-2" />
              </button>

              <button
                onClick={() => router.back()}
                className="tap-target mt-4 w-full py-3 text-sm font-bold text-[#64748B] transition-colors hover:text-[#0F172A]"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaCheckout;
