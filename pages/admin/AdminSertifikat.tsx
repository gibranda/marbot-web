
import React from 'react';
import { Search, Award, Download, Eye, MoreVertical } from 'lucide-react';
import { MOCK_CERTIFICATES } from '../../constants';

const AdminSertifikat: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Manajemen Sertifikat</h1>
        <p className="text-sm text-[#64748B]">Daftar sertifikat yang telah diterbitkan untuk alumni.</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input 
            type="text" 
            placeholder="Cari nama atau nomor sertifikat..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="table-wrap">
          <table className="w-full text-left min-w-[750px]">
            <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Peserta</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Kursus</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">No. Sertifikat</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Tgl Terbit</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_CERTIFICATES.map((cert) => (
                <tr key={cert.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="px-8 py-5 text-sm font-bold text-[#0F172A] whitespace-nowrap">{cert.studentName}</td>
                  <td className="px-6 py-5 text-xs text-[#64748B]">{cert.courseTitle}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Award size={14} className="text-[#14B8A6] shrink-0" />
                      <span className="text-[10px] font-bold text-[#475569]">{cert.certNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-[#64748B] whitespace-nowrap">{cert.issueDate}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-[#64748B] hover:text-[#14B8A6] rounded-lg transition-all tap-target flex items-center" title="Lihat">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-[#64748B] hover:text-[#14B8A6] rounded-lg transition-all tap-target flex items-center" title="Download">
                        <Download size={16} />
                      </button>
                    </div>
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

export default AdminSertifikat;