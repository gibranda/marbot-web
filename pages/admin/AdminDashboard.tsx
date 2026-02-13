import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  UserCircle, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  ChevronRight,
  MoreVertical,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MOCK_COURSES, MOCK_ACTIVITIES } from '../../constants';

const AdminDashboard: React.FC = () => {
  const kpis = [
    { label: 'Total Kursus', value: '48', trend: '+4 bulan ini', icon: <BookOpen size={24} />, color: 'bg-blue-500' },
    { label: 'Total Pengajar', value: '22', trend: '+2 bulan ini', icon: <UserCircle size={24} />, color: 'bg-purple-500' },
    { label: 'Total Peserta', value: '12.540', trend: '+850 bulan ini', icon: <Users size={24} />, color: 'bg-[#14B8A6]' },
    { label: 'Pendapatan', value: 'Rp 18.5M', trend: '+12% vs last month', icon: <TrendingUp size={24} />, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Beranda Dashboard</h1>
          <p className="text-sm text-[#64748B]">Ringkasan aktivitas Marbot LMS hari ini.</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Link to="/admin/pengajar/baru" className="px-5 py-2.5 bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-bold rounded-xl hover:bg-[#F8FAFC] transition-all flex items-center justify-center tap-target">
            <Plus size={18} className="mr-2" />
            Tambah Pengajar
          </Link>
          <Link to="/admin/kursus/baru" className="px-6 py-2.5 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center tap-target">
            <Plus size={18} className="mr-2" />
            Buat Kursus
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-[10px] ${kpi.color} text-white flex items-center justify-center shadow-lg shadow-black/5`}>
                {kpi.icon}
              </div>
              <span className="text-[10px] font-extrabold text-green-500 uppercase tracking-widest">{kpi.trend}</span>
            </div>
            <div className="text-3xl font-extrabold text-[#0F172A] mb-1">{kpi.value}</div>
            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table: Kursus Terbaru */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 sm:p-8 border-b border-[#F1F5F9] flex items-center justify-between">
            <h3 className="font-extrabold text-[#0F172A]">Kursus Terbaru</h3>
            <Link to="/admin/kursus" className="text-sm font-bold text-[#14B8A6] hover:underline flex items-center">
              Lihat Semua Pembelajaran <ChevronRight size={16} />
            </Link>
          </div>
          <div className="table-wrap">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Kursus</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Harga</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Pengajar</th>
                  <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {MOCK_COURSES.map((course) => (
                  <tr key={course.id} className="hover:bg-[#F8FAFC] transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={course.thumbnail} className="w-10 h-10 rounded-[10px] object-cover shrink-0" />
                        <div>
                          <div className="text-sm font-bold text-[#0F172A] group-hover:text-[#14B8A6] transition-colors line-clamp-1">{course.title}</div>
                          <div className="text-[10px] text-[#64748B] font-medium">{course.category} • {course.level}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        course.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-[#0F172A] whitespace-nowrap">{course.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <img src={course.instructor.avatar} className="w-6 h-6 rounded-full shrink-0" />
                        <span className="text-xs text-[#64748B] truncate max-w-[80px]">{course.instructor.name.split(' ')[1]}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="p-2 text-[#64748B] hover:text-[#14B8A6] hover:bg-white rounded-lg transition-all tap-target">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col">
          <div className="p-6 sm:p-8 border-b border-[#F1F5F9]">
            <h3 className="font-extrabold text-[#0F172A]">Aktivitas Terbaru</h3>
          </div>
          <div className="p-6 sm:p-8 space-y-6">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex space-x-4">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  activity.type === 'transaction' ? 'bg-green-500' : 
                  activity.type === 'course' ? 'bg-blue-500' : 
                  'bg-[#14B8A6]'
                }`}></div>
                <div>
                  <div className="text-sm font-bold text-[#0F172A] leading-snug mb-1">{activity.title}</div>
                  <div className="flex items-center text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
                    <Calendar size={10} className="mr-1" />
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-4 text-xs font-bold text-[#64748B] hover:text-[#14B8A6] transition-colors border-t border-[#F1F5F9] mt-4 flex items-center justify-center tap-target">
              Lihat Log Lengkap <ArrowRight size={14} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-extrabold text-[#0F172A]">Pembelajaran Terpopuler</h3>
            <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Bulan Ini</span>
          </div>
          <div className="space-y-6">
            {MOCK_COURSES.slice(0, 4).map((course, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-xs font-extrabold text-[#94A3B8] w-4">{idx + 1}</div>
                  <div className="text-sm font-bold text-[#475569] truncate max-w-[150px] sm:max-w-none">{course.title}</div>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-xs font-extrabold text-[#0F172A]">{course.students}</span>
                  <Users size={12} className="text-[#94A3B8]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-[#F0FDFA] rounded-full flex items-center justify-center text-[#14B8A6] mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="font-extrabold text-[#0F172A] mb-2">Semua Sistem Normal</h4>
          <p className="text-xs text-[#64748B] mb-6">Server LMS berjalan stabil tanpa kendala teknis dalam 24 jam terakhir.</p>
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-extrabold text-green-600 uppercase tracking-wider">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;