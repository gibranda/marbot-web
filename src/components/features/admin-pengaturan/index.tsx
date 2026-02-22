"use client";

import { Globe, Save, ShieldCheck, Wallet } from "lucide-react";
import React from "react";

const AdminPengaturan: React.FC = () => {
  return (
    <div className="animate-fadeIn max-w-4xl space-y-10">
      <div>
        <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Pengaturan Sistem</h1>
        <p className="text-sm text-[#64748B]">Konfigurasi dasar platform Marbot LMS.</p>
      </div>

      <div className="space-y-8">
        {/* Platform Info */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <h3 className="mb-6 flex items-center font-extrabold text-[#0F172A]">
            <Globe size={18} className="mr-2 text-[#14B8A6]" />
            Informasi Platform
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569]">Nama Platform</label>
              <input
                type="text"
                value="Marbot LMS"
                readOnly
                className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569]">Tagline</label>
              <input
                type="text"
                value="Solusi Belajar Manajemen Masjid"
                readOnly
                className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569]">Email Support</label>
              <input
                type="text"
                placeholder="bantuan@marbot.id"
                className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
              />
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <h3 className="mb-6 flex items-center font-extrabold text-[#0F172A]">
            <Wallet size={18} className="mr-2 text-[#14B8A6]" />
            Metode Pembayaran
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <span className="text-sm font-bold text-[#475569]">Bank Transfer (Manual)</span>
              <div className="relative h-5 w-10 cursor-pointer rounded-full bg-[#14B8A6]">
                <div className="absolute top-1 right-1 h-3 w-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <span className="text-sm font-bold text-[#475569]">E-Wallet (Midtrans)</span>
              <div className="relative h-5 w-10 cursor-pointer rounded-full bg-[#E2E8F0]">
                <div className="absolute top-1 left-1 h-3 w-3 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <h3 className="mb-6 flex items-center font-extrabold text-[#0F172A]">
            <ShieldCheck size={18} className="mr-2 text-[#14B8A6]" />
            Keamanan
          </h3>
          <div className="space-y-6">
            <button className="text-sm font-bold text-[#14B8A6] hover:underline">Ganti Password Admin</button>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked
                readOnly
                className="h-4 w-4 rounded-[6px] text-[#14B8A6] focus:ring-[#14B8A6]"
              />
              <span className="text-xs text-[#64748B]">Wajibkan 2FA untuk Admin</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="flex items-center rounded-xl bg-[#14B8A6] px-10 py-4 font-bold text-white shadow-xl shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]">
            <Save size={18} className="mr-2" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPengaturan;
