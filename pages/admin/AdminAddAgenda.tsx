
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Info,
  ExternalLink,
  ChevronDown,
  Monitor,
  Globe,
  MapPin,
  Calendar,
  Clock,
  Users
} from 'lucide-react';

const AdminAddAgenda: React.FC = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'Online' | 'Offline'>('Online');
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm font-bold text-[#64748B] hover:text-[#14B8A6] transition-colors mb-2 group"
          >
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Buat Agenda Baru</h1>
          <p className="text-sm text-[#64748B]">Tambahkan jadwal workshop online atau offline masjid.</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => navigate(-1)} className="px-6 py-2.5 border-2 border-[#E2E8F0] text-[#475569] text-sm font-bold rounded-xl hover:bg-[#F8FAFC] transition-all">
            Batal
          </button>
          <button className="px-10 py-2.5 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center">
            <Save size={18} className="mr-2" />
            Publish Agenda
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Informasi Dasar */}
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Info size={20} className="mr-2 text-[#14B8A6]" />
              Detail Agenda
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Judul Agenda / Workshop</label>
                <input type="text" placeholder="Contoh: Workshop Manajemen Marbot Modern" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Tipe Agenda</label>
                   <div className="flex p-1 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                      <button 
                        onClick={() => setType('Online')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${type === 'Online' ? 'bg-[#14B8A6] text-white shadow-md' : 'text-[#64748B]'}`}
                      >
                         <Globe size={14} className="inline mr-2" /> Online
                      </button>
                      <button 
                        onClick={() => setType('Offline')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${type === 'Offline' ? 'bg-[#14B8A6] text-white shadow-md' : 'text-[#64748B]'}`}
                      >
                         <MapPin size={14} className="inline mr-2" /> Offline
                      </button>
                   </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Nama Narasumber</label>
                  <input type="text" placeholder="Nama Narasumber" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Tanggal</label>
                   <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                      <input type="text" placeholder="20 Feb 2026" className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Mulai</label>
                      <input type="text" placeholder="08:00" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                   </div>
                   <div>
                      <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Selesai</label>
                      <input type="text" placeholder="12:00" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                   </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">{type === 'Online' ? 'Link Platform (Zoom/GMeet)' : 'Alamat Lengkap Lokasi'}</label>
                <input type="text" placeholder={type === 'Online' ? 'https://zoom.us/...' : 'Jl. Masjid No. 123...'} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
              </div>

              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Deskripsi Agenda</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* 2. Kapasitas & Biaya */}
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Users size={20} className="mr-2 text-[#14B8A6]" />
              Kapasitas & Biaya
            </h3>
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Kuota Peserta</label>
                    <input type="number" placeholder="Contoh: 100" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Jenis Biaya</label>
                    <div className="flex p-1 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                       <button 
                        onClick={() => setIsPaid(false)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${!isPaid ? 'bg-[#14B8A6] text-white shadow-md' : 'text-[#64748B]'}`}
                      >
                         Gratis
                      </button>
                      <button 
                        onClick={() => setIsPaid(true)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${isPaid ? 'bg-[#14B8A6] text-white shadow-md' : 'text-[#64748B]'}`}
                      >
                         Berbayar
                      </button>
                   </div>
                  </div>
               </div>
               
               {isPaid && (
                 <div className="animate-slideInDown">
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Harga Tiket (Rp)</label>
                    <input type="text" placeholder="50.000" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-bold" />
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm sticky top-28">
              <h4 className="text-xs font-extrabold text-[#0F172A] mb-6 uppercase tracking-widest">Cover Agenda</h4>
              <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl aspect-video bg-[#F8FAFC] flex flex-col items-center justify-center text-[#94A3B8] hover:border-[#14B8A6] hover:bg-[#F0FDFA] cursor-pointer transition-all mb-6">
                 <Upload size={24} className="mb-2" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Upload Cover</span>
              </div>
              <div className="pt-6 border-t border-[#F1F5F9] space-y-4">
                 <button className="w-full py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-xl shadow-[#14B8A6]/20 transition-all flex items-center justify-center text-sm">
                    <Save size={18} className="mr-2" /> Publish Agenda
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddAgenda;
