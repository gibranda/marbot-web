
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Globe, Users, Share2, CheckCircle, ArrowLeft, CalendarPlus, ShieldCheck } from 'lucide-react';
import { MOCK_AGENDA } from '../../constants';

const AgendaDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const agenda = MOCK_AGENDA.find(a => a.slug === slug) || MOCK_AGENDA[0];

  const handleRegister = () => {
    const userStr = localStorage.getItem('marbot_user');
    if (!userStr) {
      navigate(`/login?returnTo=${encodeURIComponent(`/agenda/${agenda.slug}/daftar`)}`);
      return;
    }
    navigate(`/agenda/${agenda.slug}/daftar`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <Link to="/agenda" className="inline-flex items-center space-x-2 text-sm font-bold text-[#64748B] hover:text-[#14B8A6] group transition-colors tap-target">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Daftar Agenda</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-10">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                  agenda.type === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {agenda.type}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                  agenda.price === 'Gratis' ? 'bg-green-100 text-green-600' : 'bg-[#F0FDFA] text-[#14B8A6] border border-[#14B8A6]/20'
                }`}>
                  {agenda.price === 'Gratis' ? 'Gratis' : 'Berbayar'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-8 leading-tight">
                {agenda.title}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Tanggal Pelaksanaan</div>
                    <div className="text-sm md:text-base font-bold text-[#0F172A]">{agenda.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Waktu</div>
                    <div className="text-sm md:text-base font-bold text-[#0F172A]">{agenda.time} - {agenda.endTime} WIB</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] shrink-0">
                    {agenda.type === 'Online' ? <Globe size={24} /> : <MapPin size={24} />}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{agenda.type === 'Online' ? 'Platform' : 'Lokasi'}</div>
                    <div className="text-sm md:text-base font-bold text-[#0F172A]">{agenda.locationName}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#14B8A6] shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Penyelenggara</div>
                    <div className="text-sm md:text-base font-bold text-[#0F172A]">Tim Marbot LMS</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-tosca max-w-none space-y-12">
              <section>
                <h3 className="text-xl font-bold text-[#0F172A] mb-4">Deskripsi Workshop</h3>
                <p className="text-[#64748B] leading-relaxed text-base md:text-lg">
                  {agenda.description} Workshop ini dirancang khusus untuk Anda yang ingin melakukan perubahan nyata dalam pengelolaan masjid. Kami memberikan materi yang 100% aplikatif, bukan sekadar teori.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-[#0F172A] mb-6">Apa yang akan dibahas?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Dasar operasional pengelolaan masjid modern',
                    'Implementasi SOP praktis di lapangan',
                    'Manajemen sumber daya takmir and marbot',
                    'Simulasi kasus umum and solusinya',
                    'Tanya jawab mendalam dengan praktisi'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3 p-4 bg-white border border-[#F1F5F9] rounded-xl">
                      <CheckCircle size={20} className="text-[#14B8A6] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#475569]">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-[#0F172A] mb-6">Narasumber</h3>
                <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex items-center space-x-6">
                  <div className="w-20 h-20 rounded-xl bg-[#F8FAFC] overflow-hidden shrink-0 border-2 border-[#F1F5F9]">
                    <img src="https://picsum.photos/seed/narasumber/200/200" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0F172A]">{agenda.narasumber}</h4>
                    <p className="text-sm text-[#14B8A6] font-bold uppercase tracking-widest mt-1">Praktisi Kemasjidan</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-[#0F172A] mb-6">Lokasi & Akses</h3>
                <div className="bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] p-8 rounded-2xl">
                   {agenda.type === 'Online' ? (
                     <div className="text-center">
                        <Globe size={48} className="text-[#14B8A6] mx-auto mb-4" />
                        <h4 className="font-bold text-[#0F172A] mb-2">Workshop Online</h4>
                        <p className="text-sm text-[#64748B] max-w-sm mx-auto">Link platform ({agenda.locationName}) akan dikirimkan melalui email and tersedia di dashboard "Agenda Saya" setelah pendaftaran berhasil.</p>
                     </div>
                   ) : (
                     <div>
                        <div className="flex items-start space-x-4">
                           <MapPin size={24} className="text-[#14B8A6] shrink-0 mt-1" />
                           <div>
                              <h4 className="font-bold text-[#0F172A] mb-1">{agenda.location}</h4>
                              <p className="text-sm text-[#64748B]">{agenda.locationName}, Indonesia</p>
                              <div className="mt-6 flex space-x-3">
                                 <button className="px-4 py-2 bg-white border border-[#E2E8F0] text-xs font-bold rounded-lg hover:border-[#14B8A6] transition-all">Lihat di Peta</button>
                                 <button className="px-4 py-2 bg-white border border-[#E2E8F0] text-xs font-bold rounded-lg hover:border-[#14B8A6] transition-all">Catatan Parkir</button>
                              </div>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
              </section>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-96">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-white border-2 border-[#14B8A6] rounded-2xl shadow-2xl shadow-[#14B8A6]/10 overflow-hidden">
                <div className="aspect-video">
                  <img src={agenda.cover} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-8">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <span className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Biaya Pendaftaran</span>
                      <div className="text-3xl font-extrabold text-[#0F172A] mt-1">{agenda.price}</div>
                    </div>
                  </div>

                  <div className="bg-[#F0FDFA] p-4 rounded-xl border border-[#14B8A6]/10 mb-8 flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <Users size={18} className="text-[#14B8A6]" />
                        <span className="text-xs font-bold text-[#0F766E]">Kuota Tersisa</span>
                     </div>
                     <span className="text-sm font-extrabold text-[#0F766E]">{agenda.remainingQuota} dari {agenda.quota}</span>
                  </div>

                  <button 
                    onClick={handleRegister}
                    className="w-full py-5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/30 transition-all mb-4 tap-target"
                  >
                    {agenda.price === 'Gratis' ? 'Daftar Workshop' : 'Daftar & Bayar'}
                  </button>
                  
                  <button className="w-full py-4 border-2 border-[#E2E8F0] text-[#475569] font-bold text-sm rounded-xl hover:bg-[#F8FAFC] transition-all flex items-center justify-center space-x-2 tap-target">
                    <CalendarPlus size={18} />
                    <span>Tambah ke Kalender</span>
                  </button>

                  <div className="mt-8 space-y-4 pt-8 border-t border-[#F1F5F9]">
                    <h5 className="text-sm font-bold text-[#0F172A]">Sudah termasuk:</h5>
                    <ul className="space-y-3">
                      {[
                        'E-Certificate Resmi',
                        'Modul Materi (PDF)',
                        'Rekaman Workshop (Online)',
                        'Konsumsi (Offline Only)'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center space-x-3 text-sm text-[#475569]">
                          <ShieldCheck size={16} className="text-[#14B8A6] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl flex items-center justify-between shadow-sm">
                <span className="text-sm font-bold text-[#0F172A]">Bagikan Workshop</span>
                <button className="p-2 bg-[#F1F5F9] rounded-lg text-[#64748B] hover:text-[#14B8A6] transition-colors tap-target">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AgendaDetail;
