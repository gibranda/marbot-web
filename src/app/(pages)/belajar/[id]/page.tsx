import { Suspense } from "react";

import BelajarDetail from "@/components/features/belajar/detail";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function BelajarDetailPage() {
  return (
    <main>
      <Suspense>
        <Navbar />
        <BelajarDetail />
        <Footer />
      </Suspense>
    </main>
  );
}
