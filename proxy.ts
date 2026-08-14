import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

const authRoutes = ["/sign-in", "/sign-up"]
const publicRoutes = ["/", "/search", "/cart", "/product"]

const isPublicRoute = (pathname: string) => {
  return publicRoutes.some((route) => {
    if (route === "/") return pathname === "/"
    return pathname === route || pathname.startsWith(`${route}/`)
  })
}

export async function proxy(request: NextRequest) {
  const { nextUrl } = request

  const headers = new Headers(request.headers)
  headers.set("x-pathname", nextUrl.pathname)

  const sessionCookie = getSessionCookie(request)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // other checks don't work here
  // as we can't differentiate a user as anonymous or signedIn user here

  // // redirect guests trying to access protected routes
  if (!sessionCookie && !isAuthRoute && !isPublicRoute(nextUrl.pathname)) {
    const loginUrl = new URL("/sign-in", nextUrl.origin) // construct url
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname) // add search params to it
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
