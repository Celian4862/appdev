import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Debug environment
  console.log(`[MIDDLEWARE-DEBUG] AUTH_SECRET exists: ${!!process.env.AUTH_SECRET}`);
  console.log(`[MIDDLEWARE-DEBUG] Cookies: ${request.headers.get('cookie')?.substring(0, 100)}...`);
  
  // Try different token configurations
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName: "next-auth.session-token", // Try explicit cookie name
  });
  
  // If that doesn't work, try with secureCookie option
  const tokenSecure = !token ? await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: true, // For HTTPS environments like Vercel
  }) : null;
  
  // If still no token, try with different cookie name
  const tokenVercel = !token && !tokenSecure ? await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName: "_vercel_jwt", // Try the cookie we see in logs
  }) : null;

  const finalToken = token || tokenSecure || tokenVercel;
  const isAuthenticated = !!finalToken;
  const pathname = request.nextUrl.pathname;
  
  // ADD DEBUGGING
  console.log(`[MIDDLEWARE] ${pathname} - Auth: ${isAuthenticated}, Token: ${!!finalToken}, UserId: ${finalToken?.id}`);
  console.log(`[MIDDLEWARE-DEBUG] Token attempts:`, { 
    standard: !!token, 
    secure: !!tokenSecure, 
    vercel: !!tokenVercel,
    final: !!finalToken 
  });
  console.log(`[MIDDLEWARE-DEBUG] Full token:`, finalToken);
  
  // Define route types
  const publicRoutes = ["/login", "/sign-up"];
  const onboardingRoute = "/track-selection";
  const protectedRoutes = ["/dashboard", "/roadmap", "/settings"];
  
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isOnboardingRoute = pathname.startsWith(onboardingRoute);
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  console.log(`[MIDDLEWARE] Route types - Public: ${isPublicRoute}, Onboarding: ${isOnboardingRoute}, Protected: ${isProtectedRoute}`);

  // Middleware triggered on: pathname
  // User is authenticated: isAuthenticated

  // Handle unauthenticated users
  if (!isAuthenticated) {
    if (isPublicRoute) {
      console.log(`[MIDDLEWARE] Allowing unauthenticated access to public route: ${pathname}`);
      return NextResponse.next();
    }
    console.log(`[MIDDLEWARE] Redirecting unauthenticated user from ${pathname} to /login`);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle authenticated users
  if (isAuthenticated && finalToken?.id) {
    // TEMPORARILY DISABLE ONBOARDING CHECK FOR TESTING
    const hasCompletedOnboarding = true; // Force to true for testing
    // const hasCompletedOnboarding = finalToken.onboardingCompleted === true;

    // If onboarding is completed
    if (hasCompletedOnboarding) {
      // Redirect away from public routes
      if (isPublicRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      
      // Redirect away from onboarding
      if (isOnboardingRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      
      // Allow access to protected routes
      if (isProtectedRoute) {
        return NextResponse.next();
      }
    } else {
      // If onboarding is NOT completed
      // Allow access to onboarding route
      if (isOnboardingRoute) {
        return NextResponse.next();
      }
      
      // Redirect from protected routes to onboarding
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/track-selection", request.url));
      }
      
      // Redirect from public routes to onboarding (user is logged in but needs onboarding)
      if (isPublicRoute) {
        return NextResponse.redirect(new URL("/track-selection", request.url));
      }
    }
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*", 
    "/roadmap",
    "/roadmap/:path*", 
    "/settings",
    "/settings/:path*", 
    "/track-selection",
    "/track-selection/:path*",
    "/login",
    "/sign-up"
  ],
};
