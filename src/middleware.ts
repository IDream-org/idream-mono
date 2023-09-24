// import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

// export function middleware(request: NextRequest) {
//   if (!request.cookies.has("next-auth.session-token")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }

export const config = {
  matcher: ["/dashboard", "/profile", "/collections/:slug*"],
};
