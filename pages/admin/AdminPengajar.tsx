
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Star, MapPin, MoreVertical, Eye, Edit, Trash2, ShieldOff, ShieldCheck, X, Mail, Phone, BookOpen, Users, AlertTriangle } from 'lucide-react';
import { MOCK_INSTRUCTORS } from '../../constants';
import { Instructor } from '../../types';

const AdminPengajar: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>(MOCK_INSTRUCTORS);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleDelete = () => {
    if (selectedInstructor) {
      setInstructors(instructors.filter(i => i.id !== selectedInstructor.id));
      setIsDeleteOpen(false);
      setSelectedInstructor(null);
      triggerToast('Pengajar berhasil dihapus');
    }
  };

  const toggleStatus = () => {
    // In dummy state, we don't have active property in Instructor interface yet, 
    // but we can simulate the UI feedback
    setIsStatusModalOpen(false);
    triggerToast('Status pengajar diperbarui');
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
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Manajemen Pengajar</h1>
          <p className="text-sm text-[#64748B]">Atur akun pengajar, keahlian, dan reputasi.</p>
        </div>
        <Link to="/admin/pengajar/baru" className="px-6 py-3 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center tap-target">
          <Plus size={18} className="mr-2" />
          Tambah Pengajar Baru
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input 
            type="text" 
            placeholder="Cari nama pengajar..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all"
          />
        </div>
      </div>

      {/* Table Wrapped for Responsiveness */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="table-wrap">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Pengajar</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Keahlian</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Rating</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Kursus</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Lokasi</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {instructors.map((ins) => (
                <tr key={ins.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <img src={ins.avatar} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-[#0F172A]">{ins.name}</div>
                        <div className="text-[10px] text-[#64748B] font-medium lowercase">ins-{ins.id}@marbot.id</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#475569]">{ins.role}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-1 text-xs font-bold text-[#0F172A]">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span>{ins.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#475569]">{ins.totalCourses}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-1 text-xs text-[#64748B]">
                      <MapPin size={14} className="shrink-0" />
                      <span className="truncate max-w-[120px]">{ins.location}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === ins.id ? null : ins.id)}
                      className="p-2 text-[#64748B] hover:text-[#14B8A6] rounded-lg transition-all tap-target flex items-center justify-end w-full"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === ins.id && (
                      <div className="absolute right-8 top-12 z-20 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-2 animate-fadeIn">
                        <button 
                          onClick={() => { setSelectedInstructor(ins); setIsViewOpen(true); setActiveDropdown(null); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-[#F8FAFC] hover:text-[#14B8A6] transition-colors"
                        >
                          <Eye size={16} /> <span>View Detail</span>
                        </button>
                        <Link 
                          to={`/admin/pengajar/${ins.id}/edit`}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-[#F8FAFC] hover:text-[#14B8A6] transition-colors"
                        >
                          <Edit size={16} /> <span>Edit Profil</span>
                        </Link>
                        <button 
                          onClick={() => { setSelectedInstructor(ins); setIsStatusModalOpen(true); setActiveDropdown(null); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-[#F8FAFC] transition-colors"
                        >
                          <ShieldOff size={16} /> <span>Nonaktifkan</span>
                        </button>
                        <div className="h-px bg-[#F1F5F9] my-1 mx-2"></div>
                        <button 
                          onClick={() => { setSelectedInstructor(ins); setIsDeleteOpen(true); setActiveDropdown(null); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} /> <span>Hapus</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal View Pengajar */}
      {isViewOpen && selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsViewOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
             <div className="p-10 text-center relative">
                <button onClick={() => setIsViewOpen(false)} className="absolute top-6 right-6 text-[#94A3B8] hover:text-[#0F172A] p-2 rounded-lg tap-target"><X size={20} /></button>
                <img src={selectedInstructor.avatar} className="w-24 h-24 rounded-2xl object-cover mx-auto mb-6 shadow-xl border-4 border-white" />
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-1">{selectedInstructor.name}</h3>
                <p className="text-xs font-bold text-[#14B8A6] uppercase tracking-[0.2em] mb-8">{selectedInstructor.role}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                   <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                      <div className="text-lg font-extrabold text-[#0F172A]">{selectedInstructor.rating}</div>
                      <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Rating</div>
                   </div>
                   <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                      <div className="text-lg font-extrabold text-[#0F172A]">{selectedInstructor.totalStudents}</div>
                      <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Peserta</div>
                   </div>
                   <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                      <div className="text-lg font-extrabold text-[#0F172A]">{selectedInstructor.totalCourses}</div>
                      <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Kursus</div>
                   </div>
                </div>

                <div className="space-y-4 text-left border-t border-[#F1F5F9] pt-8">
                   <div className="flex items-center text-sm text-[#475569]">
                      <Mail size={16} className="text-[#14B8A6] mr-3" />
                      <span className="font-medium">ins-{selectedInstructor.id}@marbot.id</span>
                   </div>
                   <div className="flex items-center text-sm text-[#475569]">
                      <MapPin size={16} className="text-[#14B8A6] mr-3" />
                      <span className="font-medium">{selectedInstructor.location}</span>
                   </div>
                   <div className="bg-[#F8FAFC] p-4 rounded-xl text-xs text-[#64748B] leading-relaxed italic">
                      "{selectedInstructor.bio}"
                   </div>
                </div>
             </div>
             <div className="px-10 pb-10 flex gap-3">
                <Link to={`/admin/pengajar/${selectedInstructor.id}/edit`} className="flex-1 py-3.5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] text-sm text-center tap-target">Edit Profil</Link>
                <button onClick={() => setIsViewOpen(false)} className="flex-1 py-3.5 border-2 border-[#E2E8F0] text-[#64748B] font-bold rounded-xl hover:bg-[#F8FAFC] text-sm tap-target">Tutup</button>
             </div>
          </div>
        </div>
      )}

      {/* Modal Hapus Pengajar */}
      {isDeleteOpen && selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsDeleteOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">Hapus Pengajar?</h3>
                <p className="text-sm text-[#64748B] leading-relaxed px-4">
                  Data pengajar <span className="font-bold text-[#0F172A]">"{selectedInstructor.name}"</span> akan dihapus dari sistem and akses login akan dicabut.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-3 border-2 border-[#E2E8F0] text-[#64748B] font-bold text-sm rounded-xl hover:bg-[#F8FAFC] transition-all tap-target">Batal</button>
                <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white font-bold text-sm rounded-xl hover:bg-red-600 transition-all tap-target">Hapus Data</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nonaktifkan Pengajar */}
      {isStatusModalOpen && selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsStatusModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShieldOff size={32} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">Nonaktifkan Pengajar?</h3>
                <p className="text-sm text-[#64748B] leading-relaxed px-4">
                  Pengajar tidak akan bisa login and semua kursus milik pengajar ini akan disembunyikan sementara.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button onClick={() => setIsStatusModalOpen(false)} className="flex-1 py-3 border-2 border-[#E2E8F0] text-[#64748B] font-bold text-sm rounded-xl hover:bg-[#F8FAFC] transition-all tap-target">Batal</button>
                <button onClick={toggleStatus} className="flex-1 py-3 bg-amber-600 text-white font-bold text-sm rounded-xl hover:bg-amber-700 transition-all tap-target">Ya, Nonaktifkan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPengajar;
