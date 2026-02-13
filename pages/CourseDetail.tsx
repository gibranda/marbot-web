import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, BookOpen, User, Calendar, CheckCircle, PlayCircle, Globe, Award, Shield, MessageSquare } from 'lucide-react';
import { MOCK_COURSES } from '../constants';

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];

  const curriculum = [
    { title: 'Pendahuluan', items: ['Visi & Misi Pengelola Masjid', 'Pengenalan Dashboard Belajar'], duration: '15m' },
    { title: 'Modul Utama: Kebersihan Area Utama', items: ['Teknik Sapu & Pel Efisien', 'Merawat Karpet dari Debu & Bau', 'Wewangian Masjid Alami'], duration: '45m' },
    { title: 'Modul Lanjutan: Sanitasi Toilet & Tempat Wudhu', items: ['Standar Operasional Kamar Mandi', 'Manajemen Sampah Harian'], duration: '30m' },
    { title: 'Evaluasi & Sertifikasi', items: ['Kuis Akhir Modul', 'Penugasan Praktis Foto Lapangan'], duration: '30m' },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Ahmad Fauzi',
      rating: 5,
      date: '12 Jan 2026',
      comment: 'Materinya sangat praktis dan mudah dipahami. Sangat membantu untuk pengelolaan masjid sehari-hari.',
    },
    {
      id: 2,
      name: 'Siti Rahma',
      rating: 4,
      date: '5 Jan 2026',
      comment: 'Penyampaiannya jelas dan aplikatif. Akan lebih bagus jika ditambah contoh studi kasus.',
    },
    {
      id: 3,
      name: 'Budi Santoso',
      rating: 5,
      date: '2 Jan 2026',
      comment: 'Kursus ini membuka wawasan baru tentang manajemen masjid yang rapi dan profesional.',
    },
  ];

  const handleEnrollClick = () => {
    const userStr = localStorage.getItem('marbot_user');
    
    if (!userStr) {
      // Redirect to login with returnTo
      const returnPath = course.price === 'Gratis' ? `/belajar/${course.id}` : `/checkout/${course.id}`;
      navigate(`/login?returnTo=${encodeURIComponent(returnPath)}`);
      return;
    }

    // Logic for logged in user
    if (course.price === 'Gratis') {
      // Enrollment happens automatically in player if needed, or we could set it here
      const enrollments = JSON.parse(localStorage.getItem('marbot_enrollments') || '[]');
      if (!enrollments.find((e: any) => e.courseId === course.id)) {
        enrollments.push({ courseId: course.id, progress: 0, status: 'Aktif' });
        localStorage.setItem('marbot_enrollments', JSON.stringify(enrollments));
      }
      navigate(`/belajar/${course.id}`);
    } else {
      // Check if already purchased
      const purchases = JSON.parse(localStorage.getItem('marbot_purchases') || '[]');
      if (purchases.includes(course.id)) {
        navigate(`/belajar/${course.id}`);
      } else {
        navigate(`/checkout/${course.id}`);
      }
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-xs font-bold text-[#64748B] uppercase tracking-widest mb-6">
              <Link to="/katalog" className="hover:text-[#14B8A6]">Pembelajaran</Link>
              <span>/</span>
              <span className="text-[#0F172A]">{course.category}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-[#64748B] text-lg mb-8 max-w-2xl leading-relaxed">
              {course.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="flex items-center space-x-2">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0F172A]">{course.rating}</span>
                  <span className="text-[10px] text-[#64748B] font-medium">Rating Kursus</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <User size={20} className="text-[#14B8A6]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0F172A]">{course.students.toLocaleString()}</span>
                  <span className="text-[10px] text-[#64748B] font-medium">Peserta Aktif</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={20} className="text-[#14B8A6]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0F172A]">{course.lastUpdate}</span>
                  <span className="text-[10px] text-[#64748B] font-medium">Update Terakhir</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Globe size={20} className="text-[#14B8A6]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0F172A]">Indonesia</span>
                  <span className="text-[10px] text-[#64748B] font-medium">Bahasa Pengantar</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#E2E8F0] mb-10 flex space-x-8 overflow-x-auto scrollbar-hide">
              {['Overview', 'Kurikulum', 'Pengajar', 'Ulasan'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                    activeTab === tab ? 'text-[#14B8A6] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#14B8A6]' : 'text-[#64748B]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
              {activeTab === 'Overview' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-4">Deskripsi Kursus</h3>
                    <p className="text-[#64748B] leading-relaxed mb-4">
                      Kursus ini dirancang khusus untuk Anda yang ingin melakukan perubahan nyata pada kebersihan dan kenyamanan masjid. Kami tidak hanya memberikan teori, tapi langkah-langkah praktis yang bisa langsung Anda terapkan bersama tim takmir atau marbot lainnya.
                    </p>
                    <p className="text-[#64748B] leading-relaxed">
                      Sepanjang materi, kita akan membahas mengenai manajemen waktu pembersihan, pemilihan alat yang efektif tapi hemat biaya, hingga strategi melibatkan jamaah dalam menjaga kebersihan masjid bersama.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-4">Apa yang akan Anda pelajari?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Standard Operating Procedure (SOP) harian masjid',
                        'Teknik pembersihan karpet agar wangi tahan lama',
                        'Manajemen sanitasi area wudhu and toilet',
                        'Cara mengelola stok alat and bahan pembersih',
                        'Teknik komunikasi persuasif kepada jamaah',
                        'Pembuatan checklist monitoring kebersihan'
                      ].map((item, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <CheckCircle size={18} className="text-[#14B8A6] mt-0.5 shrink-0" />
                          <span className="text-sm text-[#475569]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Kurikulum' && (
                <div className="space-y-4 animate-fadeIn">
                  {curriculum.map((section, idx) => (
                    <div key={idx} className="border border-[#F1F5F9] rounded-xl overflow-hidden">
                      <div className="bg-[#F8FAFC] px-6 py-4 flex justify-between items-center border-b border-[#F1F5F9]">
                        <h4 className="font-bold text-[#0F172A]">{section.title}</h4>
                        <span className="text-xs font-bold text-[#64748B]">{section.duration}</span>
                      </div>
                      <div className="p-4 space-y-3">
                        {section.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F0FDFA] rounded-lg transition-colors cursor-pointer group">
                            <div className="flex items-center space-x-3">
                              <PlayCircle size={18} className="text-[#64748B] group-hover:text-[#14B8A6]" />
                              <span className="text-sm text-[#475569]">{item}</span>
                            </div>
                            <span className="text-xs text-[#94A3B8]">Video</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Pengajar' && (
                <div className="animate-fadeIn">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <img src={course.instructor.avatar} className="w-32 h-32 rounded-xl object-cover" alt={course.instructor.name} />
                    <div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-1">{course.instructor.name}</h3>
                      <p className="text-[#14B8A6] text-sm font-bold uppercase tracking-widest mb-4">{course.instructor.role}</p>
                      <p className="text-[#64748B] leading-relaxed text-sm mb-6">
                        {course.instructor.bio}
                      </p>
                      <div className="flex space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#0F172A]">{course.instructor.totalStudents.toLocaleString()}</div>
                          <div className="text-[10px] text-[#64748B] font-bold uppercase">Peserta</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#0F172A]">{course.instructor.totalCourses}</div>
                          <div className="text-[10px] text-[#64748B] font-bold uppercase">Kursus</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#0F172A]">{course.instructor.rating}</div>
                          <div className="text-[10px] text-[#64748B] font-bold uppercase">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Ulasan' && (
                <div className="animate-fadeIn space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#F1F5F9] gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl font-extrabold text-[#0F172A]">{course.rating}</span>
                        <div className="flex text-yellow-400">
                          <Star size={18} fill="currentColor" />
                          <Star size={18} fill="currentColor" />
                          <Star size={18} fill="currentColor" />
                          <Star size={18} fill="currentColor" />
                          <Star size={18} fill="currentColor" className="opacity-30" />
                        </div>
                      </div>
                      <p className="text-sm font-bold text-[#64748B] uppercase tracking-wider">Berdasarkan {reviews.length} Ulasan Peserta</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-[#F1F5F9] last:border-0 last:pb-0">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center font-bold text-[#14B8A6] shrink-0">
                              {review.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                                <h4 className="font-bold text-[#0F172A] truncate">{review.name}</h4>
                                <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{review.date}</span>
                              </div>
                              <div className="flex text-yellow-400 mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-[#E2E8F0]" : ""} />
                                ))}
                              </div>
                              <p className="text-sm text-[#475569] leading-relaxed italic">
                                "{review.comment}"
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4 text-[#94A3B8]">
                          <MessageSquare size={32} />
                        </div>
                        <h4 className="text-lg font-bold text-[#0F172A] mb-2">Belum ada ulasan</h4>
                        <p className="text-[#64748B] text-sm mb-6">Jadilah yang pertama memberikan ulasan untuk kursus ini.</p>
                        <button className="px-6 py-2 border-2 border-[#14B8A6] text-[#14B8A6] font-bold text-sm rounded-xl hover:bg-[#F0FDFA] transition-all">
                          Selesaikan Kursus untuk Memberi Ulasan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-96">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-white border-2 border-[#14B8A6] rounded-2xl shadow-2xl shadow-[#14B8A6]/10 overflow-hidden">
                <div className="relative aspect-video">
                  <img src={course.thumbnail} className="w-full h-full object-cover" alt={course.title} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform">
                      <PlayCircle size={48} fill="currentColor" className="text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <span className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Harga Kursus</span>
                      <div className="text-3xl font-extrabold text-[#0F172A] mt-1">{course.price}</div>
                    </div>
                    {course.price !== 'Gratis' && <span className="text-xs line-through text-[#94A3B8]">Rp 150.000</span>}
                  </div>

                  <button 
                    onClick={handleEnrollClick}
                    className="w-full py-5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/30 transition-all mb-8"
                  >
                    {course.price === 'Gratis' ? 'Mulai Kursus Sekarang' : 'Beli Kursus'}
                  </button>

                  <div className="space-y-4">
                    <h5 className="text-sm font-bold text-[#0F172A]">Termasuk Dalam Kursus:</h5>
                    <ul className="space-y-3">
                      {[
                        { icon: <Clock size={16} />, text: `${course.duration} Total Pembelajaran` },
                        { icon: <BookOpen size={16} />, text: `${course.modules} Modul Pelatihan` },
                        { icon: <Award size={16} />, text: 'Sertifikat Penyelesaian' },
                        { icon: <Shield size={16} />, text: 'Akses Selamanya' },
                        { icon: <Globe size={16} />, text: 'Akses di Mobile & Web' }
                      ].map((item, i) => (
                        <li key={i} className="flex items-center space-x-3 text-sm text-[#475569]">
                          <span className="text-[#14B8A6]">{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex items-center justify-between">
                <span className="text-sm font-bold text-[#0F172A]">Bagikan ke Takmir Lain</span>
                <div className="flex space-x-2">
                  <button className="p-2 bg-[#F1F5F9] rounded-lg text-[#64748B] hover:text-[#14B8A6] transition-colors">
                    <LinkIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Floating CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-[#E2E8F0] z-50">
        <button 
          onClick={handleEnrollClick}
          className="w-full py-4 bg-[#14B8A6] text-white font-bold rounded-xl shadow-lg shadow-[#14B8A6]/30"
        >
          {course.price === 'Gratis' ? 'Mulai Kursus' : `Beli Kursus - ${course.price}`}
        </button>
      </div>
    </div>
  );
};

const LinkIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
);

export default CourseDetail;