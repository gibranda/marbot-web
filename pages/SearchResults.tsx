
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, BookOpen, Calendar, UserCircle, MessageSquare, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import { MOCK_COURSES, MOCK_AGENDA, MOCK_INSTRUCTORS, MOCK_FORUM_THREADS } from '../constants';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Semua');
  const [query, setQuery] = useState('');
  
  const [results, setResults] = useState<{
    courses: any[],
    agendas: any[],
    instructors: any[],
    forums: any[]
  }>({ courses: [], agendas: [], instructors: [], forums: [] });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setQuery(q);

    if (q.trim()) {
      const lowerQ = q.toLowerCase();
      
      const courses = MOCK_COURSES.filter(c => 
        c.title.toLowerCase().includes(lowerQ) || 
        c.category.toLowerCase().includes(lowerQ) ||
        c.instructor.name.toLowerCase().includes(lowerQ)
      );
      
      const agendas = MOCK_AGENDA.filter(a => 
        a.title.toLowerCase().includes(lowerQ) || 
        a.locationName.toLowerCase().includes(lowerQ) ||
        a.narasumber.toLowerCase().includes(lowerQ)
      );
      
      const instructors = MOCK_INSTRUCTORS.filter(i => 
        i.name.toLowerCase().includes(lowerQ) || 
        i.role.toLowerCase().includes(lowerQ) ||
        i.bio.toLowerCase().includes(lowerQ)
      );
      
      const forums = MOCK_FORUM_THREADS.filter(f => 
        f.title.toLowerCase().includes(lowerQ) || 
        f.category.toLowerCase().includes(lowerQ) ||
        f.content.toLowerCase().includes(lowerQ)
      );

      setResults({ courses, agendas, instructors, forums });
    }
  }, [location.search]);

  const tabs = ['Semua', 'Pembelajaran', 'Agenda', 'Pengajar', 'Forum'];

  const totalCount = results.courses.length + results.agendas.length + results.instructors.length + results.forums.length;

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Search Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4">Hasil Pencarian</h1>
            <p className="text-[#64748B] text-sm md:text-lg flex items-center">
              Untuk kata kunci: <span className="font-bold text-[#0F172A] ml-2 bg-[#F0FDFA] px-3 py-1 rounded-lg border border-[#14B8A6]/20">"{query}"</span>
            </p>
          </div>
        </div>
      </section>

      {/* Results Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Filter */}
        <div className="flex space-x-2 bg-white p-1.5 rounded-2xl border border-[#E2E8F0] w-full md:w-max shadow-sm overflow-x-auto scrollbar-hide mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/20' : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {totalCount === 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-[#F8FAFC] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#94A3B8]">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0F172A] mb-2">Tidak ada hasil ditemukan</h3>
            <p className="text-[#64748B] max-w-md mx-auto">
              Coba gunakan kata kunci yang lebih umum atau pastikan ejaan sudah benar.
            </p>
          </div>
        ) : (
          <div className="space-y-16 animate-fadeIn">
            {/* Courses List */}
            {(activeTab === 'Semua' || activeTab === 'Pembelajaran') && results.courses.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center">
                    <BookOpen size={24} className="mr-3 text-[#14B8A6]" /> Pembelajaran
                  </h2>
                  <span className="text-xs font-bold text-[#64748B] bg-white px-3 py-1 rounded-full border border-[#E2E8F0]">{results.courses.length} Hasil</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.courses.map(course => (
                    <Link key={course.id} to={`/course/${course.id}`} className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex items-center justify-between hover:border-[#14B8A6] hover:shadow-md transition-all group">
                      <div className="flex items-center space-x-4 min-w-0">
                        <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-[#F1F5F9]">
                          <img src={course.thumbnail} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#14B8A6]">{course.title}</h4>
                          <p className="text-xs text-[#64748B]">{course.instructor.name} • {course.level}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-[#CBD5E1] group-hover:text-[#14B8A6]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Agendas List */}
            {(activeTab === 'Semua' || activeTab === 'Agenda') && results.agendas.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center">
                    <Calendar size={24} className="mr-3 text-amber-500" /> Agenda Workshop
                  </h2>
                  <span className="text-xs font-bold text-[#64748B] bg-white px-3 py-1 rounded-full border border-[#E2E8F0]">{results.agendas.length} Hasil</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.agendas.map(agenda => (
                    <Link key={agenda.id} to={`/agenda/${agenda.slug}`} className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex items-center justify-between hover:border-[#14B8A6] hover:shadow-md transition-all group">
                      <div className="flex items-center space-x-4 min-w-0">
                        <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-[#F1F5F9] bg-amber-50 flex items-center justify-center text-amber-500 font-bold text-[10px] uppercase">
                          {agenda.type}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#14B8A6]">{agenda.title}</h4>
                          <p className="text-xs text-[#64748B]">{agenda.date} • {agenda.locationName}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-[#CBD5E1] group-hover:text-[#14B8A6]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Instructors List */}
            {(activeTab === 'Semua' || activeTab === 'Pengajar') && results.instructors.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center">
                    <UserCircle size={24} className="mr-3 text-purple-500" /> Pengajar
                  </h2>
                  <span className="text-xs font-bold text-[#64748B] bg-white px-3 py-1 rounded-full border border-[#E2E8F0]">{results.instructors.length} Hasil</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.instructors.map(ins => (
                    <Link key={ins.id} to={`/pengajar/${ins.id}`} className="bg-white border border-[#E2E8F0] p-6 rounded-3xl flex items-center space-x-4 hover:border-[#14B8A6] hover:shadow-md transition-all group">
                      <img src={ins.avatar} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#F1F5F9]" />
                      <div className="min-w-0">
                        <h4 className="text-base font-extrabold text-[#0F172A] truncate group-hover:text-[#14B8A6]">{ins.name}</h4>
                        <p className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider">{ins.role}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Forums List */}
            {(activeTab === 'Semua' || activeTab === 'Forum') && results.forums.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center">
                    <MessageSquare size={24} className="mr-3 text-blue-500" /> Forum Takmir & Marbot
                  </h2>
                  <span className="text-xs font-bold text-[#64748B] bg-white px-3 py-1 rounded-full border border-[#E2E8F0]">{results.forums.length} Hasil</span>
                </div>
                <div className="space-y-4">
                  {results.forums.map(forum => (
                    <Link key={forum.id} to={`/forum/${forum.slug}`} className="block bg-white border border-[#E2E8F0] p-6 rounded-2xl hover:border-[#14B8A6] hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 bg-[#F0FDFA] text-[#14B8A6] text-[9px] font-extrabold uppercase rounded-lg border border-[#14B8A6]/10">{forum.category}</span>
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{forum.timestamp}</span>
                      </div>
                      <h4 className="text-lg font-extrabold text-[#0F172A] group-hover:text-[#14B8A6] mb-3">{forum.title}</h4>
                      <p className="text-sm text-[#64748B] line-clamp-2 leading-relaxed mb-4">{forum.content}</p>
                      <div className="flex items-center space-x-3 text-xs font-bold text-[#14B8A6]">
                         <span>Lihat Diskusi</span>
                         <ChevronRight size={14} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Need Help Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-[#0F766E] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 p-8 opacity-5">
             <Sparkles size={200} />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Masih belum menemukan yang dicari?</h3>
                <p className="text-white/80 max-w-xl">Beritahu kami topik apa yang Anda butuhkan, tim kami akan berusaha menyediakan materi pembelajarannya segera.</p>
              </div>
              <button className="px-10 py-4 bg-[#14B8A6] text-white font-bold rounded-2xl hover:bg-white hover:text-[#0F766E] transition-all whitespace-nowrap shadow-lg shadow-black/10">
                Hubungi Support
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
