'use client';

import { useState, useEffect } from 'react';

interface Consultation {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  age: string | null;
  gender: string | null;
  subject: string | null;
  purpose: string | null;
  message: string | null;
  status: string;
  memo: string | null;
  createdAt: string;
}

const statusLabels: Record<string, string> = {
  PENDING: '대기중',
  CONTACTED: '연락완료',
  SCHEDULED: '상담예약',
  COMPLETED: '상담완료',
  CANCELLED: '취소',
};

const statusColors: Record<string, string> = {
  PENDING: '#ef4444',
  CONTACTED: '#f59e0b',
  SCHEDULED: '#3b82f6',
  COMPLETED: '#22c55e',
  CANCELLED: '#6b7280',
};

const purposeLabels: Record<string, string> = {
  ADMISSION: '입시',
  AUDITION: '오디션',
  PROFESSIONAL: '전문반',
  HOBBY: '취미',
  OTHER: '기타',
};

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [editMemo, setEditMemo] = useState('');
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => {
    fetchConsultations();
  }, [selectedStatus]);

  const fetchConsultations = async () => {
    setIsLoading(true);
    const url = selectedStatus
      ? `/api/admin/consultations?status=${selectedStatus}`
      : '/api/admin/consultations';
    const res = await fetch(url);
    const data = await res.json();
    setConsultations(data.consultations || []);
    setIsLoading(false);
  };

  const openDetail = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setEditMemo(consultation.memo || '');
    setEditStatus(consultation.status);
  };

  const closeDetail = () => {
    setSelectedConsultation(null);
  };

  const handleUpdate = async () => {
    if (!selectedConsultation) return;

    await fetch(`/api/admin/consultations/${selectedConsultation.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: editStatus, memo: editMemo }),
    });

    closeDetail();
    fetchConsultations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await fetch(`/api/admin/consultations/${id}`, { method: 'DELETE' });
    fetchConsultations();
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>로딩중...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>상담 신청 관리</h1>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        >
          <option value="">전체 상태</option>
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666' }}>이름</th>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666' }}>연락처</th>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666' }}>관심분야</th>
              <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666' }}>목적</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '100px' }}>상태</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '120px' }}>신청일</th>
              <th style={{ textAlign: 'center', padding: '16px', fontSize: '13px', fontWeight: 500, color: '#666', width: '120px' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation) => (
              <tr key={consultation.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '16px', fontSize: '14px', fontWeight: 500 }}>{consultation.name}</td>
                <td style={{ padding: '16px', fontSize: '14px' }}>{consultation.phone}</td>
                <td style={{ padding: '16px', fontSize: '14px' }}>{consultation.subject || '-'}</td>
                <td style={{ padding: '16px', fontSize: '14px' }}>
                  {consultation.purpose ? purposeLabels[consultation.purpose] || consultation.purpose : '-'}
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                    backgroundColor: `${statusColors[consultation.status]}20`,
                    color: statusColors[consultation.status],
                  }}>
                    {statusLabels[consultation.status]}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                  {new Date(consultation.createdAt).toLocaleDateString('ko-KR')}
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <button
                    onClick={() => openDetail(consultation)}
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
                    상세
                  </button>
                  <button
                    onClick={() => handleDelete(consultation.id)}
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
        {consultations.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
            상담 신청이 없습니다.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedConsultation && (
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
              상담 신청 상세
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '12px', fontSize: '14px' }}>
                <span style={{ color: '#666' }}>이름</span>
                <span style={{ fontWeight: 500 }}>{selectedConsultation.name}</span>

                <span style={{ color: '#666' }}>연락처</span>
                <span>{selectedConsultation.phone}</span>

                {selectedConsultation.email && (
                  <>
                    <span style={{ color: '#666' }}>이메일</span>
                    <span>{selectedConsultation.email}</span>
                  </>
                )}

                {selectedConsultation.age && (
                  <>
                    <span style={{ color: '#666' }}>나이</span>
                    <span>{selectedConsultation.age}</span>
                  </>
                )}

                {selectedConsultation.subject && (
                  <>
                    <span style={{ color: '#666' }}>관심분야</span>
                    <span>{selectedConsultation.subject}</span>
                  </>
                )}

                {selectedConsultation.purpose && (
                  <>
                    <span style={{ color: '#666' }}>목적</span>
                    <span>{purposeLabels[selectedConsultation.purpose] || selectedConsultation.purpose}</span>
                  </>
                )}

                <span style={{ color: '#666' }}>신청일</span>
                <span>{new Date(selectedConsultation.createdAt).toLocaleString('ko-KR')}</span>
              </div>

              {selectedConsultation.message && (
                <div style={{ marginTop: '16px' }}>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>문의 내용</p>
                  <p style={{
                    fontSize: '14px',
                    backgroundColor: '#f5f5f5',
                    padding: '12px',
                    borderRadius: '8px',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {selectedConsultation.message}
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                상태 변경
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                관리자 메모
              </label>
              <textarea
                value={editMemo}
                onChange={(e) => setEditMemo(e.target.value)}
                rows={4}
                placeholder="내부 메모를 작성하세요..."
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

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={closeDetail}
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
                닫기
              </button>
              <button
                onClick={handleUpdate}
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
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
