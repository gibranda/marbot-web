
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, CheckCircle, ChevronRight, ChevronLeft, Award, FileText, Info, ArrowLeft, Menu, X } from 'lucide-react';
import { MOCK_COURSES } from '../constants';

const CoursePlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];
  
  const [activeModule, setActiveModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('Ringkasan');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load progress from storage
  useEffect(() => {
    const enrollments = JSON.parse(localStorage.getItem('marbot_enrollments') || '[]');
    const current = enrollments.find((e: any) => e.courseId === course.id);
    if (current && current.completedModules) {
      setCompletedModules(current.completedModules);
    }
  }, [course.id]);

  const modules = [
    { title: 'Pendahuluan: Visi Pengelola Masjid', duration: '10:00' },
    { title: 'Standard Operasional Harian', duration: '15:20' },
    { title: 'Teknik Kebersihan Area Utama', duration: '20:45' },
    { title: 'Manajemen Sanitasi & Limbah', duration: '12:30' },
    { title: 'Pelayanan Jamaah & Tamu Allah', duration: '18:15' },
    { title: 'Evaluasi Akhir & Penutup', duration: '05:00' },
  ];

  const handleMarkComplete = () => {
    if (!completedModules.includes(activeModule)) {
      const newCompleted = [...completedModules, activeModule];
      setCompletedModules(newCompleted);
      
      // Save progress to storage
      const enrollments = JSON.parse(localStorage.getItem('marbot_enrollments') || '[]');
      const courseIdx = enrollments.findIndex((e: any) => e.courseId === course.id);
      
      const progressPercent = Math.round((newCompleted.length / modules.length) * 100);
      
      if (courseIdx >= 0) {
        enrollments[courseIdx].progress = progressPercent;
        enrollments[courseIdx].completedModules = newCompleted;
        if (progressPercent === 100) {
          enrollments[courseIdx].status = 'Selesai';
          // Auto add certificate
          const certs = JSON.parse(localStorage.getItem('marbot_certificates') || '[]');
          if (!certs.find((c: any) => c.courseTitle === course.title)) {
            certs.push({
              id: `cert-${Date.now()}`,
              studentName: 'Ahmad', // Mock logged in user name
              courseTitle: course.title,
              certNumber: `MARBOT/CERT/2024/${Math.floor(Math.random()*9000)+1000}`,
              issueDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            });
            localStorage.setItem('marbot_certificates', JSON.stringify(certs));
          }
        }
        localStorage.setItem('marbot_enrollments', JSON.stringify(enrollments));
      }
    }
    
    // Auto next if not last
    if (activeModule < modules.length - 1) {
      setActiveModule(activeModule + 1);
    }
  };

  const progress = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="bg-white min-h-screen flex flex-col overflow-hidden">
      {/* Sub Header for Player */}
      <div className="bg-[#0F172A] text-white py-3 sm:py-4 border-b border-white/10 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
            <Link to="/akun/kursus" className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0 tap-target flex items-center">
              <ArrowLeft size={20} />
            </Link>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-bold truncate max-w-[150px] sm:max-w-md">{course.title}</h2>
              <p className="text-[9px] sm:text-[10px] text-white/60 uppercase font-bold tracking-widest truncate">
                Modul {activeModule + 1}: {modules[activeModule].title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase text-white/60 mb-1">Progress Belajar</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 lg:w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#14B8A6]" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-[#14B8A6]">{progress}%</span>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 bg-white/10 rounded-lg tap-target flex items-center"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Main Player Area */}
        <main className="flex-1 min-h-0 bg-[#F8FAFC] overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
            {/* Video Placeholder */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6 sm:mb-8 relative shadow-2xl group">
              <img src={course.thumbnail} className="w-full h-full object-cover opacity-40 blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/50 group-hover:scale-110 transition-transform cursor-pointer">
                  <Play size={28} fill="white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="bg-black/60 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10">
                   <h4 className="text-white font-bold text-xs sm:text-sm">{modules[activeModule].title}</h4>
                   <p className="text-white/60 text-[10px] mt-1">Video Pembelajaran • {modules[activeModule].duration}</p>
                </div>
              </div>
            </div>

            {/* Completion Banner */}
            {progress === 100 && (
              <div className="bg-[#F0FDFA] border-2 border-[#14B8A6] p-4 sm:p-6 rounded-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#14B8A6] rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                    <Award size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0F766E] text-sm sm:text-base">Kursus Selesai!</h4>
                    <p className="text-xs sm:text-sm text-[#0F766E]/80">Selamat, Anda telah menyelesaikan seluruh materi. Sertifikat Anda kini tersedia.</p>
                  </div>
                </div>
                <Link to="/akun/sertifikat" className="w-full sm:w-auto px-8 py-3 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] transition-all shadow-md text-center tap-target flex items-center justify-center">
                  Lihat Sertifikat
                </Link>
              </div>
            )}

            {/* Navigation & Controls - Stacked on tiny mobile */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 py-4 sm:py-6 border-b border-[#E2E8F0]">
              <button 
                disabled={activeModule === 0}
                onClick={() => setActiveModule(activeModule - 1)}
                className={`order-2 sm:order-1 flex items-center px-4 sm:px-6 py-2.5 sm:py-3 font-bold rounded-xl transition-all text-xs sm:text-sm tap-target ${activeModule === 0 ? 'text-[#CBD5E1] cursor-not-allowed' : 'text-[#64748B] hover:bg-white border border-[#E2E8F0]'}`}
              >
                <ChevronLeft size={18} className="mr-1 sm:mr-2" /> <span className="hidden xs:inline">Sebelumnya</span>
              </button>
              
              <button 
                onClick={handleMarkComplete}
                className="order-1 sm:order-2 w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-3.5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center text-sm tap-target"
              >
                {completedModules.includes(activeModule) ? 'Tandai Selesai' : 'Selesai & Lanjut'} <ChevronRight size={18} className="ml-2" />
              </button>
              
              <button 
                disabled={activeModule === modules.length - 1}
                onClick={() => setActiveModule(activeModule + 1)}
                className={`order-3 flex items-center px-4 sm:px-6 py-2.5 sm:py-3 font-bold rounded-xl transition-all text-xs sm:text-sm tap-target ${activeModule === modules.length - 1 ? 'text-[#CBD5E1] cursor-not-allowed' : 'text-[#64748B] hover:bg-white border border-[#E2E8F0]'}`}
              >
                <span className="hidden xs:inline">Berikutnya</span> <ChevronRight size={18} className="ml-1 sm:ml-2" />
              </button>
            </div>

            {/* Content Tabs - Scrollable on mobile */}
            <div className="space-y-6">
              <div className="flex space-x-6 sm:space-x-8 border-b border-[#E2E8F0] overflow-x-auto scrollbar-hide">
                {['Ringkasan', 'Materi Pendukung', 'Diskusi'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs sm:text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-[#14B8A6] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#14B8A6]' : 'text-[#64748B]'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-sm min-h-[200px]">
                {activeTab === 'Ringkasan' && (
                  <div className="animate-fadeIn">
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-4">Tentang Modul Ini</h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      Pada modul {activeModule + 1}, kita membahas topik {modules[activeModule].title}. 
                      Pastikan Anda memperhatikan poin-poin krusial yang dijelaskan untuk mempermudah implementasi di masjid masing-masing.
                    </p>
                  </div>
                )}
                {activeTab === 'Materi Pendukung' && (
                  <div className="animate-fadeIn space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:border-[#14B8A6] cursor-pointer transition-all">
                       <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                          <div className="p-2 bg-red-50 text-red-500 rounded-lg shrink-0">
                            <FileText size={18} />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-[#475569] truncate">Checklist_Monitoring_Harian.pdf</span>
                       </div>
                       <ChevronRight size={18} className="text-[#94A3B8] shrink-0" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Curriculum - Mobile Overlay */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} fixed inset-y-0 right-0 w-[80%] sm:w-[350px] lg:static lg:translate-x-0 bg-white border-l border-[#E2E8F0] overflow-y-auto z-50 transition-transform duration-300 ease-in-out`}>
          <div className="p-5 sm:p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC] sticky top-0 z-10">
            <h3 className="font-extrabold text-sm sm:text-base text-[#0F172A] flex items-center">
              <Info size={18} className="mr-2 text-[#14B8A6]" /> Kurikulum
            </h3>
            <div className="flex items-center space-x-3">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{modules.length} Modul</span>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-[#64748B] hover:text-[#0F172A] tap-target flex items-center">
                 <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-[#F1F5F9]">
            {modules.map((module, idx) => (
              <button 
                key={idx}
                onClick={() => {
                   setActiveModule(idx);
                   if(window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`w-full p-5 sm:p-6 text-left hover:bg-[#F8FAFC] transition-all flex items-start space-x-3 sm:space-x-4 ${activeModule === idx ? 'bg-[#F0FDFA] border-l-4 border-[#14B8A6]' : ''} tap-target`}
              >
                <div className={`mt-0.5 shrink-0 transition-colors ${completedModules.includes(idx) ? 'text-[#14B8A6]' : 'text-[#CBD5E1]'}`}>
                  <CheckCircle size={18} className="sm:w-5 sm:h-5" fill={completedModules.includes(idx) ? 'currentColor' : 'none'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-1">
                    <span className={`text-xs sm:text-sm font-bold leading-tight block truncate ${activeModule === idx ? 'text-[#0F766E]' : 'text-[#475569]'}`}>
                      {module.title}
                    </span>
                  </div>
                  <div className="flex items-center text-[9px] sm:text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">
                    <Play size={10} className="mr-1" /> {module.duration}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
           <div 
             className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-fadeIn"
             onClick={() => setIsSidebarOpen(false)}
           ></div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;