"use client";

import { History } from "lucide-react";

export default function LearningHistory() {
  return (
    <div className="animate-fadeIn rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
      <History className="mx-auto mb-6 text-[#CBD5E1]" size={64} />
      <h3 className="mb-2 text-xl font-bold text-[#0F172A]">Riwayat Pembelajaran</h3>
      <p className="text-sm text-[#64748B]">Fitur riwayat aktivitas sedang dikembangkan.</p>
    </div>
  );
}
