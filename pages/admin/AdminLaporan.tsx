
import React from 'react';
import { FileText, Download, BarChart2, PieChart, Users, BookOpen } from 'lucide-react';

const AdminLaporan: React.FC = () => {
  const reports = [
    { title: 'Laporan Peserta Bulanan', type: 'Users', icon: <Users className="text-blue-500" /> },
    { title: 'Laporan Penjualan Kursus', type: 'Finance', icon: <BarChart2 className="text-green-500" /> },
    { title: 'Laporan Performa Pengajar', type: 'Instructors', icon: <PieChart className="text-purple-500" /> },
    { title: 'Laporan Kelulusan Alumni', type: 'Academic', icon: <BookOpen className="text-amber-500" /> },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Laporan & Analitik</h1>
          <p className="text-sm text-[#64748B]">Data performa Marbot LMS dalam bentuk grafik and tabel.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center mb-4">
              {report.icon}
            </div>
            <h4 className="text-sm font-bold text-[#0F172A] mb-2">{report.title}</h4>
            <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest mb-6">{report.type}</p>
            <button className="mt-auto w-full py-2.5 bg-[#F8FAFC] text-[#64748B] text-xs font-bold rounded-xl hover:bg-[#14B8A6] hover:text-white transition-all flex items-center justify-center">
              <Download size={14} className="mr-2" />
              Download PDF
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]">
        <BarChart2 size={64} className="text-[#E2E8F0] mb-6" />
        <h3 className="text-lg font-extrabold text-[#0F172A] mb-2">Visualisasi Grafik Sedang Disiapkan</h3>
        <p className="text-sm text-[#64748B] max-w-md">Data analitik mendalam sedang dikumpulkan untuk periode bulan ini. Anda tetap bisa mengunduh laporan mentah dalam format CSV.</p>
        <button className="mt-8 px-8 py-3 bg-[#14B8A6] text-white font-bold rounded-xl shadow-lg shadow-[#14B8A6]/20">
          Ekspor Semua Data (CSV)
        </button>
      </div>
    </div>
  );
};

export default AdminLaporan;
