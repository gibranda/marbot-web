/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Menu, X, Search, LogOut, Layout } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LOGO_URL } from "@/constants/constants";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("marbot_user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      setUser(null);
    }
  }, [pathname]);

  const navLinks = [
    { name: "Beranda", path: "/", isAnchor: true, target: "hero" },
    { name: "Tentang", path: "/#tentang", isAnchor: true, target: "tentang" },
    { name: "Pembelajaran", path: "/katalog" },
    { name: "Agenda", path: "/agenda" },
    { name: "Pengajar", path: "/pengajar" },
    { name: "FAQ", path: "/#faq", isAnchor: true, target: "faq" },
  ];

  // Handle intersection observer for active section tracking
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = navLinks.filter((link) => link.isAnchor).map((link) => link.target);

    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -40% 0px",
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
      } else {
        // Let normal Link handle navigation to home + hash
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  const isActive = (link: any) => {
    if (pathname === "/") {
      if (link.isAnchor) {
        return activeSection === link.target;
      }
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

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#E2E8F0] bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo Area - Perbesar logo secara proporsional */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex items-center py-2"
          >
            <img
              src={LOGO_URL}
              alt="Marbot LMS Logo"
              className="h-8 w-auto object-contain transition-opacity group-hover:opacity-90 md:h-10"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0";
              }}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center space-x-8 md:flex">
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
            <button className="p-2 text-[#64748B] hover:text-[#14B8A6]">
              <Search size={20} />
            </button>

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
          <div className="flex items-center md:hidden">
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
