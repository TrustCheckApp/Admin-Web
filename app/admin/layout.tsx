'use client';

import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/auth/login');
    }
  }

  function getBreadcrumb() {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumb = segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { href, label };
    });
    return breadcrumb;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {getBreadcrumb().map((item, index) => (
              <span key={item.href} style={{ color: index === getBreadcrumb().length - 1 ? '#111827' : '#6b7280' }}>
                {index > 0 && <span style={{ margin: '0 8px', color: '#9ca3af' }}>›</span>}
                {item.label}
              </span>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span>Admin Logado</span>
            <button
              onClick={handleLogout}
              style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer' }}
            >
              Sair
            </button>
          </div>
        </header>
        <main style={{ flex: 1, padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}
