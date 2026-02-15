
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogOut, Layout, MessageSquare, BookOpen, Calendar, UserCircle, ChevronRight } from 'lucide-react';
import { LOGO_URL, MOCK_COURSES, MOCK_AGENDA, MOCK_INSTRUCTORS, MOCK_FORUM_THREADS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Search State
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    courses: any[],
    agendas: any[],
    instructors: any[],
    forums: any[]
  }>({ courses: [], agendas: [], instructors: [], forums: [] });
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Handle Search Input Expansion & Focus
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Click outside and escape handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (!searchQuery.trim()) {
          setIsExpanded(false);
        }
      }
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
        setSearchQuery('');
      }
      // Shortcut "/" to search
      if (event.key === '/' && !isExpanded && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault();
        setIsExpanded(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchQuery, isExpanded]);

  // Instant Search Logic (Debounced)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        const q = searchQuery.toLowerCase();
        
        const courses = MOCK_COURSES.filter(c => 
          c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
        ).slice(0, 3);
        
        const agendas = MOCK_AGENDA.filter(a => 
          a.title.toLowerCase().includes(q) || a.locationName.toLowerCase().includes(q)
        ).slice(0, 3);
        
        const instructors = MOCK_INSTRUCTORS.filter(i => 
          i.name.toLowerCase().includes(q) || i.role.toLowerCase().includes(q)
        ).slice(0, 3);
        
        const forums = MOCK_FORUM_THREADS.filter(f => 
          f.title.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
        ).slice(0, 3);

        setSearchResults({ courses, agendas, instructors, forums });
      } else {
        setSearchResults({ courses: [], agendas: [], instructors: [], forums: [] });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsExpanded(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Beranda', path: '/', isAnchor: true, target: 'hero' },
    { name: 'Tentang', path: '/#tentang', isAnchor: true, target: 'tentang' },
    { name: 'Pembelajaran', path: '/katalog' },
    { name: 'Agenda', path: '/agenda' },
    { name: 'Pengajar', path: '/pengajar' },
    { name: 'Forum Diskusi', path: '/forum' },
    { name: 'FAQ', path: '/#faq', isAnchor: true, target: 'faq' },
  ];

  // Handle active section tracking
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }
    const sections = navLinks.filter(link => link.isAnchor).map(link => link.target);
    const observerOptions = { root: null, rootMargin: '-80px 0px -40% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
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
      }
    } else {
      setIsOpen(false);
    }
  };

  const isActive = (link: any) => {
    if (location.pathname === '/') {
      if (link.isAnchor) return activeSection === link.target;
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

  const hasAnyResults = searchQuery.trim().length >= 2 && (
    searchResults.courses.length > 0 || 
    searchResults.agendas.length > 0 || 
    searchResults.instructors.length > 0 || 
    searchResults.forums.length > 0
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Area */}
          <Link to="/" onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }} className="flex items-center group py-2 shrink-0">
            <img 
              src={LOGO_URL} 
              alt="Marbot LMS Logo" 
              className="h-8 md:h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </Link>

          {/* Desktop Links & Search */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-4 lg:space-x-6">
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
            </div>

            {/* Expandable Universal Search */}
            <div className="relative flex items-center" ref={searchRef}>
              <form 
                onSubmit={handleSearchSubmit} 
                className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden ${
                  isExpanded 
                    ? 'bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 w-48 lg:w-64 xl:w-80' 
                    : 'w-10'
                }`}
              >
                <button 
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label="Cari"
                  className="p-2 text-[#64748B] hover:text-[#14B8A6] shrink-0 tap-target flex items-center justify-center"
                >
                  <Search size={20} className={isExpanded ? 'text-[#14B8A6]' : ''} />
                </button>
                <input 
                  ref={inputRef}
                  type="text" 
                  aria-label="Pencarian universal"
                  placeholder="Cari..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-transparent text-sm focus:ring-0 outline-none transition-all duration-300 ease-in-out ${
                    isExpanded ? 'opacity-100 w-full ml-1 py-2' : 'opacity-0 w-0 p-0'
                  }`}
                />
              </form>

              {/* Instant Results Dropdown */}
              {isExpanded && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full mt-3 right-0 w-[320px] md:w-[400px] bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn z-[60]">
                  <div className="max-h-[480px] overflow-y-auto scrollbar-hide">
                    {!hasAnyResults ? (
                      <div className="p-8 text-center">
                        <p className="text-sm text-[#64748B]">Tidak ditemukan.<br/>Coba kata kunci lain.</p>
                      </div>
                    ) : (
                      <div className="p-4 space-y-6">
                        {searchResults.courses.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest px-2">Pembelajaran</h4>
                            {searchResults.courses.map(course => (
                              <Link 
                                key={course.id} to={`/course/${course.id}`} 
                                onClick={() => { setIsExpanded(false); setSearchQuery(''); }}
                                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#F8FAFC] group transition-all"
                              >
                                <div className="w-10 h-10 rounded-lg bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] shrink-0">
                                  <BookOpen size={18} />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#14B8A6]">{course.title}</div>
                                  <div className="text-[10px] text-[#64748B]">{course.instructor.name}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        {searchResults.agendas.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest px-2">Agenda</h4>
                            {searchResults.agendas.map(agenda => (
                              <Link 
                                key={agenda.id} to={`/agenda/${agenda.slug}`} 
                                onClick={() => { setIsExpanded(false); setSearchQuery(''); }}
                                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#F8FAFC] group transition-all"
                              >
                                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                                  <Calendar size={18} />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#14B8A6]">{agenda.title}</div>
                                  <div className="text-[10px] text-[#64748B]">{agenda.date}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        {searchResults.instructors.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest px-2">Pengajar</h4>
                            {searchResults.instructors.map(ins => (
                              <Link 
                                key={ins.id} to={`/pengajar/${ins.id}`} 
                                onClick={() => { setIsExpanded(false); setSearchQuery(''); }}
                                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#F8FAFC] group transition-all"
                              >
                                <img src={ins.avatar} className="w-10 h-10 rounded-full object-cover shrink-0" />
                                <div className="min-w-0">
                                  <div className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#14B8A6]">{ins.name}</div>
                                  <div className="text-[10px] text-[#64748B]">{ins.role}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        {searchResults.forums.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest px-2">Forum</h4>
                            {searchResults.forums.map(forum => (
                              <Link 
                                key={forum.id} to={`/forum/${forum.slug}`} 
                                onClick={() => { setIsExpanded(false); setSearchQuery(''); }}
                                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#F8FAFC] group transition-all"
                              >
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                  <MessageSquare size={18} />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#14B8A6]">{forum.title}</div>
                                  <div className="text-[10px] text-[#64748B]">{forum.category}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {hasAnyResults && (
                    <Link 
                      to={`/search?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => { setIsExpanded(false); setSearchQuery(''); }}
                      className="block p-4 bg-[#F8FAFC] text-center text-xs font-bold text-[#14B8A6] hover:bg-[#F0FDFA] transition-colors border-t border-[#E2E8F0]"
                    >
                      Lihat semua hasil untuk "{searchQuery}"
                    </Link>
                  )}
                </div>
              )}
            </div>
            
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
                <Link to="/login" className="px-5 py-2 text-sm font-semibold text-[#14B8A6] border-2 border-[#14B8A6] rounded-xl hover:bg-[#F0FDFA] transition-all">Masuk</Link>
                <Link to="/register" className="px-5 py-2 text-sm font-semibold text-white bg-[#14B8A6] border-2 border-[#14B8A6] rounded-xl hover:bg-[#0F766E] shadow-sm hover:shadow-md transition-all">Daftar</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={() => navigate('/search')} className="p-2 text-[#64748B]"><Search size={24} /></button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#64748B] hover:text-[#0F172A] p-2">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
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
                <Link to={user.role === 'admin' ? '/admin' : '/akun'} onClick={() => setIsOpen(false)} className="w-full py-3 text-center text-sm font-semibold text-white bg-[#14B8A6] rounded-xl">Akun Saya</Link>
                <button onClick={handleLogout} className="w-full py-3 text-center text-sm font-semibold text-red-500 border-2 border-red-500 rounded-xl">Keluar</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-3 text-center text-sm font-semibold text-[#14B8A6] border-2 border-[#14B8A6] rounded-xl">Masuk</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full py-3 text-center text-sm font-semibold text-white bg-[#14B8A6] rounded-xl">Daftar</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
