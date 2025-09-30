import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/tracker", "/goals", "/profile"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("savingsville-token")?.value;

  if (!token) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tracker/:path*", "/goals/:path*", "/profile/:path*"],
};
