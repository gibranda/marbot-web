import InstructorProfile from "@/components/features/pengajar/profile";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function PengajarDetailPage() {
  return (
    <main className="pt-16 md:pt-20">
      <Navbar />
      <InstructorProfile />
      <Footer />
    </main>
  );
}
