import { Suspense } from "react";

import AgendaSukses from "@/components/features/agenda/sukses";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function AgendaSuksesPage() {
  return (
    <main>
      <Navbar />
      <Suspense>
        <AgendaSukses />
      </Suspense>
      <Footer />
    </main>
  );
}
