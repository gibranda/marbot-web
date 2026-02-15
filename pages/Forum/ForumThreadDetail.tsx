
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Clock, Share2, Send, Lock, User, AlertCircle, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { MOCK_FORUM_THREADS } from '../../constants';

const ForumThreadDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  
  const thread = MOCK_FORUM_THREADS.find(t => t.slug === slug) || MOCK_FORUM_THREADS[0];

  useEffect(() => {
    const userStr = localStorage.getItem('marbot_user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Container utama diubah ke max-w-7xl agar sejajar dengan standar website */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb & Back */}
        <div className="mb-8">
          <Link to="/forum" className="inline-flex items-center space-x-2 text-sm font-bold text-[#64748B] hover:text-[#14B8A6] group transition-colors tap-target">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Forum Diskusi</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Discussion Area */}
          <div className="flex-1 min-w-0">
            {/* Header Diskusi */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-[#F0FDFA] text-[#14B8A6] text-[10px] font-extrabold uppercase rounded-lg border border-[#14B8A6]/10">{thread.category}</span>
                <span className="flex items-center text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
                  <Clock size={12} className="mr-1" /> {thread.timestamp}
                </span>
                <span className="text-[10px] font-bold text-[#14B8A6] uppercase tracking-widest flex items-center">
                  <Sparkles size={12} className="mr-1" /> Diskusi Lapangan
                </span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] leading-tight mb-8">
                {thread.title}
              </h1>

              {/* Main Post Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center font-extrabold text-[#14B8A6] text-xl border border-[#14B8A6]/10 shadow-sm">
                    {thread.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#0F172A]">{thread.author}</div>
                    <div className="text-xs font-medium text-[#64748B]">{thread.authorMosque}</div>
                  </div>
                </div>

                <div className="prose prose-tosca max-w-none">
                  <p className="text-[#475569] text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                    {thread.content}
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-[#F1F5F9] flex items-center justify-between">
                   <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-xs font-bold text-[#64748B] hover:text-[#14B8A6] transition-colors tap-target">
                         <MessageSquare size={16} />
                         <span>{thread.commentCount} Komentar</span>
                      </button>
                      <button className="flex items-center space-x-2 text-xs font-bold text-[#64748B] hover:text-[#14B8A6] transition-colors tap-target">
                         <Share2 size={16} />
                         <span>Bagikan</span>
                      </button>
                   </div>
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-8">
               <h3 className="text-lg font-extrabold text-[#0F172A] flex items-center">
                 <MessageSquare size={20} className="mr-2 text-[#14B8A6]" />
                 Jawaban & Diskusi
               </h3>

               {/* Auth Gate for Input */}
               <div className="mb-10">
                 {user ? (
                   <div className="bg-white border-2 border-[#14B8A6]/20 rounded-2xl p-6 shadow-sm focus-within:border-[#14B8A6] transition-all">
                      <textarea 
                        rows={4}
                        placeholder="Tulis jawaban atau tanggapan Anda..."
                        className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-[#475569] placeholder:text-[#94A3B8] resize-none"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      ></textarea>
                      <div className="mt-4 flex justify-end">
                         <button className="px-6 py-2.5 bg-[#14B8A6] text-white font-bold rounded-xl text-xs hover:bg-[#0F766E] transition-all flex items-center shadow-lg shadow-[#14B8A6]/10 tap-target">
                            Kirim Balasan <Send size={14} className="ml-2" />
                         </button>
                      </div>
                   </div>
                 ) : (
                   <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl text-center shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                        <Lock size={100} />
                      </div>
                      <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 mx-auto mb-4 border border-amber-100">
                        <Lock size={20} />
                      </div>
                      <h4 className="text-base font-bold text-[#0F172A] mb-2">Silakan masuk untuk ikut berdiskusi</h4>
                      <p className="text-xs text-[#64748B] mb-8 max-w-xs mx-auto leading-relaxed">Bergabung dengan ribuan pengurus masjid lainnya untuk saling berbagi praktik baik.</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                         <Link to="/login" className="w-full sm:w-auto px-10 py-3 bg-[#14B8A6] text-white font-bold rounded-xl text-xs hover:bg-[#0F766E] transition-all tap-target">Masuk Sekarang</Link>
                         <Link to="/register" className="w-full sm:w-auto px-10 py-3 border-2 border-[#E2E8F0] text-[#0F172A] font-bold rounded-xl text-xs hover:bg-[#F8FAFC] transition-all tap-target">Daftar Akun</Link>
                      </div>
                   </div>
                 )}
               </div>

               {/* Comment List */}
               <div className="space-y-6">
                 {thread.comments?.map(comment => (
                   <div key={comment.id} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] font-bold text-sm shrink-0 shadow-sm">
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm group-hover:border-[#14B8A6]/30 transition-all">
                            <div className="flex items-center justify-between mb-4">
                               <div className="flex items-center space-x-2">
                                  <span className="text-sm font-bold text-[#0F172A]">{comment.author}</span>
                                  <span className="text-[10px] font-extrabold text-[#14B8A6] uppercase tracking-widest px-2 py-0.5 bg-[#F0FDFA] rounded-md border border-[#14B8A6]/10">{comment.role}</span>
                               </div>
                               <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-[#475569] leading-relaxed">
                               {comment.content}
                            </p>
                            <div className="mt-6 flex items-center space-x-4">
                               <button className="text-[10px] font-bold text-[#94A3B8] hover:text-[#14B8A6] uppercase tracking-widest transition-colors tap-target">Bantu (Upvote)</button>
                               <button className="text-[10px] font-bold text-[#94A3B8] hover:text-[#14B8A6] uppercase tracking-widest transition-colors tap-target">Balas</button>
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <aside className="w-full lg:w-80 shrink-0">
             <div className="sticky top-32 space-y-6">
                {/* Stats Card */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
                   <h4 className="text-xs font-extrabold text-[#0F172A] mb-6 uppercase tracking-widest">Informasi Diskusi</h4>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-[#F1F5F9]">
                         <span className="text-xs font-medium text-[#64748B]">Dilihat</span>
                         <span className="text-xs font-bold text-[#0F172A]">842 kali</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-[#F1F5F9]">
                         <span className="text-xs font-medium text-[#64748B]">Komentar</span>
                         <span className="text-xs font-bold text-[#0F172A]">{thread.commentCount} balasan</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                         <span className="text-xs font-medium text-[#64748B]">Status</span>
                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${thread.status === 'Terjawab' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{thread.status}</span>
                      </div>
                   </div>
                </div>

                {/* Related Diskusi */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
                   <h4 className="text-xs font-extrabold text-[#0F172A] mb-6 uppercase tracking-widest">Mungkin Relevan</h4>
                   <div className="space-y-6">
                      {MOCK_FORUM_THREADS.slice(1, 4).map(rel => (
                        <Link key={rel.id} to={`/forum/${rel.slug}`} className="block group">
                           <h5 className="text-xs font-bold text-[#475569] group-hover:text-[#14B8A6] transition-colors leading-relaxed line-clamp-2 mb-1">{rel.title}</h5>
                           <span className="text-[9px] font-medium text-[#94A3B8] uppercase tracking-widest">{rel.commentCount} Jawaban</span>
                        </Link>
                      ))}
                   </div>
                </div>

                {/* FAQ Link */}
                <div className="bg-[#F0FDFA] border border-[#CCFBF1] p-6 rounded-2xl">
                   <div className="flex items-center space-x-3 text-[#14B8A6] mb-3">
                      <AlertCircle size={18} />
                      <h4 className="text-xs font-extrabold uppercase tracking-widest">Butuh Bantuan?</h4>
                   </div>
                   <p className="text-[11px] text-[#0F766E] leading-relaxed mb-4 font-medium">Baca panduan berdiskusi di Marbot Forum agar ekosistem tetap sehat and produktif.</p>
                   <Link to="/#faq" className="text-[11px] font-extrabold text-[#14B8A6] flex items-center hover:underline">
                      Baca Aturan Forum <ChevronRight size={14} />
                   </Link>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ForumThreadDetail;
