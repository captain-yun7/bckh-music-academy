'use client';

import { useState, useEffect } from 'react';

interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
}

const categoryLabels: Record<string, string> = {
  GENERAL: '일반',
  ADMISSION: '입시',
  EVENT: '이벤트',
  INSTRUCTOR: '강사 소식',
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  GENERAL: { bg: '#e5e7eb', text: '#374151' },
  ADMISSION: { bg: '#111', text: '#fff' },
  EVENT: { bg: '#ffc50a', text: '#111' },
  INSTRUCTOR: { bg: '#ffc50a', text: '#111' },
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'GENERAL',
    isPinned: false,
    isPublished: true,
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    const res = await fetch('/api/admin/notices');
    const data = await res.json();
    setNotices(data.notices || []);
    setIsLoading(false);
  };

  const openModal = (notice?: Notice) => {
    if (notice) {
      setEditingNotice(notice);
      setFormData({
        title: notice.title,
        content: notice.content,
        category: notice.category,
        isPinned: notice.isPinned,
        isPublished: notice.isPublished,
      });
    } else {
      setEditingNotice(null);
      setFormData({
        title: '',
        content: '',
        category: 'GENERAL',
        isPinned: false,
        isPublished: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNotice(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingNotice
      ? `/api/admin/notices/${editingNotice.id}`
      : '/api/admin/notices';
    const method = editingNotice ? 'PATCH' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    closeModal();
    fetchNotices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await fetch(`/api/admin/notices/${id}`, { method: 'DELETE' });
    fetchNotices();
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>로딩중...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111' }}>공지사항 관리</h1>
        <button
          onClick={() => openModal()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          + 공지 작성
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>제목</th>
              <th style={{ textAlign: 'center', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '100px' }}>카테고리</th>
              <th style={{ textAlign: 'center', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '80px' }}>조회수</th>
              <th style={{ textAlign: 'center', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '80px' }}>상태</th>
              <th style={{ textAlign: 'center', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '120px' }}>작성일</th>
              <th style={{ textAlign: 'center', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '140px' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#111' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {notice.isPinned && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#dc2626" stroke="#dc2626" strokeWidth="2">
                        <path d="M12 2L12 12M12 12L8 8M12 12L16 8M12 22L12 12" transform="rotate(45 12 12)" />
                        <circle cx="12" cy="5" r="3" />
                      </svg>
                    )}
                    <span>{notice.title}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    backgroundColor: categoryColors[notice.category]?.bg || '#e5e7eb',
                    color: categoryColors[notice.category]?.text || '#374151',
                  }}>
                    {categoryLabels[notice.category]}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center', fontSize: '14px', color: '#374151' }}>
                  {notice.viewCount}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    backgroundColor: notice.isPublished ? '#111' : '#e5e7eb',
                    color: notice.isPublished ? '#fff' : '#6b7280',
                  }}>
                    {notice.isPublished ? '공개' : '비공개'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center', fontSize: '14px', color: '#374151', whiteSpace: 'nowrap' }}>
                  {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => openModal(notice)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#fff',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#374151',
                        cursor: 'pointer',
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#fff',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {notices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>
            등록된 공지사항이 없습니다.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '32px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#111' }}>
              {editingNotice ? '공지사항 수정' : '공지사항 작성'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                  카테고리
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                  내용 *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={10}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px', display: 'flex', gap: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#111' }}
                  />
                  <span style={{ fontSize: '14px', color: '#374151' }}>상단 고정</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#111' }}
                  />
                  <span style={{ fontSize: '14px', color: '#374151' }}>공개</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#fff',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {editingNotice ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
