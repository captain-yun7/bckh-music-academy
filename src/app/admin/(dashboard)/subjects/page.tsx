'use client';

import { useState, useEffect } from 'react';

interface Subject {
  id: string;
  name: string;
  nameKo: string;
  description: string | null;
  features: string | null;
  order: number;
  isPublished: boolean;
  _count?: { instructors: number };
}

// 기본 전공 데이터 (초기 생성용)
const defaultSubjects = [
  { name: 'Vocal', nameKo: '보컬', description: '대중음악 보컬 전문 교육', features: ['발성법', '호흡법', '가창력 향상', '곡 해석'] },
  { name: 'Piano', nameKo: '피아노', description: '재즈피아노 및 건반 전문 교육', features: ['코드 진행', '즉흥 연주', '반주법', '리듬 트레이닝'] },
  { name: 'Guitar', nameKo: '기타', description: '일렉/어쿠스틱 기타 전문 교육', features: ['코드 워크', '솔로 연주', '리듬 기타', '즉흥 연주'] },
  { name: 'Bass', nameKo: '베이스', description: '일렉베이스 전문 교육', features: ['그루브 메이킹', '슬랩 주법', '리듬 섹션', '앙상블'] },
  { name: 'Drums', nameKo: '드럼', description: '드럼 전문 교육', features: ['기본 비트', '리듬 패턴', '필인', '앙상블'] },
  { name: 'Composing', nameKo: '작곡/화성학', description: '작곡 및 화성학 이론 교육', features: ['화성학', '편곡', '작곡법', '음악 이론'] },
  { name: 'MIDI', nameKo: '미디/전자음악', description: 'MIDI 및 전자음악 프로덕션', features: ['DAW 활용', '사운드 디자인', '믹싱', '마스터링'] },
  { name: 'Songwriting', nameKo: '싱어송라이터', description: '보컬과 작곡을 겸비한 아티스트 양성', features: ['작사/작곡', '자작곡 연주', '보컬 퍼포먼스', '스토리텔링'] },
  { name: 'Dance', nameKo: '댄스', description: '무대 퍼포먼스 및 댄스 교육', features: ['안무', '보컬 & 댄스', '무대 매너', '퍼포먼스'] },
];

export default function SubjectsAdminPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    nameKo: '',
    description: '',
    features: [] as string[],
    order: 0,
    isPublished: true,
  });

  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/subjects');
      const data = await res.json();
      setSubjects(data);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    }
    setIsLoading(false);
  };

  const openModal = (subject?: Subject) => {
    if (subject) {
      setSelectedSubject(subject);
      setFormData({
        name: subject.name,
        nameKo: subject.nameKo,
        description: subject.description || '',
        features: subject.features ? JSON.parse(subject.features) : [],
        order: subject.order,
        isPublished: subject.isPublished,
      });
    } else {
      setSelectedSubject(null);
      setFormData({
        name: '',
        nameKo: '',
        description: '',
        features: [],
        order: subjects.length,
        isPublished: true,
      });
    }
    setNewFeature('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = selectedSubject
        ? `/api/admin/subjects/${selectedSubject.id}`
        : '/api/admin/subjects';
      const method = selectedSubject ? 'PATCH' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setIsModalOpen(false);
      fetchSubjects();
    } catch (error) {
      console.error('Failed to save subject:', error);
      alert('저장에 실패했습니다.');
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 전공을 삭제하시겠습니까? 관련 강사 데이터에 영향을 줄 수 있습니다.')) return;

    try {
      await fetch(`/api/admin/subjects/${id}`, { method: 'DELETE' });
      fetchSubjects();
    } catch (error) {
      console.error('Failed to delete subject:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const initializeDefaults = async () => {
    if (!confirm('기본 전공 9개를 생성하시겠습니까? 기존 데이터에 추가됩니다.')) return;

    try {
      for (let i = 0; i < defaultSubjects.length; i++) {
        await fetch('/api/admin/subjects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...defaultSubjects[i],
            order: subjects.length + i,
            isPublished: true,
          }),
        });
      }
      fetchSubjects();
    } catch (error) {
      console.error('Failed to initialize subjects:', error);
      alert('초기화에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>로딩중...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>전공 관리</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            메인페이지 커리큘럼 섹션에 표시되는 전공별 정보를 관리합니다.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {subjects.length === 0 && (
            <button
              onClick={initializeDefaults}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              기본 전공 생성
            </button>
          )}
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
            + 전공 추가
          </button>
        </div>
      </div>

      {/* Subject List */}
      {subjects.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <p style={{ color: '#999', marginBottom: '16px' }}>등록된 전공이 없습니다.</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#666' }}>전공명</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#666' }}>설명</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#666' }}>특징</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: '#666' }}>강사 수</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: '#666' }}>상태</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: '#666' }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => {
                const features = subject.features ? JSON.parse(subject.features) : [];
                return (
                  <tr key={subject.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600 }}>{subject.nameKo}</p>
                      <p style={{ fontSize: '12px', color: '#999' }}>{subject.name}</p>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '13px', color: '#666', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {subject.description || '-'}
                      </p>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {features.slice(0, 3).map((feature: string, idx: number) => (
                          <span key={idx} style={{
                            padding: '4px 8px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '4px',
                            fontSize: '11px',
                            color: '#666',
                          }}>
                            {feature}
                          </span>
                        ))}
                        {features.length > 3 && (
                          <span style={{ fontSize: '11px', color: '#999' }}>+{features.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>
                        {subject._count?.instructors || 0}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        backgroundColor: subject.isPublished ? '#dcfce7' : '#fef2f2',
                        color: subject.isPublished ? '#166534' : '#dc2626',
                      }}>
                        {subject.isPublished ? '공개' : '비공개'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => openModal(subject)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f5f5f5',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(subject.id)}
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
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
              {selectedSubject ? '전공 수정' : '전공 추가'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                    영문명 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Vocal"
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
                    한글명 *
                  </label>
                  <input
                    type="text"
                    value={formData.nameKo}
                    onChange={(e) => setFormData({ ...formData, nameKo: e.target.value })}
                    required
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
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  설명
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="대중음악 보컬 전문 교육"
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

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  특징 태그
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    placeholder="특징 입력 후 Enter"
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    추가
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {formData.features.map((feature, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '20px',
                        fontSize: '13px',
                      }}
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0 2px',
                          color: '#999',
                          fontSize: '14px',
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                    정렬 순서
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
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
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    />
                    <span style={{ fontSize: '14px' }}>공개</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
                  disabled={isSaving}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: isSaving ? '#999' : '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: isSaving ? 'default' : 'pointer',
                  }}
                >
                  {isSaving ? '저장 중...' : selectedSubject ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
