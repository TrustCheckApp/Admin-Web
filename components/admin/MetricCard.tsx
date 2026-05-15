export type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
      <p className="text-sm text-slate-400">{label}</p>
      <strong className="mt-3 block text-3xl font-bold text-white">{value}</strong>
      <p className="mt-3 text-sm leading-5 text-slate-300">{helper}</p>
    </article>
  );
}
