import { Suspense } from "react";

import Agenda from "@/components/features/agenda";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function AgendaPage() {
  return (
    <main>
      <Suspense>
        <Navbar />
        <Agenda />
        <Footer />
      </Suspense>
    </main>
  );
}
