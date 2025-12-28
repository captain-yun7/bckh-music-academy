'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'GENERAL' | 'ADMISSION' | 'EVENT' | 'INSTRUCTOR';
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

const categoryLabels: Record<string, string> = {
  GENERAL: '일반공지',
  ADMISSION: '입시정보',
  EVENT: '이벤트',
  INSTRUCTOR: '강사소식',
};

const categoryColors: Record<string, string> = {
  GENERAL: '#3b82f6',
  ADMISSION: '#ef4444',
  EVENT: '#22c55e',
  INSTRUCTOR: '#f59e0b',
};

export default function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/notices/${id}`);
        if (!res.ok) {
          throw new Error('공지사항을 찾을 수 없습니다.');
        }
        const data = await res.json();
        setNotice(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
      }
      setIsLoading(false);
    };

    fetchNotice();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <SubPageLayout
        title="공지사항"
        subtitle="경희실용음악학원 소식"
      >
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
          로딩중...
        </div>
      </SubPageLayout>
    );
  }

  if (error || !notice) {
    return (
      <SubPageLayout
        title="공지사항"
        subtitle="경희실용음악학원 소식"
      >
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ fontSize: '18px', color: '#999', marginBottom: '24px' }}>
            {error || '공지사항을 찾을 수 없습니다.'}
          </p>
          <Link
            href="/notice"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            목록으로
          </Link>
        </div>
      </SubPageLayout>
    );
  }

  return (
    <SubPageLayout
      title="공지사항"
      subtitle="경희실용음악학원 소식"
    >
      <section style={{ padding: '40px 0 80px', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Header */}
          <div style={{
            borderTop: '2px solid #000',
            borderBottom: '1px solid #eee',
            padding: '32px 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              {notice.isPinned && (
                <span style={{ fontSize: '14px' }}>📌</span>
              )}
              <span style={{
                padding: '4px 10px',
                backgroundColor: categoryColors[notice.category] + '15',
                color: categoryColors[notice.category],
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: 600,
              }}>
                {categoryLabels[notice.category]}
              </span>
            </div>
            <h1 style={{
              fontSize: '26px',
              fontWeight: 700,
              color: '#000',
              marginBottom: '16px',
              lineHeight: 1.4,
            }}>
              {notice.title}
            </h1>
            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#999' }}>
              <span>{formatDate(notice.createdAt)}</span>
              <span>조회 {notice.viewCount}</span>
            </div>
          </div>

          {/* Content */}
          <div style={{
            padding: '40px 0',
            minHeight: '300px',
            borderBottom: '1px solid #eee',
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#333',
              whiteSpace: 'pre-wrap',
            }}>
              {notice.content}
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '40px',
          }}>
            <Link
              href="/notice"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              목록으로
            </Link>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
