"use client";

import { ArrowLeft, Building, ChevronRight, CreditCard, ShieldCheck, Smartphone } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { MOCK_COURSES } from "@/constants/constants";

const Checkout: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const course = MOCK_COURSES.find((c) => c.id === id) || MOCK_COURSES[0];

  const handlePayment = () => {
    // Navigate to success page
    router.push(`/checkout/${course.id}/sukses`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="group flex items-center text-sm font-bold text-[#64748B] transition-colors hover:text-[#14B8A6]"
          >
            <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Kembali ke Detail Kursus
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Checkout Panel */}
          <div className="space-y-8 lg:col-span-2">
            <h1 className="text-3xl font-extrabold text-[#0F172A]">Checkout</h1>

            {/* Order Summary Card */}
            <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
              <div className="border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
                <h3 className="font-bold text-[#0F172A]">Ringkasan Pesanan</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="aspect-video w-full shrink-0 overflow-hidden rounded-lg md:w-40">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      width={160}
                      height={90}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-bold text-[#0F172A]">{course.title}</h4>
                    <p className="mb-4 text-sm text-[#64748B]">Oleh {course.instructor.name}</p>
                    <div className="flex items-center justify-between border-t border-[#F1F5F9] py-4">
                      <span className="text-sm font-medium text-[#475569]">Harga Kursus</span>
                      <span className="text-sm font-bold text-[#0F172A]">{course.price}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#F1F5F9] py-4">
                      <span className="text-sm font-medium text-[#475569]">Biaya Layanan</span>
                      <span className="text-sm font-bold text-[#14B8A6]">Rp 0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
              <div className="border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
                <h3 className="font-bold text-[#0F172A]">Metode Pembayaran</h3>
              </div>
              <div className="space-y-4 p-6">
                {[
                  { id: "qris", name: "QRIS / E-Wallet", icon: <Smartphone className="text-[#14B8A6]" /> },
                  { id: "va", name: "Virtual Account (Bank Transfer)", icon: <Building className="text-[#14B8A6]" /> },
                  { id: "cc", name: "Kartu Kredit / Debit", icon: <CreditCard className="text-[#14B8A6]" /> },
                ].map((method, idx) => (
                  <label
                    key={method.id}
                    className="group flex cursor-pointer items-center justify-between rounded-xl border-2 border-[#E2E8F0] p-4 transition-all hover:border-[#14B8A6]"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0FDFA]">
                        {method.icon}
                      </div>
                      <span className="font-bold text-[#0F172A] group-hover:text-[#14B8A6]">{method.name}</span>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked={idx === 0}
                      className="h-5 w-5 text-[#14B8A6] focus:ring-[#14B8A6]"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 rounded border-[#E2E8F0] text-[#14B8A6] focus:ring-[#14B8A6]"
              />
              <label htmlFor="terms" className="text-sm leading-tight text-[#64748B]">
                Saya setuju dengan{" "}
                <a href="#" className="font-bold text-[#14B8A6]">
                  Syarat & Ketentuan
                </a>{" "}
                serta{" "}
                <a href="#" className="font-bold text-[#14B8A6]">
                  Kebijakan Pengembalian Dana
                </a>{" "}
                Marbot LMS.
              </label>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 rounded-xl border-2 border-[#E2E8F0] bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-[#0F172A]">Total Pembayaran</h3>
              <div className="mb-8 text-4xl font-extrabold text-[#0F172A]">{course.price}</div>

              <div className="mb-8 space-y-4">
                <div className="flex items-start space-x-2 text-xs text-[#64748B]">
                  <ShieldCheck size={16} className="shrink-0 text-[#14B8A6]" />
                  <span>Pembayaran dijamin aman melalui enkripsi SSL and partner gateway terverifikasi.</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="flex w-full items-center justify-center rounded-xl bg-[#14B8A6] py-4 font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
              >
                Bayar Sekarang <ChevronRight size={18} className="ml-2" />
              </button>

              <button
                onClick={() => router.back()}
                className="mt-4 w-full py-3 text-sm font-bold text-[#64748B] transition-colors hover:text-[#0F172A]"
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
