import { Suspense } from "react";

import InstructorList from "@/components/features/pengajar";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function PengajarPage() {
  return (
    <main>
      <Suspense>
        <Navbar />
        <InstructorList />
        <Footer />
      </Suspense>
    </main>
  );
}
