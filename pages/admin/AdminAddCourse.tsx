
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Monitor
} from 'lucide-react';
import { MOCK_INSTRUCTORS } from '../../constants';

const AdminAddCourse: React.FC = () => {
  const navigate = useNavigate();
  const [courseType, setCourseType] = useState<'Gratis' | 'Berbayar'>('Gratis');
  const [modules, setModules] = useState([
    { id: 1, title: 'Pengenalan & Visi Misi', duration: '15' },
    { id: 2, title: 'Modul Inti Bagian 1', duration: '30' },
    { id: 3, title: 'Penugasan Praktis', duration: '45' },
  ]);

  const handleAddModule = () => {
    setModules([...modules, { id: modules.length + 1, title: '', duration: '' }]);
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
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
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Buat Kursus Baru</h1>
          <p className="text-sm text-[#64748B]">Lengkapi informasi kursus sebelum dipublish.</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button className="px-6 py-2.5 border-2 border-[#E2E8F0] text-[#475569] text-sm font-bold rounded-xl hover:border-[#14B8A6] transition-all tap-target flex items-center justify-center">
            Simpan Draft
          </button>
          <button className="px-8 py-2.5 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all tap-target flex items-center justify-center">
            Publish Kursus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Informasi Dasar */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Info size={20} className="mr-2 text-[#14B8A6]" />
              Informasi Dasar
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Judul Kursus</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Manajemen Kebersihan Area Wudhu" 
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Slug URL</label>
                  <input 
                    type="text" 
                    placeholder="Otomatis dari judul..." 
                    className="w-full px-4 py-3 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[10px] text-sm text-[#94A3B8] outline-none cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Kategori</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium cursor-pointer tap-target">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Tingkat</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium cursor-pointer tap-target">
                      <option>Pemula</option>
                      <option>Menengah</option>
                      <option>Lanjut</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Bahasa</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium cursor-pointer tap-target">
                      <option>Bahasa Indonesia</option>
                      <option>English</option>
                      <option>Arabic</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Estimasi Durasi</label>
                  <input type="text" placeholder="2 Jam 30 Menit" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Ringkasan Singkat</label>
                <textarea rows={2} placeholder="Tuliskan 1-2 kalimat deskripsi singkat..." className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* 2. Konten & Kurikulum */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Plus size={20} className="mr-2 text-[#14B8A6]" />
              Konten & Kurikulum
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Deskripsi Lengkap</label>
                <textarea rows={6} placeholder="Tuliskan detail materi..." className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium resize-none"></textarea>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">Daftar Modul</label>
                  <button onClick={handleAddModule} className="text-xs font-bold text-[#14B8A6] flex items-center hover:underline tap-target">
                    <Plus size={14} className="mr-1" /> Tambah Modul
                  </button>
                </div>
                <div className="space-y-3">
                  {modules.map((module, idx) => (
                    <div key={module.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] group">
                      <div className="flex items-center w-full sm:w-auto space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#64748B] shrink-0">
                          {idx + 1}
                        </div>
                        <input 
                          type="text" 
                          placeholder="Judul Modul" 
                          defaultValue={module.title}
                          className="flex-1 sm:hidden bg-transparent text-sm font-bold text-[#0F172A] outline-none focus:text-[#14B8A6]"
                        />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Judul Modul" 
                        defaultValue={module.title}
                        className="hidden sm:block flex-1 bg-transparent text-sm font-bold text-[#0F172A] outline-none focus:text-[#14B8A6]"
                      />
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <div className="flex items-center bg-white border border-[#E2E8F0] rounded-lg px-3 py-1">
                           <input type="text" defaultValue={module.duration} className="w-8 text-center text-xs font-bold outline-none" />
                           <span className="text-[10px] font-bold text-[#94A3B8] ml-1 uppercase">Menit</span>
                        </div>
                        <button onClick={() => handleRemoveModule(module.id)} className="p-2 text-[#94A3B8] hover:text-red-500 transition-colors sm:opacity-0 sm:group-hover:opacity-100 tap-target flex items-center">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Media */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Upload size={20} className="mr-2 text-[#14B8A6]" />
              Media Pembelajaran
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-3">Thumbnail Kursus</label>
                <div className="border-2 border-dashed border-[#E2E8F0] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center bg-[#F8FAFC] hover:border-[#14B8A6] hover:bg-[#F0FDFA] transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] group-hover:text-[#14B8A6] mb-4 transition-colors shadow-sm">
                    <Upload size={24} />
                  </div>
                  <span className="text-sm font-bold text-[#475569] group-hover:text-[#14B8A6]">Klik untuk Upload</span>
                  <span className="text-[10px] text-[#94A3B8] mt-1 font-medium text-center">Max 2MB (JPG/PNG)</span>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Video Promo URL</label>
                  <div className="relative">
                    <input type="text" placeholder="YouTube/Vimeo URL" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium" />
                    <ExternalLink size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  </div>
                  <p className="text-[10px] text-[#94A3B8] mt-2 font-medium italic leading-relaxed">*Video ini akan ditampilkan di halaman detail.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Harga & Akses */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <CheckCircle size={20} className="mr-2 text-[#14B8A6]" />
              Harga & Akses
            </h3>
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setCourseType('Gratis')}
                  className={`p-4 rounded-xl border-2 transition-all text-left flex items-start space-x-3 tap-target ${
                    courseType === 'Gratis' ? 'border-[#14B8A6] bg-[#F0FDFA]' : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    courseType === 'Gratis' ? 'border-[#14B8A6]' : 'border-[#CBD5E1]'
                  }`}>
                    {courseType === 'Gratis' && <div className="w-2.5 h-2.5 bg-[#14B8A6] rounded-full"></div>}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">Kursus Gratis</div>
                    <div className="text-[10px] text-[#64748B] font-medium leading-tight mt-1">Sangat bagus untuk edukasi umum.</div>
                  </div>
                </button>
                <button 
                  onClick={() => setCourseType('Berbayar')}
                  className={`p-4 rounded-xl border-2 transition-all text-left flex items-start space-x-3 tap-target ${
                    courseType === 'Berbayar' ? 'border-[#14B8A6] bg-[#F0FDFA]' : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    courseType === 'Berbayar' ? 'border-[#14B8A6]' : 'border-[#CBD5E1]'
                  }`}>
                    {courseType === 'Berbayar' && <div className="w-2.5 h-2.5 bg-[#14B8A6] rounded-full"></div>}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">Kursus Berbayar</div>
                    <div className="text-[10px] text-[#64748B] font-medium leading-tight mt-1">Gunakan untuk materi eksklusif.</div>
                  </div>
                </button>
              </div>

              {courseType === 'Berbayar' && (
                <div className="animate-slideInDown">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Harga Jual (Rp)</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#94A3B8]">Rp</div>
                    <input type="text" placeholder="50.000" className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-bold" />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="pr-4">
                  <div className="text-sm font-bold text-[#0F172A]">Sertifikat Kelulusan</div>
                  <div className="text-[10px] text-[#64748B] font-medium leading-tight mt-0.5">Otomatis setelah lulus kursus.</div>
                </div>
                <div className="w-12 h-6 bg-[#14B8A6] rounded-full relative cursor-pointer shadow-inner shrink-0">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Pengajar */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Plus size={20} className="mr-2 text-[#14B8A6]" />
              Pengajar
            </h3>
            <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Pilih Pengajar</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium cursor-pointer tap-target">
                      <option disabled selected>-- Pilih Pengajar --</option>
                      {MOCK_INSTRUCTORS.map(ins => (
                        <option key={ins.id} value={ins.id}>{ins.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                  </div>
                </div>
                <div className="flex justify-start">
                   <Link to="/admin/pengajar/baru" className="text-xs font-bold text-[#14B8A6] hover:underline flex items-center tap-target">
                     <Plus size={14} className="mr-1" /> Tambah Pengajar Baru
                   </Link>
                </div>
            </div>
          </div>

        </div>

        {/* Sidebar Status Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm sticky top-28">
            <h4 className="text-sm font-extrabold text-[#0F172A] mb-6 uppercase tracking-[0.15em]">Preview Status</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                <span className="text-xs font-bold text-[#64748B]">Status</span>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border border-amber-100">Draft</span>
              </div>
              
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block">Progres Data</span>
                <div className="space-y-3">
                   {[
                     { label: 'Informasi Dasar', completed: true },
                     { label: 'Thumbnail Kursus', completed: false },
                     { label: 'Materi & Modul', completed: true },
                     { label: 'Data Pengajar', completed: false },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between">
                       <span className="text-xs font-medium text-[#475569]">{item.label}</span>
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.completed ? 'bg-green-50 text-green-500 border border-green-100' : 'bg-[#F8FAFC] text-[#CBD5E1] border border-[#E2E8F0]'}`}>
                         <CheckCircle size={12} />
                       </div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="pt-4 space-y-3">
                 <button className="w-full py-3.5 border-2 border-[#E2E8F0] text-[#475569] text-xs font-bold rounded-xl hover:bg-[#F8FAFC] transition-all flex items-center justify-center tap-target">
                    <Monitor size={14} className="mr-2" /> Preview Halaman
                 </button>
                 <p className="text-[10px] text-[#94A3B8] font-medium text-center italic">Tersimpan: 2 menit yang lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCourse;