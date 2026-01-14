'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Notice {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  isPinned: boolean;
}

const categoryLabels: Record<string, string> = {
  GENERAL: '일반',
  ADMISSION: '입시',
  EVENT: '이벤트',
  INSTRUCTOR: '강사',
};

const categoryColors: Record<string, string> = {
  GENERAL: '#3b82f6',
  ADMISSION: '#ef4444',
  EVENT: '#22c55e',
  INSTRUCTOR: '#f59e0b',
};

export default function NoticeSection() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('/api/notices?limit=5');
        const data = await res.json();
        setNotices(data.notices || []);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      }
      setIsLoading(false);
    };

    fetchNotices();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  if (isLoading || notices.length === 0) {
    return null;
  }

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#f9fafb' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <p style={{
              color: '#ffc50a',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              marginBottom: '8px',
            }}>
              NOTICE
            </p>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#111',
            }}>
              공지사항
            </h2>
          </div>
          <Link
            href="/notice"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              backgroundColor: '#111',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            전체보기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}>
          {notices.map((notice, index) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: index < notices.length - 1 ? '1px solid #f0f0f0' : 'none',
                textDecoration: 'none',
                transition: 'background 0.2s',
                gap: '16px',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              {/* 카테고리 */}
              <span style={{
                padding: '4px 10px',
                backgroundColor: categoryColors[notice.category] + '15',
                color: categoryColors[notice.category],
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                {categoryLabels[notice.category]}
              </span>

              {/* 제목 */}
              <span style={{
                flex: 1,
                fontSize: '15px',
                fontWeight: notice.isPinned ? 600 : 400,
                color: '#111',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                {notice.isPinned && (
                  <span style={{ color: '#ef4444', fontSize: '12px' }}>📌</span>
                )}
                {notice.title}
              </span>

              {/* 날짜 */}
              <span style={{
                fontSize: '13px',
                color: '#999',
                whiteSpace: 'nowrap',
              }}>
                {formatDate(notice.createdAt)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
