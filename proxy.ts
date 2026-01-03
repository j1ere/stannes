import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public paths that don't require authentication
  const publicPaths = [
    "/",
    "/home",
    "/login",
    "/signup",
    "/about",
    "/events",
    "/prayer",
    "/captured-moments",
    "/contact",
    "services",
  ]
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(path))

  // Get user session from cookie
  const userCookie = request.cookies.get("user")
  const isAuthenticated = !!userCookie

  // Protected paths (only contact requires auth based on original app)
  const protectedPaths = ["/admin", "/leadership", "/groups"]
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  // If trying to access protected route without auth, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated and trying to access login/signup, redirect to about
  if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/about", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}
