import { withAuth } from "next-auth/middleware"

export const middleware = withAuth(
  function middleware(req) {
    // Logique supplémentaire si nécessaire
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
)

// Protéger ces routes
export const config = {
  matcher: [
    "/",
    "/clients/:path*",
    "/events/:path*",
    "/tips/:path*",
    "/astrology/:path*",
    "/clothing/:path*",
    "/theme-demo/:path*",
  ],
}
