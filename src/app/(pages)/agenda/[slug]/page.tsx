import { Suspense } from "react";

import Agenda from "@/components/features/agenda/detail";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function AgendaDetailPage() {
  return (
    <main>
      <Navbar />
      <Suspense>
        <Agenda />
      </Suspense>
      <Footer />
    </main>
  );
}
