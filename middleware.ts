import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  if (pathname === "/login") {
    if (isLoggedIn) {
      const role = (req.auth?.user as { role?: string })?.role;
      return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }
    return NextResponse.next();
  }

  const SHARED_DASHBOARD_PATHS = ["/dashboard/funnel-and-sales-process"];

  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (SHARED_DASHBOARD_PATHS.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }
    const role = (req.auth?.user as { role?: string })?.role;
    const allowed = `/dashboard/${role}`;
    if (!pathname.startsWith(allowed) && pathname !== "/dashboard") {
      return NextResponse.redirect(new URL(allowed, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
