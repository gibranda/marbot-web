import { Suspense } from "react";

import CourseDetail from "@/components/features/course/detail";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function CourseDetailPage() {
  return (
    <main>
      <Suspense>
        <Navbar />
        <CourseDetail />
        <Footer />
      </Suspense>
    </main>
  );
}
