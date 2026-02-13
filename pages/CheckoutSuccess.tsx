
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, PlayCircle, LayoutDashboard, ArrowRight } from 'lucide-react';
import { MOCK_COURSES } from '../constants';

const CheckoutSuccess: React.FC = () => {
  const { id } = useParams();
  const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];

  useEffect(() => {
    // Record purchase & enrollment in dummy storage
    const purchases = JSON.parse(localStorage.getItem('marbot_purchases') || '[]');
    if (!purchases.includes(course.id)) {
      purchases.push(course.id);
      localStorage.setItem('marbot_purchases', JSON.stringify(purchases));
    }

    const enrollments = JSON.parse(localStorage.getItem('marbot_enrollments') || '[]');
    if (!enrollments.find((e: any) => e.courseId === course.id)) {
      enrollments.push({ courseId: course.id, progress: 0, status: 'Aktif' });
      localStorage.setItem('marbot_enrollments', JSON.stringify(enrollments));
    }
  }, [course.id]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-24">
      <div className="max-w-xl w-full px-4 text-center">
        <div className="w-24 h-24 bg-[#F0FDFA] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 size={48} className="text-[#14B8A6]" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Pembayaran Berhasil!</h1>
        <p className="text-[#64748B] text-lg mb-12">
          Terima kasih. Akses kursus <strong>"{course.title}"</strong> Anda sudah aktif. Anda bisa mulai belajar sekarang.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to={`/belajar/${course.id}`} 
            className="px-10 py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/30 transition-all flex items-center justify-center"
          >
            Mulai Belajar Sekarang <PlayCircle size={20} className="ml-2" />
          </Link>
          <Link 
            to="/akun/kursus" 
            className="px-10 py-4 border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-xl hover:border-[#14B8A6] transition-all flex items-center justify-center"
          >
            Lihat Kursus Saya <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>

        <div className="mt-16 pt-12 border-t border-[#F1F5F9]">
          <Link to="/katalog" className="text-sm font-bold text-[#14B8A6] hover:underline">
            Cari Kursus Lainnya
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
