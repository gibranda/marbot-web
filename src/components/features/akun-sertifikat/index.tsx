"use client";

import { Award } from "lucide-react";
import { useEffect, useState } from "react";

interface CertificateData {
  id: string;
  courseTitle: string;
  certNumber: string;
  issueDate: string;
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setCertificates(JSON.parse(localStorage.getItem("marbot_certificates") || "[]"));
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) return null;

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="group rounded-2xl border border-t-4 border-[#E2E8F0] border-t-[#14B8A6] bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#14B8A6] shadow-sm">
                <Award size={24} />
              </div>
              <h4 className="mb-2 line-clamp-2 leading-snug font-extrabold text-[#0F172A]">{cert.courseTitle}</h4>
              <div className="mb-8 space-y-2">
                <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Nomor Sertifikat</div>
                <div className="text-xs font-bold text-[#475569]">{cert.certNumber}</div>
                <div className="mt-4 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Diterbitkan</div>
                <div className="text-xs font-bold text-[#475569]">{cert.issueDate}</div>
              </div>
              <button className="flex w-full items-center justify-center rounded-xl bg-[#F8FAFC] py-3 text-xs font-bold text-[#14B8A6] transition-all hover:bg-[#14B8A6] hover:text-white">
                Unduh Sertifikat (PDF)
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-[#E2E8F0] bg-white p-16 text-center shadow-sm">
            <Award className="mx-auto mb-6 text-[#CBD5E1]" size={64} />
            <h3 className="mb-2 text-xl font-bold text-[#0F172A]">Belum Ada Sertifikat</h3>
            <p className="text-sm text-[#64748B]">Selesaikan kursus Anda untuk mendapatkan sertifikat resmi.</p>
          </div>
        )}
      </div>
    </div>
  );
}
