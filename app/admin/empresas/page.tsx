'use client';

export default function EmpresasPage() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1>Empresas (W05)</h1>

      <div className="card" style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 18, marginBottom: 16 }}>Endpoint GET /admin/companies previsto na Sprint 03</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>Nome</th>
              <th style={{ padding: 12 }}>CNPJ</th>
              <th style={{ padding: 12 }}>Status</th>
              <th style={{ padding: 12 }}>Trust Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>
                Nenhuma empresa cadastrada ainda
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button disabled style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}>
            Buscar
          </button>
          <button disabled style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}>
            Filtrar
          </button>
        </div>
      </div>
    </div>
  );
}
