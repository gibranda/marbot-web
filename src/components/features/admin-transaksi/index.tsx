/* eslint-disable sonarjs/no-nested-conditional */
"use client";

import {
  BookOpen,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Eye,
  Filter,
  MoreVertical,
  Printer,
  RefreshCw,
  Search,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";

import { MOCK_TRANSACTIONS } from "@/constants/constants";
import { Transaction } from "@/constants/types";

const AdminTransaksi: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedTr, setSelectedTr] = useState<Transaction | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<"lunas" | "refund">("lunas");
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    triggerToast(confirmType === "lunas" ? "Status pembayaran diperbarui" : "Proses refund diajukan");
  };

  return (
    <div className="animate-fadeIn relative space-y-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="animate-slideInRight fixed top-24 right-8 z-[60] flex items-center space-x-3 rounded-xl bg-[#0F172A] px-6 py-4 text-white shadow-2xl">
          <div className="h-2 w-2 rounded-full bg-[#14B8A6]"></div>
          <span className="text-sm font-bold">{showToast}</span>
        </div>
      )}

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="text-center md:text-left">
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Riwayat Transaksi</h1>
          <p className="text-sm text-[#64748B]">Pantau arus pendapatan and status pembayaran.</p>
        </div>
        <button className="tap-target flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-bold text-[#475569] shadow-sm transition-all hover:bg-[#F8FAFC]">
          <Download size={18} className="mr-2" />
          Ekspor CSV
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm md:flex-row">
        <div className="relative w-full flex-1">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input
            type="text"
            placeholder="Cari invoice atau nama..."
            className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pr-4 pl-12 text-sm transition-all outline-none focus:border-[#14B8A6]"
          />
        </div>
        <button className="tap-target flex items-center rounded-[10px] border border-[#E2E8F0] p-2.5 text-[#64748B] hover:bg-[#F8FAFC]">
          <Filter size={18} />
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="table-wrap">
          <table className="w-full min-w-[850px] text-left">
            <thead className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Invoice
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Peserta
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Kursus
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Nominal
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Tgl Transaksi
                </th>
                <th className="px-8 py-4 text-right text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_TRANSACTIONS.map((tr) => (
                <tr key={tr.id} className="group transition-colors hover:bg-[#F8FAFC]">
                  <td className="px-8 py-5 text-xs font-bold whitespace-nowrap text-[#14B8A6]">{tr.invoice}</td>
                  <td className="px-6 py-5 text-xs font-bold whitespace-nowrap text-[#0F172A]">{tr.userName}</td>
                  <td className="line-clamp-1 max-w-[150px] px-6 py-5 text-xs text-[#64748B]">{tr.courseTitle}</td>
                  <td className="px-6 py-5 text-xs font-bold whitespace-nowrap text-[#0F172A]">{tr.amount}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-extrabold tracking-wider whitespace-nowrap uppercase ${
                        tr.status === "Berhasil"
                          ? "bg-green-100 text-green-600"
                          : tr.status === "Pending"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {tr.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs whitespace-nowrap text-[#64748B]">{tr.date}</td>
                  <td className="relative px-8 py-5 text-right">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === tr.id ? null : tr.id)}
                      className="tap-target flex w-full items-center justify-end rounded-lg p-2 text-[#64748B] transition-all hover:text-[#14B8A6]"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === tr.id && (
                      <div className="animate-fadeIn absolute top-12 right-8 z-20 w-48 rounded-xl border border-[#E2E8F0] bg-white py-2 text-left shadow-xl">
                        <button
                          onClick={() => {
                            setSelectedTr(tr);
                            setIsInvoiceOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                        >
                          <Eye size={16} /> <span>View Invoice</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTr(tr);
                            setConfirmType("lunas");
                            setIsConfirmOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                        >
                          <CheckCircle size={16} /> <span>Tandai Lunas</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTr(tr);
                            setConfirmType("refund");
                            setIsConfirmOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
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
          <div
            className="animate-fadeIn absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsInvoiceOpen(false)}
          ></div>
          <div className="animate-slideInUp relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
              <h2 className="text-lg font-extrabold text-[#0F172A]">Detail Transaksi</h2>
              <button
                onClick={() => setIsInvoiceOpen(false)}
                className="tap-target text-[#64748B] hover:text-[#0F172A]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-8 p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Nomor Invoice</p>
                  <h3 className="text-xl font-extrabold text-[#14B8A6]">{selectedTr.invoice}</h3>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Status</p>
                  <span
                    className={`rounded-lg px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase ${
                      selectedTr.status === "Berhasil" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {selectedTr.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 border-y border-[#F1F5F9] py-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User size={16} className="mt-0.5 text-[#14B8A6]" />
                    <div>
                      <p className="mb-0.5 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                        Nama Peserta
                      </p>
                      <p className="text-sm font-bold text-[#0F172A]">{selectedTr.userName}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CreditCard size={16} className="mt-0.5 text-[#14B8A6]" />
                    <div>
                      <p className="mb-0.5 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                        Metode Bayar
                      </p>
                      <p className="text-sm font-bold text-[#0F172A]">{selectedTr.method}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <BookOpen size={16} className="mt-0.5 text-[#14B8A6]" />
                    <div>
                      <p className="mb-0.5 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                        Item / Kursus
                      </p>
                      <p className="text-sm leading-tight font-bold text-[#0F172A]">{selectedTr.courseTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock size={16} className="mt-0.5 text-[#14B8A6]" />
                    <div>
                      <p className="mb-0.5 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                        Waktu Bayar
                      </p>
                      <p className="text-sm font-bold text-[#0F172A]">{selectedTr.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
                <span className="text-sm font-bold text-[#475569]">Total Pembayaran</span>
                <span className="text-2xl font-extrabold text-[#0F172A]">{selectedTr.amount}</span>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-[#F1F5F9] bg-[#F8FAFC] p-6">
              <button className="tap-target flex items-center rounded-xl border-2 border-[#E2E8F0] bg-white px-6 py-2.5 text-sm font-bold text-[#0F172A] transition-all hover:border-[#14B8A6]">
                <Printer size={16} className="mr-2" /> Cetak PDF
              </button>
              <button
                onClick={() => setIsInvoiceOpen(false)}
                className="tap-target rounded-xl bg-[#14B8A6] px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Lunas/Refund */}
      {isConfirmOpen && selectedTr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="animate-fadeIn absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsConfirmOpen(false)}
          ></div>
          <div className="animate-slideInUp relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="space-y-6 p-8 text-center">
              <div
                className={`h-16 w-16 ${confirmType === "lunas" ? "bg-[#F0FDFA] text-[#14B8A6]" : "bg-red-50 text-red-500"} mx-auto mb-2 flex items-center justify-center rounded-full`}
              >
                {confirmType === "lunas" ? <CheckCircle size={32} /> : <RefreshCw size={32} />}
              </div>
              <div>
                <h3 className="mb-2 text-xl font-extrabold text-[#0F172A]">
                  {confirmType === "lunas" ? "Tandai Lunas?" : "Refund Transaksi?"}
                </h3>
                <p className="px-4 text-sm leading-relaxed text-[#64748B]">
                  {confirmType === "lunas"
                    ? `Update status transaksi ${selectedTr.invoice} menjadi Berhasil.`
                    : `Lakukan proses refund untuk transaksi ${selectedTr.invoice}.`}
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="tap-target flex-1 rounded-xl border-2 border-[#E2E8F0] py-3 text-sm font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC]"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  className={`flex-1 py-3 ${confirmType === "lunas" ? "bg-[#14B8A6] hover:bg-[#0F766E]" : "bg-red-500 hover:bg-red-600"} tap-target rounded-xl text-sm font-bold text-white shadow-lg transition-all`}
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
