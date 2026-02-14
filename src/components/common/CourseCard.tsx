import { Star, Clock, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Course } from "@/constants/types";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`rounded-lg px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm ${
              course.level === "Pemula" ? "bg-[#99F6E4] text-[#0F766E]" : "bg-[#E2E8F0] text-[#475569]"
            }`}
          >
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2 flex items-center space-x-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-[#0F172A]">{course.rating}</span>
          <span className="text-xs text-[#64748B]">({course.students.toLocaleString()} peserta)</span>
        </div>

        <h3 className="mb-3 line-clamp-2 h-10 leading-snug font-bold text-[#0F172A] transition-colors group-hover:text-[#14B8A6]">
          {course.title}
        </h3>

        <div className="mb-4 flex items-center space-x-4 text-xs text-[#64748B]">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen size={14} />
            <span>{course.modules} modul</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-4">
          <div className="flex items-center space-x-2">
            <img src={course.instructor.avatar} className="h-6 w-6 rounded-full" />
            <span className="text-xs font-medium text-[#475569]">{course.instructor.name}</span>
          </div>
          <span className={`text-sm font-bold ${course.price === "Gratis" ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
            {course.price}
          </span>
        </div>

        <Link
          href={`/course/${course.id}`}
          className="mt-4 flex w-full items-center justify-center space-x-2 rounded-[10px] border border-[#14B8A6] py-2 text-sm font-bold text-[#14B8A6] transition-all hover:bg-[#14B8A6] hover:text-white"
        >
          <span>Lihat Detail</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
