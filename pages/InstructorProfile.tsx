
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Users, BookOpen, MapPin, Globe, Share2 } from 'lucide-react';
import { MOCK_INSTRUCTORS, MOCK_COURSES } from '../constants';
import CourseCard from '../components/CourseCard';

const InstructorProfile: React.FC = () => {
  const { id } = useParams();
  const instructor = MOCK_INSTRUCTORS.find(ins => ins.id === id) || MOCK_INSTRUCTORS[0];
  
  // Filter courses by this instructor
  const instructorCourses = MOCK_COURSES.filter(course => course.instructor.id === instructor.id);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <Link to="/pengajar" className="inline-flex items-center space-x-2 text-sm font-bold text-[#64748B] hover:text-[#14B8A6] transition-colors mb-8 group tap-target">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Daftar Pengajar</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Profil */}
          <aside className="w-full lg:w-96 shrink-0">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm text-center">
              <img src={instructor.avatar} className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover mx-auto mb-6 shadow-xl" />
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-2">{instructor.name}</h1>
              <div className="inline-flex px-4 py-1.5 bg-[#F0FDFA] rounded-full mb-8">
                <span className="text-[10px] sm:text-xs font-extrabold text-[#0F766E] uppercase tracking-wider">{instructor.role}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#F8FAFC] p-4 rounded-xl">
                  <div className="text-lg font-extrabold text-[#0F172A]">{instructor.rating}</div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Rating</div>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl">
                  <div className="text-lg font-extrabold text-[#0F172A]">{instructor.totalStudents.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Peserta</div>
                </div>
              </div>

              <div className="space-y-4 text-left border-t border-[#F1F5F9] pt-8">
                <div className="flex items-center space-x-3 text-[#64748B]">
                  <MapPin size={18} className="text-[#14B8A6] shrink-0" />
                  <span className="text-sm font-medium truncate">{instructor.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-[#64748B]">
                  <Globe size={18} className="text-[#14B8A6] shrink-0" />
                  <span className="text-sm font-medium truncate">www.marbot.id/{instructor.id}</span>
                </div>
              </div>

              <button className="w-full mt-10 py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] transition-all flex items-center justify-center space-x-2 tap-target">
                <Share2 size={18} />
                <span>Bagikan Profil</span>
              </button>
            </div>
          </aside>

          {/* Konten Utama */}
          <main className="flex-1 min-w-0">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 md:p-12 mb-12 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-6">Tentang Pengajar</h2>
              <p className="text-[#64748B] text-sm sm:text-lg leading-relaxed mb-8">
                {instructor.bio} {instructor.bio} {instructor.bio}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: <Star className="text-yellow-400" />, label: 'Review Positif', value: '450+' },
                  { icon: <Users className="text-[#14B8A6]" />, label: 'Masjid Terbantu', value: '120+' },
                  { icon: <BookOpen className="text-[#14B8A6]" />, label: 'Materi Praktis', value: instructor.totalCourses.toString() },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 bg-[#F8FAFC] rounded-xl">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-[#0F172A]">{item.value}</div>
                      <div className="text-[10px] text-[#64748B] font-bold uppercase">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-8">Kursus Oleh {instructor.name}</h2>
              {instructorCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  {instructorCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center text-[#64748B]">
                  Belum ada kursus yang diterbitkan oleh pengajar ini.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;