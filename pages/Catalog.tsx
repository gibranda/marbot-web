import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List, Star, Clock, BookOpen, ChevronRight } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { MOCK_COURSES } from '../constants';
import { Link } from 'react-router-dom';

const Catalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    return (localStorage.getItem('marbot_catalog_view') as 'grid' | 'list') || 'grid';
  });

  useEffect(() => {
    localStorage.setItem('marbot_catalog_view', viewMode);
  }, [viewMode]);

  const categories = ['Semua', 'Kebersihan', 'Manajemen', 'Teknis', 'Layanan', 'Adab'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Catalog Hero */}
      <section className="bg-white border-b border-[#E2E8F0] pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4 md:mb-6">Katalog Pembelajaran</h1>
            <p className="text-[#64748B] text-sm md:text-lg leading-relaxed mb-8 md:mb-10">
              Temukan berbagai modul pembelajaran praktis untuk meningkatkan standar pengelolaan masjid Anda.
            </p>
            
            {/* Search Bar */}
            <div className="relative group max-w-2xl mx-auto md:mx-0">
              <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#14B8A6] transition-colors" />
              <input 
                type="text"
                placeholder="Cari pembelajaran..."
                className="w-full pl-12 md:pl-14 pr-6 py-4 md:py-5 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:border-[#14B8A6] focus:ring-0 transition-all outline-none font-medium text-sm md:text-base tap-target"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-8">
              <div>
                <h4 className="font-bold text-[#0F172A] mb-5 flex items-center">
                  <Filter size={18} className="mr-2 text-[#14B8A6]" />
                  Kategori Pembelajaran
                </h4>
                <div className="flex flex-col space-y-3">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center group cursor-pointer tap-target">
                      <input 
                        type="radio" 
                        name="cat" 
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="hidden" 
                      />
                      <span className={`w-5 h-5 rounded-[6px] border-2 mr-3 flex items-center justify-center transition-all ${
                        selectedCategory === cat ? 'bg-[#14B8A6] border-[#14B8A6]' : 'border-[#E2E8F0] group-hover:border-[#14B8A6]'
                      }`}>
                        {selectedCategory === cat && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </span>
                      <span className={`font-medium transition-colors ${selectedCategory === cat ? 'text-[#14B8A6]' : 'text-[#64748B] group-hover:text-[#0F172A]'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#E2E8F0]">
                <h4 className="font-bold text-[#0F172A] mb-5">Tingkat Kesulitan</h4>
                <div className="space-y-3">
                  {['Pemula', 'Menengah', 'Lanjut'].map(level => (
                    <label key={level} className="flex items-center space-x-3 cursor-pointer group tap-target">
                      <div className="w-5 h-5 rounded-[6px] border-2 border-[#E2E8F0] group-hover:border-[#14B8A6] transition-all"></div>
                      <span className="text-sm font-medium text-[#64748B] group-hover:text-[#0F172A]">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Catalog Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-[#E2E8F0] p-4 rounded-xl mb-6 md:mb-8 gap-4 shadow-sm">
              <div className="text-xs md:text-sm text-[#64748B] text-center sm:text-left">
                Menampilkan <span className="font-bold text-[#0F172A]">{MOCK_COURSES.length} pembelajaran</span> tersedia
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                {/* View Switcher Toggle */}
                <div className="flex bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-1 shrink-0">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1 rounded-lg transition-all tap-target flex items-center justify-center ${viewMode === 'grid' ? 'bg-[#14B8A6] text-white shadow-sm' : 'text-[#94A3B8] hover:text-[#14B8A6]'}`}
                    aria-label="Tampilan Grid"
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1 rounded-lg transition-all tap-target flex items-center justify-center ${viewMode === 'list' ? 'bg-[#14B8A6] text-white shadow-sm' : 'text-[#94A3B8] hover:text-[#14B8A6]'}`}
                    aria-label="Tampilan List"
                  >
                    <List size={18} />
                  </button>
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <select className="appearance-none w-full sm:w-48 px-5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-xs md:text-sm font-bold text-[#0F172A] outline-none cursor-pointer focus:border-[#14B8A6] tap-target">
                    <option>Terpopuler</option>
                    <option>Terbaru</option>
                    <option>Rating Tertinggi</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                </div>
                <button className="lg:hidden p-2.5 bg-[#14B8A6] text-white rounded-[10px] tap-target flex items-center justify-center shrink-0">
                  <SlidersHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Filter Chips (Mobile/Tablet) */}
            <div className="flex lg:hidden overflow-x-auto pb-4 mb-6 space-x-2 scrollbar-hide">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-xs md:text-sm font-bold border-2 transition-all tap-target flex items-center justify-center ${
                    selectedCategory === cat ? 'bg-[#14B8A6] border-[#14B8A6] text-white' : 'bg-white border-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Conditional Rendering based on viewMode */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 animate-fadeIn">
                {MOCK_COURSES.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                {MOCK_COURSES.map(course => (
                  <div key={course.id} className="bg-white border border-[#E2E8F0] p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row gap-6 hover:border-[#14B8A6] hover:shadow-md transition-all group">
                    <div className="w-full md:w-56 shrink-0 aspect-[16/10] md:aspect-auto md:h-40 rounded-xl overflow-hidden shadow-sm relative">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-white/90 backdrop-blur shadow-sm ${course.level === 'Pemula' ? 'text-[#0F766E]' : 'text-[#475569]'}`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-[10px] font-bold text-[#14B8A6] uppercase tracking-widest">{course.category}</span>
                          <span className="text-[10px] text-[#CBD5E1]">•</span>
                          <div className="flex items-center space-x-1">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] font-bold text-[#0F172A]">{course.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#14B8A6] transition-colors leading-tight mb-2">{course.title}</h3>
                        <p className="text-xs text-[#64748B] line-clamp-2 mb-4 leading-relaxed">{course.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center space-x-2">
                             <img src={course.instructor.avatar} className="w-6 h-6 rounded-full border border-[#F1F5F9]" />
                             <span className="text-xs font-medium text-[#475569]">{course.instructor.name}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-[#94A3B8]">
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span className="text-xs font-medium">{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BookOpen size={14} />
                              <span className="text-xs font-medium">{course.modules} modul</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-48 border-t md:border-t-0 md:border-l border-[#F1F5F9] pt-4 md:pt-0 md:pl-6 flex md:flex-col items-center justify-between md:justify-center gap-4">
                      <div className="text-center md:mb-4">
                        <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Harga</div>
                        <div className={`text-lg font-extrabold ${course.price === 'Gratis' ? 'text-[#14B8A6]' : 'text-[#0F172A]'}`}>{course.price}</div>
                      </div>
                      <Link 
                        to={`/course/${course.id}`} 
                        className="flex-1 md:w-full py-2 bg-[#14B8A6] text-white text-xs font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center tap-target"
                      >
                        Lihat Detail <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 md:mt-16 flex justify-center space-x-2">
              <button className="w-10 h-10 rounded-[10px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all tap-target">
                <ChevronLeft size={20} />
              </button>
              <button className="w-10 h-10 rounded-[10px] bg-[#14B8A6] text-white flex items-center justify-center font-bold tap-target">1</button>
              <button className="w-10 h-10 rounded-[10px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all tap-target">2</button>
              <button className="w-10 h-10 rounded-[10px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all tap-target">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ChevronLeft = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

export default Catalog;