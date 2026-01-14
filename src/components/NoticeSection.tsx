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
    <section
      style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #fafafa 0%, #fff 100%)',
      }}
    >
      <div className="container">
        {/* 헤더 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <p
              style={{
                color: '#ffc50a',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                marginBottom: '12px',
                textTransform: 'uppercase',
              }}
            >
              Notice
            </p>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 800,
                color: '#111',
                lineHeight: 1.2,
              }}
            >
              공지사항
            </h2>
          </div>
          <Link
            href="/notice"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #111 0%, #333 100%)',
              color: '#fff',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            전체보기
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* 공지 리스트 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {notices.map((notice, index) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '24px 28px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #f0f0f0',
                gap: '20px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#ffc50a';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#f0f0f0';
              }}
            >
              {/* 번호 */}
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: notice.isPinned ? '#ffc50a' : '#f5f5f5',
                  color: notice.isPinned ? '#111' : '#999',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {notice.isPinned ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 4h2v16l-8-4-8 4V4h2v13.5l6-3 6 3V4z" />
                  </svg>
                ) : (
                  String(index + 1).padStart(2, '0')
                )}
              </span>

              {/* 카테고리 */}
              <span
                style={{
                  padding: '6px 14px',
                  backgroundColor: categoryColors[notice.category] + '12',
                  color: categoryColors[notice.category],
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {categoryLabels[notice.category]}
              </span>

              {/* 제목 */}
              <span
                style={{
                  flex: 1,
                  fontSize: '16px',
                  fontWeight: notice.isPinned ? 700 : 500,
                  color: '#222',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {notice.title}
              </span>

              {/* 날짜 */}
              <span
                style={{
                  fontSize: '14px',
                  color: '#aaa',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {formatDate(notice.createdAt)}
              </span>

              {/* 화살표 */}
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
