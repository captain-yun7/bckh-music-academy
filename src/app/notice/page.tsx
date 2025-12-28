'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

interface Notice {
  id: string;
  title: string;
  category: 'GENERAL' | 'ADMISSION' | 'EVENT' | 'INSTRUCTOR';
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
}

const categories = [
  { key: '', label: '전체' },
  { key: 'GENERAL', label: '일반공지' },
  { key: 'ADMISSION', label: '입시정보' },
  { key: 'EVENT', label: '이벤트' },
  { key: 'INSTRUCTOR', label: '강사소식' },
];

const categoryLabels: Record<string, string> = {
  GENERAL: '공지',
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

function NoticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        let url = `/api/notices?page=${currentPage}&limit=15`;
        if (currentCategory) {
          url += `&category=${currentCategory}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setNotices(data.notices || []);
        setTotalPages(data.totalPages || 1);
      } catch {
        setNotices([]);
      }
      setIsLoading(false);
    };

    fetchNotices();
  }, [currentCategory, currentPage]);

  const handleCategoryChange = (category: string) => {
    if (category) {
      router.push(`/notice?category=${category}`);
    } else {
      router.push('/notice');
    }
  };

  const handlePageChange = (page: number) => {
    let url = `/notice?page=${page}`;
    if (currentCategory) {
      url += `&category=${currentCategory}`;
    }
    router.push(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <SubPageLayout
      title="공지사항"
      subtitle="경희실용음악학원 소식"
    >
      {/* Category Tabs */}
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            gap: '0',
            overflowX: 'auto',
          }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                style={{
                  padding: '20px 32px',
                  backgroundColor: 'transparent',
                  color: currentCategory === cat.key ? '#000' : '#666',
                  border: 'none',
                  borderBottom: currentCategory === cat.key ? '3px solid #000' : '3px solid transparent',
                  fontSize: '16px',
                  fontWeight: currentCategory === cat.key ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Board List */}
      <section style={{ padding: '40px 0 80px', backgroundColor: '#fff' }}>
        <div className="container">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
              로딩중...
            </div>
          ) : notices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
              <p style={{ fontSize: '18px', marginBottom: '8px' }}>등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div style={{ display: 'block' }} className="desktop-table">
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  borderTop: '2px solid #000',
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f8f8' }}>
                      <th style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderBottom: '1px solid #ddd',
                        width: '60px',
                      }}>
                        번호
                      </th>
                      <th style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderBottom: '1px solid #ddd',
                        width: '80px',
                      }}>
                        구분
                      </th>
                      <th style={{
                        padding: '16px 12px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderBottom: '1px solid #ddd',
                      }}>
                        제목
                      </th>
                      <th style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderBottom: '1px solid #ddd',
                        width: '80px',
                      }}>
                        조회
                      </th>
                      <th style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderBottom: '1px solid #ddd',
                        width: '120px',
                      }}>
                        등록일
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map((notice, index) => (
                      <tr
                        key={notice.id}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: notice.isPinned ? '#fffbe6' : 'transparent',
                          transition: 'background-color 0.2s',
                        }}
                        onClick={() => router.push(`/notice/${notice.id}`)}
                        onMouseEnter={(e) => {
                          if (!notice.isPinned) {
                            e.currentTarget.style.backgroundColor = '#fafafa';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!notice.isPinned) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <td style={{
                          padding: '16px 12px',
                          textAlign: 'center',
                          fontSize: '14px',
                          color: '#999',
                          borderBottom: '1px solid #eee',
                        }}>
                          {notice.isPinned ? (
                            <span style={{ color: '#ef4444', fontWeight: 700 }}>📌</span>
                          ) : (
                            notices.length - index
                          )}
                        </td>
                        <td style={{
                          padding: '16px 12px',
                          textAlign: 'center',
                          borderBottom: '1px solid #eee',
                        }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            backgroundColor: categoryColors[notice.category] + '15',
                            color: categoryColors[notice.category],
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}>
                            {categoryLabels[notice.category]}
                          </span>
                        </td>
                        <td style={{
                          padding: '16px 12px',
                          fontSize: '15px',
                          fontWeight: notice.isPinned ? 600 : 500,
                          borderBottom: '1px solid #eee',
                        }}>
                          {notice.title}
                        </td>
                        <td style={{
                          padding: '16px 12px',
                          textAlign: 'center',
                          fontSize: '14px',
                          color: '#999',
                          borderBottom: '1px solid #eee',
                        }}>
                          {notice.viewCount}
                        </td>
                        <td style={{
                          padding: '16px 12px',
                          textAlign: 'center',
                          fontSize: '13px',
                          color: '#999',
                          borderBottom: '1px solid #eee',
                        }}>
                          {formatDate(notice.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List */}
              <div style={{ display: 'none' }} className="mobile-list">
                {notices.map((notice) => (
                  <Link
                    key={notice.id}
                    href={`/notice/${notice.id}`}
                    style={{
                      display: 'block',
                      padding: '16px',
                      borderBottom: '1px solid #eee',
                      backgroundColor: notice.isPinned ? '#fffbe6' : 'transparent',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      {notice.isPinned && (
                        <span style={{ fontSize: '12px' }}>📌</span>
                      )}
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: categoryColors[notice.category] + '15',
                        color: categoryColors[notice.category],
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                      }}>
                        {categoryLabels[notice.category]}
                      </span>
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: notice.isPinned ? 600 : 500, marginBottom: '8px', color: '#000' }}>
                      {notice.title}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#999' }}>
                      <span>{formatDate(notice.createdAt)}</span>
                      <span>조회 {notice.viewCount}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '4px',
                  marginTop: '40px',
                }}>
                  {currentPage > 1 && (
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      이전
                    </button>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: page === currentPage ? '#000' : '#fff',
                        color: page === currentPage ? '#fff' : '#333',
                        border: page === currentPage ? '1px solid #000' : '1px solid #ddd',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: page === currentPage ? 600 : 400,
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      다음
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-table {
            display: none !important;
          }
          .mobile-list {
            display: block !important;
          }
        }
      `}</style>
    </SubPageLayout>
  );
}

export default function NoticePage() {
  return (
    <Suspense fallback={
      <SubPageLayout
        title="공지사항"
        subtitle="경희실용음악학원 소식"
      >
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
          로딩중...
        </div>
      </SubPageLayout>
    }>
      <NoticeContent />
    </Suspense>
  );
}
