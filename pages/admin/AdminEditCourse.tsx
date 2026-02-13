
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Plus, Trash2, CheckCircle, Info, ExternalLink, ChevronDown, Monitor } from 'lucide-react';
import { MOCK_COURSES, MOCK_INSTRUCTORS } from '../../constants';

const AdminEditCourse: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseType, setCourseType] = useState<'Gratis' | 'Berbayar'>('Gratis');
  const [showToast, setShowToast] = useState(false);
  
  // Find current course data or use dummy
  const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];

  useEffect(() => {
    setCourseType(course.price === 'Gratis' ? 'Gratis' : 'Berbayar');
  }, [course]);

  const [modules, setModules] = useState([
    { id: 1, title: 'Pendahuluan: Visi Pengelola Masjid', duration: '15' },
    { id: 2, title: 'Teknik Dasar Sanitasi', duration: '30' },
    { id: 3, title: 'Pelayanan Jamaah', duration: '45' },
  ]);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/admin/kursus');
    }, 1500);
  };

  const handleAddModule = () => {
    setModules([...modules, { id: modules.length + 1, title: '', duration: '' }]);
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-24 relative">
      {showToast && (
        <div className="fixed top-24 right-8 z-[60] bg-[#0F172A] text-white px-6 py-4 rounded-xl shadow-2xl animate-slideInRight flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-[#14B8A6]"></div>
          <span className="text-sm font-bold">Perubahan tersimpan</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm font-bold text-[#64748B] hover:text-[#14B8A6] transition-colors mb-2 group tap-target"
          >
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Edit Kursus</h1>
          <p className="text-sm text-[#64748B]">Perbarui informasi untuk kursus <span className="font-bold text-[#0F172A]">"{course.title}"</span></p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button onClick={handleSave} className="px-6 py-2.5 border-2 border-[#E2E8F0] text-[#475569] text-sm font-bold rounded-xl hover:border-[#14B8A6] transition-all tap-target flex items-center justify-center">
            Simpan Draft
          </button>
          <button onClick={handleSave} className="px-8 py-2.5 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all tap-target flex items-center justify-center">
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Info size={20} className="mr-2 text-[#14B8A6]" />
              Informasi Dasar
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Judul Kursus</label>
                <input type="text" defaultValue={course.title} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Slug URL</label>
                  <input type="text" defaultValue={course.id} className="w-full px-4 py-3 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[10px] text-sm text-[#94A3B8] outline-none cursor-not-allowed" readOnly />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Kategori</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium cursor-pointer" defaultValue={course.category}>
                      <option>Kebersihan</option>
                      <option>Manajemen</option>
                      <option>Teknis</option>
                      <option>Layanan</option>
                      <option>Adab</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Tingkat</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium cursor-pointer" defaultValue={course.level}>
                      <option>Pemula</option>
                      <option>Menengah</option>
                      <option>Lanjut</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Estimasi Durasi</label>
                  <input type="text" defaultValue={course.duration} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Ringkasan Singkat</label>
                <textarea rows={3} defaultValue={course.description} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center"><Plus size={20} className="mr-2 text-[#14B8A6]" /> Kurikulum</h3>
            <div className="space-y-4">
              {modules.map((module, idx) => (
                <div key={module.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#64748B] shrink-0">{idx + 1}</div>
                  <input type="text" defaultValue={module.title} className="flex-1 bg-transparent text-sm font-bold text-[#0F172A] outline-none" />
                  <div className="flex items-center gap-3">
                     <div className="flex items-center bg-white border border-[#E2E8F0] rounded-lg px-3 py-1">
                        <input type="text" defaultValue={module.duration} className="w-8 text-center text-xs font-bold outline-none" />
                        <span className="text-[10px] font-bold text-[#94A3B8] ml-1 uppercase">Mnt</span>
                     </div>
                     <button onClick={() => handleRemoveModule(module.id)} className="p-2 text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              <button onClick={handleAddModule} className="w-full py-3 border-2 border-dashed border-[#E2E8F0] text-[#64748B] text-xs font-bold rounded-xl hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all">+ Tambah Modul</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm sticky top-28">
              <h4 className="text-xs font-extrabold text-[#0F172A] mb-6 uppercase tracking-widest">Informasi Publik</h4>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-3">Cover Kursus</label>
                    <img src={course.thumbnail} className="w-full aspect-video rounded-xl object-cover border border-[#F1F5F9] mb-4" />
                    <button className="w-full py-2.5 border-2 border-[#E2E8F0] text-[#64748B] text-[10px] font-bold uppercase rounded-lg hover:bg-[#F8FAFC]">Ganti Cover</button>
                 </div>
                 <div className="pt-6 border-t border-[#F1F5F9] space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-[#475569]">Sertifikat Aktif</span>
                       <div className="w-10 h-5 bg-[#14B8A6] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                    </div>
                    <button onClick={handleSave} className="w-full py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-xl shadow-[#14B8A6]/20 transition-all flex items-center justify-center tap-target"><Save size={18} className="mr-2" /> Simpan Perubahan</button>
                    <button onClick={() => navigate(-1)} className="w-full text-center text-xs font-bold text-red-500 hover:underline">Batal dan Kembali</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditCourse;
