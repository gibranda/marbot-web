"use client";

import { Lock } from "lucide-react";

export default function SettingsPage() {
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
}
