import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/* routes
  if (pathname.startsWith('/admin')) {
    const accessToken = request.cookies.get('admin_access_token')?.value;

    if (!accessToken) {
      // Redirect to login with next parameter
      const next = encodeURIComponent(pathname);
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
