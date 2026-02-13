import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Zap, ArrowLeft, Mail, Phone, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { LOGO_URL } from '../constants';

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  
  // Get returnTo parameter from URL
  const queryParams = new URLSearchParams(location.search);
  const returnTo = queryParams.get('returnTo');
  
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validation Logic
  const isEmail = (val: string) => val.includes('@');
  const isPhone = (val: string) => /^[0-9+]+$/.test(val);
  const isPasswordValid = password.length >= 8;
  
  const isFormValid = isLogin 
    ? (emailOrPhone !== '' && password !== '')
    : (name.trim() !== '' && (isEmail(emailOrPhone) || isPhone(emailOrPhone)) && isPasswordValid && agreeTerms);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock Authentication Logic
    setTimeout(() => {
      if (isLogin) {
        if (emailOrPhone === 'admin@marbot.id' && password === 'password123') {
          // Success Admin Login
          localStorage.setItem('marbot_user', JSON.stringify({
            id: 'admin-1',
            name: 'Super Admin',
            email: 'admin@marbot.id',
            role: 'admin'
          }));
          navigate('/admin');
        } else if (emailOrPhone && password) {
          // Generic Student Login (Simulation)
          localStorage.setItem('marbot_user', JSON.stringify({
            id: 'user-1',
            name: 'Ahmad',
            email: emailOrPhone,
            role: 'student'
          }));
          
          // Redirect to returnTo if exists, otherwise default to /akun
          navigate(returnTo || '/akun');
        } else {
          setError('Email dan password wajib diisi.');
        }
        
        if (emailOrPhone !== '' && password !== '' && emailOrPhone !== 'admin@marbot.id') {
           setError('Email atau password salah.');
        }
      } else {
        // Register simulation
        if (isFormValid) {
           navigate('/register/verify');
        } else {
           if (name.trim() === '') setError('Nama wajib diisi');
           else if (!isEmail(emailOrPhone) && !isPhone(emailOrPhone)) setError('Masukkan email atau no. HP yang valid');
           else if (!isPasswordValid) setError('Kata sandi minimal 8 karakter');
           else if (!agreeTerms) setError('Harap setujui Syarat & Ketentuan');
        }
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Left: Value Prop (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F766E] relative flex-col justify-center px-16 xl:px-24">
        <div className="absolute top-12 left-12">
          <Link to="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors group">
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-[#14B8A6] rounded-[10px] flex items-center justify-center mb-10 shadow-xl shadow-black/20">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-8">
            Belajar jadi Pengurus Masjid yang <span className="text-[#99F6E4]">Profesional.</span>
          </h2>
          
          <div className="space-y-6">
            {[
              { icon: <Zap size={20} />, title: 'Materi Berbasis Praktek', desc: 'Bukan sekadar teori, langsung langkah demi langkah.' },
              { icon: <CheckCircle size={20} />, title: 'Sertifikat Resmi', desc: 'Validitas kompetensi untuk pengelolaan masjid.' },
              { icon: <Zap size={20} />, title: 'Akses Seumur Hidup', desc: 'Belajar kapan saja, di mana saja dari HP Anda.' },
            ].map((prop, i) => (
              <div key={i} className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="mt-1 text-[#99F6E4]">{prop.icon}</div>
                <div>
                  <h4 className="font-bold text-white text-lg">{prop.title}</h4>
                  <p className="text-white/60 text-sm">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#14B8A6] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-12 w-48 h-48 bg-white rounded-full opacity-5 blur-2xl"></div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link to="/" className="p-2 text-[#64748B]">
            <ArrowLeft size={24} />
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img src={LOGO_URL} alt="Logo" className="h-10 w-auto mx-auto mb-6" />
            <h1 className="text-2xl font-extrabold text-[#0F172A] mb-2">
              {isLogin ? 'Selamat Datang Kembali!' : 'Buat Akun Baru'}
            </h1>
            <p className="text-[#64748B]">
              {isLogin ? 'Masuk untuk lanjut belajar di Marbot LMS' : 'Daftar sekarang dan mulai perjalanan belajar Anda'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-[10px] flex items-center space-x-3 text-red-600 animate-fadeIn">
              <AlertCircle size={18} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleAuth}>
            {!isLogin && (
              <div>
                <label className="text-sm font-bold text-[#0F172A] mb-2 block">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] focus:border-[#14B8A6] focus:ring-0 outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-bold text-[#0F172A] mb-2 block">{isLogin ? 'Email atau No. HP' : 'Email atau No. HP'}</label>
              <div className="relative">
                {isLogin || !emailOrPhone ? (
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                ) : isPhone(emailOrPhone) ? (
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14B8A6]" size={18} />
                ) : (
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14B8A6]" size={18} />
                )}
                <input 
                  type="text" 
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Email atau No. HP"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] focus:border-[#14B8A6] focus:ring-0 outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-[#0F172A] block">Kata Sandi</label>
                {isLogin && <a href="#" className="text-xs font-bold text-[#14B8A6] hover:underline">Lupa Password?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] focus:border-[#14B8A6] focus:ring-0 outline-none transition-all font-medium text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#14B8A6]"
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
                  className="mt-1 w-4 h-4 rounded-[6px] border-[#E2E8F0] text-[#14B8A6] focus:ring-[#14B8A6]" 
                />
                <span className="text-xs text-[#64748B] leading-tight">
                  Saya menyetujui <a href="#" className="text-[#14B8A6] font-bold">Syarat & Ketentuan</a> serta <a href="#" className="text-[#14B8A6] font-bold">Kebijakan Privasi</a> yang berlaku.
                </span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading || (!isLogin && !isFormValid)}
              className={`w-full py-4 bg-[#14B8A6] text-white font-bold rounded-[10px] hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center ${isLoading || (!isLogin && !isFormValid) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Masuk Sekarang' : 'Buat Akun'
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
              <span className="bg-white px-4 text-[#94A3B8]">Atau Lanjut Dengan</span>
            </div>
          </div>

          <button className="w-full py-3.5 border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-[10px] flex items-center justify-center space-x-3 hover:bg-[#F8FAFC] transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-[#64748B]">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'} {' '}
            <Link to={isLogin ? '/register' : '/login'} className="font-bold text-[#14B8A6] hover:underline">
              {isLogin ? 'Daftar Sekarang' : 'Masuk di Sini'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;