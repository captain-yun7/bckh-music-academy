'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Musician {
  id: string;
  name: string;
  role: string;
  achievement: string | null;
  image: string | null;
  snsUrl: string | null;
  isPublished: boolean;
  order: number;
}

export default function MusiciansPage() {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMusician, setEditingMusician] = useState<Musician | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    achievement: '',
    image: '',
    snsUrl: '',
    isPublished: true,
    order: 0,
  });

  useEffect(() => {
    fetchMusicians();
  }, []);

  const fetchMusicians = async () => {
    setIsLoading(true);
    const res = await fetch('/api/admin/musicians');
    const data = await res.json();
    setMusicians(data);
    setIsLoading(false);
  };

  const openModal = (musician?: Musician) => {
    if (musician) {
      setEditingMusician(musician);
      setFormData({
        name: musician.name,
        role: musician.role,
        achievement: musician.achievement || '',
        image: musician.image || '',
        snsUrl: musician.snsUrl || '',
        isPublished: musician.isPublished,
        order: musician.order,
      });
    } else {
      setEditingMusician(null);
      setFormData({
        name: '',
        role: '',
        achievement: '',
        image: '',
        snsUrl: '',
        isPublished: true,
        order: 0,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMusician(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingMusician
      ? `/api/admin/musicians/${editingMusician.id}`
      : '/api/admin/musicians';
    const method = editingMusician ? 'PATCH' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    closeModal();
    fetchMusicians();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await fetch(`/api/admin/musicians/${id}`, { method: 'DELETE' });
    fetchMusicians();
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>로딩중...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>배출 뮤지션 관리</h1>
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
          + 뮤지션 추가
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {musicians.map((musician) => (
          <div
            key={musician.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: '#f5f5f5' }}>
              {musician.image ? (
                <Image
                  src={musician.image}
                  alt={musician.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '48px',
                }}>
                  🎤
                </div>
              )}
              {!musician.isPublished && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                }}>
                  비공개
                </div>
              )}
            </div>
            <div style={{ padding: '16px' }}>
              <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                {musician.name}
              </p>
              <p style={{ fontSize: '14px', color: '#3b82f6', marginBottom: '8px' }}>
                {musician.role}
              </p>
              {musician.achievement && (
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                  {musician.achievement}
                </p>
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => openModal(musician)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#f5f5f5',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(musician.id)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {musicians.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          backgroundColor: '#fff',
          borderRadius: '12px',
        }}>
          <p style={{ color: '#999', marginBottom: '16px' }}>등록된 뮤지션이 없습니다.</p>
          <button
            onClick={() => openModal()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            첫 뮤지션 등록하기
          </button>
        </div>
      )}

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
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
              {editingMusician ? '뮤지션 수정' : '뮤지션 추가'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  이름 *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  역할/직업 *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  placeholder="싱어송라이터, 프로듀서 등"
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
                  주요 활동/성과
                </label>
                <textarea
                  value={formData.achievement}
                  onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                  rows={3}
                  placeholder="음원 발매, 앨범 참여 등"
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

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  프로필 이미지 URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/pride/example.jpg"
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
                  SNS 링크
                </label>
                <input
                  type="text"
                  value={formData.snsUrl}
                  onChange={(e) => setFormData({ ...formData, snsUrl: e.target.value })}
                  placeholder="https://instagram.com/..."
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

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                  <span style={{ fontSize: '14px' }}>공개 (사이트에 표시)</span>
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
                  {editingMusician ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
