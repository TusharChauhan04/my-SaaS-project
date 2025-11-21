import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function middleware(request: NextRequest) {
  // Public routes
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next()
  }

  // Protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/admin")) {
    // Check for Supabase session cookies
    const supabaseAccessToken = request.cookies.get("sb-dadoixwtqjhglapoxgvg-auth-token")?.value
    const authToken = request.cookies.get("auth-token")?.value

    // If neither cookie exists, redirect to login
    if (!supabaseAccessToken && !authToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // If we have a token, allow access
    // The actual authentication verification happens on the API routes
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
