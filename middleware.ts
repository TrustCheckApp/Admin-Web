import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from './lib/session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith('/admin');

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (!hasSession) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
