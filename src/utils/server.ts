import { cookies } from "next/headers";

import { COOKIE_REFRESH_TOKEN, COOKIE_TOKEN } from "@/constants/cookies";
import { objectData } from "@/libs/value";

import type { IResponse } from "@/types/fetch";
import type { NextRequest } from "next/server";

type IError = {
  api?: string;
  status?: number;
  code?: number;
  message?: string;
  request: unknown;
} & unknown;

export async function getAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_TOKEN);

  if (token) {
    return token.value;
  }

  return "";
}

export async function setCookieToken(res: { token: string; refreshToken: string; expires: number }) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_TOKEN, `${res.token}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 59 * 60, // 59 minutes
    path: "/",
  });
  cookieStore.set(COOKIE_REFRESH_TOKEN, `${res.refreshToken}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // maxAge: dayjs.unix(res.expires).diff(dayjs(), "second"),
    maxAge: 59 * 60 * 24, // 59 minutes
    path: "/",
  });
}

export async function getError(err: unknown, request: NextRequest, arg?: { isToaster?: boolean }) {
  const error = err as IError;
  const status = error?.status ?? error?.code ?? 500;
  const message = error?.message ?? "Error";

  console.error({ ...error, message, method: request.method });
  delete error.api;
  delete error.request;

  const response = { ...error, status, message, isToaster: arg?.isToaster ?? true };

  return Response.json(response, { status });
}

export function getResponseBase(response: IResponse) {
  const oData = objectData(response);

  return {
    success: oData.getBoolean("success"),
    code: oData.getString("code"),
    message: oData.getString("message"),
  };
}
