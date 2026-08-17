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

  if (nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  const headers = new Headers(request.headers)
  headers.set("x-pathname", nextUrl.pathname)

  const sessionCookie = getSessionCookie(request)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (!sessionCookie && !isAuthRoute && !isPublicRoute(nextUrl.pathname)) {
    const loginUrl = new URL("/sign-in", nextUrl.origin)
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname)

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next({
    request: { headers },
  })
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
