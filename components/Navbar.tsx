import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogOut, Layout } from 'lucide-react';
import { LOGO_URL } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('marbot_user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      setUser(null);
    }
  }, [location]);

  const navLinks = [
    { name: 'Beranda', path: '/', isAnchor: true, target: 'hero' },
    { name: 'Tentang', path: '/#tentang', isAnchor: true, target: 'tentang' },
    { name: 'Pembelajaran', path: '/katalog' },
    { name: 'Agenda', path: '/agenda' },
    { name: 'Pengajar', path: '/pengajar' },
    { name: 'FAQ', path: '/#faq', isAnchor: true, target: 'faq' },
  ];

  // Handle intersection observer for active section tracking
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = navLinks
      .filter(link => link.isAnchor)
      .map(link => link.target);

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id!);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent, link: any) => {
    if (link.isAnchor) {
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(link.target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      } else {
        // Let normal Link handle navigation to home + hash
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  const isActive = (link: any) => {
    if (location.pathname === '/') {
      if (link.isAnchor) {
        return activeSection === link.target;
      }
      return false;
    }
    return location.pathname.startsWith(link.path) && !link.isAnchor;
  };

  const handleLogout = () => {
    localStorage.removeItem('marbot_user');
    setUser(null);
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Area - Perbesar logo secara proporsional */}
          <Link to="/" onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }} className="flex items-center group py-2">
            <img 
              src={LOGO_URL} 
              alt="Marbot LMS Logo" 
              className="h-8 md:h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = '0';
              }}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-sm font-medium transition-colors hover:text-[#14B8A6] ${
                  isActive(link) ? 'text-[#14B8A6] relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#14B8A6]' : 'text-[#64748B]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="p-2 text-[#64748B] hover:text-[#14B8A6]">
              <Search size={20} />
            </button>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-[#14B8A6] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#14B8A6] flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-[#0F172A] hidden lg:block">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-[#F1F5F9] mb-1">
                      <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Profil Saya</p>
                      <p className="text-sm font-bold text-[#0F172A] truncate">{user.name}</p>
                    </div>
                    <Link 
                      to={user.role === 'admin' ? '/admin' : '/akun'} 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#F8FAFC] hover:text-[#14B8A6] transition-colors"
                    >
                      <Layout size={18} />
                      <span>{user.role === 'admin' ? 'Dashboard Admin' : 'Akun Saya'}</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link 
                  to="/login" 
                  className="px-5 py-2 text-sm font-semibold text-[#14B8A6] border-2 border-[#14B8A6] rounded-xl hover:bg-[#F0FDFA] transition-all"
                >
                  Masuk
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#14B8A6] border-2 border-[#14B8A6] rounded-xl hover:bg-[#0F766E] shadow-sm hover:shadow-md transition-all"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#64748B] hover:text-[#0F172A] p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#E2E8F0] px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleNavClick(e, link)}
              className={`block text-base font-medium transition-colors ${
                isActive(link) ? 'text-[#14B8A6]' : 'text-[#0F172A]'
              } hover:text-[#14B8A6]`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 flex flex-col space-y-3">
            {user ? (
              <>
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/akun'} 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-center text-sm font-semibold text-white bg-[#14B8A6] rounded-xl"
                >
                  Akun Saya
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full py-3 text-center text-sm font-semibold text-red-500 border-2 border-red-500 rounded-xl"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-center text-sm font-semibold text-[#14B8A6] border-2 border-[#14B8A6] rounded-xl"
                >
                  Masuk
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-center text-sm font-semibold text-white bg-[#14B8A6] rounded-xl"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;