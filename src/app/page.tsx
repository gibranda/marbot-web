import Home from "@/components/features/home";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function HomePage() {
  return (
    <main className="pt-16 md:pt-20">
      <Navbar />
      <Home />
      <Footer />
    </main>
  );
}
