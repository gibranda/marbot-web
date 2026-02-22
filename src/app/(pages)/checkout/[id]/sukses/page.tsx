import { Suspense } from "react";

import CheckoutSuccess from "@/components/features/checkout/sukses";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function CheckoutSuccessPage() {
  return (
    <main>
      <Navbar />
      <Suspense>
        <CheckoutSuccess />
      </Suspense>
      <Footer />
    </main>
  );
}
