import { Suspense } from "react";

import CheckoutDetail from "@/components/features/checkout/detail";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function CheckoutDetailPage() {
  return (
    <main>
      <Navbar />
      <Suspense>
        <CheckoutDetail />
      </Suspense>
      <Footer />
    </main>
  );
}
