'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getModerationQueue, type ModerationCase, type ModerationFilters, type ModerationStatus } from '@/lib/api/moderation';
import { FeedbackBox } from '@/components/feedback/FeedbackBox';

const STATUS_OPTIONS: Array<{ value: ModerationStatus | ''; label: string }> = [
  { value: '', label: 'Todos' },
  { value: 'pending_moderation', label: 'Pendente moderação' },
  { value: 'published', label: 'Publicado' },
  { value: 'rejected', label: 'Rejeitado' },
  { value: 'closed_unresolved', label: 'Fechado não resolvido' },
];

const AGE_RANGE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: '', label: 'Todas idades' },
  { value: '0-7', label: '0-7 dias' },
  { value: '8-30', label: '8-30 dias' },
  { value: '31-90', label: '31-90 dias' },
  { value: '90+', label: '90+ dias' },
];

export default function ModeracaoPage() {
  const router = useRouter();
  const [state, setState] = useState<'loading' | 'error' | 'empty' | 'success'>('loading');
  const [items, setItems] = useState<ModerationCase[]>([]);
  const [filters, setFilters] = useState<ModerationFilters>({});

  useEffect(() => {
    fetchQueue();
  }, [filters]);

  async function fetchQueue() {
    setState('loading');
    try {
      const data = await getModerationQueue(filters);
      // Sort by age (oldest first)
      const sorted = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setItems(sorted);
      setState(sorted.length ? 'success' : 'empty');
    } catch (error) {
      setState('error');
    }
  }

  function handleCaseClick(caseId: string) {
    router.push(`/admin/moderacao/${caseId}`);
  }

  function getCaseAge(createdAt: string): number {
    const now = Date.now();
    const created = new Date(createdAt).getTime();
    return Math.floor((now - created) / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <h1>Fila de Moderação (W03)</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <div>
          <label>Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as ModerationStatus | undefined })}
            style={{ width: '100%', padding: 8 }}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Idade</label>
          <select
            value={filters.ageRange || ''}
            onChange={(e) => setFilters({ ...filters, ageRange: e.target.value as any })}
            style={{ width: '100%', padding: 8 }}
          >
            {AGE_RANGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {state === 'loading' && <FeedbackBox type="loading" message="Carregando fila..." />}
      {state === 'error' && <FeedbackBox type="error" message="Erro ao carregar fila. Tente novamente." />}
      {state === 'empty' && <FeedbackBox type="empty" message="Não há casos pendentes." />}

      {state === 'success' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>Public ID</th>
              <th style={{ padding: 12 }}>Empresa</th>
              <th style={{ padding: 12 }}>Consumidor</th>
              <th style={{ padding: 12 }}>Categoria</th>
              <th style={{ padding: 12 }}>Idade (dias)</th>
              <th style={{ padding: 12 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleCaseClick(item.id)}
                style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }}
              >
                <td style={{ padding: 12 }}>{item.publicId}</td>
                <td style={{ padding: 12 }}>{item.companyName}</td>
                <td style={{ padding: 12 }}>{item.consumerDisplayName}</td>
                <td style={{ padding: 12 }}>{item.category}</td>
                <td style={{ padding: 12 }}>{getCaseAge(item.createdAt)}</td>
                <td style={{ padding: 12 }}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
