import { Suspense } from "react";

import LoginForm from "@/components/features/login";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
