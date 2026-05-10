'use client';

export default function AnalyticsPage() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1>Analytics (W09)</h1>

      <div className="card" style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 18 }}>Analytics avançado no backlog futuro (cohort/funil)</p>
        <div style={{ marginTop: 16, padding: 48, backgroundColor: '#f9fafb', borderRadius: 8, border: '2px dashed #d1d5db' }}>
          <p style={{ color: '#6b7280', fontSize: 16 }}>📊 Gráfico vazio</p>
        </div>
        <div style={{ marginTop: 16, padding: 16, backgroundColor: '#f9fafb', borderRadius: 8, textAlign: 'left' }}>
          <h3 style={{ marginBottom: 8 }}>Funcionalidades previstas:</h3>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>Análise de cohort</li>
            <li>Funis de conversão</li>
            <li>Retenção de usuários</li>
            <li>Métricas de engajamento</li>
            <li>Dashboard personalizado</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
