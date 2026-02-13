
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, MapPin, Upload, Info, ShieldCheck, Star, X } from 'lucide-react';
import { MOCK_INSTRUCTORS } from '../../constants';

const AdminEditInstructor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const instructor = MOCK_INSTRUCTORS.find(i => i.id === id) || MOCK_INSTRUCTORS[0];
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/admin/pengajar');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-24 relative">
      {showToast && (
        <div className="fixed top-24 right-8 z-[60] bg-[#0F172A] text-white px-6 py-4 rounded-xl shadow-2xl animate-slideInRight flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-[#14B8A6]"></div>
          <span className="text-sm font-bold">Profil diperbarui</span>
        </div>
      )}

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
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Edit Pengajar</h1>
          <p className="text-sm text-[#64748B]">Perbarui profil <span className="font-bold text-[#0F172A]">{instructor.name}</span></p>
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
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center"><User size={20} className="mr-2 text-[#14B8A6]" /> Profil Dasar</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Nama Lengkap</label>
                   <input type="text" defaultValue={instructor.name} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                </div>
                <div>
                   <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Role Utama</label>
                   <input type="text" defaultValue={instructor.role} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Bio Singkat</label>
                <textarea rows={4} defaultValue={instructor.bio} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-medium resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center"><Star size={20} className="mr-2 text-[#14B8A6]" /> Statistik Awal</h3>
            <div className="grid grid-cols-3 gap-6">
               <div>
                  <label className="text-[10px] font-bold text-[#475569] uppercase mb-1 block">Rating</label>
                  <input type="text" defaultValue={instructor.rating} className="w-full px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm font-bold" />
               </div>
               <div>
                  <label className="text-[10px] font-bold text-[#475569] uppercase mb-1 block">Peserta</label>
                  <input type="text" defaultValue={instructor.totalStudents} className="w-full px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm font-bold" />
               </div>
               <div>
                  <label className="text-[10px] font-bold text-[#475569] uppercase mb-1 block">Kursus</label>
                  <input type="text" defaultValue={instructor.totalCourses} className="w-full px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm font-bold" />
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
           <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm sticky top-28 space-y-6">
              <div>
                 <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-4">Foto Profil</label>
                 <img src={instructor.avatar} className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl mx-auto mb-4" />
                 <button className="w-full py-2.5 border-2 border-[#E2E8F0] text-[#64748B] text-[10px] font-bold uppercase rounded-lg">Ganti Foto</button>
              </div>
              <div className="pt-6 border-t border-[#F1F5F9] space-y-4">
                 <div className="flex items-center space-x-2 text-[10px] font-bold text-[#14B8A6] uppercase tracking-widest mb-3">
                    <ShieldCheck size={14} /> <span>Status: Terverifikasi</span>
                 </div>
                 <button onClick={handleSave} className="w-full py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-xl flex items-center justify-center tap-target transition-all"><Save size={18} className="mr-2" /> Simpan Profil</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditInstructor;
