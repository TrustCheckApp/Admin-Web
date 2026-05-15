import { redirect } from 'next/navigation';
import { loginAdminAction } from './actions';

export default function LoginAdminPage({ searchParams }: { searchParams?: { next?: string } }) {
  const next = searchParams?.next && searchParams.next.startsWith('/') && !searchParams.next.startsWith('//') ? searchParams.next : '/admin';

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">TrustCheck Admin</p>
        <h1 className="mt-4 text-3xl font-bold text-white">Login Admin</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Acesso administrativo protegido por sessão via cookie HttpOnly. A integração real com API e 2FA segue pendente.
        </p>

        <form action={loginAdminAction} className="mt-6 grid gap-4">
          <input name="next" type="hidden" value={next} />
          <label className="grid gap-2 text-sm text-slate-300">
            E-mail
            <input
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-300"
              name="email"
              placeholder="admin@trustcheck.local"
              type="email"
              required
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Senha
            <input
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-300"
              name="password"
              placeholder="Senha administrativa"
              type="password"
              required
            />
          </label>
          <button className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950" type="submit">
            Entrar
          </button>
        </form>

        <form action={async () => { 'use server'; redirect('/'); }} className="mt-3">
          <button className="text-sm text-slate-400 underline" type="submit">Voltar</button>
        </form>
      </section>
    </main>
  );
}
