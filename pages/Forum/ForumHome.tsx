
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MessageSquare, Clock, ArrowUpRight, Settings, Users, CreditCard, Home, Calendar, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { FORUM_CATEGORIES, MOCK_FORUM_THREADS } from '../../constants';

const categoryIcons: Record<string, any> = {
  Settings: Settings,
  Users: Users,
  CreditCard: CreditCard,
  Home: Home,
  Calendar: Calendar,
  Sparkles: Sparkles,
};

const ForumHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header Section */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4 md:mb-6">Forum Takmir & Marbot</h1>
              <p className="text-[#64748B] text-sm md:text-lg leading-relaxed">
                Ruang belajar horizontal antar masjid di seluruh Indonesia. Berbagi praktik baik, solusi operasional, dan tantangan nyata kemasjidan.
              </p>
            </div>
            <button className="px-8 py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center shrink-0 tap-target">
              <Plus size={20} className="mr-2" /> Buat Diskusi
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative group max-w-4xl mx-auto md:mx-0">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#14B8A6] transition-colors" />
            <input 
              type="text"
              placeholder="Cari diskusi berdasarkan judul, kendala, atau kategori..."
              className="w-full pl-14 pr-6 py-4 md:py-5 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:border-[#14B8A6] focus:ring-0 transition-all outline-none font-medium text-sm md:text-base tap-target shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Category Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
             <div className="sticky top-32 space-y-8">
               <div>
                  <h4 className="font-bold text-[#0F172A] mb-6 flex items-center uppercase tracking-[0.1em] text-xs">
                    <Filter size={16} className="mr-2 text-[#14B8A6]" />
                    Kategori Forum
                  </h4>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                    {FORUM_CATEGORIES.map(cat => {
                      const Icon = categoryIcons[cat.icon] || Sparkles;
                      return (
                        <button key={cat.id} className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#14B8A6] hover:bg-[#F0FDFA] transition-all group tap-target text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] group-hover:bg-white flex items-center justify-center text-[#64748B] group-hover:text-[#14B8A6] transition-colors">
                              <Icon size={16} />
                            </div>
                            <span className="text-xs font-bold text-[#475569] group-hover:text-[#14B8A6] truncate max-w-[100px] lg:max-w-none">{cat.name}</span>
                          </div>
                          <span className="text-[10px] font-extrabold text-[#94A3B8] group-hover:text-[#14B8A6]">{cat.count}</span>
                        </button>
                      );
                    })}
                  </div>
               </div>

               <div className="p-6 bg-[#0F766E] rounded-2xl text-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <MessageSquare size={100} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold mb-2">Diskusi Lapangan</h4>
                    <p className="text-white/80 text-xs leading-relaxed mb-6">Bantu marbot lain menjawab kendala di masjid mereka dan dapatkan lencana "Ahli Kemasjidan".</p>
                    <button className="w-full py-3 bg-[#14B8A6] text-white font-bold rounded-xl text-xs flex items-center justify-center hover:bg-white hover:text-[#0F766E] transition-all">
                      Lihat Perlu Jawaban <ArrowUpRight size={14} className="ml-2" />
                    </button>
                  </div>
               </div>
             </div>
          </aside>

          {/* Right: Thread List */}
          <div className="flex-1 min-w-0">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2E8F0]">
                <h3 className="text-xl font-extrabold text-[#0F172A]">Diskusi Terbaru</h3>
                <div className="flex items-center space-x-3">
                   <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest hidden sm:inline">Urutkan:</span>
                   <select className="appearance-none bg-transparent text-xs font-extrabold text-[#14B8A6] outline-none cursor-pointer">
                      <option>Paling Relevan</option>
                      <option>Terbaru</option>
                      <option>Paling Ramai</option>
                   </select>
                </div>
             </div>

             <div className="space-y-4">
                {MOCK_FORUM_THREADS.map(thread => (
                  <Link 
                    key={thread.id} 
                    to={`/forum/${thread.slug}`} 
                    className="block bg-white border border-[#E2E8F0] p-5 sm:p-6 rounded-2xl hover:border-[#14B8A6] hover:shadow-md transition-all group animate-fadeIn"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                         <span className="px-3 py-1 bg-[#F0FDFA] text-[#14B8A6] text-[10px] font-extrabold uppercase rounded-lg border border-[#14B8A6]/10">{thread.category}</span>
                         <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase ${thread.status === 'Terjawab' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                           {thread.status}
                         </span>
                      </div>
                      <div className="flex items-center text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
                        <Clock size={12} className="mr-1" /> {thread.timestamp}
                      </div>
                    </div>

                    <h4 className="text-lg md:text-xl font-extrabold text-[#0F172A] group-hover:text-[#14B8A6] transition-colors mb-3 leading-snug">
                      {thread.title}
                    </h4>
                    
                    <p className="text-sm text-[#64748B] mb-6 line-clamp-2 leading-relaxed">
                      {thread.content}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-[#F1F5F9]">
                      <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-xl bg-[#F0FDFA] flex items-center justify-center font-bold text-[#14B8A6] border border-[#14B8A6]/10 shadow-sm">
                            {thread.author.charAt(0)}
                         </div>
                         <div>
                            <div className="text-xs font-bold text-[#0F172A] leading-none mb-1">{thread.author}</div>
                            <div className="text-[10px] font-medium text-[#64748B]">{thread.authorMosque}</div>
                         </div>
                      </div>

                      <div className="flex items-center space-x-4">
                         <div className="flex items-center space-x-1.5 text-[#94A3B8]">
                            <MessageSquare size={16} />
                            <span className="text-xs font-bold">{thread.commentCount}</span>
                         </div>
                         <div className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] group-hover:bg-[#14B8A6] group-hover:text-white group-hover:border-[#14B8A6] transition-all">
                            <ChevronRight size={16} />
                         </div>
                      </div>
                    </div>
                  </Link>
                ))}
             </div>

             <button className="w-full mt-10 py-4 border-2 border-dashed border-[#E2E8F0] text-[#64748B] font-bold text-sm rounded-2xl hover:border-[#14B8A6] hover:text-[#14B8A6] hover:bg-white transition-all tap-target">
               Muat Lebih Banyak Diskusi
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForumHome;
