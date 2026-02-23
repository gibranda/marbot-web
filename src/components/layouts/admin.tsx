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
  Menu,
  X,
  LogOut,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";

import { LOGO_URL } from "@/constants/constants";
import { IMAGE_DEFAULT_AVATAR } from "@/constants/uri-image";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

interface User {
  name?: string;
  avatar?: string;
  role?: string;
}

type MenuItemConfig = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const MENU_ITEM_CONFIG: Omit<MenuItemConfig, "icon">[] = [
  { name: "Dashboard", path: "/admin" },
  { name: "Kursus", path: "/admin/kursus" },
  { name: "Agenda", path: "/admin/agenda" },
  { name: "Pengajar", path: "/admin/pengajar" },
  { name: "Peserta", path: "/admin/peserta" },
  { name: "Transaksi", path: "/admin/transaksi" },
  { name: "Sertifikat", path: "/admin/sertifikat" },
  { name: "Laporan", path: "/admin/laporan" },
  { name: "Pengaturan", path: "/admin/pengaturan" },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard size={20} />,
  Kursus: <BookOpen size={20} />,
  Agenda: <Calendar size={20} />,
  Pengajar: <UserCircle size={20} />,
  Peserta: <Users size={20} />,
  Transaksi: <CreditCard size={20} />,
  Sertifikat: <Award size={20} />,
  Laporan: <BarChart3 size={20} />,
  Pengaturan: <Settings size={20} />,
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Auth guard: Cek autentikasi saat komponen mount
  useEffect(() => {
    const userStr = localStorage.getItem("marbot_user");
    if (!userStr) {
      router.replace("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userStr);
      if (!parsedUser.role || parsedUser.role !== "admin") {
        router.replace("/");
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      localStorage.removeItem("marbot_user");
      router.replace("/login");
    }
    // Run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuItems = useMemo<MenuItemConfig[]>(
    () =>
      MENU_ITEM_CONFIG.map((item) => ({
        ...item,
        icon: ICON_MAP[item.name],
      })),
    [],
  );

  const pageTitle = useMemo(
    () => menuItems.find((item) => item.path === pathname)?.name ?? "Dashboard",
    [pathname, menuItems],
  );

  const handleLogout = () => {
    localStorage.removeItem("marbot_user");
    router.push("/login");
  };

  // Show nothing while checking auth
  if (!user) {
    return null;
  }

  // Sidebar navigation dan footer content
  const sidebarContent = (
    <>
      <nav className="flex-1 space-y-2 overflow-y-auto p-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setIsSidebarOpen(false)}
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
            onClick={() => setIsSidebarOpen(false)}
            className="tap-target flex items-center space-x-3 rounded-xl px-4 py-3 font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC] hover:text-[#14B8A6]"
          >
            <ArrowLeftCircle size={20} />
            <span className="text-sm">Kembali ke Websites</span>
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
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Desktop */}
      <aside className="fixed z-30 hidden h-full w-72 flex-col border-r border-[#E2E8F0] bg-white lg:flex">
        <div className="border-b border-[#F1F5F9] px-8 py-7">
          <Link href="/" className="flex items-center">
            <Image src={LOGO_URL} alt="Marbot LMS" height={38} width={78} className="object-contain" />
          </Link>
        </div>

        {sidebarContent}
      </aside>

      {/* Sidebar Mobile (Drawer) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="animate-slideInLeft relative flex h-full w-72 flex-col bg-white">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] p-6">
              <Link href="/" className="flex items-center">
                <Image src={LOGO_URL} alt="Marbot LMS" height={38} width={78} className="object-contain" />
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Tutup sidebar"
                className="tap-target flex items-center text-[#64748B]"
              >
                <X size={20} />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-1 flex-col lg:ml-72">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-6 md:h-20 md:px-10">
          <div className="flex items-center space-x-4">
            <button
              aria-label="Buka menu navigasi"
              aria-expanded={isSidebarOpen}
              className="tap-target flex items-center p-2 text-[#64748B] lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="max-w-50 truncate text-lg font-extrabold text-[#0F172A] md:max-w-none md:text-xl">
              {pageTitle}
            </h2>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              aria-label="Notifikasi"
              className="tap-target relative flex items-center p-2 text-[#64748B] hover:text-[#14B8A6]"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
            </button>
            <div className="flex cursor-pointer items-center space-x-3">
              <div className="hidden text-right sm:block">
                <div className="text-xs font-extrabold text-[#0F172A]">{user?.name || "Admin"}</div>
                <div className="text-[10px] font-bold tracking-wider text-[#14B8A6] uppercase">Online</div>
              </div>
              <Image
                src={user?.avatar || IMAGE_DEFAULT_AVATAR}
                alt={user?.name || "Admin"}
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 rounded-xl border-2 border-[#F1F5F9] object-cover transition-all hover:border-[#14B8A6] md:h-10 md:w-10"
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
