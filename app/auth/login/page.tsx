'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveSession } from '@/lib/session';
import { FeedbackBox } from '@/components/feedback/FeedbackBox';
import { apiRequest } from '@/lib/api-client';

type LoginResponse =
  | { requer2fa: true; tokenTemporario: string; mensagem: string }
  | { accessToken: string; refreshToken: string };

type TwoFaResponse = { accessToken: string; refreshToken: string };

export default function LoginAdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFa, setTwoFa] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  async function submit() {
    if (!email || !password) {
      setState('error');
      setMessage('Credenciais obrigatorias.');
      return;
    }
    if (twoFa.length !== 6) {
      setState('error');
      setMessage('2FA obrigatorio (6 digitos).');
      return;
    }

    try {
      setState('loading');
      setMessage('Autenticando...');

      const login = await apiRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha: password }),
      });

      let accessToken = '';
      if ('requer2fa' in login && login.requer2fa) {
        const twoFaResult = await apiRequest<TwoFaResponse>('/auth/2fa/confirmar', {
          method: 'POST',
          accessToken: login.tokenTemporario,
          body: JSON.stringify({ codigo: twoFa }),
        });
        accessToken = twoFaResult.accessToken;
      } else {
        accessToken = (login as { accessToken: string }).accessToken;
      }

      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      saveSession({ accessToken, role: 'admin', expiresAt });
      setState('success');
      setMessage('Sessao autenticada.');
      router.push('/admin/moderacao');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Falha de autenticacao.');
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 460, margin: '40px auto', display: 'grid', gap: 10 }}>
        <h1>Login Admin (2FA)</h1>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="Codigo 2FA" value={twoFa} onChange={(e) => setTwoFa(e.target.value)} />
        <button onClick={submit} disabled={state === 'loading'}>
          {state === 'loading' ? 'Entrando...' : 'Entrar'}
        </button>
        {state !== 'idle' ? (
          <FeedbackBox
            type={state === 'loading' ? 'loading' : state === 'error' ? 'error' : 'success'}
            message={message}
          />
        ) : null}
      </div>
    </div>
  );
}
