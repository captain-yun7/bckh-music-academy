'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Subject {
  id: string;
  name: string;
  nameKo: string;
}

interface Instructor {
  id: string;
  name: string;
  subjectId: string;
  subject: Subject;
  image: string | null;
  bio: string | null;
  career: string | null;
  isActive: boolean;
  order: number;
}

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subjectId: '',
    image: '',
    bio: '',
    career: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [instructorsRes, subjectsRes] = await Promise.all([
      fetch('/api/admin/instructors'),
      fetch('/api/admin/subjects'),
    ]);
    const instructorsData = await instructorsRes.json();
    const subjectsData = await subjectsRes.json();
    setInstructors(instructorsData);
    setSubjects(subjectsData);
    setIsLoading(false);
  };

  const openModal = (instructor?: Instructor) => {
    if (instructor) {
      setEditingInstructor(instructor);
      setFormData({
        name: instructor.name,
        subjectId: instructor.subjectId,
        image: instructor.image || '',
        bio: instructor.bio || '',
        career: instructor.career || '',
        isActive: instructor.isActive,
        order: instructor.order,
      });
    } else {
      setEditingInstructor(null);
      setFormData({
        name: '',
        subjectId: subjects[0]?.id || '',
        image: '',
        bio: '',
        career: '',
        isActive: true,
        order: 0,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingInstructor(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingInstructor
      ? `/api/admin/instructors/${editingInstructor.id}`
      : '/api/admin/instructors';
    const method = editingInstructor ? 'PATCH' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    closeModal();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    await fetch(`/api/admin/instructors/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const groupedInstructors = instructors.reduce((acc, instructor) => {
    const subjectName = instructor.subject.nameKo;
    if (!acc[subjectName]) {
      acc[subjectName] = [];
    }
    acc[subjectName].push(instructor);
    return acc;
  }, {} as Record<string, Instructor[]>);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>로딩중...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>강사 관리</h1>
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
          + 강사 추가
        </button>
      </div>

      {Object.entries(groupedInstructors).map(([subjectName, subjectInstructors]) => (
        <div key={subjectName} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#333' }}>
            {subjectName}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {subjectInstructors.map((instructor) => (
              <div
                key={instructor.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#f5f5f5' }}>
                  {instructor.image ? (
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
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
                      👤
                    </div>
                  )}
                  {!instructor.isActive && (
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
                      비활성
                    </div>
                  )}
                </div>
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                    {instructor.name}
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => openModal(instructor)}
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
                      onClick={() => handleDelete(instructor.id)}
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
        </div>
      ))}

      {instructors.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          backgroundColor: '#fff',
          borderRadius: '12px',
        }}>
          <p style={{ color: '#999', marginBottom: '16px' }}>등록된 강사가 없습니다.</p>
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
            첫 강사 등록하기
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
              {editingInstructor ? '강사 수정' : '강사 추가'}
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
                  전공 *
                </label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">전공 선택</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.nameKo}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  프로필 이미지 URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/lecturers/example.jpg"
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
                  약력
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
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
                  경력
                </label>
                <textarea
                  value={formData.career}
                  onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                  rows={3}
                  placeholder="- 경력 1&#10;- 경력 2"
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

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span style={{ fontSize: '14px' }}>활성화 (사이트에 표시)</span>
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
                  {editingInstructor ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
