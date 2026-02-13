
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// Added missing 'Calendar' icon to the lucide-react imports
import { ArrowLeft, ShieldCheck, ChevronRight, Smartphone, Building, CreditCard, User, Mail, Calendar } from 'lucide-react';
import { MOCK_AGENDA } from '../../constants';

const AgendaCheckout: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const agenda = MOCK_AGENDA.find(a => a.slug === slug) || MOCK_AGENDA[0];
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('marbot_user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handlePayment = () => {
    // Save registration to dummy storage
    const registrations = JSON.parse(localStorage.getItem('marbot_agenda_registrations') || '[]');
    if (!registrations.find((r: any) => r.agendaId === agenda.id)) {
      registrations.push({
        id: `reg-${Date.now()}`,
        agendaId: agenda.id,
        status: 'Terdaftar',
        dateRegistered: new Date().toLocaleDateString('id-ID'),
        isPaid: agenda.price !== 'Gratis'
      });
      localStorage.setItem('marbot_agenda_registrations', JSON.stringify(registrations));
    }
    navigate(`/agenda/${agenda.slug}/daftar/sukses`);
  };

  if (!user) return null;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm font-bold text-[#64748B] hover:text-[#14B8A6] group transition-colors tap-target"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Detail Agenda
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl font-extrabold text-[#0F172A]">Pendaftaran Workshop</h1>

            {/* User Data Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
               <div className="p-6 border-b border-[#F1F5F9] bg-[#F8FAFC] flex justify-between items-center">
                  <h3 className="font-bold text-[#0F172A]">Informasi Peserta</h3>
                  <button className="text-xs font-bold text-[#14B8A6] hover:underline">Ubah Data</button>
               </div>
               <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] shrink-0">
                           <User size={20} />
                        </div>
                        <div>
                           <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Nama Lengkap</div>
                           <div className="text-sm font-bold text-[#0F172A]">{user.name}</div>
                        </div>
                     </div>
                     <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] shrink-0">
                           <Mail size={20} />
                        </div>
                        <div>
                           <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Alamat Email</div>
                           <div className="text-sm font-bold text-[#0F172A]">{user.email}</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                <h3 className="font-bold text-[#0F172A]">Ringkasan Agenda</h3>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-48 aspect-video rounded-xl overflow-hidden shrink-0 shadow-md">
                    <img src={agenda.cover} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-extrabold text-[#0F172A] mb-2 leading-tight">{agenda.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-[#64748B] mb-6">
                       <span className="flex items-center"><Calendar size={14} className="mr-1.5 text-[#14B8A6]" /> {agenda.date}</span>
                       <span className="flex items-center"><Building size={14} className="mr-1.5 text-[#14B8A6]" /> {agenda.type}</span>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-[#475569]">Biaya Registrasi</span>
                        <span className="font-bold text-[#0F172A]">{agenda.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-[#475569]">Pajak & Biaya Admin</span>
                        <span className="font-bold text-[#14B8A6]">Rp 0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods (Berbayar Only) */}
            {agenda.price !== 'Gratis' && (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                  <h3 className="font-bold text-[#0F172A]">Metode Pembayaran</h3>
                </div>
                <div className="p-8 space-y-4">
                  {[
                    { id: 'qris', name: 'QRIS / E-Wallet', icon: <Smartphone className="text-[#14B8A6]" /> },
                    { id: 'va', name: 'Virtual Account (Bank Transfer)', icon: <Building className="text-[#14B8A6]" /> },
                    { id: 'cc', name: 'Kartu Kredit / Debit', icon: <CreditCard className="text-[#14B8A6]" /> },
                  ].map((method, idx) => (
                    <label key={method.id} className="flex items-center justify-between p-4 border-2 border-[#E2E8F0] rounded-xl hover:border-[#14B8A6] cursor-pointer group transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-[#F0FDFA] flex items-center justify-center">
                          {method.icon}
                        </div>
                        <span className="font-bold text-[#0F172A] group-hover:text-[#14B8A6]">{method.name}</span>
                      </div>
                      <input type="radio" name="payment" defaultChecked={idx === 0} className="w-5 h-5 text-[#14B8A6] focus:ring-[#14B8A6]" />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Total */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-[#E2E8F0] rounded-2xl p-8 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">Total Pembayaran</h3>
              <div className={`text-4xl font-extrabold mb-8 ${agenda.price === 'Gratis' ? 'text-[#14B8A6]' : 'text-[#0F172A]'}`}>
                {agenda.price}
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-2 text-xs text-[#64748B]">
                  <ShieldCheck size={16} className="text-[#14B8A6] shrink-0" />
                  <span>Data Anda aman and terenkripsi sesuai standar privasi Marbot LMS.</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                className="w-full py-5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center tap-target"
              >
                {agenda.price === 'Gratis' ? 'Konfirmasi Pendaftaran' : 'Bayar Sekarang'} <ChevronRight size={18} className="ml-2" />
              </button>

              <button 
                onClick={() => navigate(-1)}
                className="w-full mt-4 py-3 text-[#64748B] font-bold text-sm hover:text-[#0F172A] transition-colors tap-target"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaCheckout;
