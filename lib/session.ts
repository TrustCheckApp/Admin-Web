export type SessionState = {
  accessToken: string;
  role: 'admin';
  expiresAt: string;
};

const KEY = 'tc_admin_session';

export function saveSession(session: SessionState): void {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function readSession(): SessionState | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(KEY);
}
