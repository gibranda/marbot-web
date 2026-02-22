/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  Layout,
  BookOpen,
  Award,
  User as UserIcon,
  Settings,
  LogOut,
  Calendar,
  Menu,
  X,
  ArrowLeftCircle,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { LOGO_URL } from "@/constants/constants";

interface AkunLayoutProps {
  children?: React.ReactNode;
}

const AkunLayout: React.FC<AkunLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("marbot_user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const menuItems = [
    { id: "ringkasan", name: "Ringkasan", href: "/akun", icon: <Layout size={20} /> },
    { id: "kursus", name: "Kursus Saya", href: "/akun/kursus", icon: <BookOpen size={20} /> },
    { id: "agenda", name: "Agenda Saya", href: "/akun/agenda", icon: <Calendar size={20} /> },
    { id: "sertifikat", name: "Sertifikat", href: "/akun/sertifikat", icon: <Award size={20} /> },
    { id: "profil", name: "Profil", href: "/akun/profil", icon: <UserIcon size={20} /> },
    { id: "pengaturan", name: "Pengaturan", href: "/akun/pengaturan", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("marbot_user");
    router.push("/");
  };

  if (!user) return null;

  const currentTab = menuItems.find((item) =>
    item.id === "ringkasan" ? pathname === "/akun" : pathname?.startsWith(`/akun/${item.id}`),
  ) || { name: "Dashboard" };

  const sidebarContent = (
    <>
      <div className="border-b border-[#F1F5F9] p-8">
        <Link href="/" className="flex items-center">
          <img src={LOGO_URL} alt="Marbot LMS" className="h-10 w-auto object-contain" />
        </Link>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-6">
        {menuItems.map((item) => {
          const isActive = item.id === "ringkasan" ? pathname === "/akun" : pathname?.startsWith(`/akun/${item.id}`);
          return (
            <Link
              href={item.href}
              key={item.name}
              onClick={() => {
                setIsSidebarOpen(false);
              }}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left font-bold transition-all ${
                isActive
                  ? "bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/20"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}

        <div className="mt-6 space-y-2 border-t border-[#F1F5F9] pt-6">
          <Link
            href="/"
            className="flex items-center space-x-3 rounded-xl px-4 py-3 font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
          >
            <ArrowLeftCircle size={20} />
            <span className="text-sm">Kembali ke Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left font-bold text-red-500 transition-all hover:bg-red-50"
          >
            <LogOut size={20} />
            <span className="text-sm">Keluar</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Desktop */}
      <aside className="fixed z-30 hidden h-full w-72 flex-col border-r border-[#E2E8F0] bg-white lg:flex">
        {sidebarContent}
      </aside>

      {/* Sidebar Mobile (Drawer) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          <div
            className="animate-fadeIn fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="animate-slideInLeft relative flex h-full w-72 flex-col bg-white shadow-2xl">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-[#64748B] hover:text-[#0F172A]">
                <X size={24} />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-1 flex-col lg:ml-72">
        {/* Topbar Internal */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 sm:px-6 md:h-20 md:px-10">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-[#64748B] hover:text-[#0F172A] lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="truncate text-lg font-extrabold text-[#0F172A] md:text-xl">{currentTab.name}</h2>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 rounded-xl p-1 transition-all hover:bg-[#F8FAFC] sm:space-x-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#14B8A6]/10 bg-[#F0FDFA] text-sm font-bold text-[#14B8A6] md:h-10 md:w-10">
                {user.name.charAt(0)}
              </div>
              <div className="hidden text-left sm:block">
                <div className="mb-0.5 text-xs leading-none font-extrabold text-[#0F172A]">{user.name}</div>
                <div className="text-[9px] font-bold tracking-wider text-[#14B8A6] uppercase">Peserta</div>
              </div>
              <ChevronDown
                size={16}
                className={`text-[#64748B] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setIsDropdownOpen(false)}></div>
                <div className="animate-fadeIn absolute right-0 z-50 mt-2 w-48 rounded-xl border border-[#E2E8F0] bg-white py-2 shadow-xl">
                  <button
                    onClick={() => {
                      router.push("/akun/profil");
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center space-x-3 px-4 py-2.5 text-left text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
                  >
                    <UserIcon size={18} />
                    <span>Akun Saya</span>
                  </button>
                  <div className="mx-2 my-1 h-px bg-[#F1F5F9]"></div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center space-x-3 px-4 py-2.5 text-left text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
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
        <main className="flex-1 p-4 sm:p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};

export default AkunLayout;
