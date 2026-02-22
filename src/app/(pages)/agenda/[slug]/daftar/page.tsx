import { Suspense } from "react";

import AgendaDaftar from "@/components/features/agenda/daftar";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function AgendaDaftarPage() {
  return (
    <main>
      <Navbar />
      <Suspense>
        <AgendaDaftar />
      </Suspense>
      <Footer />
    </main>
  );
}
