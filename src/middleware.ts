import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

// Helper function to get dashboard URL based on role
function getDashboardUrl(role?: string): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "guru":
      return "/guru/dashboard";
    case "murid":
      return "/murid/dashboard";
    default:
      return "/";
  }
}

// Helper function to check if token is expired
function isTokenExpired(token: JWTExtended): boolean {
  if (!token?.iat) return true;
  
  // Get current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  
  // Calculate expiration time (12 hours after iat)
  const expirationTime = token.iat + (60 * 60 * 12); // 12 hours in seconds
  
  return currentTime >= expirationTime;
}

export async function middleware(request: NextRequest) {
  try {
    const token: JWTExtended | null = await getToken({
      req: request,
      secret: environment.AUTH_SECRET || 'development-secret-key-min-32-chars-long',
    });

    const { pathname } = request.nextUrl;

    // Handle auth pages (login/register)
    if (pathname === "/auth/login" || pathname === "/auth/register") {
      if (token?.user && !isTokenExpired(token)) {
        // If already logged in with valid token, redirect to appropriate dashboard
        const redirectUrl = getDashboardUrl(token.user.role);
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
      return NextResponse.next();
    }

    // Handle protected routes
    const protectedRoutes = {
      admin: pathname.startsWith("/admin"),
      guru: pathname.startsWith("/guru"),
      murid: pathname.startsWith("/murid"),
    };

    const isProtectedRoute = Object.values(protectedRoutes).some(Boolean);

    if (isProtectedRoute) {
      // Check if token is expired or user is not authenticated
      if (!token?.user || isTokenExpired(token)) {
        const url = new URL("/auth/login", request.url);
        url.searchParams.set("callbackUrl", encodeURI(request.url));
        return NextResponse.redirect(url);
      }

      // Wrong role
      const userRole = token.user.role;
      const allowedSection = Object.keys(protectedRoutes).find(
        (key) => protectedRoutes[key as keyof typeof protectedRoutes]
      );

      if (userRole !== allowedSection) {
        const redirectUrl = getDashboardUrl(userRole);
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }

      // Handle root paths redirect
      if (pathname === `/${userRole}`) {
        return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // On error, redirect to login
    const url = new URL("/auth/login", request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/guru/:path*", "/murid/:path*"],
};
