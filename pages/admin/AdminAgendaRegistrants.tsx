
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, MoreVertical, CheckCircle2, User, Mail, Calendar } from 'lucide-react';
import { MOCK_AGENDA, MOCK_STUDENTS } from '../../constants';

const AdminAgendaRegistrants: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const agenda = MOCK_AGENDA.find(a => a.slug === slug) || MOCK_AGENDA[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm font-bold text-[#64748B] hover:text-[#14B8A6] transition-colors mb-2 group mx-auto md:mx-0 tap-target"
          >
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Manajemen Agenda
          </button>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1 truncate max-w-md">Daftar Pendaftar</h1>
          <p className="text-sm text-[#64748B]">{agenda.title}</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#475569] text-sm font-bold rounded-xl hover:bg-[#F8FAFC] transition-all flex items-center justify-center shadow-sm tap-target">
            <Download size={18} className="mr-2" /> Ekspor Peserta
          </button>
        </div>
      </div>

      {/* Stats Mini Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6]">
               <CheckCircle2 size={24} />
            </div>
            <div>
               <div className="text-2xl font-extrabold text-[#0F172A]">{agenda.registrantsCount}</div>
               <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Total Terdaftar</div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#64748B]">
               <User size={24} />
            </div>
            <div>
               <div className="text-2xl font-extrabold text-[#0F172A]">{agenda.quota}</div>
               <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Total Kapasitas</div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-amber-500">
               <Calendar size={24} />
            </div>
            <div>
               <div className="text-2xl font-extrabold text-[#0F172A]">{Math.round((agenda.registrantsCount / agenda.quota) * 100)}%</div>
               <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Persentase Isi</div>
            </div>
         </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input 
            type="text" 
            placeholder="Cari nama atau email peserta..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all"
          />
        </div>
        <button className="p-2.5 border border-[#E2E8F0] rounded-[10px] hover:bg-[#F8FAFC] text-[#64748B] tap-target flex items-center">
          <Filter size={18} />
        </button>
      </div>

      {/* Table Wrapped */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="table-wrap">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Nama Peserta</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Email & Kontak</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Status Pembayaran</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-center">Tgl Daftar</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_STUDENTS.slice(0, 5).map((st, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center font-bold text-[#14B8A6] shrink-0 border border-[#14B8A6]/10">
                        {st.name.charAt(0)}
                      </div>
                      <div className="text-sm font-bold text-[#0F172A]">{st.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs text-[#0F172A] flex items-center"><Mail size={12} className="mr-1.5 text-[#94A3B8]" /> {st.email}</div>
                    <div className="text-[10px] text-[#64748B] mt-1">HP: {st.phone}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-wider ${
                      agenda.price === 'Gratis' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {agenda.price === 'Gratis' ? 'Free Access' : 'Paid / Lunas'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center text-xs text-[#64748B] whitespace-nowrap">
                    {st.joinDate}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-[#64748B] hover:text-[#14B8A6] rounded-lg transition-all tap-target flex items-center justify-end w-full">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAgendaRegistrants;
