/* eslint-disable react/no-array-index-key */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-nested-conditional */
/* eslint-disable sonarjs/no-all-duplicated-branches */
"use client";
import {
  CheckCircle,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Mail,
  Phone,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { LOGO_URL } from "@/constants/constants";

const Auth: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLogin = pathname === "/login";

  // Get returnTo parameter from URL
  const returnTo = searchParams.get("returnTo");

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation Logic
  const isEmail = (val: string) => val.includes("@");
  const isPhone = (val: string) => /^[0-9+]+$/.test(val);
  const isPasswordValid = password.length >= 8;

  const isFormValid = isLogin
    ? emailOrPhone !== "" && password !== ""
    : name.trim() !== "" && (isEmail(emailOrPhone) || isPhone(emailOrPhone)) && isPasswordValid && agreeTerms;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock Authentication Logic
    setTimeout(() => {
      if (isLogin) {
        if (emailOrPhone === "admin@marbot.id" && password === "password123") {
          // Success Admin Login
          localStorage.setItem(
            "marbot_user",
            JSON.stringify({
              id: "admin-1",
              name: "Super Admin",
              email: "admin@marbot.id",
              role: "admin",
            }),
          );
          router.push("/admin");
        } else if (emailOrPhone && password) {
          // Generic Student Login (Simulation)
          localStorage.setItem(
            "marbot_user",
            JSON.stringify({
              id: "user-1",
              name: "Ahmad",
              email: emailOrPhone,
              role: "student",
            }),
          );

          // Redirect to returnTo if exists, otherwise default to /akun
          router.push(returnTo || "/akun");
        } else {
          setError("Email dan password wajib diisi.");
        }

        if (emailOrPhone !== "" && password !== "" && emailOrPhone !== "admin@marbot.id") {
          setError("Email atau password salah.");
        }
      } else {
        // Register simulation
        if (isFormValid) {
          router.push("/register/verify");
        } else {
          if (name.trim() === "") setError("Nama wajib diisi");
          else if (!isEmail(emailOrPhone) && !isPhone(emailOrPhone)) setError("Masukkan email atau no. HP yang valid");
          else if (!isPasswordValid) setError("Kata sandi minimal 8 karakter");
          else if (!agreeTerms) setError("Harap setujui Syarat & Ketentuan");
        }
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      {/* Left: Value Prop (Desktop Only) */}
      <div className="relative hidden flex-col justify-center bg-[#0F766E] px-16 lg:flex lg:w-1/2 xl:px-24">
        <div className="absolute top-12 left-12">
          <Link href="/" className="group inline-flex items-center text-white/60 transition-colors hover:text-white">
            <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="font-bold">Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="relative z-10">
          <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-[10px] bg-[#14B8A6] shadow-xl shadow-black/20">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h2 className="mb-8 text-4xl leading-tight font-extrabold text-white xl:text-5xl">
            Belajar jadi Pengurus Masjid yang <span className="text-[#99F6E4]">Profesional.</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                icon: <Zap size={20} />,
                title: "Materi Berbasis Praktek",
                desc: "Bukan sekadar teori, langsung langkah demi langkah.",
              },
              {
                icon: <CheckCircle size={20} />,
                title: "Sertifikat Resmi",
                desc: "Validitas kompetensi untuk pengelolaan masjid.",
              },
              {
                icon: <Zap size={20} />,
                title: "Akses Seumur Hidup",
                desc: "Belajar kapan saja, di mana saja dari HP Anda.",
              },
            ].map((prop, i) => (
              <div
                key={i}
                className="flex items-start space-x-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="mt-1 text-[#99F6E4]">{prop.icon}</div>
                <div>
                  <h4 className="text-lg font-bold text-white">{prop.title}</h4>
                  <p className="text-sm text-white/60">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#14B8A6] opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-12 h-48 w-48 rounded-full bg-white opacity-5 blur-2xl"></div>
      </div>

      {/* Right: Form */}
      <div className="relative flex w-full items-center justify-center p-8 md:p-16 lg:w-1/2 lg:p-24">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link href="/" className="p-2 text-[#64748B]">
            <ArrowLeft size={24} />
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <img src={LOGO_URL} alt="Logo" className="mx-auto mb-6 h-10 w-auto" />
            <h1 className="mb-2 text-2xl font-extrabold text-[#0F172A]">
              {isLogin ? "Selamat Datang Kembali!" : "Buat Akun Baru"}
            </h1>
            <p className="text-[#64748B]">
              {isLogin
                ? "Masuk untuk lanjut belajar di Marbot LMS"
                : "Daftar sekarang dan mulai perjalanan belajar Anda"}
            </p>
          </div>

          {error && (
            <div className="animate-fadeIn mb-6 flex items-center space-x-3 rounded-[10px] border border-red-100 bg-red-50 p-4 text-red-600">
              <AlertCircle size={18} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleAuth}>
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm font-bold text-[#0F172A]">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-3.5 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:border-[#14B8A6] focus:ring-0"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-bold text-[#0F172A]">
                {isLogin ? "Email atau No. HP" : "Email atau No. HP"}
              </label>
              <div className="relative">
                {isLogin || !emailOrPhone ? (
                  <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
                ) : isPhone(emailOrPhone) ? (
                  <Phone className="absolute top-1/2 left-4 -translate-y-1/2 text-[#14B8A6]" size={18} />
                ) : (
                  <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-[#14B8A6]" size={18} />
                )}
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Email atau No. HP"
                  className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-3.5 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:border-[#14B8A6] focus:ring-0"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-bold text-[#0F172A]">Kata Sandi</label>
                {isLogin && (
                  <a href="#" className="text-xs font-bold text-[#14B8A6] hover:underline">
                    Lupa Password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-3.5 pr-12 pl-12 text-sm font-medium transition-all outline-none focus:border-[#14B8A6] focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-[#94A3B8] hover:text-[#14B8A6]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-md border-[#E2E8F0] text-[#14B8A6] focus:ring-[#14B8A6]"
                />
                <span className="text-xs leading-tight text-[#64748B]">
                  Saya menyetujui{" "}
                  <a href="#" className="font-bold text-[#14B8A6]">
                    Syarat & Ketentuan
                  </a>{" "}
                  serta{" "}
                  <a href="#" className="font-bold text-[#14B8A6]">
                    Kebijakan Privasi
                  </a>{" "}
                  yang berlaku.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || (!isLogin && !isFormValid)}
              className={`flex w-full items-center justify-center rounded-[10px] bg-[#14B8A6] py-4 font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E] ${isLoading || (!isLogin && !isFormValid) ? "cursor-not-allowed opacity-70" : ""}`}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              ) : isLogin ? (
                "Masuk Sekarang"
              ) : (
                "Buat Akun"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <div className="relative flex justify-center text-xs font-bold tracking-widest uppercase">
              <span className="bg-white px-4 text-[#94A3B8]">Atau Lanjut Dengan</span>
            </div>
          </div>

          <button className="flex w-full items-center justify-center space-x-3 rounded-[10px] border-2 border-[#E2E8F0] py-3.5 font-bold text-[#0F172A] transition-all hover:bg-[#F8FAFC]">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-[#64748B]">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <Link href={isLogin ? "/register" : "/login"} className="font-bold text-[#14B8A6] hover:underline">
              {isLogin ? "Daftar Sekarang" : "Masuk di Sini"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
