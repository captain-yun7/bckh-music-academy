'use client';

import { useState, useEffect } from 'react';

interface Admission {
  id: string;
  studentName: string;
  university: string;
  department: string;
  year: number;
  major: string | null;
  isEarlyAdmission: boolean;
  photoUrl: string | null;
  testimonial: string | null;
  order: number;
  isPublished: boolean;
  createdAt: string;
}

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmission, setEditingAdmission] = useState<Admission | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    studentName: '',
    university: '',
    department: '',
    year: new Date().getFullYear(),
    major: '',
    isEarlyAdmission: false,
    isPublished: true,
  });

  const currentYear = new Date().getFullYear();

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchAdmissions();
    fetchAvailableYears();
  }, [selectedYear]);

  const fetchAvailableYears = async () => {
    try {
      // 모든 연도를 가져오기 위해 limit을 크게 설정
      const res = await fetch('/api/admin/admissions?limit=1000');
      const data = await res.json();
      const years = Array.from(new Set(data.admissions.map((a: Admission) => a.year)))
        .sort((a, b) => b - a) as number[];
      setAvailableYears(years);
    } catch (error) {
      console.error('Failed to fetch available years:', error);
    }
  };

  const fetchAdmissions = async () => {
    setIsLoading(true);
    const url = selectedYear
      ? `/api/admin/admissions?year=${selectedYear}&limit=1000`
      : '/api/admin/admissions?limit=1000';
    const res = await fetch(url);
    const data = await res.json();
    setAdmissions(data.admissions || []);
    setIsLoading(false);
  };

  const openModal = (admission?: Admission) => {
    if (admission) {
      setEditingAdmission(admission);
      setFormData({
        studentName: admission.studentName,
        university: admission.university,
        department: admission.department,
        year: admission.year,
        major: admission.major || '',
        isEarlyAdmission: admission.isEarlyAdmission,
        isPublished: admission.isPublished,
      });
    } else {
      setEditingAdmission(null);
      setFormData({
        studentName: '',
        university: '',
        department: '',
        year: new Date().getFullYear(),
        major: '',
        isEarlyAdmission: false,
        isPublished: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAdmission(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingAdmission
      ? `/api/admin/admissions/${editingAdmission.id}`
      : '/api/admin/admissions';
    const method = editingAdmission ? 'PATCH' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    closeModal();
    fetchAdmissions();
    fetchAvailableYears();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await fetch(`/api/admin/admissions/${id}`, { method: 'DELETE' });
    fetchAdmissions();
    fetchAvailableYears();
  };

  // Drag and drop handlers
  const handleReorder = async (reorderedItems: Admission[]) => {
    const previousAdmissions = [...admissions];
    setAdmissions(reorderedItems);

    try {
      const res = await fetch('/api/admin/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'admission',
          items: reorderedItems.map((item) => ({ id: item.id, order: item.order })),
        }),
      });

      if (!res.ok) {
        throw new Error('순서 변경 실패');
      }
    } catch (error) {
      console.error('Reorder failed:', error);
      setAdmissions(previousAdmissions);
      alert('순서 변경에 실패했습니다.');
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const sortedAdmissions = [...admissions].sort((a, b) => a.order - b.order);
    const newItems = [...sortedAdmissions];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    const reorderedItems = newItems.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    handleReorder(reorderedItems);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>로딩중...</div>;
  }

  const sortedAdmissions = [...admissions].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111' }}>합격자 명단</h1>
          <span style={{ fontSize: '12px', color: '#999' }}>(드래그하여 순서 변경)</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: '10px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="">전체 연도</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
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
            + 합격자 추가
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'center', padding: '14px 8px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '48px' }}></th>
              <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>이름</th>
              <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>대학</th>
              <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>학과</th>
              <th style={{ textAlign: 'center', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '80px' }}>연도</th>
              <th style={{ textAlign: 'center', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '80px' }}>전형</th>
              <th style={{ textAlign: 'center', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '80px' }}>상태</th>
              <th style={{ textAlign: 'center', padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', width: '160px' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {sortedAdmissions.map((admission, index) => (
              <tr
                key={admission.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  borderBottom: '1px solid #f3f4f6',
                  cursor: 'grab',
                  backgroundColor: dragOverIndex === index ? '#f0f7ff' : draggedIndex === index ? '#f9fafb' : 'transparent',
                  opacity: draggedIndex === index ? 0.5 : 1,
                  transition: 'background-color 0.15s',
                }}
              >
                <td style={{ padding: '14px 8px', textAlign: 'center', color: '#9ca3af' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="6" r="1.5" />
                    <circle cx="15" cy="6" r="1.5" />
                    <circle cx="9" cy="12" r="1.5" />
                    <circle cx="15" cy="12" r="1.5" />
                    <circle cx="9" cy="18" r="1.5" />
                    <circle cx="15" cy="18" r="1.5" />
                  </svg>
                </td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#111' }}>{admission.studentName}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#374151' }}>{admission.university}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#374151' }}>{admission.department}</td>
                <td style={{ padding: '14px 16px', textAlign: 'center', fontSize: '14px', color: '#374151' }}>{admission.year}</td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    backgroundColor: admission.isEarlyAdmission ? '#ffc50a' : '#111',
                    color: admission.isEarlyAdmission ? '#111' : '#fff',
                  }}>
                    {admission.isEarlyAdmission ? '수시' : '정시'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    backgroundColor: admission.isPublished ? '#111' : '#e5e7eb',
                    color: admission.isPublished ? '#fff' : '#6b7280',
                  }}>
                    {admission.isPublished ? '공개' : '비공개'}
                  </span>
                </td>
                <td draggable={false} onDragStart={(e) => e.stopPropagation()} style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', whiteSpace: 'nowrap' }}>
                    <button
                      draggable={false}
                      onClick={() => openModal(admission)}
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
                      draggable={false}
                      onClick={() => handleDelete(admission.id)}
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
        {admissions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>
            등록된 합격자가 없습니다.
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
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#111' }}>
              {editingAdmission ? '합격자 수정' : '합격자 추가'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                    학생 이름 *
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    required
                    placeholder="김지원 또는 김*원"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
                    * 풀네임 입력 시 사용자 화면에서 자동 마스킹 (예: 김지원 → 김*원)
                  </p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                    합격 연도 *
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || currentYear })}
                    required
                    min="2000"
                    max="2099"
                    placeholder="2026"
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
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                  대학 *
                </label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  required
                  placeholder="서울대학교"
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
                  학과 *
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                  placeholder="실용음악과"
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
                  전공
                </label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  placeholder="보컬"
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

              <div style={{ marginBottom: '24px', display: 'flex', gap: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isEarlyAdmission}
                    onChange={(e) => setFormData({ ...formData, isEarlyAdmission: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#111' }}
                  />
                  <span style={{ fontSize: '14px', color: '#374151' }}>수시 전형</span>
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
                  {editingAdmission ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
