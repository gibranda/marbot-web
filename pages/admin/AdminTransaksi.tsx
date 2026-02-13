
import React, { useState } from 'react';
import { Search, MoreVertical, Filter, Download, Eye, CheckCircle, RefreshCw, X, CreditCard, Printer, User, BookOpen, Clock } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../../constants';
import { Transaction } from '../../types';

const AdminTransaksi: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedTr, setSelectedTr] = useState<Transaction | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<'lunas' | 'refund'>('lunas');
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    triggerToast(confirmType === 'lunas' ? 'Status pembayaran diperbarui' : 'Proses refund diajukan');
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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Riwayat Transaksi</h1>
          <p className="text-sm text-[#64748B]">Pantau arus pendapatan and status pembayaran.</p>
        </div>
        <button className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#475569] text-sm font-bold rounded-xl hover:bg-[#F8FAFC] transition-all flex items-center justify-center shadow-sm tap-target">
          <Download size={18} className="mr-2" />
          Ekspor CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input 
            type="text" 
            placeholder="Cari invoice atau nama..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all"
          />
        </div>
        <button className="p-2.5 border border-[#E2E8F0] rounded-[10px] hover:bg-[#F8FAFC] text-[#64748B] tap-target flex items-center">
          <Filter size={18} />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="table-wrap">
          <table className="w-full text-left min-w-[850px]">
            <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Invoice</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Peserta</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Kursus</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Nominal</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Tgl Transaksi</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_TRANSACTIONS.map((tr) => (
                <tr key={tr.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="px-8 py-5 text-xs font-bold text-[#14B8A6] whitespace-nowrap">{tr.invoice}</td>
                  <td className="px-6 py-5 text-xs font-bold text-[#0F172A] whitespace-nowrap">{tr.userName}</td>
                  <td className="px-6 py-5 text-xs text-[#64748B] line-clamp-1 max-w-[150px]">{tr.courseTitle}</td>
                  <td className="px-6 py-5 text-xs font-bold text-[#0F172A] whitespace-nowrap">{tr.amount}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider whitespace-nowrap ${
                      tr.status === 'Berhasil' ? 'bg-green-100 text-green-600' : 
                      tr.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 
                      'bg-red-100 text-red-600'
                    }`}>
                      {tr.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-[#64748B] whitespace-nowrap">{tr.date}</td>
                  <td className="px-8 py-5 text-right relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === tr.id ? null : tr.id)}
                      className="p-2 text-[#64748B] hover:text-[#14B8A6] rounded-lg transition-all tap-target flex items-center justify-end w-full"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === tr.id && (
                      <div className="absolute right-8 top-12 z-20 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-2 animate-fadeIn text-left">
                        <button 
                          onClick={() => { setSelectedTr(tr); setIsInvoiceOpen(true); setActiveDropdown(null); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-[#F8FAFC] transition-colors"
                        >
                          <Eye size={16} /> <span>View Invoice</span>
                        </button>
                        <button 
                          onClick={() => { setSelectedTr(tr); setConfirmType('lunas'); setIsConfirmOpen(true); setActiveDropdown(null); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] hover:bg-[#F8FAFC] transition-colors"
                        >
                          <CheckCircle size={16} /> <span>Tandai Lunas</span>
                        </button>
                        <button 
                          onClick={() => { setSelectedTr(tr); setConfirmType('refund'); setIsConfirmOpen(true); setActiveDropdown(null); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <RefreshCw size={16} /> <span>Refund</span>
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

      {/* Modal Invoice */}
      {isInvoiceOpen && selectedTr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsInvoiceOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
            <div className="p-6 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
              <h2 className="text-lg font-extrabold text-[#0F172A]">Detail Transaksi</h2>
              <button onClick={() => setIsInvoiceOpen(false)} className="text-[#64748B] hover:text-[#0F172A] tap-target"><X size={20} /></button>
            </div>
            <div className="p-8 space-y-8">
               <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Nomor Invoice</p>
                    <h3 className="text-xl font-extrabold text-[#14B8A6]">{selectedTr.invoice}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Status</p>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                      selectedTr.status === 'Berhasil' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {selectedTr.status}
                    </span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 border-y border-[#F1F5F9] py-8">
                  <div className="space-y-4">
                     <div className="flex items-start space-x-3">
                        <User size={16} className="text-[#14B8A6] mt-0.5" />
                        <div>
                           <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Nama Peserta</p>
                           <p className="text-sm font-bold text-[#0F172A]">{selectedTr.userName}</p>
                        </div>
                     </div>
                     <div className="flex items-start space-x-3">
                        <CreditCard size={16} className="text-[#14B8A6] mt-0.5" />
                        <div>
                           <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Metode Bayar</p>
                           <p className="text-sm font-bold text-[#0F172A]">{selectedTr.method}</p>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-start space-x-3">
                        <BookOpen size={16} className="text-[#14B8A6] mt-0.5" />
                        <div>
                           <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Item / Kursus</p>
                           <p className="text-sm font-bold text-[#0F172A] leading-tight">{selectedTr.courseTitle}</p>
                        </div>
                     </div>
                     <div className="flex items-start space-x-3">
                        <Clock size={16} className="text-[#14B8A6] mt-0.5" />
                        <div>
                           <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Waktu Bayar</p>
                           <p className="text-sm font-bold text-[#0F172A]">{selectedTr.date}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-[#F8FAFC] p-6 rounded-2xl flex justify-between items-center border border-[#E2E8F0]">
                  <span className="text-sm font-bold text-[#475569]">Total Pembayaran</span>
                  <span className="text-2xl font-extrabold text-[#0F172A]">{selectedTr.amount}</span>
               </div>
            </div>
            <div className="p-6 border-t border-[#F1F5F9] flex gap-3 bg-[#F8FAFC] justify-end">
               <button className="px-6 py-2.5 bg-white border-2 border-[#E2E8F0] text-[#0F172A] font-bold text-sm rounded-xl hover:border-[#14B8A6] transition-all flex items-center tap-target">
                 <Printer size={16} className="mr-2" /> Cetak PDF
               </button>
               <button onClick={() => setIsInvoiceOpen(false)} className="px-8 py-2.5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all text-sm tap-target">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Lunas/Refund */}
      {isConfirmOpen && selectedTr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsConfirmOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
            <div className="p-8 text-center space-y-6">
              <div className={`w-16 h-16 ${confirmType === 'lunas' ? 'bg-[#F0FDFA] text-[#14B8A6]' : 'bg-red-50 text-red-500'} rounded-full flex items-center justify-center mx-auto mb-2`}>
                {confirmType === 'lunas' ? <CheckCircle size={32} /> : <RefreshCw size={32} />}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">{confirmType === 'lunas' ? 'Tandai Lunas?' : 'Refund Transaksi?'}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed px-4">
                  {confirmType === 'lunas' 
                    ? `Update status transaksi ${selectedTr.invoice} menjadi Berhasil.` 
                    : `Lakukan proses refund untuk transaksi ${selectedTr.invoice}.`}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button onClick={() => setIsConfirmOpen(false)} className="flex-1 py-3 border-2 border-[#E2E8F0] text-[#64748B] font-bold text-sm rounded-xl hover:bg-[#F8FAFC] transition-all tap-target">Batal</button>
                <button 
                  onClick={handleConfirm} 
                  className={`flex-1 py-3 ${confirmType === 'lunas' ? 'bg-[#14B8A6] hover:bg-[#0F766E]' : 'bg-red-500 hover:bg-red-600'} text-white font-bold text-sm rounded-xl shadow-lg transition-all tap-target`}
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

export default AdminTransaksi;
