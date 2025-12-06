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

const categoryColors: Record<string, string> = {
  GENERAL: '#6b7280',
  ADMISSION: '#3b82f6',
  EVENT: '#22c55e',
  INSTRUCTOR: '#f59e0b',
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
    return <div style={{ textAlign: 'center', padding: '60px' }}>로딩중...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>공지사항 관리</h1>
        <button
          onClick={() => openModal()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#000',
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

      <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666' }}>제목</th>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '100px' }}>카테고리</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '80px' }}>조회수</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '80px' }}>상태</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '120px' }}>작성일</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '120px' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {notice.isPinned && <span style={{ color: '#ef4444' }}>📌</span>}
                    <span style={{ fontSize: '14px' }}>{notice.title}</span>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                    backgroundColor: `${categoryColors[notice.category]}20`,
                    color: categoryColors[notice.category],
                  }}>
                    {categoryLabels[notice.category]}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                  {notice.viewCount}
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                    backgroundColor: notice.isPublished ? '#dcfce7' : '#f3f4f6',
                    color: notice.isPublished ? '#16a34a' : '#6b7280',
                  }}>
                    {notice.isPublished ? '공개' : '비공개'}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                  {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <button
                    onClick={() => openModal(notice)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#f5f5f5',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginRight: '8px',
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#fef2f2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {notices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
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
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
              {editingNotice ? '공지사항 수정' : '공지사항 작성'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
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
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  카테고리
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
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
                    border: '1px solid #ddd',
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
                  />
                  <span style={{ fontSize: '14px' }}>상단 고정</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                  <span style={{ fontSize: '14px' }}>공개</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#f5f5f5',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
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
                    backgroundColor: '#000',
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
