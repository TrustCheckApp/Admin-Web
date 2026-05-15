export type StatusTone = 'neutral' | 'warning' | 'danger' | 'success';

const toneClass: Record<StatusTone, string> = {
  neutral: 'border-slate-700 bg-slate-800 text-slate-200',
  warning: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  danger: 'border-red-400/40 bg-red-400/10 text-red-200',
  success: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
};

export function StatusBadge({ children, tone = 'neutral' }: { children: string; tone?: StatusTone }) {
  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClass[tone]}`}>{children}</span>;
}
