'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiRequest } from '@/lib/api-client';
import { FeedbackBox } from '@/components/feedback/FeedbackBox';

export default function LoginAdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin/moderacao';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  async function submit() {
    if (!email || !password) {
      setState('error');
      setMessage('Credenciais obrigatórias.');
      return;
    }

    setState('loading');
    setMessage('');

    try {
      await apiRequest('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // On successful login, redirect to 2FA page
      const nextUrl = encodeURIComponent(next);
      router.push(`/auth/2fa?next=${nextUrl}`);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Erro ao fazer login. Tente novamente.');
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 460, margin: '40px auto', display: 'grid', gap: 10 }}>
        <h1>Login Admin</h1>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={submit} disabled={state === 'loading'}>
          {state === 'loading' ? 'Entrando...' : 'Entrar'}
        </button>
        {state !== 'idle' ? <FeedbackBox type={state === 'loading' ? 'loading' : state === 'error' ? 'error' : 'success'} message={message} /> : null}
      </div>
    </div>
  );
}
