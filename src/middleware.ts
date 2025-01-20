import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = process.env.PROTECTED_PATHS?.split(",") || [];
const isProtectedPath = (path: string) => {
  return protectedPaths.some((pattern) => new RegExp(pattern).test(path));
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const isAuthPage = ["/sign-in", "/sign-in/basic", "/sign-up"].includes(
    request.nextUrl.pathname,
  );
  // 인증 필요한 페이지 env로 관리
  const isProtectedPage = isProtectedPath(request.nextUrl.pathname);

  // 인증이 필요한 페이지에 토큰 없이 접근 시도할 경우
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 로그인된 상태로 인증 페이지 접근 시
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
