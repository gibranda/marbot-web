import { Suspense } from "react";

import Catalog from "@/components/features/katalog";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function CatalogPage() {
  return (
    <main>
      <Suspense>
        <Navbar />
        <Catalog />
        <Footer />
      </Suspense>
    </main>
  );
}
