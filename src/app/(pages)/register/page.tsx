import { Suspense } from "react";

import RegisterForm from "@/components/features/register";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
