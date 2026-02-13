
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Ticket, ArrowRight, Home } from 'lucide-react';
import { MOCK_AGENDA } from '../../constants';

const AgendaSuccess: React.FC = () => {
  const { slug } = useParams();
  const agenda = MOCK_AGENDA.find(a => a.slug === slug) || MOCK_AGENDA[0];

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-24">
      <div className="max-w-2xl w-full px-6 text-center">
        <div className="w-24 h-24 bg-[#F0FDFA] rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
          <CheckCircle2 size={48} className="text-[#14B8A6]" />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4">Pendaftaran Berhasil!</h1>
        <p className="text-[#64748B] text-lg md:text-xl mb-12">
          Anda telah terdaftar di workshop <strong>"{agenda.title}"</strong>. Tiket and detail agenda sudah dikirim ke email Anda.
        </p>

        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-2xl mb-12 text-left space-y-4">
           <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9]">
              <span className="text-sm font-medium text-[#64748B]">Tanggal</span>
              <span className="text-sm font-bold text-[#0F172A]">{agenda.date}</span>
           </div>
           <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9]">
              <span className="text-sm font-medium text-[#64748B]">Waktu</span>
              <span className="text-sm font-bold text-[#0F172A]">{agenda.time} WIB</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#64748B]">Jenis</span>
              <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-lg ${agenda.type === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>{agenda.type}</span>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/akun/agenda" 
            className="px-10 py-5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/30 transition-all flex items-center justify-center tap-target"
          >
            Lihat Tiket & Agenda Saya <Ticket size={20} className="ml-2" />
          </Link>
          <Link 
            to="/agenda" 
            className="px-10 py-5 border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-xl hover:border-[#14B8A6] transition-all flex items-center justify-center tap-target"
          >
            Kembali ke Daftar Agenda <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>

        <div className="mt-20 pt-12 border-t border-[#F1F5F9]">
          <Link to="/" className="text-sm font-bold text-[#14B8A6] hover:underline flex items-center justify-center">
            <Home size={16} className="mr-2" /> Beranda Marbot LMS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgendaSuccess;
