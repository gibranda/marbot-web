
import React from 'react';
import { Save, Globe, Mail, ShieldCheck, Wallet, BellRing } from 'lucide-react';

const AdminPengaturan: React.FC = () => {
  return (
    <div className="space-y-10 animate-fadeIn max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Pengaturan Sistem</h1>
        <p className="text-sm text-[#64748B]">Konfigurasi dasar platform Marbot LMS.</p>
      </div>

      <div className="space-y-8">
        {/* Platform Info */}
        <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <h3 className="font-extrabold text-[#0F172A] mb-6 flex items-center">
            <Globe size={18} className="mr-2 text-[#14B8A6]" />
            Informasi Platform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569]">Nama Platform</label>
              <input type="text" value="Marbot LMS" readOnly className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569]">Tagline</label>
              <input type="text" value="Solusi Belajar Manajemen Masjid" readOnly className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569]">Email Support</label>
              <input type="text" placeholder="bantuan@marbot.id" className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none" />
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <h3 className="font-extrabold text-[#0F172A] mb-6 flex items-center">
            <Wallet size={18} className="mr-2 text-[#14B8A6]" />
            Metode Pembayaran
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <span className="text-sm font-bold text-[#475569]">Bank Transfer (Manual)</span>
              <div className="w-10 h-5 bg-[#14B8A6] rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <span className="text-sm font-bold text-[#475569]">E-Wallet (Midtrans)</span>
              <div className="w-10 h-5 bg-[#E2E8F0] rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <h3 className="font-extrabold text-[#0F172A] mb-6 flex items-center">
            <ShieldCheck size={18} className="mr-2 text-[#14B8A6]" />
            Keamanan
          </h3>
          <div className="space-y-6">
             <button className="text-sm font-bold text-[#14B8A6] hover:underline">Ganti Password Admin</button>
             <div className="flex items-center space-x-3">
               <input type="checkbox" checked readOnly className="w-4 h-4 rounded-[6px] text-[#14B8A6] focus:ring-[#14B8A6]" />
               <span className="text-xs text-[#64748B]">Wajibkan 2FA untuk Admin</span>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="px-10 py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-xl shadow-[#14B8A6]/20 transition-all flex items-center">
            <Save size={18} className="mr-2" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPengaturan;
