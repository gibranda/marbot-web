import AkunProfil from "@/components/features/akun-profil";
import AkunLayout from "@/components/layouts/akun";

export default function AkunProfilPage() {
  return (
    <AkunLayout>
      <AkunProfil user={{ name: "John Doe", email: "john.doe@example.com", role: "user" }} />
    </AkunLayout>
  );
}
