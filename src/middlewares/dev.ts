import { NextResponse } from "next/server";
import { match } from "path-to-regexp";

import { COOKIE_LOG_API } from "@/constants/cookies";

import type { NextRequest } from "next/server";

export const devPathnameMatcher = match("/dev/*path");

export async function devMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/dev/debug") {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set(COOKIE_LOG_API, "log", { maxAge: 60 * 10 });

    return response;
  }

  return NextResponse.next();
}
