import type { ReactNode } from 'react';
import { AdminNav } from './AdminNav';

export type AdminShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function AdminShell({ title, description, children }: AdminShellProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:px-6">
        <aside className="md:w-72">
          <AdminNav />
        </aside>

        <section className="flex-1 space-y-6">
          <header className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">TrustCheck Admin</p>
            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
                {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{description}</p> : null}
              </div>
              <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-medium text-amber-200">
                Ambiente administrativo · dados demonstrativos
              </span>
            </div>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}
