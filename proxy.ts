import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "./app/lib/admin/auth";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

const PUBLIC_PATHS = new Set([
  "/admin/login",
  "/api/admin/auth",
]);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (await verifyToken(token)) {
    return NextResponse.next();
  }

  // API → 401 JSON
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Page → redirect to login
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}
