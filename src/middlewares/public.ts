import { NextResponse } from "next/server";
import { match } from "path-to-regexp";

const matchers = [match("/authenticate"), match("/agenda/:id/display")];

export const publicPathnameMatcher = (pathname: string) => matchers.map((m) => m(pathname)).find(Boolean);

export async function publicMiddleware() {
  return NextResponse.next();
}
