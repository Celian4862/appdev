import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Secure usage: AUTH_SECRET (not NEXT_PUBLIC_)
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname.startsWith("/login");

  // Debugging logs (visible in Vercel Function logs)
  console.log("Middleware triggered on:", pathname);
  console.log("User is authenticated:", isAuthenticated);

  // Redirect authenticated users away from login
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Only apply middleware to these routes
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/login"],
};
