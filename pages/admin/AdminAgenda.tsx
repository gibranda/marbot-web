
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Added ChevronRight to imports to fix error on line 221
import { Plus, Search, Filter, Edit, Eye, Trash2, Users, Calendar, Globe, MapPin, X, AlertTriangle, Info, Clock, ExternalLink, ChevronRight } from 'lucide-react';
import { MOCK_AGENDA } from '../../constants';
import { Agenda } from '../../types';

const AdminAgenda: React.FC = () => {
  const [agendas, setAgendas] = useState<Agenda[]>(MOCK_AGENDA);
  const [selectedAgenda, setSelectedAgenda] = useState<Agenda | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const handleDelete = () => {
    if (selectedAgenda) {
      setAgendas(agendas.filter(a => a.id !== selectedAgenda.id));
      setIsDeleteOpen(false);
      setSelectedAgenda(null);
      triggerToast('Agenda berhasil dihapus');
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
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">Manajemen Agenda</h1>
          <p className="text-sm text-[#64748B]">Kelola jadwal workshop online and offline masjid.</p>
        </div>
        <Link to="/admin/agenda/baru" className="px-6 py-3 bg-[#14B8A6] text-white text-sm font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center tap-target">
          <Plus size={18} className="mr-2" />
          Buat Agenda Baru
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input 
            type="text" 
            placeholder="Cari agenda..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm focus:border-[#14B8A6] outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="p-2.5 border border-[#E2E8F0] rounded-[10px] hover:bg-[#F8FAFC] text-[#64748B] tap-target flex items-center">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table Wrapped for Responsiveness */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="table-wrap">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Judul Agenda</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Tipe & Lokasi</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Waktu</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-center">Pendaftar</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Harga</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {agendas.map((agenda) => (
                <tr key={agenda.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#F1F5F9]">
                        <img src={agenda.cover} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0F172A] line-clamp-1">{agenda.title}</div>
                        <div className="text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider">{agenda.status}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2 mb-1">
                       <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${agenda.type === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>{agenda.type}</span>
                    </div>
                    <div className="text-xs text-[#64748B] flex items-center">
                       {agenda.type === 'Online' ? <Globe size={12} className="mr-1" /> : <MapPin size={12} className="mr-1" />}
                       {agenda.locationName}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-bold text-[#0F172A]">{agenda.date}</div>
                    <div className="text-[10px] text-[#64748B]">{agenda.time} WIB</div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <Link to={`/admin/agenda/${agenda.slug}/pendaftar`} className="inline-flex flex-col items-center group/btn tap-target">
                       <span className="text-sm font-extrabold text-[#0F172A] group-hover/btn:text-[#14B8A6]">{agenda.registrantsCount}</span>
                       <span className="text-[9px] text-[#94A3B8] font-bold uppercase flex items-center">
                          <Users size={10} className="mr-1" /> Peserta
                       </span>
                    </Link>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-xs font-bold ${agenda.price === 'Gratis' ? 'text-green-600' : 'text-[#0F172A]'}`}>{agenda.price}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setSelectedAgenda(agenda); setIsViewOpen(true); }}
                        className="p-2 text-[#64748B] hover:text-[#14B8A6] hover:bg-white rounded-lg transition-all tap-target flex items-center" title="Pratinjau"
                      >
                        <Eye size={16} />
                      </button>
                      <Link 
                        to={`/admin/agenda/${agenda.slug}/edit`}
                        className="p-2 text-[#64748B] hover:text-[#14B8A6] hover:bg-white rounded-lg transition-all tap-target flex items-center" title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => { setSelectedAgenda(agenda); setIsDeleteOpen(true); }}
                        className="p-2 text-[#64748B] hover:text-red-500 hover:bg-white rounded-lg transition-all tap-target flex items-center" title="Hapus"
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

      {/* Drawer View Detail Agenda */}
      {isViewOpen && selectedAgenda && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsViewOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg h-full shadow-2xl flex flex-col animate-slideInRight">
            <div className="p-6 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6]">
                  <Calendar size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-[#0F172A]">Detail Agenda</h2>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">ID: {selectedAgenda.id}</p>
                </div>
              </div>
              <button onClick={() => setIsViewOpen(false)} className="text-[#64748B] hover:text-[#0F172A] p-2 bg-white border border-[#E2E8F0] rounded-lg transition-all tap-target"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              <div>
                 <img src={selectedAgenda.cover} className="w-full aspect-video rounded-2xl object-cover shadow-lg border border-[#F1F5F9] mb-8" />
                 <h3 className="text-2xl font-extrabold text-[#0F172A] leading-snug mb-4">{selectedAgenda.title}</h3>
                 <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg ${selectedAgenda.type === 'Online' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>{selectedAgenda.type}</span>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-lg border border-green-100">{selectedAgenda.status}</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest flex items-center"><Clock size={12} className="mr-1" /> Waktu</div>
                  <div className="text-sm font-bold text-[#0F172A]">{selectedAgenda.date}, {selectedAgenda.time} WIB</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest flex items-center"><Users size={12} className="mr-1" /> Kuota</div>
                  <div className="text-sm font-bold text-[#0F172A]">{selectedAgenda.registrantsCount} / {selectedAgenda.quota} Peserta</div>
                </div>
                <div className="col-span-2 space-y-1">
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest flex items-center">
                    {selectedAgenda.type === 'Online' ? <Globe size={12} className="mr-1" /> : <MapPin size={12} className="mr-1" />} 
                    {selectedAgenda.type === 'Online' ? 'Platform / Link' : 'Lokasi'}
                  </div>
                  <div className="text-sm font-bold text-[#0F172A] break-all">{selectedAgenda.location}</div>
                  {selectedAgenda.type === 'Online' && (
                    <a href={selectedAgenda.location} target="_blank" className="text-xs font-bold text-[#14B8A6] flex items-center mt-2 hover:underline">
                      Buka Link <ExternalLink size={12} className="ml-1" />
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-[#0F172A] text-sm flex items-center border-l-4 border-[#14B8A6] pl-3">Deskripsi</h4>
                <p className="text-sm text-[#64748B] leading-relaxed">{selectedAgenda.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-[#0F172A] text-sm flex items-center border-l-4 border-[#14B8A6] pl-3">Narasumber</h4>
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9] flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#14B8A6] flex items-center justify-center text-white font-bold text-sm">
                    {selectedAgenda.narasumber.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-[#0F172A]">{selectedAgenda.narasumber}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#F1F5F9] bg-[#F8FAFC] space-y-3">
              <Link 
                to={`/admin/agenda/${selectedAgenda.slug}/pendaftar`}
                className="w-full py-3.5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center text-sm tap-target"
              >
                Lihat Daftar Pendaftar <ChevronRight size={16} className="ml-2" />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to={`/admin/agenda/${selectedAgenda.slug}/edit`}
                  className="py-3 bg-white border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-xl hover:border-[#14B8A6] transition-all flex items-center justify-center text-sm tap-target"
                >
                  Edit Agenda
                </Link>
                <button onClick={() => setIsViewOpen(false)} className="py-3 bg-white border-2 border-[#E2E8F0] text-[#64748B] font-bold rounded-xl hover:bg-[#F8FAFC] transition-all text-sm tap-target">Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus Agenda */}
      {isDeleteOpen && selectedAgenda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsDeleteOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slideInUp">
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">Hapus Agenda?</h3>
                <p className="text-sm text-[#64748B] leading-relaxed px-4">
                  Agenda <span className="font-bold text-[#0F172A]">"{selectedAgenda.title}"</span> akan dihapus and tidak bisa dikembalikan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-3 border-2 border-[#E2E8F0] text-[#64748B] font-bold text-sm rounded-xl hover:bg-[#F8FAFC] transition-all tap-target">Batal</button>
                <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white font-bold text-sm rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all tap-target">Hapus Agenda</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAgenda;
