import React from 'react';
import { useNavigate } from 'react-router-dom';
// Added CheckCircle to imports
import { 
  ArrowLeft, 
  Save, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  Upload,
  Info,
  ShieldCheck,
  Star,
  CheckCircle
} from 'lucide-react';

const AdminAddInstructor: React.FC = () => {
  const navigate = useNavigate();

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
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Tambah Pengajar Baru</h1>
          <p className="text-sm text-[#64748B]">Tambahkan profil pengajar untuk ditampilkan di pembelajaran.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 border-2 border-[#E2E8F0] text-[#475569] text-sm font-bold rounded-xl hover:border-red-400 hover:text-red-500 transition-all"
          >
            Batal
          </button>
          <button className="px-10 py-2.5 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center">
            <Save size={18} className="mr-2" />
            Simpan Profil
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Profil Pengajar */}
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <User size={20} className="mr-2 text-[#14B8A6]" />
              Profil Dasar Pengajar
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Nama Lengkap & Gelar</label>
                  <input type="text" placeholder="Contoh: Ustadz Dr. H. Ahmad Fauzi, M.A." className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Role / Keahlian Utama</label>
                  <select className="w-full appearance-none px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium cursor-pointer">
                    <option>Praktisi Kemasjidan</option>
                    <option>Takmir & Manajemen</option>
                    <option>Layanan Jamaah & Adab</option>
                    <option>Keuangan & Inventaris</option>
                    <option>Teknis & Operasional</option>
                    <option>Kebersihan & Sanitasi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                <div className="md:col-span-1">
                   <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Foto Profil</label>
                   <div className="relative group w-32 h-32 mx-auto md:mx-0">
                      <div className="w-32 h-32 rounded-2xl bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] group-hover:border-[#14B8A6] group-hover:bg-[#F0FDFA] transition-all cursor-pointer overflow-hidden">
                        <Upload size={24} />
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all pointer-events-none rounded-2xl">
                        <span className="text-[10px] font-bold text-white uppercase">Upload</span>
                      </div>
                   </div>
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Bio Singkat (Tagline)</label>
                  <textarea rows={1} placeholder="Contoh: Praktisi manajemen masjid modern selama 15 tahun di Jogokaryan." className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium resize-none"></textarea>
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mt-4 mb-2">Bio Lengkap / Pengalaman</label>
                  <textarea rows={4} placeholder="Jelaskan latar belakang pendidikan, pengalaman organisasi masjid, dan keahlian spesifik..." className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Kredensial & Kontak */}
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Mail size={20} className="mr-2 text-[#14B8A6]" />
              Kredensial & Kontak
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                  <input type="email" placeholder="ustadz@marbot.id" className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">No. HP / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                  <input type="text" placeholder="0812-3456-7890" className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Domisili / Lokasi</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                  <input type="text" placeholder="Yogyakarta, Indonesia" className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all font-medium" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Statistik (Initial Set) */}
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center">
              <Star size={20} className="mr-2 text-[#14B8A6]" />
              Data Statistik (Opsional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Rating Awal</label>
                <input type="number" step="0.1" max="5" defaultValue="5.0" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-bold" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Jumlah Peserta Awal</label>
                <input type="number" defaultValue="0" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-bold" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-2">Jumlah Kursus Diterbitkan</label>
                <input type="number" defaultValue="0" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none font-bold" />
              </div>
            </div>
            <p className="text-[10px] text-[#94A3B8] mt-4 font-medium italic">*Statistik ini akan ditampilkan di profil pembelajaran publik pengajar.</p>
          </div>

        </div>

        {/* Side Card Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm sticky top-28">
            <h4 className="text-sm font-extrabold text-[#0F172A] mb-6 uppercase tracking-[0.15em] flex items-center">
               <Info size={16} className="mr-2 text-[#14B8A6]" />
               Tips Profil
            </h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={10} />
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">Gunakan foto portrait dengan background yang rapi (masjid atau studio).</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={10} />
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">Tuliskan bio yang ringkas and menonjolkan kredibilitas di bidang kemasjidan.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={10} />
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">Pilih role/tag yang paling mencerminkan keahlian utama untuk memudahkan filter.</p>
              </div>

              <div className="pt-6 border-t border-[#F1F5F9]">
                 <div className="flex items-center space-x-2 text-[10px] font-bold text-[#14B8A6] uppercase tracking-widest mb-3">
                    <ShieldCheck size={14} />
                    <span>Verifikasi Data</span>
                 </div>
                 <p className="text-[10px] text-[#94A3B8] leading-relaxed mb-4">Profil pengajar baru akan ditinjau oleh tim Admin Marbot sebelum muncul secara publik di daftar pengajar.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0]">
             <h5 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-2">Catatan Internal</h5>
             <textarea rows={4} placeholder="Tambahkan catatan khusus admin tentang pengajar ini..." className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-[10px] text-[10px] focus:border-[#14B8A6] outline-none transition-all font-medium resize-none"></textarea>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAddInstructor;