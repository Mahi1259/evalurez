import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = await auth();
    const url = new URL(req.nextUrl);

    // If a user is logged in and tries to access '/', Redirect them to '/dashboard'
    if (userId && url.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    // Only protect routes that match the pattern
    if (isProtectedRoute(req)) {
      await auth.protect();
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    // Return a proper response instead of letting the error bubble up
    if (isProtectedRoute(req)) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
    "/api/:path*",
    "/trpc/:path*",
  ],
};
