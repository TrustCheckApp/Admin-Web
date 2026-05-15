const navItems = [
  { label: 'Dashboard', href: '/admin', status: 'ativo' },
  { label: 'Moderação', href: '/admin/moderacao', status: 'parcial' },
  { label: 'Usuários', href: '/admin/usuarios', status: 'em breve' },
  { label: 'Empresas', href: '/admin/empresas', status: 'em breve' },
  { label: 'Conteúdo', href: '/admin/conteudo', status: 'em breve' },
  { label: 'Casos', href: '/admin/casos', status: 'em breve' },
  { label: 'Academy', href: '/admin/academy', status: 'em breve' },
  { label: 'Analytics', href: '/admin/analytics', status: 'em breve' },
  { label: 'Configurações', href: '/admin/configuracoes', status: 'em breve' },
];

export function AdminNav() {
  return (
    <nav className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg" aria-label="Navegação administrativa">
      <div className="mb-5 rounded-xl bg-cyan-400/10 p-4">
        <p className="text-sm font-semibold text-cyan-200">TrustCheck</p>
        <p className="mt-1 text-xs text-slate-300">Backoffice operacional</p>
      </div>

      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-white"
              href={item.href}
            >
              <span>{item.label}</span>
              <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-400">
                {item.status}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
