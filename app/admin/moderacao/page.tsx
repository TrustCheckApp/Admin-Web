'use client';

import { useEffect, useMemo, useState } from 'react';
import { FeedbackBox } from '@/components/feedback/FeedbackBox';
import { readSession, clearSession } from '@/lib/session';

type ModerationCase = { id: string; publicId: string; status: string; reason?: string };

const mockCases: ModerationCase[] = [
  { id: '1', publicId: 'TC-2026-000101', status: 'EM_MODERACAO' },
  { id: '2', publicId: 'TC-2026-000102', status: 'EM_MODERACAO' },
];

export default function ModeracaoPage() {
  const [state, setState] = useState<'loading' | 'error' | 'empty' | 'success'>('loading');
  const [items, setItems] = useState<ModerationCase[]>([]);

  useEffect(() => {
    const session = readSession();
    if (!session) {
      setState('error');
      return;
    }
    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      clearSession();
      setState('error');
      return;
    }

    setItems(mockCases);
    setState(mockCases.length ? 'success' : 'empty');
  }, []);

  function decide(caseId: string, approved: boolean) {
    const reason = approved ? 'Aprovado na moderação' : 'Rejeitado na moderação';
    setItems((prev) => prev.map((item) => (item.id === caseId ? { ...item, status: approved ? 'PUBLICADO' : 'NAO_RESOLVIDO', reason } : item)));
  }

  const updated = useMemo(() => items.filter((i) => i.status !== 'EM_MODERACAO'), [items]);

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <h1>Fila de Moderação (W03)</h1>
      {state === 'loading' && <FeedbackBox type="loading" message="Carregando fila..." />}
      {state === 'error' && <FeedbackBox type="error" message="Sessão inválida/expirada. Reautentique no login admin." />}
      {state === 'empty' && <FeedbackBox type="empty" message="Não há casos pendentes." />}

      {state === 'success' && items.map((item) => (
        <div className="card" key={item.id} style={{ display: 'grid', gap: 8 }}>
          <strong>{item.publicId}</strong>
          <span>Status: {item.status}</span>
          <span>Justificativa: {item.reason ?? 'Pendente decisão'}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => decide(item.id, true)}>Aprovar</button>
            <button onClick={() => decide(item.id, false)}>Rejeitar</button>
          </div>
        </div>
      ))}

      {updated.length > 0 ? <FeedbackBox type="success" message={`${updated.length} caso(s) com decisão auditável aplicada.`} /> : null}
    </div>
  );
}
