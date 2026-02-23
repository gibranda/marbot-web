/**
 * Helper functions untuk admin dashboard styling dan formatting
 */

export type CourseStatus = "Published" | "Draft";
export type ActivityType = "transaction" | "course" | "student" | "instructor" | "certificate" | "agenda";

/**
 * Menentukan style untuk course status badge
 */
export const getCourseStatusStyle = (status: CourseStatus): string => {
  const styles: Record<CourseStatus, string> = {
    Published: "bg-green-100 text-green-600",
    Draft: "bg-amber-100 text-amber-600",
  };
  return styles[status] ?? "bg-gray-100 text-gray-600";
};

/**
 * Menentukan warna dot untuk activity item
 */
export const getActivityDotColor = (type: ActivityType): string => {
  const colors: Record<ActivityType, string> = {
    transaction: "bg-green-500",
    course: "bg-blue-500",
    student: "bg-[#14B8A6]",
    instructor: "bg-[#14B8A6]",
    certificate: "bg-[#14B8A6]",
    agenda: "bg-[#14B8A6]",
  };
  return colors[type] ?? "bg-[#14B8A6]";
};

/**
 * Format instructor name dengan fallback yang aman
 * Mengambil nama terakhir jika ada, atau seluruh nama jika hanya satu kata
 */
export const formatInstructorName = (fullName: string): string => {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    return parts[0];
  }
  return parts[parts.length - 1] ?? fullName;
};
