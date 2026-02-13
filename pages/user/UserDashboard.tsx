
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Layout, 
  BookOpen, 
  History, 
  Award, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Clock, 
  Star,
  CheckCircle,
  Save,
  Lock,
  ArrowRight,
  TrendingUp,
  Target,
  Calendar,
  Ticket,
  MapPin,
  Globe,
  Menu,
  X,
  ArrowLeftCircle,
  ChevronDown,
  Mail,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { MOCK_COURSES, MOCK_AGENDA, LOGO_URL } from '../../constants';
import CourseCard from '../../components/CourseCard';

const UserDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('marbot_user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const menuItems = [
    { name: 'Ringkasan', path: '/akun', icon: <Layout size={20} /> },
    { name: 'Kursus Saya', path: '/akun/kursus', icon: <BookOpen size={20} /> },
    { name: 'Agenda Saya', path: '/akun/agenda', icon: <Calendar size={20} /> },
    { name: 'Sertifikat', path: '/akun/sertifikat', icon: <Award size={20} /> },
    { name: 'Profil', path: '/akun/profil', icon: <UserIcon size={20} /> },
    { name: 'Pengaturan', path: '/akun/pengaturan', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('marbot_user');
    navigate('/');
  };

  if (!user) return null;

  const currentTab = menuItems.find(item => 
    location.pathname === item.path || (item.path === '/akun' && location.pathname === '/akun/')
  ) || { name: 'Dashboard' };

  const SidebarContent = () => (
    <>
      <div className="p-8 border-b border-[#F1F5F9]">
        <Link to="/" className="flex items-center">
          <img src={LOGO_URL} alt="Marbot LMS" className="h-10 w-auto object-contain" />
        </Link>
      </div>
      
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/akun' && location.pathname === '/akun/');
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive
                ? 'bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/20' 
                : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
        
        <div className="pt-6 mt-6 border-t border-[#F1F5F9] space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#14B8A6] transition-all"
          >
            <ArrowLeftCircle size={20} />
            <span className="text-sm">Kembali ke Website</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all text-left"
          >
            <LogOut size={20} />
            <span className="text-sm">Keluar</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-[#E2E8F0] fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile (Drawer) */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative w-72 bg-white h-full flex flex-col animate-slideInLeft shadow-2xl">
            <div className="p-4 flex justify-end">
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-[#64748B] hover:text-[#0F172A]">
                <X size={24} />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Topbar Internal */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] h-16 md:h-20 flex items-center justify-between px-4 sm:px-6 md:px-10">
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden p-2 text-[#64748B] hover:text-[#0F172A]" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg md:text-xl font-extrabold text-[#0F172A] truncate">
              {currentTab.name}
            </h2>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 sm:space-x-3 p-1 rounded-xl hover:bg-[#F8FAFC] transition-all"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] font-bold text-sm border border-[#14B8A6]/10">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-extrabold text-[#0F172A] leading-none mb-0.5">{user.name}</div>
                <div className="text-[9px] font-bold text-[#14B8A6] uppercase tracking-wider">Peserta</div>
              </div>
              <ChevronDown size={16} className={`text-[#64748B] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setIsDropdownOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-2 z-50 animate-fadeIn">
                  <Link 
                    to="/akun/profil" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-[#F8FAFC] hover:text-[#14B8A6] transition-colors"
                  >
                    <UserIcon size={18} />
                    <span>Akun Saya</span>
                  </Link>
                  <div className="h-px bg-[#F1F5F9] my-1 mx-2"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut size={18} />
                    <span>Keluar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Content Section */}
        <main className="p-4 sm:p-6 md:p-10 flex-1">
          <Routes>
            <Route index element={<Summary user={user} />} />
            <Route path="kursus" element={<MyCourses />} />
            <Route path="agenda" element={<MyAgendas />} />
            <Route path="sertifikat" element={<Certificates />} />
            <Route path="profil" element={<Profile user={user} />} />
            <Route path="riwayat" element={<LearningHistory />} />
            <Route path="pengaturan" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/akun" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// --- Sub-components ---

const Summary = ({ user }: { user: any }) => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    setEnrollments(JSON.parse(localStorage.getItem('marbot_enrollments') || '[]'));
    setCertificates(JSON.parse(localStorage.getItem('marbot_certificates') || '[]'));
    setRegistrations(JSON.parse(localStorage.getItem('marbot_agenda_registrations') || '[]'));
  }, []);

  const activeEnrollments = enrollments.filter(e => e.status === 'Aktif');

  const kpis = [
    { label: 'Kursus Aktif', value: activeEnrollments.length.toString(), icon: <BookOpen className="text-[#14B8A6]" /> },
    { label: 'Agenda', value: registrations.length.toString(), icon: <Calendar className="text-purple-500" /> },
    { label: 'Sertifikat', value: certificates.length.toString(), icon: <Award className="text-amber-500" /> },
  ];

  const recommendations = MOCK_COURSES.slice(2, 5);
  
  const lastEnrollment = activeEnrollments[0];
  const lastCourse = lastEnrollment ? MOCK_COURSES.find(c => c.id === lastEnrollment.courseId) : null;

  return (
    <div className="space-y-8 md:space-y-10 animate-fadeIn">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 md:p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center text-center md:text-left md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center shrink-0 mb-3 md:mb-0">
              {kpi.icon}
            </div>
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-[#0F172A]">{kpi.value}</div>
              <div className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Lanjutkan Belajar */}
      {lastCourse ? (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm p-5 md:p-8">
          <h3 className="text-lg font-bold text-[#0F172A] mb-6 flex items-center">
            <TrendingUp size={20} className="mr-2 text-[#14B8A6]" />
            Lanjutkan Belajar
          </h3>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden relative shrink-0 shadow-md">
              <img src={lastCourse.thumbnail} className="w-full h-full object-cover" alt={lastCourse.title} />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="text-[10px] font-bold text-[#14B8A6] uppercase tracking-[0.2em] mb-2">Sedang Berlangsung</div>
              <h4 className="text-lg md:text-xl font-extrabold text-[#0F172A] mb-4 leading-snug">{lastCourse.title}</h4>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-[#64748B]">Progress Belajar</span>
                  <span className="text-[10px] font-bold text-[#14B8A6]">{lastEnrollment.progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#14B8A6] rounded-full" style={{ width: `${lastEnrollment.progress}%` }}></div>
                </div>
              </div>
              
              <Link to={`/belajar/${lastCourse.id}`} className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#14B8A6] text-white font-bold rounded-[10px] hover:bg-[#0F766E] transition-all text-sm">
                Lanjutkan Sekarang <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-[#E2E8F0] p-8 md:p-12 rounded-2xl text-center">
           <BookOpen className="mx-auto text-[#CBD5E1] mb-4" size={48} />
           <p className="text-[#64748B] font-medium text-sm">Belum ada kursus yang sedang dipelajari.</p>
           <Link to="/katalog" className="text-[#14B8A6] font-bold mt-2 block hover:underline text-sm">Mulai Belajar Sekarang</Link>
        </div>
      )}

      {/* Rekomendasi */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#0F172A] flex items-center">
            <Target size={20} className="mr-2 text-[#14B8A6]" />
            Rekomendasi
          </h3>
          <Link to="/katalog" className="text-xs font-bold text-[#14B8A6] hover:underline">Lihat Semua</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('Aktif');
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    setEnrollments(JSON.parse(localStorage.getItem('marbot_enrollments') || '[]'));
  }, []);

  const filtered = enrollments
    .filter(e => e.status === activeTab)
    .map(e => ({
      ...e,
      data: MOCK_COURSES.find(c => c.id === e.courseId)
    }))
    .filter(e => e.data);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <div className="flex space-x-2 bg-white p-1.5 rounded-xl border border-[#E2E8F0] w-full md:w-max shadow-sm overflow-x-auto scrollbar-hide">
          {['Aktif', 'Selesai'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-6 py-1.5 rounded-[10px] text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-[#14B8A6] text-white shadow-md' : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? filtered.map(item => (
          <div key={item.courseId} className="bg-white border border-[#E2E8F0] rounded-xl p-5 md:p-6 flex flex-col md:flex-row gap-6 hover:border-[#14B8A6] transition-all group shadow-sm">
            <div className="w-full md:w-56 aspect-[16/10] rounded-xl overflow-hidden shrink-0">
              <img src={item.data.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.data.title} />
            </div>
            <div className="flex-1 flex flex-col justify-center w-full">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-[#14B8A6] uppercase tracking-widest mb-2">
                <span>{item.data.instructor.name}</span>
              </div>
              <h4 className="text-lg font-extrabold text-[#0F172A] mb-4 group-hover:text-[#14B8A6] transition-colors leading-tight">{item.data.title}</h4>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{item.progress === 100 ? 'Selesai' : `${item.progress}% Selesai`}</span>
                  <span className="text-[10px] font-bold text-[#14B8A6]">{item.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#14B8A6]" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link to={item.status === 'Selesai' ? `/course/${item.courseId}` : `/belajar/${item.courseId}`} className="w-full sm:w-auto text-center py-2 px-4 border border-[#14B8A6] rounded-lg text-xs font-bold text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white transition-all flex items-center justify-center">
                  {item.status === 'Selesai' ? 'Lihat Detail' : 'Lanjutkan Belajar'} <ChevronRight size={14} className="ml-1" />
                </Link>
                {item.status === 'Selesai' && (
                  <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-lg border border-green-100">
                    <CheckCircle size={10} className="mr-1.5" /> Selesai
                  </span>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10 md:p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-[#F8FAFC] rounded-xl flex items-center justify-center mx-auto mb-6 text-[#94A3B8]">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Belum Ada Kursus</h3>
            <p className="text-[#64748B] mb-8 text-sm">Anda belum memiliki kursus di kategori ini.</p>
            <Link to="/katalog" className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#14B8A6] text-white font-bold rounded-xl shadow-lg shadow-[#14B8A6]/20 text-sm">
              Cari Pembelajaran Sekarang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const MyAgendas = () => {
  const [activeTab, setActiveTab] = useState('Terdaftar');
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    setRegistrations(JSON.parse(localStorage.getItem('marbot_agenda_registrations') || '[]'));
  }, []);

  const filtered = registrations
    .filter(r => r.status === activeTab)
    .map(r => ({
      ...r,
      data: MOCK_AGENDA.find(a => a.id === r.agendaId)
    }))
    .filter(r => r.data);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <div className="flex space-x-2 bg-white p-1.5 rounded-xl border border-[#E2E8F0] w-full md:w-max shadow-sm overflow-x-auto scrollbar-hide">
          {['Terdaftar', 'Selesai'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-6 py-1.5 rounded-[10px] text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-[#14B8A6] text-white shadow-md' : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? filtered.map(item => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8 hover:border-[#14B8A6] transition-all shadow-sm">
            <div className="w-full md:w-56 aspect-video rounded-xl overflow-hidden shrink-0 shadow-sm">
              <img src={item.data.cover} className="w-full h-full object-cover" alt={item.data.title} />
            </div>
            <div className="flex-1 w-full">
               <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest ${item.data.type === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>{item.data.type}</span>
                  <span className="px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest bg-green-100 text-green-600">{item.status}</span>
               </div>
               <h4 className="text-lg md:text-xl font-extrabold text-[#0F172A] mb-4 leading-tight">{item.data.title}</h4>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-8">
                  <div className="flex items-center text-xs text-[#64748B]">
                     <Calendar size={14} className="text-[#14B8A6] mr-2 shrink-0" />
                     <span className="font-medium">{item.data.date}</span>
                  </div>
                  <div className="flex items-center text-xs text-[#64748B]">
                     <Clock size={14} className="text-[#14B8A6] mr-2 shrink-0" />
                     <span className="font-medium">{item.data.time} WIB</span>
                  </div>
                  <div className="flex items-center text-xs text-[#64748B] sm:col-span-2">
                     {item.data.type === 'Online' ? <Globe size={14} className="mr-2 shrink-0 text-[#14B8A6]" /> : <MapPin size={14} className="mr-2 shrink-0 text-[#14B8A6]" />}
                     <span className="truncate font-medium">{item.data.type === 'Online' ? item.data.locationName : item.data.location}</span>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-3">
                  {item.data.type === 'Online' ? (
                    <a href={item.data.location} target="_blank" rel="noreferrer" className="flex-1 py-3.5 bg-[#14B8A6] text-white font-bold rounded-xl text-xs hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center">
                       <Globe size={14} className="mr-2" /> Masuk Workshop
                    </a>
                  ) : (
                    <button className="flex-1 py-3.5 bg-[#14B8A6] text-white font-bold rounded-xl text-xs hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center">
                       <Ticket size={14} className="mr-2" /> Lihat E-Tiket
                    </button>
                  )}
                  <Link to={`/agenda/${item.data.slug}`} className="flex-1 py-3.5 border-2 border-[#E2E8F0] text-[#475569] font-bold rounded-xl text-xs hover:bg-[#F8FAFC] transition-all flex items-center justify-center">
                    Detail Info
                  </Link>
               </div>
            </div>
          </div>
        )) : (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10 md:p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-[#F8FAFC] rounded-xl flex items-center justify-center mx-auto mb-6 text-[#94A3B8]">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Belum Ada Agenda</h3>
            <p className="text-[#64748B] mb-8 text-sm">Anda belum mendaftar di workshop mana pun.</p>
            <Link to="/agenda" className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#14B8A6] text-white font-bold rounded-xl shadow-lg shadow-[#14B8A6]/20 text-sm">
              Lihat Daftar Agenda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Certificates = () => {
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    setCertificates(JSON.parse(localStorage.getItem('marbot_certificates') || '[]'));
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.length > 0 ? certificates.map(cert => (
          <div key={cert.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group border-t-4 border-t-[#14B8A6]">
            <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] mb-6 shadow-sm">
              <Award size={24} />
            </div>
            <h4 className="font-extrabold text-[#0F172A] mb-2 leading-snug line-clamp-2">{cert.courseTitle}</h4>
            <div className="space-y-2 mb-8">
               <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Nomor Sertifikat</div>
               <div className="text-xs font-bold text-[#475569]">{cert.certNumber}</div>
               <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mt-4">Diterbitkan</div>
               <div className="text-xs font-bold text-[#475569]">{cert.issueDate}</div>
            </div>
            <button className="w-full py-3 bg-[#F8FAFC] text-[#14B8A6] font-bold rounded-xl text-xs hover:bg-[#14B8A6] hover:text-white transition-all flex items-center justify-center">
              Unduh Sertifikat (PDF)
            </button>
          </div>
        )) : (
          <div className="col-span-full bg-white border border-[#E2E8F0] rounded-2xl p-16 text-center shadow-sm">
            <Award className="mx-auto text-[#CBD5E1] mb-6" size={64} />
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Belum Ada Sertifikat</h3>
            <p className="text-[#64748B] text-sm">Selesaikan kursus Anda untuk mendapatkan sertifikat resmi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Profile = ({ user }: { user: any }) => {
  return (
    <div className="max-w-2xl animate-fadeIn space-y-8">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm">
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-24 h-24 rounded-2xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] font-extrabold text-3xl border-2 border-[#14B8A6]/10 shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-[#0F172A] mb-1">{user.name}</h3>
            <p className="text-[#14B8A6] font-bold uppercase tracking-widest text-xs">Peserta Terdaftar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Nama Lengkap</label>
            <div className="px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-bold text-[#0F172A]">{user.name}</div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Email</label>
            <div className="px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-bold text-[#0F172A]">{user.email}</div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Role</label>
            <div className="px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-bold text-[#0F172A] uppercase">{user.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LearningHistory = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm text-center animate-fadeIn">
      <History className="mx-auto text-[#CBD5E1] mb-6" size={64} />
      <h3 className="text-xl font-bold text-[#0F172A] mb-2">Riwayat Pembelajaran</h3>
      <p className="text-[#64748B] text-sm">Fitur riwayat aktivitas sedang dikembangkan.</p>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="max-w-2xl animate-fadeIn space-y-8">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm">
        <h3 className="text-lg font-bold text-[#0F172A] mb-6 flex items-center">
          <Lock size={18} className="mr-2 text-[#14B8A6]" /> Keamanan Akun
        </h3>
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-2">Password Lama</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:border-[#14B8A6] outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-2">Password Baru</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:border-[#14B8A6] outline-none" />
          </div>
          <button className="w-full py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] transition-all shadow-lg shadow-[#14B8A6]/20">
            Perbarui Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
