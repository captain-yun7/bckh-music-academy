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
  isPublished: boolean;
  createdAt: string;
}

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmission, setEditingAdmission] = useState<Admission | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [formData, setFormData] = useState({
    studentName: '',
    university: '',
    department: '',
    year: new Date().getFullYear(),
    major: '',
    isEarlyAdmission: false,
    photoUrl: '',
    testimonial: '',
    isPublished: true,
  });

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    fetchAdmissions();
  }, [selectedYear]);

  const fetchAdmissions = async () => {
    setIsLoading(true);
    const url = selectedYear
      ? `/api/admin/admissions?year=${selectedYear}`
      : '/api/admin/admissions';
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
        photoUrl: admission.photoUrl || '',
        testimonial: admission.testimonial || '',
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
        photoUrl: '',
        testimonial: '',
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
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await fetch(`/api/admin/admissions/${id}`, { method: 'DELETE' });
    fetchAdmissions();
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>로딩중...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>합격자 명단</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            <option value="">전체 연도</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
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
            + 합격자 추가
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666' }}>이름</th>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666' }}>대학</th>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666' }}>학과</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '80px' }}>연도</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '80px' }}>전형</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '80px' }}>상태</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '120px' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((admission) => (
              <tr key={admission.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '16px', fontSize: '14px' }}>{admission.studentName}</td>
                <td style={{ padding: '16px', fontSize: '14px' }}>{admission.university}</td>
                <td style={{ padding: '16px', fontSize: '14px' }}>{admission.department}</td>
                <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>{admission.year}</td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                    backgroundColor: admission.isEarlyAdmission ? '#dbeafe' : '#fef3c7',
                    color: admission.isEarlyAdmission ? '#1d4ed8' : '#b45309',
                  }}>
                    {admission.isEarlyAdmission ? '수시' : '정시'}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                    backgroundColor: admission.isPublished ? '#dcfce7' : '#f3f4f6',
                    color: admission.isPublished ? '#16a34a' : '#6b7280',
                  }}>
                    {admission.isPublished ? '공개' : '비공개'}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <button
                    onClick={() => openModal(admission)}
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
                    onClick={() => handleDelete(admission.id)}
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
        {admissions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
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
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
              {editingAdmission ? '합격자 수정' : '합격자 추가'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                    학생 이름 *
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    required
                    placeholder="김OO"
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
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                    합격 연도 *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>{year}년</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
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
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
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
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
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
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  합격 후기
                </label>
                <textarea
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  rows={4}
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
                    checked={formData.isEarlyAdmission}
                    onChange={(e) => setFormData({ ...formData, isEarlyAdmission: e.target.checked })}
                  />
                  <span style={{ fontSize: '14px' }}>수시 전형</span>
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
