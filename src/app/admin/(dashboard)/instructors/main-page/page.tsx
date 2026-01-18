'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Subject {
  id: string;
  name: string;
  nameKo: string;
}

interface InstructorSubject {
  subject: Subject;
}

interface Instructor {
  id: string;
  name: string;
  image: string | null;
  subjects: InstructorSubject[];
  mainPageOrder: number | null;
}

export default function MainPageInstructorsPage() {
  const [allInstructors, setAllInstructors] = useState<Instructor[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/instructors');
      const data: Instructor[] = await res.json();
      setAllInstructors(data);

      // 이미 메인페이지에 선택된 강사들 (mainPageOrder 순서대로)
      const mainPageInstructors = data
        .filter((i) => i.mainPageOrder !== null)
        .sort((a, b) => (a.mainPageOrder ?? 0) - (b.mainPageOrder ?? 0));
      setSelectedIds(mainPageInstructors.map((i) => i.id));
    } catch (error) {
      console.error('Failed to fetch instructors:', error);
    }
    setIsLoading(false);
  };

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newIds = [...selectedIds];
    [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
    setSelectedIds(newIds);
  };

  const handleMoveDown = (index: number) => {
    if (index === selectedIds.length - 1) return;
    const newIds = [...selectedIds];
    [newIds[index], newIds[index + 1]] = [newIds[index + 1], newIds[index]];
    setSelectedIds(newIds);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/admin/instructors/main-page-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instructorIds: selectedIds }),
      });
      alert('저장되었습니다.');
      fetchData();
    } catch (error) {
      console.error('Failed to save:', error);
      alert('저장에 실패했습니다.');
    }
    setIsSaving(false);
  };

  const getSubjectNames = (instructor: Instructor) => {
    return instructor.subjects.map((s) => s.subject.nameKo).join(', ');
  };

  const selectedInstructors = selectedIds
    .map((id) => allInstructors.find((i) => i.id === id))
    .filter((i): i is Instructor => i !== undefined);

  const unselectedInstructors = allInstructors.filter(
    (i) => !selectedIds.includes(i.id)
  );

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>로딩중...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Link
              href="/admin/instructors"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#666',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              강사 관리
            </Link>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700 }}>메인페이지 강사 노출 순서</h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
            메인페이지에 표시할 강사와 순서를 설정합니다. 선택하지 않은 강사는 메인페이지에 노출되지 않습니다.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            padding: '12px 24px',
            backgroundColor: isSaving ? '#999' : '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: isSaving ? 'default' : 'pointer',
          }}
        >
          {isSaving ? '저장 중...' : '변경사항 저장'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* 선택된 강사 (메인페이지 노출) */}
        <div>
          <div style={{
            padding: '16px',
            backgroundColor: '#f0fdf4',
            borderRadius: '12px 12px 0 0',
            borderBottom: '1px solid #bbf7d0',
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#166534' }}>
              메인페이지 노출 ({selectedIds.length}명)
            </h2>
            <p style={{ fontSize: '13px', color: '#16a34a', marginTop: '4px' }}>
              위에서부터 순서대로 노출됩니다
            </p>
          </div>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '0 0 12px 12px',
            border: '1px solid #e5e5e5',
            borderTop: 'none',
            minHeight: '400px',
          }}>
            {selectedInstructors.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                오른쪽에서 강사를 선택하세요
              </div>
            ) : (
              selectedInstructors.map((instructor, index) => (
                <div
                  key={instructor.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderBottom: index < selectedInstructors.length - 1 ? '1px solid #f5f5f5' : 'none',
                  }}
                >
                  <span style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#ffc50a',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}>
                    {index + 1}
                  </span>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                    flexShrink: 0,
                  }}>
                    {instructor.image ? (
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        width={40}
                        height={40}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                      }}>
                        👤
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{instructor.name}</p>
                    <p style={{ fontSize: '12px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {getSubjectNames(instructor)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      style={{
                        padding: '6px',
                        backgroundColor: index === 0 ? '#f5f5f5' : '#e5e5e5',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: index === 0 ? 'default' : 'pointer',
                        color: index === 0 ? '#ccc' : '#333',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === selectedInstructors.length - 1}
                      style={{
                        padding: '6px',
                        backgroundColor: index === selectedInstructors.length - 1 ? '#f5f5f5' : '#e5e5e5',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: index === selectedInstructors.length - 1 ? 'default' : 'pointer',
                        color: index === selectedInstructors.length - 1 ? '#ccc' : '#333',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleToggle(instructor.id)}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      제외
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 선택되지 않은 강사 */}
        <div>
          <div style={{
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '12px 12px 0 0',
            borderBottom: '1px solid #e5e5e5',
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
              전체 강사 ({unselectedInstructors.length}명)
            </h2>
            <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
              클릭하여 메인페이지에 추가
            </p>
          </div>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '0 0 12px 12px',
            border: '1px solid #e5e5e5',
            borderTop: 'none',
            minHeight: '400px',
            maxHeight: '600px',
            overflowY: 'auto',
          }}>
            {unselectedInstructors.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                모든 강사가 선택되었습니다
              </div>
            ) : (
              unselectedInstructors.map((instructor, index) => (
                <div
                  key={instructor.id}
                  onClick={() => handleToggle(instructor.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderBottom: index < unselectedInstructors.length - 1 ? '1px solid #f5f5f5' : 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                    flexShrink: 0,
                  }}>
                    {instructor.image ? (
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        width={40}
                        height={40}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                      }}>
                        👤
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{instructor.name}</p>
                    <p style={{ fontSize: '12px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {getSubjectNames(instructor)}
                    </p>
                  </div>
                  <button
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#eff6ff',
                      color: '#3b82f6',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    + 추가
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
