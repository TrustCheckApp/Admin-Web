'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api-client';
import { FeedbackBox } from '@/components/feedback/FeedbackBox';

interface AdminMetrics {
  totalCases?: number;
  openCases?: number;
  moderationRate?: number;
  averageTrustScore?: number;
}

export default function DashboardPage() {
  const [state, setState] = useState<'loading' | 'error' | 'success'>('loading');
  const [metrics, setMetrics] = useState<AdminMetrics>({});

  useEffect(() => {
    fetchMetrics();
  }, []);

  async function fetchMetrics() {
    setState('loading');
    try {
      const data = await apiRequest<AdminMetrics>('/admin/metrics');
      setMetrics(data);
      setState('success');
    } catch (error) {
      setState('error');
    }
  }

  function formatMetric(value: number | undefined): string {
    if (value === undefined || value === null) {
      return 'Dados indisponíveis';
    }
    if (typeof value === 'number' && !Number.isFinite(value)) {
      return 'Dados indisponíveis';
    }
    return value.toString();
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1>Dashboard (W02)</h1>

      {state === 'loading' && <FeedbackBox type="loading" message="Carregando métricas..." />}
      {state === 'error' && <FeedbackBox type="error" message="Erro ao carregar métricas. Tente novamente." />}

      {state === 'success' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3>Total de Casos</h3>
            <p style={{ fontSize: 32, fontWeight: 'bold' }}>{formatMetric(metrics.totalCases)}</p>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3>Casos Abertos</h3>
            <p style={{ fontSize: 32, fontWeight: 'bold' }}>{formatMetric(metrics.openCases)}</p>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3>Taxa de Moderação</h3>
            <p style={{ fontSize: 32, fontWeight: 'bold' }}>
              {metrics.moderationRate !== undefined && metrics.moderationRate !== null ? `${metrics.moderationRate}%` : 'Dados indisponíveis'}
            </p>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3>Trust Score Médio</h3>
            <p style={{ fontSize: 32, fontWeight: 'bold' }}>
              {metrics.averageTrustScore !== undefined && metrics.averageTrustScore !== null ? metrics.averageTrustScore.toFixed(1) : 'Dados indisponíveis'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
