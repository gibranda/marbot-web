import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, RefreshCw, ArrowLeft } from 'lucide-react';
import { LOGO_URL } from '../constants';

const RegisterVerify: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-xl overflow-hidden animate-fadeIn">
        <div className="p-8 text-center border-b border-[#F1F5F9]">
          <img src={LOGO_URL} alt="Marbot LMS" className="h-10 w-auto mx-auto mb-8" />
          
          <div className="w-20 h-20 bg-[#F0FDFA] rounded-full flex items-center justify-center mx-auto mb-6 text-[#14B8A6]">
            <Mail size={40} />
          </div>
          
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-3">Cek email untuk verifikasi</h1>
          <p className="text-[#64748B] text-sm leading-relaxed">
            Kami telah mengirim tautan verifikasi ke email Anda. Silakan buka inbox (dan folder spam) untuk mengaktifkan akun.
          </p>
        </div>
        
        <div className="p-8 space-y-4">
          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#F1F5F9] text-center">
            <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Belum menerima email?</p>
            <button className="text-sm font-bold text-[#14B8A6] hover:text-[#0F766E] transition-colors flex items-center justify-center mx-auto">
              <RefreshCw size={14} className="mr-2" /> Kirim ulang tautan
            </button>
          </div>
          
          <Link 
            to="/login" 
            className="w-full py-4 bg-white border-2 border-[#E2E8F0] text-[#475569] font-bold rounded-xl hover:bg-[#F8FAFC] hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all flex items-center justify-center"
          >
            <ArrowLeft size={18} className="mr-2" /> Kembali ke Masuk
          </Link>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-[#94A3B8]">
        Butuh bantuan? <a href="#" className="font-bold text-[#14B8A6] hover:underline">Hubungi Support</a>
      </p>
    </div>
  );
};

export default RegisterVerify;