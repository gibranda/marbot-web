import InstructorList from "@/components/features/pengajar";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function PengajarPage() {
  return (
    <main className="pt-16 md:pt-20">
      <Navbar />
      <InstructorList />
      <Footer />
    </main>
  );
}
