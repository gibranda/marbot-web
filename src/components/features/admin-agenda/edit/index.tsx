"use client";

import { ArrowLeft, Calendar, Globe, Info, MapPin, Save } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { MOCK_AGENDA } from "@/constants/constants";

const AdminEditAgenda: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const agenda = MOCK_AGENDA.find((a) => a.slug === slug) || MOCK_AGENDA[0];

  const [type, setType] = useState<"Online" | "Offline">(agenda.type);

  useEffect(() => {
    setType(agenda.type);
  }, [agenda]);

  const handleSave = () => {
    router.push("/admin/agenda");
  };

  return (
    <div className="animate-fadeIn space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <button
            onClick={() => router.back()}
            className="group mb-2 flex items-center text-sm font-bold text-[#64748B] transition-colors hover:text-[#14B8A6]"
          >
            <ArrowLeft size={16} className="mr-1 transition-transform group-hover:-translate-x-1" />
            Kembali
          </button>
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Edit Agenda</h1>
          <p className="text-sm text-[#64748B]">
            Perbarui jadwal workshop <span className="font-bold text-[#0F172A]">&quot;{agenda.title}&quot;</span>
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center rounded-xl bg-[#14B8A6] px-10 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
          >
            <Save size={18} className="mr-2" />
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <h3 className="mb-6 flex items-center text-lg font-extrabold text-[#0F172A]">
              <Info size={20} className="mr-2 text-[#14B8A6]" />
              Detail Agenda
            </h3>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  Judul Agenda / Workshop
                </label>
                <input
                  type="text"
                  defaultValue={agenda.title}
                  className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#14B8A6]"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Tipe Agenda
                  </label>
                  <div className="flex rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-1">
                    <button
                      onClick={() => setType("Online")}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${type === "Online" ? "bg-[#14B8A6] text-white shadow-md" : "text-[#64748B]"}`}
                    >
                      <Globe size={14} className="mr-2 inline" /> Online
                    </button>
                    <button
                      onClick={() => setType("Offline")}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${type === "Offline" ? "bg-[#14B8A6] text-white shadow-md" : "text-[#64748B]"}`}
                    >
                      <MapPin size={14} className="mr-2 inline" /> Offline
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Nama Narasumber
                  </label>
                  <input
                    type="text"
                    defaultValue={agenda.narasumber}
                    className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#14B8A6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                    Tanggal
                  </label>
                  <div className="relative">
                    <Calendar className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={16} />
                    <input
                      type="text"
                      defaultValue={agenda.date}
                      className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-3 pr-4 pl-11 text-sm font-medium outline-none focus:border-[#14B8A6]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                      Mulai
                    </label>
                    <input
                      type="text"
                      defaultValue={agenda.time}
                      className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#14B8A6]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                      Selesai
                    </label>
                    <input
                      type="text"
                      defaultValue={agenda.endTime}
                      className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#14B8A6]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold tracking-wider text-[#475569] uppercase">
                  {type === "Online" ? "Link Platform" : "Alamat Lokasi"}
                </label>
                <input
                  type="text"
                  defaultValue={agenda.location}
                  className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-1">
          <div className="sticky top-28 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h4 className="mb-6 text-xs font-extrabold tracking-widest text-[#0F172A] uppercase">Cover Agenda</h4>
            <Image
              src={agenda.cover}
              alt={agenda.title}
              width={400}
              height={225}
              className="mb-4 aspect-video w-full rounded-xl object-cover"
            />
            <button className="w-full rounded-lg border-2 border-[#E2E8F0] py-2.5 text-[10px] font-bold text-[#64748B] uppercase hover:bg-[#F8FAFC]">
              Ganti Cover
            </button>

            <div className="space-y-4 border-t border-[#F1F5F9] pt-6">
              <button
                onClick={handleSave}
                className="w-full rounded-xl bg-[#14B8A6] py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-[#0F766E]"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditAgenda;
