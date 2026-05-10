'use client';

export default function ConfiguracoesPage() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1>Configurações (W10)</h1>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <h3>Regras de Moderação</h3>
          <p style={{ color: '#6b7280' }}>Em desenvolvimento</p>
          <div style={{ marginTop: 8, padding: 16, backgroundColor: '#f9fafb', borderRadius: 8 }}>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>Configuração de categorias</li>
              <li>Regras de aprovação automática</li>
              <li>Limites de tempo para resposta</li>
              <li>Notificações</li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h3>Integrações</h3>
          <p style={{ color: '#6b7280' }}>Em desenvolvimento</p>
          <div style={{ marginTop: 8, padding: 16, backgroundColor: '#f9fafb', borderRadius: 8 }}>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>Integração com CRM</li>
              <li>Webhooks</li>
              <li>API Keys</li>
              <li>Serviços de notificação</li>
            </ul>
          </div>
        </div>

        <div>
          <h3>Branding</h3>
          <p style={{ color: '#6b7280' }}>Em desenvolvimento</p>
          <div style={{ marginTop: 8, padding: 16, backgroundColor: '#f9fafb', borderRadius: 8 }}>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>Logo e cores</li>
              <li>Texto de rodapé</li>
              <li>Emails transacionais</li>
              <li>Página de login customizada</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
