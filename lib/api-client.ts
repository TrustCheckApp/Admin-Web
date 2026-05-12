const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

type ApiRequestOptions = RequestInit & { accessToken?: string };

export async function apiRequest<T>(path: string, init?: ApiRequestOptions, fallback?: () => Promise<T>): Promise<T> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(init?.headers as Record<string, string> | undefined),
    };

    if (init?.accessToken) {
      headers.Authorization = `Bearer ${init.accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers,
      ...init,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message = body?.message?.code ?? body?.message ?? `HTTP_${response.status}`;
      throw new Error(String(message));
    }

    return (await response.json()) as T;
  } catch (error) {
    if (fallback) return fallback();
    throw error;
  }
}
