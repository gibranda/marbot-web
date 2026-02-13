
import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  UserCircle, 
  CreditCard, 
  Award, 
  BarChart3, 
  Settings, 
  ArrowLeftCircle, 
  Bell, 
  Search,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { LOGO_URL } from '../constants';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Kursus', path: '/admin/kursus', icon: <BookOpen size={20} /> },
    { name: 'Agenda', path: '/admin/agenda', icon: <Calendar size={20} /> },
    { name: 'Pengajar', path: '/admin/pengajar', icon: <UserCircle size={20} /> },
    { name: 'Peserta', path: '/admin/peserta', icon: <Users size={20} /> },
    { name: 'Transaksi', path: '/admin/transaksi', icon: <CreditCard size={20} /> },
    { name: 'Sertifikat', path: '/admin/sertifikat', icon: <Award size={20} /> },
    { name: 'Laporan', path: '/admin/laporan', icon: <BarChart3 size={20} /> },
    { name: 'Pengaturan', path: '/admin/pengaturan', icon: <Settings size={20} /> },
  ];

  const getPageTitle = () => {
    const current = menuItems.find(item => item.path === location.pathname);
    return current ? current.name : 'Dashboard';
  };

  const handleLogout = () => {
    localStorage.removeItem('marbot_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-[#E2E8F0] fixed h-full z-30">
        <div className="p-8 border-b border-[#F1F5F9]">
          <Link to="/" className="flex items-center">
            <img src={LOGO_URL} alt="Marbot LMS" className="h-11 w-auto object-contain" />
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                ? 'bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/20' 
                : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
          
          <div className="pt-6 mt-6 border-t border-[#F1F5F9]">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#14B8A6] transition-all tap-target flex items-center"
            >
              <ArrowLeftCircle size={20} />
              <span className="text-sm">Kembali ke Website</span>
            </Link>
          </div>
        </nav>

        <div className="p-6 border-t border-[#F1F5F9]">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all tap-target"
          >
            <LogOut size={20} />
            <span className="text-sm">Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Sidebar Mobile (Drawer) */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative w-72 bg-white h-full flex flex-col animate-slideInLeft">
            <div className="p-6 border-b border-[#F1F5F9] flex justify-between items-center">
              <Link to="/" className="flex items-center">
                <img src={LOGO_URL} alt="Marbot LMS" className="h-8 w-auto object-contain" />
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="text-[#64748B] tap-target flex items-center">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                    location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                    ? 'bg-[#14B8A6] text-white shadow-md' 
                    : 'text-[#64748B] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-[#64748B] mt-4 pt-4 border-t border-[#F1F5F9] tap-target flex items-center"
              >
                <ArrowLeftCircle size={20} />
                <span className="text-sm">Kembali ke Website</span>
              </Link>
            </nav>
            <div className="p-4 border-t border-[#F1F5F9]">
               <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all tap-target flex items-center"
              >
                <LogOut size={20} />
                <span className="text-sm">Keluar Akun</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#E2E8F0] h-16 md:h-20 flex items-center justify-between px-6 md:px-10">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 text-[#64748B] tap-target flex items-center" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-lg md:text-xl font-extrabold text-[#0F172A] truncate max-w-[200px] md:max-w-none">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#14B8A6] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Cari data..."
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] pl-10 pr-4 py-2 text-sm focus:border-[#14B8A6] focus:ring-0 outline-none w-64 transition-all"
              />
            </div>
            <button className="p-2 text-[#64748B] hover:text-[#14B8A6] relative tap-target flex items-center">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-extrabold text-[#0F172A]">Super Admin</div>
                <div className="text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider">Online</div>
              </div>
              <img src="https://picsum.photos/seed/admin/100/100" className="w-9 h-9 md:w-10 md:h-10 rounded-xl object-cover border-2 border-[#F1F5F9] group-hover:border-[#14B8A6] transition-all shrink-0" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-6 md:p-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
