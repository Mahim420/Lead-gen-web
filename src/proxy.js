import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/dashboard", "/all-leads"];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  const token = await getToken({ req });
  const reqPath = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);

  const isPrivate = privateRoute.some((route) => reqPath.startsWith(route));

  console.log({ reqPath, isAuthenticated, isPrivate });

  if (!isAuthenticated && isPrivate) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbacks", reqPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/all-leads/:path*"],
};
