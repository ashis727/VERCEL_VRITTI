import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  let url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.jwt_secret });
  if (nextUrl.pathname == "/employer") {
    if (!token) {
      url.pathname = "/auth/employer";
      return NextResponse.redirect(url);
    } else {
      if (token?.is_completed) {
        return NextResponse.next()
      } else {
        url.pathname = "/auth/employer/setup";
        return NextResponse.redirect(url);
      }

    }
    // return NextResponse.next();
  } else if (nextUrl.pathname == "/auth/employer") {
    // console.log(token);
    if (token && token.type == "employer") {
      url.pathname = "/employer";

      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else if (nextUrl.pathname.startsWith("/hr")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else if (nextUrl.pathname.startsWith("/interviewer")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else if (
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register")
  ) {
    if (token) {
      url.pathname = "/hr";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // return NextResponse.next();
}
