import { AdminShell } from '../../../components/admin/AdminShell';
import { MetricCard } from '../../../components/admin/MetricCard';
import { ModerationQueue } from '../../../components/admin/ModerationQueue';

const moderationMetrics = [
  { label: 'Casos pendentes', value: '18', helper: 'Itens aguardando triagem ou decisão da equipe admin.' },
  { label: 'Risco reputacional', value: '5', helper: 'Casos com sinais de criticidade para revisão prioritária.' },
  { label: 'SLA', value: '4h', helper: 'Menor janela demonstrativa restante na fila atual.' },
];

export default function ModeracaoPage() {
  return (
    <AdminShell
      title="Fila de Moderação"
      description="W03 padronizada no shell administrativo para priorizar casos pendentes, risco reputacional e SLA sem expor dados pessoais ou evidências privadas."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {moderationMetrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} helper={metric.helper} />
        ))}
      </section>

      <ModerationQueue />
    </AdminShell>
  );
}
