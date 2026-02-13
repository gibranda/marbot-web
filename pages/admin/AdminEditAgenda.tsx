
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Info,
  ChevronDown,
  Globe,
  MapPin,
  Calendar,
  Clock,
  Users
} from 'lucide-react';
import { MOCK_AGENDA } from '../../constants';

const AdminEditAgenda: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const agenda = MOCK_AGENDA.find(a => a.slug === slug) || MOCK_AGENDA[0];

  const [type, setType] = useState<'Online' | 'Offline'>(agenda.type);
  const [isPaid, setIsPaid] = useState(agenda.priceNum > 0);

  useEffect(() => {
    setType(agenda.type);
    setIsPaid(agenda.priceNum > 0);
  }, [agenda]);

  const handleSave = () => {
    navigate('/admin/agenda');
  };

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
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Edit Agenda</h1>
          <p className="text-sm text-[#64748B]">Perbarui jadwal workshop <span className="font-bold text-[#0F172A]">"{agenda.title}"</span></p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleSave} className="px-10 py-2.5 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center">
            <Save size={18} className="mr-2" />
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Info size={20} className="mr-2 text-[#14B8A6]" />
              Detail Agenda
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Judul Agenda / Workshop</label>
                <input type="text" defaultValue={agenda.title} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Tipe Agenda</label>
                   <div className="flex p-1 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                      <button onClick={() => setType('Online')} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${type === 'Online' ? 'bg-[#14B8A6] text-white shadow-md' : 'text-[#64748B]'}`}>
                         <Globe size={14} className="inline mr-2" /> Online
                      </button>
                      <button onClick={() => setType('Offline')} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${type === 'Offline' ? 'bg-[#14B8A6] text-white shadow-md' : 'text-[#64748B]'}`}>
                         <MapPin size={14} className="inline mr-2" /> Offline
                      </button>
                   </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Nama Narasumber</label>
                  <input type="text" defaultValue={agenda.narasumber} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Tanggal</label>
                   <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                      <input type="text" defaultValue={agenda.date} className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Mulai</label>
                      <input type="text" defaultValue={agenda.time} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                   </div>
                   <div>
                      <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Selesai</label>
                      <input type="text" defaultValue={agenda.endTime} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                   </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">{type === 'Online' ? 'Link Platform' : 'Alamat Lokasi'}</label>
                <input type="text" defaultValue={agenda.location} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm sticky top-28">
              <h4 className="text-xs font-extrabold text-[#0F172A] mb-6 uppercase tracking-widest">Cover Agenda</h4>
              <img src={agenda.cover} className="w-full aspect-video rounded-xl object-cover mb-4" />
              <button className="w-full py-2.5 border-2 border-[#E2E8F0] text-[#64748B] text-[10px] font-bold uppercase rounded-lg hover:bg-[#F8FAFC]">Ganti Cover</button>
              
              <div className="pt-6 border-t border-[#F1F5F9] space-y-4">
                 <button onClick={handleSave} className="w-full py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-xl transition-all text-sm">Simpan Perubahan</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditAgenda;
