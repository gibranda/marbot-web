export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student";
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rating: number;
  totalCourses: number;
  totalStudents: number;
  location?: string;
}

export interface Course {
  id: string;
  title: string;
  level: "Pemula" | "Menengah" | "Lanjut";
  rating: number;
  students: number;
  duration: string;
  modules: number;
  instructor: Instructor;
  price: string;
  thumbnail: string;
  category: string;
  description: string;
  lastUpdate: string;
  status?: "Published" | "Draft";
}

export interface Agenda {
  id: string;
  slug: string;
  title: string;
  type: "Online" | "Offline";
  date: string;
  time: string;
  endTime: string;
  location: string; // Platform link if online, Address if offline
  locationName: string; // Zoom/Google Meet if online, City/Building if offline
  price: string;
  priceNum: number;
  quota: number;
  remainingQuota: number;
  description: string;
  narasumber: string;
  cover: string;
  status: "Published" | "Draft";
  registrantsCount: number;
}

export interface ForumCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface ForumComment {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
}

export interface ForumThread {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  authorMosque: string;
  content: string;
  commentCount: number;
  timestamp: string;
  status: "Terjawab" | "Diskusi";
  comments?: ForumComment[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Transaction {
  id: string;
  invoice: string;
  userName: string;
  courseTitle: string;
  amount: string;
  method: string;
  status: "Berhasil" | "Pending" | "Gagal";
  date: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  coursesJoined: number;
  progress: number;
  status: "Aktif" | "Nonaktif";
  joinDate: string;
}

export interface Certificate {
  id: string;
  studentName: string;
  courseTitle: string;
  certNumber: string;
  issueDate: string;
}

export interface Activity {
  id: string;
  type: "course" | "instructor" | "student" | "transaction" | "certificate" | "agenda";
  title: string;
  timestamp: string;
}
