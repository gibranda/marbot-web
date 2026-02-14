import { NextResponse } from "next/server";
import { match } from "path-to-regexp";

import { COOKIE_REFRESH_TOKEN } from "@/constants/cookies";
import { PATH_BASE } from "@/constants/uri-path";

import type { NextRequest } from "next/server";

export const authPathnameMatcher = match("*path");

const ignoredPaths = ["/"];

function hasExtension(filename: string) {
  const parts = filename.split(".");

  return parts.length > 1 && parts[parts.length - 1] !== "";
}

export function authMiddleware(req: NextRequest) {
  const refreshToken = req.cookies.get(COOKIE_REFRESH_TOKEN)?.value;
  const { pathname } = req.nextUrl;

  if (refreshToken && pathname === "/") {
    return NextResponse.redirect(new URL(`${PATH_BASE}/overview`, req.url));
  }
  if (!refreshToken && !ignoredPaths.includes(pathname) && !hasExtension(pathname)) {
    return NextResponse.redirect(new URL(PATH_BASE, req.url));
  }

  return NextResponse.next();
}
