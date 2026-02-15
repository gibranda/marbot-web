/* eslint-disable react/no-array-index-key */
/* eslint-disable sonarjs/no-nested-template-literals */
"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Users,
  Share2,
  CheckCircle,
  ArrowLeft,
  CalendarPlus,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { MOCK_AGENDA } from "@/constants/constants";

const AgendaDetail: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const agenda = MOCK_AGENDA.find((a) => a.slug === slug) || MOCK_AGENDA[0];

  const handleRegister = () => {
    const userStr = localStorage.getItem("marbot_user");
    if (!userStr) {
      router.push(`/login?returnTo=${encodeURIComponent(`/agenda/${agenda.slug}/daftar`)}`);
      return;
    }
    router.push(`/agenda/${agenda.slug}/daftar`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="mb-8">
          <Link
            href="/agenda"
            className="group tap-target inline-flex items-center space-x-2 text-sm font-bold text-[#64748B] transition-colors hover:text-[#14B8A6]"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Daftar Agenda</span>
          </Link>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-10">
              <div className="mb-6 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-extrabold tracking-wider uppercase ${
                    agenda.type === "Online" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {agenda.type}
                </span>
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-extrabold tracking-wider uppercase ${
                    agenda.price === "Gratis"
                      ? "bg-green-100 text-green-600"
                      : "border border-[#14B8A6]/20 bg-[#F0FDFA] text-[#14B8A6]"
                  }`}
                >
                  {agenda.price === "Gratis" ? "Gratis" : "Berbayar"}
                </span>
              </div>

              <h1 className="mb-8 text-3xl leading-tight font-extrabold text-[#0F172A] md:text-5xl">{agenda.title}</h1>

              <div className="grid grid-cols-1 gap-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:grid-cols-2">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6]">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                      Tanggal Pelaksanaan
                    </div>
                    <div className="text-sm font-bold text-[#0F172A] md:text-base">{agenda.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Waktu</div>
                    <div className="text-sm font-bold text-[#0F172A] md:text-base">
                      {agenda.time} - {agenda.endTime} WIB
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6]">
                    {agenda.type === "Online" ? <Globe size={24} /> : <MapPin size={24} />}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">
                      {agenda.type === "Online" ? "Platform" : "Lokasi"}
                    </div>
                    <div className="text-sm font-bold text-[#0F172A] md:text-base">{agenda.locationName}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6]">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Penyelenggara</div>
                    <div className="text-sm font-bold text-[#0F172A] md:text-base">Tim Marbot LMS</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-tosca max-w-none space-y-12">
              <section>
                <h3 className="mb-4 text-xl font-bold text-[#0F172A]">Deskripsi Workshop</h3>
                <p className="text-base leading-relaxed text-[#64748B] md:text-lg">
                  {agenda.description} Workshop ini dirancang khusus untuk Anda yang ingin melakukan perubahan nyata
                  dalam pengelolaan masjid. Kami memberikan materi yang 100% aplikatif, bukan sekadar teori.
                </p>
              </section>

              <section>
                <h3 className="mb-6 text-xl font-bold text-[#0F172A]">Apa yang akan dibahas?</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    "Dasar operasional pengelolaan masjid modern",
                    "Implementasi SOP praktis di lapangan",
                    "Manajemen sumber daya takmir and marbot",
                    "Simulasi kasus umum and solusinya",
                    "Tanya jawab mendalam dengan praktisi",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3 rounded-xl border border-[#F1F5F9] bg-white p-4">
                      <CheckCircle size={20} className="mt-0.5 shrink-0 text-[#14B8A6]" />
                      <span className="text-sm font-medium text-[#475569]">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-6 text-xl font-bold text-[#0F172A]">Narasumber</h3>
                <div className="flex items-center space-x-6 rounded-2xl border border-[#E2E8F0] bg-white p-6">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-[#F1F5F9] bg-[#F8FAFC]">
                    <img src="https://picsum.photos/seed/narasumber/200/200" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0F172A]">{agenda.narasumber}</h4>
                    <p className="mt-1 text-sm font-bold tracking-widest text-[#14B8A6] uppercase">
                      Praktisi Kemasjidan
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-6 text-xl font-bold text-[#0F172A]">Lokasi & Akses</h3>
                <div className="rounded-2xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-8">
                  {agenda.type === "Online" ? (
                    <div className="text-center">
                      <Globe size={48} className="mx-auto mb-4 text-[#14B8A6]" />
                      <h4 className="mb-2 font-bold text-[#0F172A]">Workshop Online</h4>
                      <p className="mx-auto max-w-sm text-sm text-[#64748B]">
                        Link platform ({agenda.locationName}) akan dikirimkan melalui email and tersedia di dashboard
                        Agenda Saya setelah pendaftaran berhasil.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start space-x-4">
                        <MapPin size={24} className="mt-1 shrink-0 text-[#14B8A6]" />
                        <div>
                          <h4 className="mb-1 font-bold text-[#0F172A]">{agenda.location}</h4>
                          <p className="text-sm text-[#64748B]">{agenda.locationName}, Indonesia</p>
                          <div className="mt-6 flex space-x-3">
                            <button className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-bold transition-all hover:border-[#14B8A6]">
                              Lihat di Peta
                            </button>
                            <button className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-bold transition-all hover:border-[#14B8A6]">
                              Catatan Parkir
                            </button>
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
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="overflow-hidden rounded-2xl border-2 border-[#14B8A6] bg-white shadow-2xl shadow-[#14B8A6]/10">
                <div className="aspect-video">
                  <img src={agenda.cover} className="h-full w-full object-cover" />
                </div>

                <div className="p-8">
                  <div className="mb-8 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-[#64748B] uppercase">
                        Biaya Pendaftaran
                      </span>
                      <div className="mt-1 text-3xl font-extrabold text-[#0F172A]">{agenda.price}</div>
                    </div>
                  </div>

                  <div className="mb-8 flex items-center justify-between rounded-xl border border-[#14B8A6]/10 bg-[#F0FDFA] p-4">
                    <div className="flex items-center space-x-3">
                      <Users size={18} className="text-[#14B8A6]" />
                      <span className="text-xs font-bold text-[#0F766E]">Kuota Tersisa</span>
                    </div>
                    <span className="text-sm font-extrabold text-[#0F766E]">
                      {agenda.remainingQuota} dari {agenda.quota}
                    </span>
                  </div>

                  <button
                    onClick={handleRegister}
                    className="tap-target mb-4 w-full rounded-xl bg-[#14B8A6] py-5 font-bold text-white shadow-lg shadow-[#14B8A6]/30 transition-all hover:bg-[#0F766E]"
                  >
                    {agenda.price === "Gratis" ? "Daftar Workshop" : "Daftar & Bayar"}
                  </button>

                  <button className="tap-target flex w-full items-center justify-center space-x-2 rounded-xl border-2 border-[#E2E8F0] py-4 text-sm font-bold text-[#475569] transition-all hover:bg-[#F8FAFC]">
                    <CalendarPlus size={18} />
                    <span>Tambah ke Kalender</span>
                  </button>

                  <div className="mt-8 space-y-4 border-t border-[#F1F5F9] pt-8">
                    <h5 className="text-sm font-bold text-[#0F172A]">Sudah termasuk:</h5>
                    <ul className="space-y-3">
                      {[
                        "E-Certificate Resmi",
                        "Modul Materi (PDF)",
                        "Rekaman Workshop (Online)",
                        "Konsumsi (Offline Only)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center space-x-3 text-sm text-[#475569]">
                          <ShieldCheck size={16} className="shrink-0 text-[#14B8A6]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <span className="text-sm font-bold text-[#0F172A]">Bagikan Workshop</span>
                <button className="tap-target rounded-lg bg-[#F1F5F9] p-2 text-[#64748B] transition-colors hover:text-[#14B8A6]">
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
