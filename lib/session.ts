export const ADMIN_SESSION_COOKIE = 'trustcheck_admin_session';

export type SessionState = {
  accessToken: string;
  role: 'admin';
  expiresAt: string;
};

export function hasAdminSessionCookie(cookieHeader?: string | null): boolean {
  if (!cookieHeader) return false;
  return cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .some((cookie) => cookie.startsWith(`${ADMIN_SESSION_COOKIE}=`));
}

const LEGACY_LOCAL_STORAGE_KEY = 'tc_admin_session';

export function saveSession(session: SessionState): void {
  localStorage.setItem(LEGACY_LOCAL_STORAGE_KEY, JSON.stringify(session));
}

export function readSession(): SessionState | null {
  const raw = localStorage.getItem(LEGACY_LOCAL_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY);
}
