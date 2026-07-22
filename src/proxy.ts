import { NextResponse, type NextRequest } from "next/server";

const BLOCKED_SCAN_PATHS = [
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/adminer/i,
  /^\/cgi-bin/i,
  /^\/phpmyadmin/i,
  /^\/wp-admin/i,
  /^\/wp-content/i,
  /^\/wp-includes/i,
  /^\/xmlrpc\.php$/i,
  /\.php$/i,
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (BLOCKED_SCAN_PATHS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse("Not found", {
      status: 404,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
