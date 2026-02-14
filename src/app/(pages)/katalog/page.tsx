import Catalog from "@/components/features/katalog";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function CatalogPage() {
  return (
    <main className="pt-16 md:pt-20">
      <Navbar />
      <Catalog />
      <Footer />
    </main>
  );
}
