import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (/^\/(ar|en)(\/|$)/.test(pathname)) return;
  const prefersEn = (req.headers.get("accept-language") || "").toLowerCase().startsWith("en");
  const url = req.nextUrl.clone();
  url.pathname = `/${prefersEn ? "en" : "ar"}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next|favicon|icon|robots|sitemap|.*\\..*).*)"] };
