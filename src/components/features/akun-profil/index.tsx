"use client";

export default function Profile({ user }: { user: { name: string; email: string; role: string } }) {
  return (
    <div className="animate-fadeIn max-w-2xl space-y-8">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
        <div className="mb-10 flex items-center space-x-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[#14B8A6]/10 bg-[#F0FDFA] text-3xl font-extrabold text-[#14B8A6] shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="mb-1 text-2xl font-extrabold text-[#0F172A]">{user.name}</h3>
            <p className="text-xs font-bold tracking-widest text-[#14B8A6] uppercase">Peserta Terdaftar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Nama Lengkap</label>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#0F172A]">
              {user.name}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Email</label>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#0F172A]">
              {user.email}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Role</label>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#0F172A] uppercase">
              {user.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
