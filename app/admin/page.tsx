import { AdminShell } from '../../components/admin/AdminShell';
import { MetricCard } from '../../components/admin/MetricCard';
import { StatusBadge } from '../../components/admin/StatusBadge';

const adminDashboardMock = {
  metrics: [
    { label: 'Casos em moderação', value: '18', helper: 'Itens aguardando revisão inicial da equipe admin.' },
    { label: 'Empresas pendentes', value: '7', helper: 'Claims empresariais que exigem validação operacional.' },
    { label: 'Casos em negociação', value: '24', helper: 'Casos com tratativa ativa entre consumidor e empresa.' },
    { label: 'Tempo médio de resposta', value: '9h', helper: 'Média demonstrativa para priorização de SLA.' },
  ],
  queues: [
    { title: 'Fila de moderação', description: 'Casos novos aguardando triagem.', tone: 'warning' as const },
    { title: 'Claims empresariais', description: 'Empresas aguardando aprovação de titularidade.', tone: 'neutral' as const },
    { title: 'Casos críticos', description: 'Casos com risco reputacional ou SLA próximo.', tone: 'danger' as const },
    { title: 'Alertas de SLA', description: 'Sinais operacionais para priorização do time.', tone: 'success' as const },
  ],
};

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Dashboard Global"
      description="Visão fundacional do backoffice TrustCheck para acompanhar operação, moderação, empresas pendentes e sinais de SLA sem expor dados pessoais reais."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminDashboardMock.metrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} helper={metric.helper} />
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Filas operacionais</h2>
            <p className="mt-1 text-sm text-slate-300">Dados demonstrativos até existir endpoint agregado do Admin na API.</p>
          </div>
          <StatusBadge tone="warning">dados demonstrativos</StatusBadge>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {adminDashboardMock.queues.map((queue) => (
            <article key={queue.title} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-white">{queue.title}</h3>
                <StatusBadge tone={queue.tone}>priorizar</StatusBadge>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{queue.description}</p>
            </article>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
