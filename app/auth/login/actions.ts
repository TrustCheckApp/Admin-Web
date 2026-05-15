'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, getAdminSessionCookieOptions } from '@/lib/session';

export type LoginAdminState = {
  status: 'idle' | 'error';
  message?: string;
};

function isSafeInternalPath(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) {
    return '/admin';
  }
  return value;
}

export async function loginAdminAction(_previousState: LoginAdminState, formData: FormData): Promise<LoginAdminState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const next = isSafeInternalPath(formData.get('next'));

  if (!email || !password) {
    return { status: 'error', message: 'Credenciais obrigatórias.' };
  }

  if (process.env.ADMIN_LOGIN_DEMO_ENABLED !== 'true') {
    return { status: 'error', message: 'Integração de autenticação admin indisponível.' };
  }

  const demoSessionValue = Buffer.from(
    JSON.stringify({ role: 'admin', issuedAt: new Date().toISOString(), mode: 'demo' }),
    'utf8',
  ).toString('base64url');

  cookies().set(ADMIN_SESSION_COOKIE, demoSessionValue, getAdminSessionCookieOptions());
  redirect(next);
}
