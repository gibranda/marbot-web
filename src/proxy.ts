import { NextRequest } from "next/server";

import {
  // authMiddleware,
  // authPathnameMatcher,
  devMiddleware,
  devPathnameMatcher,
  publicMiddleware,
  publicPathnameMatcher,
} from "./middlewares";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (devPathnameMatcher(pathname)) {
    return devMiddleware(request);
  }

  if (publicPathnameMatcher(pathname)) {
    return publicMiddleware();
  }

  // if (authPathnameMatcher(pathname)) {
  //   return authMiddleware(request);
  // }
}

export const config = {
  matcher: "/:path*",
};
