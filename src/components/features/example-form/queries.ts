import { useMutation } from "@tanstack/react-query";

import { FE_LOGIN_VERIFY } from "@/constants/uri-api-frontend";
import { post } from "@/libs/ky";

import type { IResultLogin } from "@/app/api/auth/model";

export const postVerifyOtp = async (body: { otp: string; email: string }) => {
  const url = FE_LOGIN_VERIFY();
  return await post<IResultLogin>(url, { json: body });
};

export function useVerifyOtp() {
  return useMutation({ mutationFn: postVerifyOtp });
}
