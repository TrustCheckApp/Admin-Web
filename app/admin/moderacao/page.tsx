'use client';

import { useEffect, useMemo, useState } from 'react';
import { FeedbackBox } from '@/components/feedback/FeedbackBox';
import { readSession, clearSession } from '@/lib/session';
import { apiRequest } from '@/lib/api-client';

type ModerationCase = { id: string; numero?: string; status: string };

export default function ModeracaoPage() {
  const [state, setState] = useState<'loading' | 'error' | 'empty' | 'success'>('loading');
  const [items, setItems] = useState<ModerationCase[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      const session = readSession();
      if (!session) {
        setState('error');
        setError('Sessao invalida. Faca login novamente.');
        return;
      }
      if (new Date(session.expiresAt).getTime() <= Date.now()) {
        clearSession();
        setState('error');
        setError('Sessao expirada. Faca login novamente.');
        return;
      }

      try {
        const data = await apiRequest<ModerationCase[]>('/casos/moderacao/fila', {
          method: 'GET',
          accessToken: session.accessToken,
        });
        setItems(data);
        setState(data.length ? 'success' : 'empty');
      } catch (e) {
        setState('error');
        setError(e instanceof Error ? e.message : 'Erro ao carregar fila.');
      }
    };

    void run();
  }, []);

  async function decide(caseId: string, approved: boolean) {
    const session = readSession();
    if (!session) return;

    const decisao = approved ? 'PUBLICADO' : 'REJEITADO';
    try {
      await apiRequest<{ casoId: string; novoStatus: string }>(`/casos/${caseId}/moderar`, {
        method: 'PUT',
        accessToken: session.accessToken,
        body: JSON.stringify({
          decisao,
          observacao: approved ? 'Aprovado pelo painel admin' : 'Rejeitado pelo painel admin',
        }),
      });

      setItems((prev) =>
        prev.map((item) =>
          item.id === caseId
            ? { ...item, status: approved ? 'PUBLICADO' : 'NAO_RESOLVIDO' }
            : item,
        ),
      );
    } catch (e) {
      setState('error');
      setError(e instanceof Error ? e.message : 'Erro ao moderar caso.');
    }
  }

  const updated = useMemo(() => items.filter((i) => i.status !== 'EM_MODERACAO'), [items]);

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <h1>Fila de Moderacao (W03)</h1>
      {state === 'loading' && <FeedbackBox type="loading" message="Carregando fila..." />}
      {state === 'error' && <FeedbackBox type="error" message={error || 'Falha de sessao.'} />}
      {state === 'empty' && <FeedbackBox type="empty" message="Nao ha casos pendentes." />}

      {state === 'success' &&
        items.map((item) => (
          <div className="card" key={item.id} style={{ display: 'grid', gap: 8 }}>
            <strong>{item.numero ?? item.id}</strong>
            <span>Status: {item.status}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => decide(item.id, true)}>Aprovar</button>
              <button onClick={() => decide(item.id, false)}>Rejeitar</button>
            </div>
          </div>
        ))}

      {updated.length > 0 ? (
        <FeedbackBox type="success" message={`${updated.length} caso(s) moderado(s) com sucesso.`} />
      ) : null}
    </div>
  );
}
