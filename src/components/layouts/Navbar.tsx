/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Menu, X, Search, LogOut, Layout, MessageSquare, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

import { LOGO_URL, MOCK_COURSES, MOCK_AGENDA, MOCK_INSTRUCTORS, MOCK_FORUM_THREADS } from "@/constants/constants";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Search State
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    courses: any[];
    agendas: any[];
    instructors: any[];
    forums: any[];
  }>({ courses: [], agendas: [], instructors: [], forums: [] });

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userStr = localStorage.getItem("marbot_user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      setUser(null);
    }
  }, [pathname, searchParams]);

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
      if (event.key === "Escape") {
        setIsExpanded(false);
        setSearchQuery("");
      }
      // Shortcut "/" to search
      if (
        event.key === "/" &&
        !isExpanded &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        setIsExpanded(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchQuery, isExpanded]);

  // Instant Search Logic (Debounced)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        const q = searchQuery.toLowerCase();

        const courses = MOCK_COURSES.filter(
          (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q),
        ).slice(0, 3);

        const agendas = MOCK_AGENDA.filter(
          (a) => a.title.toLowerCase().includes(q) || a.locationName.toLowerCase().includes(q),
        ).slice(0, 3);

        const instructors = MOCK_INSTRUCTORS.filter(
          (i) => i.name.toLowerCase().includes(q) || i.role.toLowerCase().includes(q),
        ).slice(0, 3);

        const forums = MOCK_FORUM_THREADS.filter(
          (f) => f.title.toLowerCase().includes(q) || f.category.toLowerCase().includes(q),
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
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsExpanded(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Beranda", path: "/", isAnchor: true, target: "hero" },
    { name: "Tentang", path: "/#tentang", isAnchor: true, target: "tentang" },
    { name: "Pembelajaran", path: "/katalog" },
    { name: "Agenda", path: "/agenda" },
    { name: "Pengajar", path: "/pengajar" },
    { name: "Forum Diskusi", path: "/forum" },
    { name: "FAQ", path: "/#faq", isAnchor: true, target: "faq" },
  ];

  // Handle active section tracking
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }
    const sections = navLinks.filter((link) => link.isAnchor).map((link) => link.target);
    const observerOptions = { root: null, rootMargin: "-80px 0px -40% 0px", threshold: 0 };
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
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent, link: any) => {
    if (link.isAnchor) {
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(link.target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }
      }
    } else {
      setIsOpen(false);
    }
  };

  const isActive = (link: any) => {
    if (pathname === "/") {
      if (link.isAnchor) return activeSection === link.target;
      return false;
    }
    return pathname.startsWith(link.path) && !link.isAnchor;
  };

  const handleLogout = () => {
    localStorage.removeItem("marbot_user");
    setUser(null);
    router.push("/");
    setIsUserMenuOpen(false);
  };

  const hasAnyResults =
    searchQuery.trim().length >= 2 &&
    (searchResults.courses.length > 0 ||
      searchResults.agendas.length > 0 ||
      searchResults.instructors.length > 0 ||
      searchResults.forums.length > 0);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo Area */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex shrink-0 items-center py-2"
          >
            <img
              src={LOGO_URL}
              alt="Marbot LMS Logo"
              className="h-8 w-auto object-contain transition-opacity group-hover:opacity-90 md:h-10"
            />
          </Link>

          {/* Desktop Links & Search */}
          <div className="hidden items-center space-x-6 md:flex lg:space-x-8">
            <div className="flex items-center space-x-4 lg:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-sm font-medium transition-colors hover:text-[#14B8A6] ${
                    isActive(link)
                      ? 'relative text-[#14B8A6] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#14B8A6] after:content-[""]'
                      : "text-[#64748B]"
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
                className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "w-48 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 lg:w-64 xl:w-80" : "w-10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label="Cari"
                  className="tap-target flex shrink-0 items-center justify-center p-2 text-[#64748B] hover:text-[#14B8A6]"
                >
                  <Search size={20} className={isExpanded ? "text-[#14B8A6]" : ""} />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  aria-label="Pencarian universal"
                  placeholder="Cari..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-transparent text-sm transition-all duration-300 ease-in-out outline-none focus:ring-0 ${
                    isExpanded ? "ml-1 w-full py-2 opacity-100" : "w-0 p-0 opacity-0"
                  }`}
                />
              </form>

              {/* Instant Results Dropdown */}
              {isExpanded && searchQuery.trim().length >= 2 && (
                <div className="animate-fadeIn absolute top-full right-0 z-[60] mt-3 w-[320px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl md:w-[400px]">
                  <div className="scrollbar-hide max-h-[480px] overflow-y-auto">
                    {!hasAnyResults ? (
                      <div className="p-8 text-center">
                        <p className="text-sm text-[#64748B]">
                          Tidak ditemukan.
                          <br />
                          Coba kata kunci lain.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6 p-4">
                        {searchResults.courses.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="px-2 text-[10px] font-extrabold tracking-widest text-[#94A3B8] uppercase">
                              Pembelajaran
                            </h4>
                            {searchResults.courses.map((course) => (
                              <Link
                                key={course.id}
                                href={`/course/${course.id}`}
                                onClick={() => {
                                  setIsExpanded(false);
                                  setSearchQuery("");
                                }}
                                className="group flex items-center space-x-3 rounded-xl p-2 transition-all hover:bg-[#F8FAFC]"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0FDFA] text-[#14B8A6]">
                                  <BookOpen size={18} />
                                </div>
                                <div className="min-w-0">
                                  <div className="truncate text-sm font-bold text-[#0F172A] group-hover:text-[#14B8A6]">
                                    {course.title}
                                  </div>
                                  <div className="text-[10px] text-[#64748B]">{course.instructor.name}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        {searchResults.agendas.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="px-2 text-[10px] font-extrabold tracking-widest text-[#94A3B8] uppercase">
                              Agenda
                            </h4>
                            {searchResults.agendas.map((agenda) => (
                              <Link
                                key={agenda.id}
                                href={`/agenda/${agenda.slug}`}
                                onClick={() => {
                                  setIsExpanded(false);
                                  setSearchQuery("");
                                }}
                                className="group flex items-center space-x-3 rounded-xl p-2 transition-all hover:bg-[#F8FAFC]"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                                  <Calendar size={18} />
                                </div>
                                <div className="min-w-0">
                                  <div className="truncate text-sm font-bold text-[#0F172A] group-hover:text-[#14B8A6]">
                                    {agenda.title}
                                  </div>
                                  <div className="text-[10px] text-[#64748B]">{agenda.date}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        {searchResults.instructors.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="px-2 text-[10px] font-extrabold tracking-widest text-[#94A3B8] uppercase">
                              Pengajar
                            </h4>
                            {searchResults.instructors.map((ins) => (
                              <Link
                                key={ins.id}
                                href={`/pengajar/${ins.id}`}
                                onClick={() => {
                                  setIsExpanded(false);
                                  setSearchQuery("");
                                }}
                                className="group flex items-center space-x-3 rounded-xl p-2 transition-all hover:bg-[#F8FAFC]"
                              >
                                <img src={ins.avatar} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                                <div className="min-w-0">
                                  <div className="truncate text-sm font-bold text-[#0F172A] group-hover:text-[#14B8A6]">
                                    {ins.name}
                                  </div>
                                  <div className="text-[10px] text-[#64748B]">{ins.role}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                        {searchResults.forums.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="px-2 text-[10px] font-extrabold tracking-widest text-[#94A3B8] uppercase">
                              Forum
                            </h4>
                            {searchResults.forums.map((forum) => (
                              <Link
                                key={forum.id}
                                href={`/forum/${forum.slug}`}
                                onClick={() => {
                                  setIsExpanded(false);
                                  setSearchQuery("");
                                }}
                                className="group flex items-center space-x-3 rounded-xl p-2 transition-all hover:bg-[#F8FAFC]"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                                  <MessageSquare size={18} />
                                </div>
                                <div className="min-w-0">
                                  <div className="truncate text-sm font-bold text-[#0F172A] group-hover:text-[#14B8A6]">
                                    {forum.title}
                                  </div>
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
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        setIsExpanded(false);
                        setSearchQuery("");
                      }}
                      className="block border-t border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center text-xs font-bold text-[#14B8A6] transition-colors hover:bg-[#F0FDFA]"
                    >
                      Lihat semua hasil untuk {searchQuery}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="group flex items-center space-x-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-1.5 transition-all hover:border-[#14B8A6]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14B8A6] text-sm font-bold text-white">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden text-sm font-bold text-[#0F172A] lg:block">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="animate-fadeIn absolute right-0 z-50 mt-3 w-56 rounded-xl border border-[#E2E8F0] bg-white py-2 shadow-xl">
                    <div className="mb-1 border-b border-[#F1F5F9] px-4 py-3">
                      <p className="mb-1 text-xs font-bold tracking-widest text-[#94A3B8] uppercase">Profil Saya</p>
                      <p className="truncate text-sm font-bold text-[#0F172A]">{user.name}</p>
                    </div>
                    <Link
                      href={user.role === "admin" ? "/admin" : "/akun"}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
                    >
                      <Layout size={18} />
                      <span>{user.role === "admin" ? "Dashboard Admin" : "Akun Saya"}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-4">
                <Link
                  href="/login"
                  className="rounded-xl border-2 border-[#14B8A6] px-5 py-2 text-sm font-semibold text-[#14B8A6] transition-all hover:bg-[#F0FDFA]"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl border-2 border-[#14B8A6] bg-[#14B8A6] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0F766E] hover:shadow-md"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button onClick={() => router.push("/search")} className="p-2 text-[#64748B]">
              <Search size={24} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#64748B] hover:text-[#0F172A]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="space-y-4 border-t border-[#E2E8F0] bg-white px-4 py-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavClick(e, link)}
              className={`block text-base font-medium transition-colors ${
                isActive(link) ? "text-[#14B8A6]" : "text-[#0F172A]"
              } hover:text-[#14B8A6]`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col space-y-3 pt-4">
            {user ? (
              <>
                <Link
                  href={user.role === "admin" ? "/admin" : "/akun"}
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl bg-[#14B8A6] py-3 text-center text-sm font-semibold text-white"
                >
                  Akun Saya
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl border-2 border-red-500 py-3 text-center text-sm font-semibold text-red-500"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl border-2 border-[#14B8A6] py-3 text-center text-sm font-semibold text-[#14B8A6]"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl bg-[#14B8A6] py-3 text-center text-sm font-semibold text-white"
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
