'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { name: '대시보드', href: '/admin', icon: '📊' },
  { name: '강사 관리', href: '/admin/instructors', icon: '👨‍🏫' },
  { name: '공지사항', href: '/admin/notices', icon: '📢' },
  { name: '합격자 명단', href: '/admin/admissions', icon: '🎓' },
  { name: '배출 뮤지션', href: '/admin/musicians', icon: '🎤' },
  { name: '상담 신청', href: '/admin/consultations', icon: '📞' },
  { name: '갤러리', href: '/admin/gallery', icon: '🖼️' },
  { name: '영상 관리', href: '/admin/videos', icon: '🎬' },
  { name: '설정', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminName, setAdminName] = useState('관리자');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.admin?.name) {
          setAdminName(data.admin.name);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: isSidebarOpen ? '260px' : '0',
          backgroundColor: '#1a1a1a',
          transition: 'width 0.3s',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div style={{ padding: '24px', borderBottom: '1px solid #333' }}>
          <h1 style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>
            경희실용음악학원
          </h1>
          <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>
            관리자 시스템
          </p>
        </div>

        <nav style={{ padding: '16px 0' }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  color: isActive ? '#fff' : '#999',
                  backgroundColor: isActive ? '#333' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '14px',
                  borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '260px',
          padding: '16px 24px',
          borderTop: '1px solid #333',
        }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'block',
              color: '#888',
              fontSize: '13px',
              textDecoration: 'none',
              marginBottom: '12px',
            }}
          >
            🌐 사이트 보기
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: '#fff',
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
          }}
        >
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            ☰
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {adminName}님
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f5f5f5',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              로그아웃
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
