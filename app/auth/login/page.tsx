'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveSession } from '@/lib/session';
import { FeedbackBox } from '@/components/feedback/FeedbackBox';

export default function LoginAdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFa, setTwoFa] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  function submit() {
    if (!email || !password) {
      setState('error');
      setMessage('Credenciais obrigatórias.');
      return;
    }
    if (twoFa.length !== 6) {
      setState('error');
      setMessage('2FA obrigatório (6 dígitos).');
      return;
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    saveSession({ accessToken: 'mock-admin-access', role: 'admin', expiresAt });
    setState('success');
    setMessage('Sessão autenticada.');
    router.push('/admin/moderacao');
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 460, margin: '40px auto', display: 'grid', gap: 10 }}>
        <h1>Login Admin (2FA)</h1>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="Código 2FA" value={twoFa} onChange={(e) => setTwoFa(e.target.value)} />
        <button onClick={submit}>Entrar</button>
        {state !== 'idle' ? <FeedbackBox type={state === 'loading' ? 'loading' : state === 'error' ? 'error' : 'success'} message={message} /> : null}
      </div>
    </div>
  );
}
