'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiRequest } from '@/lib/api-client';
import { FeedbackBox } from '@/components/feedback/FeedbackBox';

export default function TwoFactorAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin/moderacao';

  const [code, setCode] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  async function submit() {
    if (code.length !== 6) {
      setState('error');
      setMessage('Código inválido. Digite 6 dígitos.');
      return;
    }

    setState('loading');
    setMessage('');

    try {
      const response = await apiRequest<{ accessToken: string; refreshToken: string }>('/auth/admin/2fa', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });

      // Store tokens in httpOnly cookies via server action
      await fetch('/api/auth/set-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }),
      });

      setState('success');
      setMessage('Autenticado com sucesso.');

      // Redirect to the next page
      setTimeout(() => {
        router.push(decodeURIComponent(next));
      }, 500);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Código inválido, tente novamente.');
    }
  }

  function handleSupportClick() {
    // Open support channel for users who can't access their authenticator
    window.open('mailto:suporte@trustcheck.com?subject=Problema com 2FA - Login Admin', '_blank');
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 460, margin: '40px auto', display: 'grid', gap: 10 }}>
        <h1>Autenticação de Dois Fatores</h1>
        <p>Digite o código de 6 dígitos do seu autenticador.</p>
        <input
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          maxLength={6}
          style={{ fontSize: 24, letterSpacing: 8, textAlign: 'center' }}
        />
        <button onClick={submit} disabled={state === 'loading'}>
          {state === 'loading' ? 'Verificando...' : 'Verificar'}
        </button>
        {state !== 'idle' ? <FeedbackBox type={state === 'loading' ? 'loading' : state === 'error' ? 'error' : 'success'} message={message} /> : null}
        <button onClick={handleSupportClick} style={{ background: 'none', border: 'none', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}>
          Não consigo acessar meu autenticador
        </button>
      </div>
    </div>
  );
}
