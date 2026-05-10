'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Usuários', href: '/admin/usuarios', icon: '👥' },
  { label: 'Empresas', href: '/admin/empresas', icon: '🏢' },
  { label: 'Casos', href: '/admin/casos', icon: '📋' },
  { label: 'Moderação', href: '/admin/moderacao', icon: '⚖️' },
  { label: 'Academy', href: '/admin/academy', icon: '🎓' },
  { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { label: 'Configurações', href: '/admin/configuracoes', icon: '⚙️' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: 250, backgroundColor: '#1f2937', color: '#fff', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>TrustCheck Admin</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 12,
                    borderRadius: 8,
                    textDecoration: 'none',
                    color: isActive ? '#fff' : '#9ca3af',
                    backgroundColor: isActive ? '#374151' : 'transparent',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
