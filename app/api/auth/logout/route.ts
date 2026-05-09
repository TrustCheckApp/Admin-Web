import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true });

    // Clear httpOnly cookies
    response.cookies.delete('admin_access_token', { path: '/' });
    response.cookies.delete('admin_refresh_token', { path: '/' });

    // Call backend logout endpoint to revoke refresh token
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
    await fetch(`${API_BASE_URL}/auth/admin/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
    }).catch(() => {
      // Continue even if backend logout fails
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
