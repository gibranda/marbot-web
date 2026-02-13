import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, Globe, ChevronRight, Filter, Users, LayoutGrid, List, Clock, Ticket } from 'lucide-react';
import { MOCK_AGENDA } from '../../constants';

const AgendaList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    return (localStorage.getItem('marbot_agenda_view') as 'grid' | 'list') || 'grid';
  });

  useEffect(() => {
    localStorage.setItem('marbot_agenda_view', viewMode);
  }, [viewMode]);

  const filteredAgenda = MOCK_AGENDA.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'Semua' || 
                         (filter === 'Online' && item.type === 'Online') ||
                         (filter === 'Offline' && item.type === 'Offline') ||
                         (filter === 'Gratis' && item.price === 'Gratis') ||
                         (filter === 'Berbayar' && item.price !== 'Gratis');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header Mini */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4 md:mb-6">Agenda Workshop Kemasjidan</h1>
            <p className="text-[#64748B] text-sm md:text-lg leading-relaxed mb-10">
              Pilih workshop online atau offline dari para praktisi terbaik, lalu daftar untuk meningkatkan kualitas layanan masjid Anda.
            </p>
            
            {/* Search Bar */}
            <div className="relative group max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#14B8A6] transition-colors" />
              <input 
                type="text"
                placeholder="Cari workshop..."
                className="w-full pl-14 pr-6 py-4 md:py-5 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:border-[#14B8A6] focus:ring-0 transition-all outline-none font-medium text-sm md:text-base tap-target"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar & Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex space-x-2">
              {['Semua', 'Online', 'Offline', 'Gratis', 'Berbayar'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold border-2 transition-all tap-target flex items-center justify-center ${
                    filter === f ? 'bg-[#14B8A6] border-[#14B8A6] text-white shadow-md' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#14B8A6]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto shrink-0">
             {/* View Mode Toggle */}
             <div className="flex bg-white border border-[#E2E8F0] rounded-[12px] p-1 shadow-sm">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all tap-target flex items-center justify-center ${viewMode === 'grid' ? 'bg-[#14B8A6] text-white shadow-sm' : 'text-[#94A3B8] hover:text-[#14B8A6]'}`}
                  aria-label="Tampilan Grid"
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all tap-target flex items-center justify-center ${viewMode === 'list' ? 'bg-[#14B8A6] text-white shadow-sm' : 'text-[#94A3B8] hover:text-[#14B8A6]'}`}
                  aria-label="Tampilan List"
                >
                  <List size={18} />
                </button>
             </div>

             <div className="flex items-center space-x-3 flex-1 md:flex-none">
                <span className="text-sm font-bold text-[#64748B] hidden sm:inline">Urutkan:</span>
                <select className="flex-1 md:flex-none appearance-none px-5 py-2.5 bg-white border-2 border-[#E2E8F0] rounded-xl text-sm font-bold text-[#0F172A] outline-none cursor-pointer focus:border-[#14B8A6] tap-target shadow-sm">
                  <option>Terdekat</option>
                  <option>Terbaru</option>
                  <option>Paling Populer</option>
                </select>
             </div>
          </div>
        </div>
      </section>

      {/* Agenda Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {filteredAgenda.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
              {filteredAgenda.map((agenda) => (
                <div key={agenda.id} className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#14B8A6] hover:shadow-xl transition-all flex flex-col h-full shadow-sm">
                  <div className="relative aspect-video">
                    <img src={agenda.cover} alt={agenda.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm ${
                        agenda.type === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {agenda.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-[#14B8A6] uppercase tracking-[0.15em] mb-3">
                      <Calendar size={12} />
                      <span>{agenda.date} • {agenda.time} WIB</span>
                    </div>
                    
                    <h3 className="text-xl font-extrabold text-[#0F172A] mb-4 group-hover:text-[#14B8A6] transition-colors line-clamp-2 min-h-[3.5rem]">
                      {agenda.title}
                    </h3>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center space-x-3 text-sm text-[#64748B]">
                        {agenda.type === 'Online' ? <Globe size={16} className="shrink-0" /> : <MapPin size={16} className="shrink-0" />}
                        <span className="truncate">{agenda.locationName}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-[#64748B]">
                        <Users size={16} className="shrink-0" />
                        <span className="font-medium">Sisa {agenda.remainingQuota} Kuota</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-[#F1F5F9] flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Harga</div>
                        <div className={`text-lg font-extrabold ${agenda.price === 'Gratis' ? 'text-[#14B8A6]' : 'text-[#0F172A]'}`}>
                          {agenda.price}
                        </div>
                      </div>
                      <Link 
                        to={`/agenda/${agenda.slug}`} 
                        className="px-5 py-2.5 bg-[#14B8A6] text-white text-xs font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center tap-target"
                      >
                        Lihat Detail <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              {filteredAgenda.map((agenda) => (
                <div key={agenda.id} className="bg-white border border-[#E2E8F0] p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:border-[#14B8A6] hover:shadow-md transition-all group shadow-sm">
                  {/* Date Column (Desktop Only) */}
                  <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl shrink-0 group-hover:bg-[#F0FDFA] transition-colors">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">{agenda.date.split(' ')[2]}</span>
                    <span className="text-2xl font-extrabold text-[#0F172A]">{agenda.date.split(' ')[0]}</span>
                    <span className="text-[10px] font-bold text-[#14B8A6] uppercase">{agenda.date.split(' ')[1]}</span>
                  </div>

                  {/* Image Column (Mobile Only) */}
                  <div className="md:hidden w-full aspect-video rounded-xl overflow-hidden shrink-0 relative">
                     <img src={agenda.cover} className="w-full h-full object-cover" />
                     <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase bg-white/90 backdrop-blur shadow-sm ${agenda.type === 'Online' ? 'text-blue-600' : 'text-amber-600'}`}>{agenda.type}</span>
                     </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`hidden md:inline-block px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest ${
                        agenda.type === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {agenda.type}
                      </span>
                      <div className="flex items-center space-x-2 text-[10px] font-bold text-[#64748B] uppercase tracking-[0.1em]">
                        <Clock size={12} className="text-[#14B8A6]" />
                        <span>{agenda.time} WIB</span>
                      </div>
                      <div className="flex md:hidden items-center space-x-2 text-[10px] font-bold text-[#64748B] uppercase tracking-[0.1em]">
                        <Calendar size={12} className="text-[#14B8A6]" />
                        <span>{agenda.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] group-hover:text-[#14B8A6] transition-colors leading-tight mb-2 truncate">
                      {agenda.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-[#64748B]">
                      <div className="flex items-center space-x-2">
                        {agenda.type === 'Online' ? <Globe size={14} className="text-[#14B8A6] shrink-0" /> : <MapPin size={14} className="text-[#14B8A6] shrink-0" />}
                        <span className="truncate max-w-[200px]">{agenda.locationName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={14} className="text-[#14B8A6] shrink-0" />
                        <span className="font-bold text-[#0F172A]">{agenda.remainingQuota} <span className="font-normal text-[#64748B]">Kuota Tersisa</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-56 border-t md:border-t-0 md:border-l border-[#F1F5F9] pt-4 md:pt-0 md:pl-8 flex md:flex-col items-center justify-between md:justify-center gap-4">
                    <div className="text-center md:mb-4">
                      <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Pendaftaran</div>
                      <div className={`text-lg font-extrabold ${agenda.price === 'Gratis' ? 'text-[#14B8A6]' : 'text-[#0F172A]'}`}>{agenda.price}</div>
                    </div>
                    <Link 
                      to={`/agenda/${agenda.slug}`} 
                      className="flex-1 md:w-full py-3.5 bg-[#14B8A6] text-white text-xs font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center tap-target"
                    >
                      <Ticket size={14} className="mr-2" /> Daftar Workshop
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-[#F8FAFC] rounded-xl flex items-center justify-center mx-auto mb-6 text-[#94A3B8]">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Agenda Tidak Ditemukan</h3>
            <p className="text-[#64748B]">Coba gunakan kata kunci pencarian yang berbeda.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AgendaList;