"use client";

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
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

import { LOGO_URL } from "@/constants/constants";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Kursus", path: "/admin/kursus", icon: <BookOpen size={20} /> },
    { name: "Agenda", path: "/admin/agenda", icon: <Calendar size={20} /> },
    { name: "Pengajar", path: "/admin/pengajar", icon: <UserCircle size={20} /> },
    { name: "Peserta", path: "/admin/peserta", icon: <Users size={20} /> },
    { name: "Transaksi", path: "/admin/transaksi", icon: <CreditCard size={20} /> },
    { name: "Sertifikat", path: "/admin/sertifikat", icon: <Award size={20} /> },
    { name: "Laporan", path: "/admin/laporan", icon: <BarChart3 size={20} /> },
    { name: "Pengaturan", path: "/admin/pengaturan", icon: <Settings size={20} /> },
  ];

  const getPageTitle = () => {
    const current = menuItems.find((item) => item.path === pathname);
    return current ? current.name : "Dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("marbot_user");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Desktop */}
      <aside className="fixed z-30 hidden h-full w-72 flex-col border-r border-[#E2E8F0] bg-white lg:flex">
        <div className="border-b border-[#F1F5F9] p-8">
          <Link href="/" className="flex items-center">
            <img src={LOGO_URL} alt="Marbot LMS" className="h-11 w-auto object-contain" />
          </Link>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center space-x-3 rounded-xl px-4 py-3 font-bold transition-all ${
                pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path))
                  ? "bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/20"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}

          <div className="mt-6 border-t border-[#F1F5F9] pt-6">
            <Link
              href="/"
              className="tap-target flex items-center space-x-3 rounded-xl px-4 py-3 font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
            >
              <ArrowLeftCircle size={20} />
              <span className="text-sm">Kembali ke Website</span>
            </Link>
          </div>
        </nav>

        <div className="border-t border-[#F1F5F9] p-6">
          <button
            onClick={handleLogout}
            className="tap-target flex w-full items-center space-x-3 rounded-xl px-4 py-3 font-bold text-red-500 transition-all hover:bg-red-50"
          >
            <LogOut size={20} />
            <span className="text-sm">Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Sidebar Mobile (Drawer) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="animate-slideInLeft relative flex h-full w-72 flex-col bg-white">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] p-6">
              <Link href="/" className="flex items-center">
                <img src={LOGO_URL} alt="Marbot LMS" className="h-8 w-auto object-contain" />
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="tap-target flex items-center text-[#64748B]">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 rounded-xl px-4 py-3 font-bold transition-all ${
                    pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path))
                      ? "bg-[#14B8A6] text-white shadow-md"
                      : "text-[#64748B] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
              <Link
                href="/"
                className="tap-target mt-4 flex items-center space-x-3 rounded-xl border-t border-[#F1F5F9] px-4 py-3 pt-4 font-bold text-[#64748B]"
              >
                <ArrowLeftCircle size={20} />
                <span className="text-sm">Kembali ke Website</span>
              </Link>
            </nav>
            <div className="border-t border-[#F1F5F9] p-4">
              <button
                onClick={handleLogout}
                className="tap-target flex w-full items-center space-x-3 rounded-xl px-4 py-3 font-bold text-red-500 transition-all hover:bg-red-50"
              >
                <LogOut size={20} />
                <span className="text-sm">Keluar Akun</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-1 flex-col lg:ml-72">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-6 md:h-20 md:px-10">
          <div className="flex items-center space-x-4">
            <button
              className="tap-target flex items-center p-2 text-[#64748B] lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="max-w-50 truncate text-lg font-extrabold text-[#0F172A] md:max-w-none md:text-xl">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="group relative hidden md:flex">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-[#94A3B8] transition-colors group-focus-within:text-[#14B8A6]"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari data..."
                className="w-64 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-2 pr-4 pl-10 text-sm transition-all outline-none focus:border-[#14B8A6] focus:ring-0"
              />
            </div>
            <button className="tap-target relative flex items-center p-2 text-[#64748B] hover:text-[#14B8A6]">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
            </button>
            <div className="group flex cursor-pointer items-center space-x-3">
              <div className="hidden text-right sm:block">
                <div className="text-xs font-extrabold text-[#0F172A]">Super Admin</div>
                <div className="text-[10px] font-bold tracking-wider text-[#14B8A6] uppercase">Online</div>
              </div>
              <img
                src="https://picsum.photos/seed/admin/100/100"
                className="h-9 w-9 shrink-0 rounded-xl border-2 border-[#F1F5F9] object-cover transition-all group-hover:border-[#14B8A6] md:h-10 md:w-10"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
