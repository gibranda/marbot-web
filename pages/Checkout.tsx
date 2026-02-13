
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, ShieldCheck, ArrowLeft, ChevronRight } from 'lucide-react';
import { MOCK_COURSES } from '../constants';

const Checkout: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];

  const handlePayment = () => {
    // Navigate to success page
    navigate(`/checkout/${course.id}/sukses`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm font-bold text-[#64748B] hover:text-[#14B8A6] group transition-colors"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Detail Kursus
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Checkout Panel */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl font-extrabold text-[#0F172A]">Checkout</h1>

            {/* Order Summary Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                <h3 className="font-bold text-[#0F172A]">Ringkasan Pesanan</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-40 aspect-video rounded-lg overflow-hidden shrink-0">
                    <img src={course.thumbnail} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-[#0F172A] mb-1">{course.title}</h4>
                    <p className="text-sm text-[#64748B] mb-4">Oleh {course.instructor.name}</p>
                    <div className="flex items-center justify-between py-4 border-t border-[#F1F5F9]">
                      <span className="text-sm font-medium text-[#475569]">Harga Kursus</span>
                      <span className="text-sm font-bold text-[#0F172A]">{course.price}</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-t border-[#F1F5F9]">
                      <span className="text-sm font-medium text-[#475569]">Biaya Layanan</span>
                      <span className="text-sm font-bold text-[#14B8A6]">Rp 0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                <h3 className="font-bold text-[#0F172A]">Metode Pembayaran</h3>
              </div>
              <div className="p-6 space-y-4">
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

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-[#E2E8F0] text-[#14B8A6] focus:ring-[#14B8A6]" />
              <label htmlFor="terms" className="text-sm text-[#64748B] leading-tight">
                Saya setuju dengan <a href="#" className="text-[#14B8A6] font-bold">Syarat & Ketentuan</a> serta <a href="#" className="text-[#14B8A6] font-bold">Kebijakan Pengembalian Dana</a> Marbot LMS.
              </label>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-[#E2E8F0] rounded-xl p-8 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">Total Pembayaran</h3>
              <div className="text-4xl font-extrabold text-[#0F172A] mb-8">{course.price}</div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-2 text-xs text-[#64748B]">
                  <ShieldCheck size={16} className="text-[#14B8A6] shrink-0" />
                  <span>Pembayaran dijamin aman melalui enkripsi SSL and partner gateway terverifikasi.</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                className="w-full py-4 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0F766E] shadow-lg shadow-[#14B8A6]/20 transition-all flex items-center justify-center"
              >
                Bayar Sekarang <ChevronRight size={18} className="ml-2" />
              </button>

              <button 
                onClick={() => navigate(-1)}
                className="w-full mt-4 py-3 text-[#64748B] font-bold text-sm hover:text-[#0F172A] transition-colors"
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

export default Checkout;
