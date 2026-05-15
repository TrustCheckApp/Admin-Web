import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, getExpiredAdminSessionCookieOptions } from '@/lib/session';

export async function GET() {
  const response = NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'));
  response.cookies.set(ADMIN_SESSION_COOKIE, '', getExpiredAdminSessionCookieOptions());
  return response;
}
