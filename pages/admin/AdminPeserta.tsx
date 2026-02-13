
import React, { useState } from 'react';
import { Search, MoreVertical, Mail, Phone, Calendar, Eye, RefreshCw, ShieldOff, X, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { MOCK_STUDENTS } from '../../constants';
import { Student } from '../../types';

const AdminPeserta: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleAction = (msg: string) => {
    setIsResetOpen(false);
    setIsStatusOpen(false);
    triggerToast(msg);
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

      <div className="text-center md:text-left">
        <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Manajemen Peserta</h1>
        <p className="text-sm text-[#64748B]">Daftar jamaah and takmir yang aktif belajar.</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input 
            type="text" 
            placeholder="Cari nama atau email..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="table-wrap">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Peserta</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Kursus</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Progress</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Tgl Daftar</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_STUDENTS.map((st) => (
                <tr key={st.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-[10px] bg-[#F0FDFA] flex items-center justify-center font-bold text-[#14B8A6] shrink-0">
                        {st.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0F172A]">{st.name}</div>
                        <div className="text-[10px] text-[#64748B] font-medium truncate max-w-[120px]">{st.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-bold text-[#475569]">{st.coursesJoined}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden w-16 sm:w-20">
                        <div className="h-full bg-[#14B8A6]" style={{ width: `${st.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-[#475569]">{st.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                      st.status === 'Aktif' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {st.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-[#64748B] whitespace-nowrap">{st.joinDate}</td>
                  <td className="px-8 py-5 text-right relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === st.id ? null : st.id)}
                      className="p-2 text-[#64748B] hover:text-[#14B8A6] rounded-lg transition-all tap-target flex items-center justify-end w-full"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === st.id && (
                      <div className="absolute right-8 top-12 z-20 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-2 animate-fadeIn text-left">
                        <button 
                          onClick={() => { setSelectedStudent(st); setIsViewOpen(true); setActiveDropdown(null); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-[#F8FAFC] transition-colors"
                        >
                          <Eye size={16} /> <span>View Detail</span>
                        </button>
                        <button 
                          onClick={() => { setSelectedStudent(st); setIsResetOpen(true); setActiveDropdown(null); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-[#F8FAFC] transition-colors"
                        >
                          <RefreshCw size={16} /> <span>Reset Akses</span>
                        </button>
                        <button 
                          onClick={() => { setSelectedStudent(st); setIsStatusOpen(true); setActiveDropdown(null); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <ShieldOff size={16} /> <span>Nonaktifkan</span>
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

      {/* Modal View Peserta */}
      {isViewOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsViewOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
            <div className="p-10 text-center relative">
               <button onClick={() => setIsViewOpen(false)} className="absolute top-6 right-6 text-[#94A3B8] hover:text-[#0F172A] p-2 rounded-lg tap-target"><X size={20} /></button>
               <div className="w-20 h-20 rounded-2xl bg-[#F0FDFA] flex items-center justify-center font-extrabold text-[#14B8A6] text-3xl mx-auto mb-6 shadow-lg border border-[#14B8A6]/10">
                 {selectedStudent.name.charAt(0)}
               </div>
               <h3 className="text-xl font-extrabold text-[#0F172A] mb-1">{selectedStudent.name}</h3>
               <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest mb-8">Terdaftar: {selectedStudent.joinDate}</p>
               
               <div className="space-y-4 text-left border-t border-[#F1F5F9] pt-8">
                  <div className="flex items-center text-sm text-[#475569]">
                     <Mail size={16} className="text-[#14B8A6] mr-3" />
                     <span className="font-medium">{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-[#475569]">
                     <Phone size={16} className="text-[#14B8A6] mr-3" />
                     <span className="font-medium">{selectedStudent.phone}</span>
                  </div>
               </div>

               <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center text-sm mb-2">
                     <span className="font-bold text-[#0F172A] flex items-center"><BookOpen size={16} className="mr-2 text-[#14B8A6]" /> Kursus Diikuti</span>
                     <span className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-lg">{selectedStudent.coursesJoined} Kursus</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#F1F5F9]">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Rata-rata Progress</span>
                        <span className="text-xs font-bold text-[#14B8A6]">{selectedStudent.progress}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-white border border-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#14B8A6]" style={{ width: `${selectedStudent.progress}%` }}></div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="px-10 pb-10">
               <button onClick={() => setIsViewOpen(false)} className="w-full py-3.5 bg-[#F8FAFC] border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-xl hover:bg-white text-sm tap-target transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation (Reset/Nonaktif) */}
      {(isResetOpen || isStatusOpen) && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => { setIsResetOpen(false); setIsStatusOpen(false); }}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
            <div className="p-8 text-center space-y-6">
              <div className={`w-16 h-16 ${isResetOpen ? 'bg-[#F0FDFA] text-[#14B8A6]' : 'bg-red-50 text-red-500'} rounded-full flex items-center justify-center mx-auto mb-2`}>
                {isResetOpen ? <RefreshCw size={32} /> : <AlertTriangle size={32} />}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">{isResetOpen ? 'Reset Akses?' : 'Nonaktifkan Peserta?'}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed px-4">
                  {isResetOpen 
                    ? `Akses kursus peserta ${selectedStudent.name} akan diatur ulang ke kondisi awal.` 
                    : `Peserta ${selectedStudent.name} tidak akan bisa mengakses materi sampai diaktifkan kembali.`}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button onClick={() => { setIsResetOpen(false); setIsStatusOpen(false); }} className="flex-1 py-3 border-2 border-[#E2E8F0] text-[#64748B] font-bold text-sm rounded-xl hover:bg-[#F8FAFC] transition-all tap-target">Batal</button>
                <button 
                  onClick={() => handleAction(isResetOpen ? 'Akses direset' : 'Peserta dinonaktifkan')} 
                  className={`flex-1 py-3 ${isResetOpen ? 'bg-[#14B8A6] hover:bg-[#0F766E]' : 'bg-red-500 hover:bg-red-600'} text-white font-bold text-sm rounded-xl shadow-lg transition-all tap-target`}
                >
                  Ya, Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPeserta;
