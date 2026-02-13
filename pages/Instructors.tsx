import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Users, BookOpen, ChevronDown, Sparkles } from 'lucide-react';
import { MOCK_INSTRUCTORS } from '../constants';

const Instructors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Semua');

  const roles = [
    'Semua',
    'Praktisi Kemasjidan',
    'Takmir & Manajemen',
    'Kebersihan & Sanitasi',
    'Layanan Jamaah & Adab',
    'Keuangan & Inventaris',
    'Teknis & Operasional'
  ];

  const filteredInstructors = MOCK_INSTRUCTORS.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         instructor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'Semua' || instructor.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header Section */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Daftar Pengajar</h1>
            <p className="text-[#64748B] text-lg leading-relaxed mb-10">
              Belajar dari pengajar yang paham lapangan kemasjidan. Mereka adalah praktisi yang telah bertahun-tahun mengelola rumah Allah dengan baik.
            </p>
            
            {/* Search Bar Utama */}
            <div className="relative group max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#14B8A6] transition-colors" />
              <input 
                type="text" 
                placeholder="Cari pengajar atau keahlian (mis. 'Kebersihan', 'Haji')..."
                className="w-full pl-14 pr-6 py-5 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:border-[#14B8A6] focus:ring-0 transition-all outline-none font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Sorting Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Filter Chips - Scrollable on mobile */}
          <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <div className="flex space-x-2">
              {roles.map(role => (
                <button 
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${
                    selectedRole === role 
                    ? 'bg-[#14B8A6] border-[#14B8A6] text-white' 
                    : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#14B8A6] hover:text-[#14B8A6]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting */}
          <div className="flex items-center space-x-4 w-full lg:w-auto shrink-0">
            <span className="text-sm font-bold text-[#64748B] whitespace-nowrap">Urutkan:</span>
            <div className="relative flex-1 lg:flex-none">
              <select className="appearance-none w-full lg:w-48 px-5 py-2.5 bg-white border border-[#E2E8F0] rounded-[10px] text-sm font-bold text-[#0F172A] outline-none cursor-pointer focus:border-[#14B8A6]">
                <option>Terpopuler</option>
                <option>Rating Tertinggi</option>
                <option>Pengajar Baru</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Pengajar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {filteredInstructors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInstructors.map((instructor) => (
              <div key={instructor.id} className="group bg-white border border-[#E2E8F0] p-8 rounded-2xl hover:border-[#14B8A6] hover:shadow-xl transition-all flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <img src={instructor.avatar} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#14B8A6] text-white rounded-lg flex items-center justify-center border-2 border-white">
                      <Star size={12} className="fill-white" />
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-[#F0FDFA] rounded-full">
                    <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-wider">{instructor.role}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#14B8A6] transition-colors">{instructor.name}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-6 flex-grow">{instructor.bio}</p>
                
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-[#F1F5F9]">
                  <div className="text-center border-r border-[#F1F5F9]">
                    <div className="flex items-center justify-center space-x-1 text-[#0F172A] mb-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold">{instructor.rating}</span>
                    </div>
                    <div className="text-[10px] text-[#64748B] font-bold uppercase">Rating</div>
                  </div>
                  <div className="text-center border-r border-[#F1F5F9]">
                    <div className="text-sm font-bold text-[#0F172A] mb-1">{instructor.totalStudents.toLocaleString()}</div>
                    <div className="text-[10px] text-[#64748B] font-bold uppercase">Peserta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#0F172A] mb-1">{instructor.totalCourses}</div>
                    <div className="text-[10px] text-[#64748B] font-bold uppercase">Kursus</div>
                  </div>
                </div>

                <Link 
                  to={`/pengajar/${instructor.id}`} 
                  className="w-full py-3 flex items-center justify-center text-sm font-bold text-[#14B8A6] border-2 border-[#14B8A6] rounded-[10px] hover:bg-[#14B8A6] hover:text-white transition-all"
                >
                  Lihat Profil
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-16 text-center">
            <div className="w-16 h-16 bg-[#F8FAFC] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-[#94A3B8]" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Pengajar Tidak Ditemukan</h3>
            <p className="text-[#64748B]">Coba gunakan kata kunci pencarian yang berbeda.</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredInstructors.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-10 py-4 bg-white border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-xl hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all flex items-center mx-auto space-x-2">
              <span>Muat Lebih Banyak</span>
              <ChevronDown size={18} />
            </button>
          </div>
        )}
      </section>

      {/* Become Teacher CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-[#0F766E] rounded-2xl p-8 md:p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <Sparkles size={300} strokeWidth={0.5} className="text-white" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ingin menjadi pengajar di Marbot?</h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                Bantu berbagi praktik baik pengelolaan masjid. Salurkan ilmu Anda untuk menciptakan kemasjidan yang lebih rapi dan berdampak. Profil Anda akan ditampilkan di pembelajaran publik Marbot.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button className="px-8 py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-white hover:text-[#0F766E] transition-all text-center">
                Daftar Jadi Pengajar
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 border border-white/20 transition-all text-center">
                Pelajari Syaratnya
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Instructors;