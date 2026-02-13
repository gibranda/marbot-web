
import React from 'react';
import { Star, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm ${
            course.level === 'Pemula' ? 'bg-[#99F6E4] text-[#0F766E]' : 'bg-[#E2E8F0] text-[#475569]'
          }`}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center space-x-1 mb-2">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-[#0F172A]">{course.rating}</span>
          <span className="text-xs text-[#64748B]">({course.students.toLocaleString()} peserta)</span>
        </div>

        <h3 className="font-bold text-[#0F172A] leading-snug mb-3 group-hover:text-[#14B8A6] transition-colors line-clamp-2 h-10">
          {course.title}
        </h3>

        <div className="flex items-center space-x-4 text-[#64748B] text-xs mb-4">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen size={14} />
            <span>{course.modules} modul</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
          <div className="flex items-center space-x-2">
            <img src={course.instructor.avatar} className="w-6 h-6 rounded-full" />
            <span className="text-xs font-medium text-[#475569]">{course.instructor.name}</span>
          </div>
          <span className={`text-sm font-bold ${course.price === 'Gratis' ? 'text-[#14B8A6]' : 'text-[#0F172A]'}`}>
            {course.price}
          </span>
        </div>

        <Link 
          to={`/course/${course.id}`} 
          className="mt-4 w-full py-2 flex items-center justify-center space-x-2 text-sm font-bold text-[#14B8A6] border border-[#14B8A6] rounded-[10px] hover:bg-[#14B8A6] hover:text-white transition-all"
        >
          <span>Lihat Detail</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
