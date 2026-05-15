import { StatusBadge } from './StatusBadge';

const moderationItems = [
  {
    publicId: 'TC-2026-000123',
    category: 'Entrega não realizada',
    status: 'Aguardando triagem',
    sla: '4h restantes',
    risk: 'Risco reputacional alto',
    summary: 'Caso com alto volume de interações e necessidade de revisão de linguagem pública.',
  },
  {
    publicId: 'TC-2026-000124',
    category: 'Cobrança indevida',
    status: 'Em revisão',
    sla: '12h restantes',
    risk: 'Risco médio',
    summary: 'Requer validação de categoria, evidência anexada e aderência aos termos de uso.',
  },
  {
    publicId: 'TC-2026-000125',
    category: 'Atendimento',
    status: 'Pendente de decisão',
    sla: '1d restante',
    risk: 'Risco baixo',
    summary: 'Conteúdo aparentemente elegível para publicação após revisão final.',
  },
];

export function ModerationQueue() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Casos pendentes de moderação</h2>
          <p className="mt-1 text-sm text-slate-300">
            Fila demonstrativa com dados minimizados. Não exibe documentos, evidências privadas ou dados pessoais.
          </p>
        </div>
        <StatusBadge tone="warning">dados demonstrativos</StatusBadge>
      </div>

      <div className="mt-5 space-y-4">
        {moderationItems.map((item) => (
          <article key={item.publicId} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <strong className="text-sm text-cyan-200">{item.publicId}</strong>
                  <StatusBadge tone={item.risk.includes('alto') ? 'danger' : item.risk.includes('médio') ? 'warning' : 'neutral'}>
                    {item.risk}
                  </StatusBadge>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.category}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{item.summary}</p>
              </div>

              <div className="flex flex-col gap-2 text-sm text-slate-300 lg:min-w-48">
                <span>Status: {item.status}</span>
                <span>SLA: {item.sla}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-100" type="button">
                Ver detalhes
              </button>
              <button className="rounded-xl bg-emerald-300 px-3 py-2 text-sm font-semibold text-slate-950" type="button">
                Aprovar
              </button>
              <button className="rounded-xl bg-red-300 px-3 py-2 text-sm font-semibold text-slate-950" type="button">
                Rejeitar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
