"use client";
import { Plus, Search, Filter, Edit, Eye, Trash2, X, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { MOCK_COURSES } from "@/constants/constants";
import { Course } from "@/constants/types";

const AdminKursus: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const handleDelete = () => {
    if (selectedCourse) {
      setCourses(courses.filter((c) => c.id !== selectedCourse.id));
      setIsDeleteOpen(false);
      setSelectedCourse(null);
      triggerToast("Kursus berhasil dihapus");
    }
  };

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
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

      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="text-center md:text-left">
          <h1 className="mb-1 text-2xl font-extrabold text-[#0F172A]">Manajemen Kursus</h1>
          <p className="text-sm text-[#64748B]">Kelola konten, harga, dan publikasi materi.</p>
        </div>
        <Link
          href="/admin/kursus/baru"
          className="tap-target flex items-center justify-center rounded-xl bg-[#14B8A6] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
        >
          <Plus size={18} className="mr-2" />
          Buat Kursus Baru
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm md:flex-row">
        <div className="relative w-full flex-1">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input
            type="text"
            placeholder="Cari kursus..."
            className="w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pr-4 pl-12 text-sm transition-all outline-none focus:border-[#14B8A6]"
          />
        </div>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <div className="relative flex-1 md:w-40">
            <select className="tap-target w-full cursor-pointer appearance-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pr-10 pl-4 text-xs font-bold text-[#475569] outline-none">
              <option>Semua Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
          <button className="tap-target flex items-center rounded-[10px] border border-[#E2E8F0] p-2.5 text-[#64748B] hover:bg-[#F8FAFC]">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table Wrapped for Responsiveness */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="table-wrap">
          <table className="w-full min-w-[750px] text-left">
            <thead className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Kursus
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Kategori
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">Harga</th>
                <th className="px-6 py-4 text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Peserta
                </th>
                <th className="px-8 py-4 text-right text-[10px] font-extrabold tracking-widest text-[#64748B] uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {courses.map((course) => (
                <tr key={course.id} className="group transition-colors hover:bg-[#F8FAFC]">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={48}
                        height={48}
                        className="shrink-0 rounded-[10px] object-cover"
                      />
                      <div>
                        <div className="line-clamp-1 text-sm font-bold text-[#0F172A]">{course.title}</div>
                        <div className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
                          {course.level} • {course.modules} Modul
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#475569]">{course.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase ${
                        course.status === "Published" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs font-bold whitespace-nowrap text-[#0F172A]">{course.price}</td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#475569]">{course.students.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-60 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsViewOpen(true);
                        }}
                        className="tap-target rounded-lg p-2 text-[#64748B] transition-all hover:bg-white hover:text-[#14B8A6]"
                        title="View Detail"
                      >
                        <Eye size={16} />
                      </button>
                      <Link
                        href={`/admin/kursus/${course.id}/edit`}
                        className="tap-target flex items-center rounded-lg p-2 text-[#64748B] transition-all hover:bg-white hover:text-[#14B8A6]"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsDeleteOpen(true);
                        }}
                        className="tap-target rounded-lg p-2 text-[#64748B] transition-all hover:bg-white hover:text-red-500"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal View Detail Kursus */}
      {isViewOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="animate-fadeIn absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsViewOpen(false)}
          ></div>
          <div className="animate-slideInUp relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
              <h2 className="text-lg font-extrabold text-[#0F172A]">Detail Kursus</h2>
              <button onClick={() => setIsViewOpen(false)} className="tap-target text-[#64748B] hover:text-[#0F172A]">
                <X size={20} />
              </button>
            </div>
            <div className="max-h-[70vh] space-y-8 overflow-y-auto p-8">
              <div className="flex flex-col gap-6 sm:flex-row">
                <Image
                  src={selectedCourse.thumbnail}
                  alt={selectedCourse.title}
                  width={320}
                  height={180}
                  className="aspect-video w-full rounded-xl object-cover shadow-md sm:w-48"
                />
                <div>
                  <h3 className="mb-2 text-xl leading-tight font-extrabold text-[#0F172A]">{selectedCourse.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-lg border border-[#14B8A6]/10 bg-[#F0FDFA] px-2.5 py-1 text-[10px] font-bold text-[#14B8A6] uppercase">
                      {selectedCourse.category}
                    </span>
                    <span className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-bold text-[#64748B] uppercase">
                      {selectedCourse.level}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                  <div className="mb-1 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Status</div>
                  <div
                    className={`text-xs font-bold ${selectedCourse.status === "Published" ? "text-green-600" : "text-amber-600"}`}
                  >
                    {selectedCourse.status}
                  </div>
                </div>
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                  <div className="mb-1 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Harga</div>
                  <div className="text-xs font-bold text-[#0F172A]">{selectedCourse.price}</div>
                </div>
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                  <div className="mb-1 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Modul</div>
                  <div className="text-xs font-bold text-[#0F172A]">{selectedCourse.modules} Materi</div>
                </div>
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                  <div className="mb-1 text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase">Durasi</div>
                  <div className="text-xs font-bold text-[#0F172A]">{selectedCourse.duration}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="border-l-4 border-[#14B8A6] pl-3 text-sm font-bold text-[#0F172A]">Ringkasan</h4>
                <p className="text-sm leading-relaxed text-[#64748B] italic">
                  &quot;{selectedCourse.description}&quot;
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="border-l-4 border-[#14B8A6] pl-3 text-sm font-bold text-[#0F172A]">Pengajar</h4>
                <div className="flex items-center space-x-3 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                  <Image
                    src={selectedCourse.instructor.avatar}
                    alt={selectedCourse.instructor.name}
                    width={40}
                    height={40}
                    className="shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">{selectedCourse.instructor.name}</div>
                    <div className="text-[10px] font-bold tracking-wider text-[#14B8A6] uppercase">
                      {selectedCourse.instructor.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-3 border-t border-[#F1F5F9] bg-[#F8FAFC] p-6 sm:flex-row">
              <button
                onClick={() => setIsViewOpen(false)}
                className="tap-target rounded-xl border-2 border-[#E2E8F0] px-6 py-2.5 text-sm font-bold text-[#64748B] transition-all hover:bg-white"
              >
                Tutup
              </button>
              <Link
                href={`/admin/kursus/${selectedCourse.id}/edit`}
                className="tap-target rounded-xl bg-[#14B8A6] px-8 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-[#14B8A6]/20 transition-all hover:bg-[#0F766E]"
              >
                Edit Kursus
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus Kursus */}
      {isDeleteOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="animate-fadeIn absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDeleteOpen(false)}
          ></div>
          <div className="animate-slideInUp relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="space-y-6 p-8 text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-extrabold text-[#0F172A]">Hapus Kursus?</h3>
                <p className="px-4 text-sm leading-relaxed text-[#64748B]">
                  Tindakan ini tidak dapat dibatalkan. Kursus{" "}
                  <span className="font-bold text-[#0F172A]">&quot;{selectedCourse.title}&quot;</span> akan dihapus
                  permanen.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="tap-target flex-1 rounded-xl border-2 border-[#E2E8F0] py-3 text-sm font-bold text-[#64748B] transition-all hover:bg-[#F8FAFC]"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="tap-target flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKursus;
