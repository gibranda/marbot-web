"use client";

import { Calendar, Clock, Globe, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MOCK_AGENDA } from "@/constants/constants";

interface RegistrationData {
  id: string;
  agendaId: string;
  status: string;
  dateRegistered: string;
  isPaid: boolean;
  data?: any;
}

export default function MyAgendas() {
  const [activeTab, setActiveTab] = useState("Terdaftar");
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setRegistrations(JSON.parse(localStorage.getItem("marbot_agenda_registrations") || "[]"));
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) return null;

  const filtered = registrations
    .filter((r) => r.status === activeTab)
    .map((r) => ({
      ...r,
      data: MOCK_AGENDA.find((a) => a.id === r.agendaId)!,
    }))
    .filter((r) => r.data);

  return (
    <div className="animate-fadeIn space-y-8">
      <div>
        <div className="scrollbar-hide flex w-full space-x-2 overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-sm md:w-max">
          {["Terdaftar", "Selesai"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-[10px] px-6 py-1.5 text-sm font-bold whitespace-nowrap transition-all md:flex-none ${
                activeTab === tab ? "bg-[#14B8A6] text-white shadow-md" : "text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-6 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:border-[#14B8A6] md:flex-row md:gap-8 md:p-6"
            >
              <div className="aspect-video w-full shrink-0 overflow-hidden rounded-xl shadow-sm md:w-56">
                <Image
                  src={item.data.cover}
                  width={224}
                  height={126}
                  className="h-full w-full object-cover"
                  alt={item.data.title}
                />
              </div>
              <div className="w-full flex-1">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span
                    className={`rounded-lg px-3 py-1 text-[9px] font-extrabold tracking-widest uppercase ${item.data.type === "Online" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}
                  >
                    {item.data.type}
                  </span>
                  <span className="rounded-lg bg-green-100 px-3 py-1 text-[9px] font-extrabold tracking-widest text-green-600 uppercase">
                    {item.status}
                  </span>
                </div>
                <h4 className="mb-4 text-lg leading-tight font-extrabold text-[#0F172A] md:text-xl">
                  {item.data.title}
                </h4>

                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mb-8">
                  <div className="flex items-center text-xs text-[#64748B]">
                    <Calendar size={14} className="mr-2 shrink-0 text-[#14B8A6]" />
                    <span className="font-medium">{item.data.date}</span>
                  </div>
                  <div className="flex items-center text-xs text-[#64748B]">
                    <Clock size={14} className="mr-2 shrink-0 text-[#14B8A6]" />
                    <span className="font-medium">{item.data.time} WIB</span>
                  </div>
                  <div className="flex items-center text-xs text-[#64748B] sm:col-span-2">
                    {item.data.type === "Online" ? (
                      <Globe size={14} className="mr-2 shrink-0 text-[#14B8A6]" />
                    ) : (
                      <MapPin size={14} className="mr-2 shrink-0 text-[#14B8A6]" />
                    )}
                    <span className="truncate font-medium">
                      {item.data.type === "Online" ? item.data.locationName : item.data.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {item.data.type === "Online" ? (
                    <a
                      href={item.data.location}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center rounded-xl bg-[#14B8A6] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
                    >
                      <Globe size={14} className="mr-2" /> Masuk Workshop
                    </a>
                  ) : (
                    <button className="flex flex-1 items-center justify-center rounded-xl bg-[#14B8A6] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]">
                      <Ticket size={14} className="mr-2" /> Lihat E-Tiket
                    </button>
                  )}
                  <Link
                    href={`/agenda/${item.data.slug}`}
                    className="flex flex-1 items-center justify-center rounded-xl border-2 border-[#E2E8F0] py-3.5 text-xs font-bold text-[#475569] transition-all hover:bg-[#F8FAFC]"
                  >
                    Detail Info
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center shadow-sm md:p-16">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#94A3B8]">
              <Calendar size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#0F172A]">Belum Ada Agenda</h3>
            <p className="mb-8 text-sm text-[#64748B]">Anda belum mendaftar di workshop mana pun.</p>
            <Link
              href="/agenda"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#14B8A6] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 md:w-auto"
            >
              Lihat Daftar Agenda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
