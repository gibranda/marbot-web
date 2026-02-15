import { Suspense } from "react";

import RegisterVerify from "@/components/features/register/verify";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterVerify />
    </Suspense>
  );
}
