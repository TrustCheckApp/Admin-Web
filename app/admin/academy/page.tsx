'use client';

export default function AcademyPage() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1>Academy (W08)</h1>

      <div className="card" style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 18 }}>Gestão de conteúdo Academy planejada para Sprint 03</p>
        <div style={{ marginTop: 16, padding: 16, backgroundColor: '#f9fafb', borderRadius: 8, textAlign: 'left' }}>
          <h3 style={{ marginBottom: 8 }}>Funcionalidades previstas:</h3>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>Criação e edição de artigos</li>
            <li>Gestão de categorias</li>
            <li>Upload de mídia</li>
            <li>Publicação e agendamento</li>
            <li>Análise de engajamento</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
