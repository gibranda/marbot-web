import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CourseDetail from './pages/CourseDetail';
import Instructors from './pages/Instructors';
import InstructorProfile from './pages/InstructorProfile';
import Auth from './pages/Auth';
import RegisterVerify from './pages/RegisterVerify';
import UserDashboard from './pages/user/UserDashboard';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CoursePlayer from './pages/CoursePlayer';

// Agenda Pages
import AgendaList from './pages/agenda/AgendaList';
import AgendaDetail from './pages/agenda/AgendaDetail';
import AgendaCheckout from './pages/agenda/AgendaCheckout';
import AgendaSuccess from './pages/agenda/AgendaSuccess';

// Admin Pages
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminKursus from './pages/admin/AdminKursus';
import AdminAddCourse from './pages/admin/AdminAddCourse';
import AdminEditCourse from './pages/admin/AdminEditCourse';
import AdminPengajar from './pages/admin/AdminPengajar';
import AdminAddInstructor from './pages/admin/AdminAddInstructor';
import AdminEditInstructor from './pages/admin/AdminEditInstructor';
import AdminPeserta from './pages/admin/AdminPeserta';
import AdminTransaksi from './pages/admin/AdminTransaksi';
import AdminSertifikat from './pages/admin/AdminSertifikat';
import AdminLaporan from './pages/admin/AdminLaporan';
import AdminPengaturan from './pages/admin/AdminPengaturan';

// Admin Agenda
import AdminAgenda from './pages/admin/AdminAgenda';
import AdminAddAgenda from './pages/admin/AdminAddAgenda';
import AdminEditAgenda from './pages/admin/AdminEditAgenda';
import AdminAgendaRegistrants from './pages/admin/AdminAgendaRegistrants';

// Protected Route Component
const ProtectedRoute = ({ children, role }: { children?: React.ReactNode, role: 'admin' | 'student' }) => {
  const userStr = localStorage.getItem('marbot_user');
  const location = useLocation();
  
  if (!userStr) {
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }
  
  const user = JSON.parse(userStr);
  if (user.role !== role) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h1 className="text-2xl font-extrabold text-[#0F172A] mb-2">Akses Ditolak</h1>
        <p className="text-[#64748B] mb-8 max-w-sm">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <Navigate to="/" replace />
      </div>
    );
  }
  
  return <>{children}</>;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="kursus" element={<AdminKursus />} />
            <Route path="kursus/baru" element={<AdminAddCourse />} />
            <Route path="kursus/:id/edit" element={<AdminEditCourse />} />
            
            {/* Admin Agenda Routes */}
            <Route path="agenda" element={<AdminAgenda />} />
            <Route path="agenda/baru" element={<AdminAddAgenda />} />
            <Route path="agenda/:slug/edit" element={<AdminEditAgenda />} />
            <Route path="agenda/:slug/pendaftar" element={<AdminAgendaRegistrants />} />

            <Route path="pengajar" element={<AdminPengajar />} />
            <Route path="pengajar/baru" element={<AdminAddInstructor />} />
            <Route path="pengajar/:id/edit" element={<AdminEditInstructor />} />
            <Route path="peserta" element={<AdminPeserta />} />
            <Route path="transaksi" element={<AdminTransaksi />} />
            <Route path="sertifikat" element={<AdminSertifikat />} />
            <Route path="laporan" element={<AdminLaporan />} />
            <Route path="pengaturan" element={<AdminPengaturan />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/register/verify" element={<RegisterVerify />} />

          {/* User Dashboard (Protected) - Internal Layout */}
          <Route path="/akun/*" element={
            <ProtectedRoute role="student">
              <UserDashboard />
            </ProtectedRoute>
          } />

          {/* Course End-to-End Journey Routes */}
          <Route path="/checkout/:id" element={
            <ProtectedRoute role="student">
              <Navbar />
              <Checkout />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/checkout/:id/sukses" element={
            <ProtectedRoute role="student">
              <Navbar />
              <CheckoutSuccess />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/belajar/:id" element={
            <ProtectedRoute role="student">
              <Navbar />
              <CoursePlayer />
              <Footer />
            </ProtectedRoute>
          } />

          {/* Agenda Journey Routes */}
          <Route path="/agenda" element={
            <>
              <Navbar />
              <AgendaList />
              <Footer />
            </>
          } />
          <Route path="/agenda/:slug" element={
            <>
              <Navbar />
              <AgendaDetail />
              <Footer />
            </>
          } />
          <Route path="/agenda/:slug/daftar" element={
            <ProtectedRoute role="student">
              <Navbar />
              <AgendaCheckout />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/agenda/:slug/daftar/sukses" element={
            <ProtectedRoute role="student">
              <Navbar />
              <AgendaSuccess />
              <Footer />
            </ProtectedRoute>
          } />

          {/* Public Routes with Global Layout */}
          <Route 
            path="*" 
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/katalog" element={<Catalog />} />
                    <Route path="/course/:id" element={<CourseDetail />} />
                    <Route path="/pengajar" element={<Instructors />} />
                    <Route path="/pengajar/:id" element={<InstructorProfile />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;