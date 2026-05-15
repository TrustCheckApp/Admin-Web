export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">TrustCheck Admin</p>
        <h1 className="mt-4 text-3xl font-bold text-white">Backoffice TrustCheck</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Acesse o login administrativo ou abra o dashboard fundacional para validar navegação, moderação e próximos módulos do Admin-Web.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950" href="/auth/login">
            Login Admin
          </a>
          <a className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100" href="/admin">
            Dashboard Global
          </a>
        </div>
      </section>
    </main>
  );
}
