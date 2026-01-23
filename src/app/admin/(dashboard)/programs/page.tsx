'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Program {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  icon: string | null;
  image: string | null;
  content: string | null;
  order: number;
  isPublished: boolean;
}

// 기본 프로그램 목록 (초기 생성용)
const defaultPrograms = [
  {
    slug: 'ht',
    name: 'HT 프로그램',
    subtitle: 'Harmony Training',
    description: '그룹 합주를 통한 실전 앙상블 훈련. 밴드 세션과 함께 실제 무대처럼 연습합니다.',
  },
  {
    slug: 'cake-concert',
    name: '케이크콘서트',
    subtitle: 'Cake Concert',
    description: '정기적으로 열리는 수강생 발표회. 실전 무대 경험을 쌓을 수 있습니다.',
  },
  {
    slug: 'open-stage',
    name: '오픈스테이지',
    subtitle: 'Open Stage',
    description: '자유롭게 무대 경험을 쌓는 공개 공연. 관객 앞에서 실력을 발휘합니다.',
  },
  {
    slug: 'album',
    name: '수강생음반',
    subtitle: 'Student Album',
    description: '전문 스튜디오에서 나만의 음반 제작. 포트폴리오로 활용 가능합니다.',
  },
  {
    slug: 'audition',
    name: '정기오디션',
    subtitle: 'Regular Audition',
    description: '기획사 관계자 초청 오디션 진행. 데뷔의 기회를 잡으세요.',
  },
];

export default function ProgramsAdminPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    subtitle: '',
    description: '',
    icon: '',
    image: '',
    order: 0,
    isPublished: true,
  });

  useEffect(() => {
    fetchPrograms();
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

  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/programs');
      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    }
    setIsLoading(false);
  };

  const openModal = (program?: Program) => {
    if (program) {
      setSelectedProgram(program);
      setFormData({
        slug: program.slug,
        name: program.name,
        subtitle: program.subtitle || '',
        description: program.description || '',
        icon: program.icon || '',
        image: program.image || '',
        order: program.order,
        isPublished: program.isPublished,
      });
    } else {
      setSelectedProgram(null);
      setFormData({
        slug: '',
        name: '',
        subtitle: '',
        description: '',
        icon: '',
        image: '',
        order: programs.length,
        isPublished: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = selectedProgram
        ? `/api/admin/programs/${selectedProgram.id}`
        : '/api/admin/programs';
      const method = selectedProgram ? 'PATCH' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setIsModalOpen(false);
      fetchPrograms();
    } catch (error) {
      console.error('Failed to save program:', error);
      alert('저장에 실패했습니다.');
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 프로그램을 삭제하시겠습니까?')) return;

    try {
      await fetch(`/api/admin/programs/${id}`, { method: 'DELETE' });
      fetchPrograms();
    } catch (error) {
      console.error('Failed to delete program:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const initializeDefaults = async () => {
    if (!confirm('기본 프로그램 5개를 생성하시겠습니까?')) return;

    try {
      for (let i = 0; i < defaultPrograms.length; i++) {
        await fetch('/api/admin/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...defaultPrograms[i],
            order: i,
            isPublished: true,
          }),
        });
      }
      fetchPrograms();
    } catch (error) {
      console.error('Failed to initialize programs:', error);
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
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>특별 프로그램 관리</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            메인페이지에 표시되는 특별 프로그램(HT, 케이크콘서트, 오픈스테이지 등)을 관리합니다.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {programs.length === 0 && (
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
              기본 프로그램 생성
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
            + 프로그램 추가
          </button>
        </div>
      </div>

      {/* Program List */}
      {programs.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <p style={{ color: '#999', marginBottom: '16px' }}>등록된 프로그램이 없습니다.</p>
          <p style={{ color: '#666', fontSize: '14px' }}>
            &apos;기본 프로그램 생성&apos; 버튼을 클릭하여 기본 프로그램을 생성하세요.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px',
        }}>
          {programs.map((program) => (
            <div
              key={program.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {/* Image */}
              <div style={{
                height: '160px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid #eee',
              }}>
                {program.image ? (
                  <img
                    src={program.image}
                    alt={program.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div style={{ color: '#ccc', fontSize: '48px' }}>📷</div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                      {program.name}
                      {!program.isPublished && (
                        <span style={{
                          marginLeft: '8px',
                          padding: '2px 8px',
                          backgroundColor: '#ef4444',
                          color: '#fff',
                          borderRadius: '4px',
                          fontSize: '11px',
                        }}>
                          비공개
                        </span>
                      )}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#999' }}>{program.subtitle}</p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#666',
                  }}>
                    /{program.slug}
                  </span>
                </div>

                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {program.description}
                </p>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => openModal(program)}
                    style={{
                      flex: 1,
                      padding: '10px',
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
                    onClick={() => handleDelete(program.id)}
                    style={{
                      padding: '10px 16px',
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
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
              {selectedProgram ? '프로그램 수정' : '프로그램 추가'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                    슬러그 (URL) *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    placeholder="ht, cake-concert, etc."
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
                    프로그램명 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="HT 프로그램"
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
                  부제목 (영문)
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Harmony Training"
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
                  설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="프로그램에 대한 간단한 설명..."
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

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  대표 이미지
                </label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="programs"
                  aspectRatio="16/9"
                  placeholder="프로그램 대표 이미지"
                />
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
                  {isSaving ? '저장 중...' : selectedProgram ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
