import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Users, Layout, Award, ChevronDown, ChevronUp, Sparkles, Target, Heart, Star, ChevronRight, BookOpen, MessageCircle, HelpCircle, ArrowUpRight } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { MOCK_COURSES, MOCK_INSTRUCTORS, FAQS } from '../constants';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const location = useLocation();
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for scroll reveal
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Handle hash scroll on initial load or path change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const stats = [
    { label: 'Materi Ringkas', value: '120+' },
    { label: 'Pengajar Ahli', value: '40+' },
    { label: 'Peserta Aktif', value: '10.000+' },
  ];

  const addToRevealRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero" className="reveal-section relative pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32 bg-[#FFFFFF]" ref={addToRevealRefs}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#99F6E4] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-[#14B8A6] rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#F0FDFA] border border-[#CCFBF1] rounded-full mb-6">
                <Sparkles size={16} className="text-[#14B8A6]" />
                <span className="text-[10px] md:text-xs font-bold text-[#0F766E] uppercase tracking-wider">LMS No.1 Untuk Masjid</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight md:leading-[1.15] mb-6">
                Belajar mengelola masjid, jadi lebih <span className="text-[#14B8A6]">rapi & berdampak.</span>
              </h1>
              <p className="text-sm md:text-lg text-[#64748B] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Marbot membantu takmir, marbot, dan pengurus masjid belajar dari materi praktis: kebersihan, operasional, layanan jamaah, hingga manajemen kegiatan.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                <Link to="/katalog" className="w-full sm:w-auto px-8 py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/30 transition-all text-center tap-target flex items-center justify-center">
                  Mulai Belajar Sekarang
                </Link>
                <Link to="/katalog" className="w-full sm:w-auto px-8 py-4 border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-xl hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all text-center tap-target flex items-center justify-center">
                  Lihat Pembelajaran
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-8 max-w-md mx-auto lg:mx-0 border-t border-[#F1F5F9] pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#0F172A]">{s.value}</div>
                    <div className="text-[9px] sm:text-[10px] md:text-xs text-[#64748B] font-medium leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Mockup - Hidden on smaller mobile, visible from lg */}
            <div className="relative group hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#14B8A6] to-[#99F6E4] rounded-2xl rotate-3 scale-105 opacity-20 blur-2xl group-hover:rotate-6 transition-transform"></div>
              <div className="relative bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0] flex justify-between items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Dashboard Peserta</div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0F172A]">SOP Kebersihan Karpet</h4>
                      <p className="text-xs text-[#64748B]">Sedang dipelajari • Modul 3/8</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6]">
                      <Target size={24} />
                    </div>
                  </div>
                  <div className="w-full h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#14B8A6] w-[65%] rounded-full shadow-[0_0_10px_rgba(20,184,166,0.4)]"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC]">
                      <Award size={20} className="text-[#14B8A6] mb-2" />
                      <div className="text-xs font-bold">2 Sertifikat</div>
                      <div className="text-[10px] text-[#64748B]">Telah didapat</div>
                    </div>
                    <div className="p-4 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC]">
                      <Users size={20} className="text-[#14B8A6] mb-2" />
                      <div className="text-xs font-bold">85 Alumni</div>
                      <div className="text-[10px] text-[#64748B]">Masjid Terdekat</div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-[#14B8A6] text-white flex items-center justify-between">
                    <div className="text-xs font-bold">Lanjut Belajar: Layanan Prima</div>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badges */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-[#F1F5F9] animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#99F6E4] flex items-center justify-center">
                    <CheckCircle className="text-[#0F766E] w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold">Sertifikat Resmi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="reveal-section scroll-mt-20 py-16 md:py-24 bg-[#F8FAFC]" ref={addToRevealRefs}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-4 md:mb-6">Marbot, Akademi Kemasjidan Digital</h2>
            <p className="text-sm md:text-base text-[#64748B] font-medium leading-relaxed mb-4 md:mb-6">
              Marbot adalah platform pembelajaran (LMS) untuk meningkatkan kapasitas pengelola masjid—marbot, takmir, dan pengurus—melalui kursus, workshop, and agenda kemasjidan yang terstruktur.
            </p>
            <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
              Masjid membutuhkan pengelolaan yang rapi, profesional, and berkelanjutan. Marbot hadir sebagai akademi kemasjidan berbasis digital yang menyediakan pembelajaran praktis—mulai dari operasional harian, kebersihan, pelayanan jamaah, hingga manajemen kegiatan and pengembangan SDM masjid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Sparkles className="text-[#14B8A6]" />, title: 'Kursus Terstruktur', desc: 'Materi pembelajaran kemasjidan dalam bentuk kursus online, disusun bertahap and mudah diikuti.' },
              { icon: <Target className="text-[#14B8A6]" />, title: 'Agenda & Workshop', desc: 'Informasi and pendaftaran workshop kemasjidan, baik online maupun offline, langsung dari satu platform.' },
              { icon: <Heart className="text-[#14B8A6]" />, title: 'Sertifikasi & Pengembangan SDM', desc: 'Setiap pembelajaran tercatat, progres terpantau, and sertifikat diterbitkan sebagai bukti peningkatan kapasitas.' },
            ].map((item, idx) => (
              <div key={idx} className="stagger-item bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#E2E8F0] hover:shadow-md transition-all duration-500" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-3">{item.title}</h3>
                <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section - Implement Horizontal Scroll */}
      <section id="kursus-populer" className="reveal-section pt-16 pb-10 md:pt-24 md:pb-16 bg-white" ref={addToRevealRefs}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-2 md:mb-4">Kursus Populer</h2>
              <p className="text-sm md:text-base text-[#64748B]">Mulai dari materi yang paling dibutuhkan di lapangan.</p>
            </div>
            <Link to="/katalog" className="inline-flex items-center text-[#14B8A6] font-bold text-sm md:text-base hover:underline">
              Lihat Semua di Pembelajaran <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>

          {/* Horizontal Scroll Area Implementation */}
          <div className="flex overflow-x-auto gap-6 md:gap-8 pb-10 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory">
            {MOCK_COURSES.slice(0, 5).map((course, idx) => (
              <div 
                key={course.id} 
                className="stagger-item transition-all duration-500 shrink-0 w-[280px] sm:w-[320px] md:w-[380px] snap-start" 
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Transition Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-section" ref={addToRevealRefs}>
        <div className="h-px bg-[#E2E8F0] w-full stagger-item"></div>
      </div>

      {/* Redesigned Pengajar Section: "Our Team" Style */}
      <section id="pengajar-preview" className="reveal-section pt-10 pb-16 md:pt-16 md:pb-24 bg-white" ref={addToRevealRefs}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Large Panel Container */}
          <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-6 md:p-12 lg:p-16">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4 md:mb-6 leading-tight">
                  Belajar dari pengajar yang paham lapangan
                </h2>
                <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
                  Tim ahli kami terdiri dari para praktisi kemasjidan berpengalaman yang siap membimbing Anda mengelola masjid secara modern and profesional.
                </p>
              </div>
              <div className="hidden md:block">
                <Link to="/pengajar" className="inline-flex items-center px-8 py-4 border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-xl hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all text-sm tap-target">
                  Lihat Semua Pengajar <ChevronRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {MOCK_INSTRUCTORS.slice(0, 4).map((instructor, idx) => (
                <div key={instructor.id} className="stagger-item group flex flex-col" style={{ transitionDelay: `${idx * 150}ms` }}>
                  {/* Portrait Photo Container */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F8FAFC] mb-8 shadow-sm group-hover:shadow-md transition-all">
                    <img 
                      src={instructor.avatar} 
                      alt={instructor.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    {/* Floating Level Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg text-[9px] font-bold text-[#14B8A6] uppercase tracking-widest shadow-sm border border-white">
                        {instructor.role.split(' ')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="flex flex-col flex-grow text-center sm:text-left">
                    <h3 className="text-lg md:text-xl font-extrabold text-[#0F172A] mb-1 group-hover:text-[#14B8A6] transition-colors">
                      {instructor.name}
                    </h3>
                    <p className="text-[#14B8A6] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3">
                      {instructor.role}
                    </p>
                    <p className="text-xs md:text-sm text-[#64748B] leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem]">
                      {instructor.bio}
                    </p>

                    {/* Meta Info Bar */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#F1F5F9] mb-6">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-bold text-[#0F172A]">{instructor.rating}</span>
                        </div>
                        <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Rating</span>
                      </div>
                      <div className="flex flex-col items-center border-x border-[#F1F5F9]">
                        <div className="flex items-center space-x-1 mb-1">
                          <Users size={12} className="text-[#14B8A6]" />
                          <span className="text-xs font-bold text-[#0F172A]">{instructor.totalStudents.toLocaleString()}</span>
                        </div>
                        <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Peserta</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-1 mb-1">
                          <BookOpen size={12} className="text-[#64748B]" />
                          <span className="text-xs font-bold text-[#0F172A]">{instructor.totalCourses}</span>
                        </div>
                        <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Kursus</span>
                      </div>
                    </div>

                    {/* Profile Link Button */}
                    <Link 
                      to={`/pengajar/${instructor.id}`} 
                      className="mt-auto inline-flex items-center justify-center w-full py-3 border-2 border-[#E2E8F0] text-[#475569] font-bold text-xs rounded-[10px] hover:border-[#14B8A6] hover:text-[#14B8A6] hover:bg-[#F0FDFA] transition-all group-hover:shadow-lg group-hover:shadow-[#14B8A6]/5 tap-target"
                    >
                      Lihat Profil <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile-only See All Button */}
            <div className="mt-12 md:hidden">
              <Link to="/pengajar" className="flex items-center justify-center w-full py-4 border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-xl bg-white shadow-sm tap-target">
                Lihat Semua Pengajar <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Catalog Teaser Section - FULL-BLEED */}
      <section id="teaser-katalog" className="reveal-section relative mb-16 md:mb-24 py-12 md:py-20 lg:py-24 text-white overflow-hidden bg-[#0F766E]" ref={addToRevealRefs}>
        {/* Decorative background element - smaller on mobile */}
        <div className="absolute top-0 right-0 p-8 md:p-24 opacity-10 pointer-events-none">
          <Layout size={120} strokeWidth={0.5} className="text-white md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="stagger-item transition-all duration-700 max-w-xl text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-6 md:mb-8 leading-tight">
                Cari kursus sesuai kebutuhan masjid Anda.
              </h2>
              <p className="text-sm md:text-lg text-white/80 mb-8 md:mb-10 leading-relaxed">
                Kami menyediakan sistem filter cerdas untuk membantu Anda menemukan materi berdasarkan tingkat kesulitan, durasi, hingga topik spesifik kemasjidan.
              </p>
              <Link to="/katalog" className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 md:py-5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-white hover:text-[#0F766E] transition-all text-sm md:text-base tap-target">
                Buka Pembelajaran Sekarang
              </Link>
            </div>
            
            <div className="stagger-item transition-all duration-700 delay-200 bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 hidden md:block">
              <div className="flex flex-col space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-3 block">Level</label>
                  <div className="flex flex-wrap gap-2">
                    {['Semua', 'Pemula', 'Menengah'].map(l => (
                      <span key={l} className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${l === 'Pemula' ? 'bg-[#14B8A6] text-white' : 'bg-white/10 hover:bg-white/20'}`}>{l}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-3 block">Topik Populer</label>
                  <div className="flex flex-wrap gap-2">
                    {['Kebersihan', 'Manajemen', 'Teknis', 'Layanan', 'Adab'].map(t => (
                      <span key={t} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold cursor-pointer">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="reveal-section scroll-mt-20 py-16 md:py-24 bg-[#F8FAFC]" ref={addToRevealRefs}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main FAQ Panel */}
          <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-6 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Column 1 & 2: FAQ List */}
              <div className="lg:col-span-2 space-y-8">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center px-3 py-1 bg-[#F0FDFA] border border-[#CCFBF1] rounded-full mb-4">
                    <HelpCircle size={14} className="text-[#14B8A6] mr-2" />
                    <span className="text-[10px] font-bold text-[#0F766E] uppercase tracking-wider">Tanya Jawab</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-6">Pertanyaan Umum (FAQ)</h2>
                  <p className="text-sm md:text-base text-[#64748B] max-w-lg mb-10 mx-auto lg:mx-0">
                    Kami merangkum beberapa hal yang sering ditanyakan oleh calon peserta untuk membantu Anda memahami Marbot LMS lebih cepat.
                  </p>
                </div>

                <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className={`stagger-item transition-all duration-300 rounded-xl border ${
                        openFaq === idx 
                          ? 'border-[#14B8A6] bg-[#F0FDFA] shadow-sm' 
                          : 'border-[#E2E8F0] bg-white hover:border-[#14B8A6]/50'
                      }`}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left group tap-target"
                      >
                        <span className={`text-sm md:text-base font-bold transition-colors ${
                          openFaq === idx ? 'text-[#0F766E]' : 'text-[#0F172A]'
                        }`}>
                          {faq.question}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          openFaq === idx ? 'bg-[#14B8A6] text-white rotate-180' : 'bg-[#F1F5F9] text-[#64748B]'
                        }`}>
                          <ChevronDown size={18} />
                        </div>
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                      }`}>
                        <div className="px-4 sm:px-6 pb-6">
                          <p className="text-xs md:text-sm text-[#475569] leading-relaxed pt-2 border-t border-[#14B8A6]/10">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Help Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-6">
                  <div className="bg-[#0F766E] rounded-xl p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <MessageCircle size={120} />
                    </div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-[#14B8A6] rounded-[10px] flex items-center justify-center mb-6 shadow-lg">
                        <MessageCircle size={24} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">Masih ada pertanyaan?</h3>
                      <p className="text-white/80 text-sm mb-8 leading-relaxed">
                        Tim admin kami siap membantu Anda memberikan informasi lebih detail seputar kursus and platform.
                      </p>
                      <a 
                        href="#" 
                        className="flex items-center justify-center w-full py-4 bg-[#14B8A6] hover:bg-[#14B8A6]/90 text-white font-bold rounded-[10px] transition-all shadow-md group tap-target"
                      >
                        Hubungi Admin <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 sm:p-8">
                    <h4 className="text-sm font-bold text-[#0F172A] mb-4">Saluran Bantuan</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-[10px] border border-[#E2E8F0] shadow-sm">
                        <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                          <Users size={16} />
                        </div>
                        <div className="text-xs truncate">
                          <div className="font-bold">WhatsApp</div>
                          <div className="text-[#64748B]">0812-3456-7890</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-[10px] border border-[#E2E8F0] shadow-sm">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                          <BookOpen size={16} />
                        </div>
                        <div className="text-xs truncate">
                          <div className="font-bold">Email Support</div>
                          <div className="text-[#64748B]">bantuan@marbot.id</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;