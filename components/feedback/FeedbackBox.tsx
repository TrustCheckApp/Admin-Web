import { tokens } from '@/lib/tokens';

export function FeedbackBox({ type, message }: { type: 'loading' | 'error' | 'success' | 'empty'; message: string }) {
  const color = type === 'error' ? tokens.colors.danger : type === 'success' ? tokens.colors.success : type === 'empty' ? tokens.colors.muted : tokens.colors.primary;
  return (
    <div style={{ background: tokens.colors.card, borderRadius: 10, padding: 12 }}>
      <strong style={{ color }}>{type.toUpperCase()}</strong>
      <p style={{ margin: '6px 0 0', color: tokens.colors.text }}>{message}</p>
    </div>
  );
}
