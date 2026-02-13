
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Eye, Trash2, X, AlertTriangle, BookOpen, Clock, BarChart } from 'lucide-react';
import { MOCK_COURSES } from '../../constants';
import { Course } from '../../types';

const AdminKursus: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const handleDelete = () => {
    if (selectedCourse) {
      setCourses(courses.filter(c => c.id !== selectedCourse.id));
      setIsDeleteOpen(false);
      setSelectedCourse(null);
      triggerToast('Kursus berhasil dihapus');
    }
  };

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-8 z-[60] bg-[#0F172A] text-white px-6 py-4 rounded-xl shadow-2xl animate-slideInRight flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-[#14B8A6]"></div>
          <span className="text-sm font-bold">{showToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Manajemen Kursus</h1>
          <p className="text-sm text-[#64748B]">Kelola konten, harga, dan publikasi materi.</p>
        </div>
        <Link to="/admin/kursus/baru" className="px-6 py-3 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center tap-target">
          <Plus size={18} className="mr-2" />
          Buat Kursus Baru
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input 
            type="text" 
            placeholder="Cari kursus..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-40">
            <select className="w-full appearance-none pl-4 pr-10 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-xs font-bold text-[#475569] outline-none cursor-pointer tap-target">
              <option>Semua Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
          <button className="p-2.5 border border-[#E2E8F0] rounded-[10px] hover:bg-[#F8FAFC] text-[#64748B] tap-target flex items-center">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table Wrapped for Responsiveness */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="table-wrap">
          <table className="w-full text-left min-w-[750px]">
            <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Kursus</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Kategori</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Harga</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Peserta</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <img src={course.thumbnail} className="w-12 h-12 rounded-[10px] object-cover shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-[#0F172A] line-clamp-1">{course.title}</div>
                        <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">{course.level} • {course.modules} Modul</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#475569]">{course.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                      course.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-[#0F172A] whitespace-nowrap">{course.price}</td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#475569]">{course.students.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setSelectedCourse(course); setIsViewOpen(true); }}
                        className="p-2 text-[#64748B] hover:text-[#14B8A6] hover:bg-white rounded-lg transition-all tap-target" title="View Detail"
                      >
                        <Eye size={16} />
                      </button>
                      <Link 
                        to={`/admin/kursus/${course.id}/edit`}
                        className="p-2 text-[#64748B] hover:text-[#14B8A6] hover:bg-white rounded-lg transition-all tap-target flex items-center" title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => { setSelectedCourse(course); setIsDeleteOpen(true); }}
                        className="p-2 text-[#64748B] hover:text-red-500 hover:bg-white rounded-lg transition-all tap-target" title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal View Detail Kursus */}
      {isViewOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsViewOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
            <div className="p-6 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
              <h2 className="text-lg font-extrabold text-[#0F172A]">Detail Kursus</h2>
              <button onClick={() => setIsViewOpen(false)} className="text-[#64748B] hover:text-[#0F172A] tap-target"><X size={20} /></button>
            </div>
            <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
              <div className="flex flex-col sm:flex-row gap-6">
                <img src={selectedCourse.thumbnail} className="w-full sm:w-48 aspect-video rounded-xl object-cover shadow-md" />
                <div>
                  <h3 className="text-xl font-extrabold text-[#0F172A] leading-tight mb-2">{selectedCourse.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#F0FDFA] text-[#14B8A6] text-[10px] font-bold uppercase rounded-lg border border-[#14B8A6]/10">{selectedCourse.category}</span>
                    <span className="px-2.5 py-1 bg-[#F8FAFC] text-[#64748B] text-[10px] font-bold uppercase rounded-lg border border-[#E2E8F0]">{selectedCourse.level}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Status</div>
                  <div className={`text-xs font-bold ${selectedCourse.status === 'Published' ? 'text-green-600' : 'text-amber-600'}`}>{selectedCourse.status}</div>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Harga</div>
                  <div className="text-xs font-bold text-[#0F172A]">{selectedCourse.price}</div>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Modul</div>
                  <div className="text-xs font-bold text-[#0F172A]">{selectedCourse.modules} Materi</div>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Durasi</div>
                  <div className="text-xs font-bold text-[#0F172A]">{selectedCourse.duration}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-[#0F172A] text-sm border-l-4 border-[#14B8A6] pl-3">Ringkasan</h4>
                <p className="text-sm text-[#64748B] leading-relaxed italic">"{selectedCourse.description}"</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-[#0F172A] text-sm border-l-4 border-[#14B8A6] pl-3">Pengajar</h4>
                <div className="flex items-center space-x-3 p-4 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                  <img src={selectedCourse.instructor.avatar} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">{selectedCourse.instructor.name}</div>
                    <div className="text-[10px] text-[#14B8A6] font-bold uppercase tracking-wider">{selectedCourse.instructor.role}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#F1F5F9] flex flex-col sm:flex-row justify-end gap-3 bg-[#F8FAFC]">
              <button onClick={() => setIsViewOpen(false)} className="px-6 py-2.5 border-2 border-[#E2E8F0] text-[#64748B] text-sm font-bold rounded-xl hover:bg-white transition-all tap-target">Tutup</button>
              <Link 
                to={`/admin/kursus/${selectedCourse.id}/edit`}
                className="px-8 py-2.5 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all text-center tap-target"
              >
                Edit Kursus
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus Kursus */}
      {isDeleteOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsDeleteOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">Hapus Kursus?</h3>
                <p className="text-sm text-[#64748B] leading-relaxed px-4">
                  Tindakan ini tidak dapat dibatalkan. Kursus <span className="font-bold text-[#0F172A]">"{selectedCourse.title}"</span> akan dihapus permanen.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-3 border-2 border-[#E2E8F0] text-[#64748B] font-bold text-sm rounded-xl hover:bg-[#F8FAFC] transition-all tap-target">Batal</button>
                <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white font-bold text-sm rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all tap-target">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKursus;
