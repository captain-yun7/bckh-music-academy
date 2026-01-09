'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

// 아이콘 컴포넌트들
const IconMic = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const IconMusic = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const IconPiano = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="6" y1="4" x2="6" y2="14" />
    <line x1="10" y1="4" x2="10" y2="14" />
    <line x1="14" y1="4" x2="14" y2="14" />
    <line x1="18" y1="4" x2="18" y2="14" />
    <line x1="2" y1="14" x2="22" y2="14" />
  </svg>
);

const IconGuitar = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.9 12.1a4.5 4.5 0 1 0-6.4 6.4 4.5 4.5 0 0 0 6.4-6.4z" />
    <path d="m21 3-6 6" />
    <path d="m15 9-3 3" />
    <circle cx="12" cy="12" r="1" />
    <path d="M20 4v3h-3" />
  </svg>
);

const IconDrum = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="10" rx="9" ry="5" />
    <path d="M3 10v4c0 2.8 4 5 9 5s9-2.2 9-5v-4" />
    <line x1="3" y1="10" x2="3" y2="14" />
    <line x1="21" y1="10" x2="21" y2="14" />
    <path d="M6 3l-3 7" />
    <path d="M18 3l3 7" />
  </svg>
);

const IconMidi = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h.01" />
    <path d="M10 10h.01" />
    <path d="M14 10h.01" />
    <path d="M18 10h.01" />
    <path d="M8 14h8" />
  </svg>
);

const IconBass = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18a6 6 0 0 0 6-6V4" />
    <path d="M6 12a6 6 0 0 0 6 6" />
    <circle cx="12" cy="18" r="3" />
    <path d="M18 4h-3v3" />
    <line x1="15" y1="4" x2="18" y2="7" />
  </svg>
);

const IconDance = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v4" />
    <path d="M9 10h6" />
    <path d="M9 10l-3 10" />
    <path d="M15 10l3 10" />
    <path d="M12 10v8" />
    <path d="M9 22l3-4 3 4" />
  </svg>
);

const IconRap = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
    <path d="M3 3l18 18" />
  </svg>
);

const IconAct = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

// 아이콘 목록
const availableIcons = [
  { id: 'vocal', name: '보컬', icon: IconMic },
  { id: 'composing', name: '작곡', icon: IconMusic },
  { id: 'piano', name: '피아노', icon: IconPiano },
  { id: 'guitar', name: '기타', icon: IconGuitar },
  { id: 'drum', name: '드럼', icon: IconDrum },
  { id: 'midi', name: '미디', icon: IconMidi },
  { id: 'bass', name: '베이스', icon: IconBass },
  { id: 'dance', name: '댄스', icon: IconDance },
  { id: 'rap', name: '랩', icon: IconRap },
  { id: 'acting', name: '연기', icon: IconAct },
];

interface CurriculumItem {
  title: string;
  image?: string;
  description?: string;
  items?: string[];
  children?: CurriculumItem[];
}

interface CurriculumMajor {
  id: string;
  classId: string;
  name: string;
  icon: string | null;
  description: string | null;
  curriculum: CurriculumItem[];
  order: number;
  isPublished: boolean;
}

interface Benefit {
  title: string;
  desc: string;
}

interface CurriculumClass {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  intro: string | null;
  bgImage: string | null;
  benefits: Benefit[];
  universities: string[];
  agencies: string[];
  order: number;
  isPublished: boolean;
  majors: CurriculumMajor[];
}

const defaultClasses = [
  { slug: 'admission', title: '입시반' },
  { slug: 'audition', title: '오디션반' },
  { slug: 'professional', title: '전문반' },
  { slug: 'hobby', title: '취미반' },
];

export default function CurriculumAdminPage() {
  const [classes, setClasses] = useState<CurriculumClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<CurriculumClass | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<CurriculumMajor | null>(null);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);

  // Class form data
  const [classFormData, setClassFormData] = useState({
    slug: '',
    title: '',
    subtitle: '',
    intro: '',
    bgImage: '',
    benefits: [] as Benefit[],
    universities: [] as string[],
    agencies: [] as string[],
    order: 0,
    isPublished: true,
  });

  // Major form data
  const [majorFormData, setMajorFormData] = useState({
    name: '',
    icon: '',
    description: '',
    order: 0,
    isPublished: true,
  });

  // Curriculum editor state
  const [curriculumData, setCurriculumData] = useState<CurriculumItem[]>([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    const res = await fetch('/api/admin/curriculum/classes');
    const data = await res.json();

    // Parse JSON fields
    const parsed = data.map((cls: CurriculumClass & { benefits: string | null; universities: string | null; agencies: string | null; majors: (CurriculumMajor & { curriculum: string | null })[] }) => ({
      ...cls,
      benefits: cls.benefits ? JSON.parse(cls.benefits as string) : [],
      universities: cls.universities ? JSON.parse(cls.universities as string) : [],
      agencies: cls.agencies ? JSON.parse(cls.agencies as string) : [],
      majors: cls.majors.map((m: CurriculumMajor & { curriculum: string | null }) => ({
        ...m,
        curriculum: m.curriculum ? JSON.parse(m.curriculum as string) : [],
      })),
    }));

    setClasses(parsed);
    setIsLoading(false);
  };

  const openClassModal = (cls?: CurriculumClass) => {
    if (cls) {
      setSelectedClass(cls);
      setClassFormData({
        slug: cls.slug,
        title: cls.title,
        subtitle: cls.subtitle || '',
        intro: cls.intro || '',
        bgImage: cls.bgImage || '',
        benefits: cls.benefits || [],
        universities: cls.universities || [],
        agencies: cls.agencies || [],
        order: cls.order,
        isPublished: cls.isPublished,
      });
    } else {
      setSelectedClass(null);
      setClassFormData({
        slug: '',
        title: '',
        subtitle: '',
        intro: '',
        bgImage: '',
        benefits: [],
        universities: [],
        agencies: [],
        order: classes.length,
        isPublished: true,
      });
    }
    setIsClassModalOpen(true);
  };

  const openMajorModal = (cls: CurriculumClass, major?: CurriculumMajor) => {
    setSelectedClass(cls);
    if (major) {
      setSelectedMajor(major);
      setMajorFormData({
        name: major.name,
        icon: major.icon || '',
        description: major.description || '',
        order: major.order,
        isPublished: major.isPublished,
      });
    } else {
      setSelectedMajor(null);
      setMajorFormData({
        name: '',
        icon: '',
        description: '',
        order: cls.majors.length,
        isPublished: true,
      });
    }
    setIsMajorModalOpen(true);
  };

  const openCurriculumModal = (cls: CurriculumClass, major: CurriculumMajor) => {
    setSelectedClass(cls);
    setSelectedMajor(major);
    setCurriculumData(major.curriculum || []);
    setIsCurriculumModalOpen(true);
  };

  const handleClassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = selectedClass
      ? `/api/admin/curriculum/classes/${selectedClass.id}`
      : '/api/admin/curriculum/classes';
    const method = selectedClass ? 'PATCH' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(classFormData),
    });

    setIsClassModalOpen(false);
    fetchClasses();
  };

  const handleMajorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;

    const url = selectedMajor
      ? `/api/admin/curriculum/majors/${selectedMajor.id}`
      : '/api/admin/curriculum/majors';
    const method = selectedMajor ? 'PATCH' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...majorFormData,
        classId: selectedClass.id,
      }),
    });

    setIsMajorModalOpen(false);
    fetchClasses();
  };

  const handleCurriculumSave = async () => {
    if (!selectedMajor) return;

    await fetch(`/api/admin/curriculum/majors/${selectedMajor.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        curriculum: curriculumData,
      }),
    });

    setIsCurriculumModalOpen(false);
    fetchClasses();
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm('이 반을 삭제하시겠습니까? 하위 전공도 모두 삭제됩니다.')) return;
    await fetch(`/api/admin/curriculum/classes/${id}`, { method: 'DELETE' });
    fetchClasses();
  };

  const handleDeleteMajor = async (id: string) => {
    if (!confirm('이 전공을 삭제하시겠습니까?')) return;
    await fetch(`/api/admin/curriculum/majors/${id}`, { method: 'DELETE' });
    fetchClasses();
  };

  // Benefits management
  const addBenefit = () => {
    setClassFormData({
      ...classFormData,
      benefits: [...classFormData.benefits, { title: '', desc: '' }],
    });
  };

  const updateBenefit = (index: number, field: 'title' | 'desc', value: string) => {
    const newBenefits = [...classFormData.benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setClassFormData({ ...classFormData, benefits: newBenefits });
  };

  const removeBenefit = (index: number) => {
    setClassFormData({
      ...classFormData,
      benefits: classFormData.benefits.filter((_, i) => i !== index),
    });
  };

  // Universities/Agencies management
  const addListItem = (field: 'universities' | 'agencies') => {
    setClassFormData({
      ...classFormData,
      [field]: [...classFormData[field], ''],
    });
  };

  const updateListItem = (field: 'universities' | 'agencies', index: number, value: string) => {
    const newList = [...classFormData[field]];
    newList[index] = value;
    setClassFormData({ ...classFormData, [field]: newList });
  };

  const removeListItem = (field: 'universities' | 'agencies', index: number) => {
    setClassFormData({
      ...classFormData,
      [field]: classFormData[field].filter((_, i) => i !== index),
    });
  };

  // Curriculum tree editor functions
  const addCurriculumNode = () => {
    const newNode: CurriculumItem = { title: '새 항목', image: '', description: '' };
    setCurriculumData([...curriculumData, newNode]);
  };

  const updateCurriculumNode = (index: number, field: string, value: string) => {
    const newData = [...curriculumData];
    newData[index] = { ...newData[index], [field]: value };
    setCurriculumData(newData);
  };

  const deleteCurriculumNode = (index: number) => {
    setCurriculumData(curriculumData.filter((_, i) => i !== index));
  };

  // Curriculum card editor
  const renderCurriculumEditor = () => {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}>
        {curriculumData.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {/* 이미지 업로드 영역 */}
            <div style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
              <div style={{ height: '120px' }}>
                <ImageUpload
                  value={item.image || ''}
                  onChange={(url) => updateCurriculumNode(index, 'image', url)}
                  folder="curriculum"
                  aspectRatio="16/10"
                  placeholder="카드 이미지"
                />
              </div>
            </div>

            {/* 제목 및 설명 */}
            <div style={{ padding: '12px' }}>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateCurriculumNode(index, 'title', e.target.value)}
                placeholder="제목"
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  boxSizing: 'border-box',
                }}
              />
              <textarea
                value={item.description || ''}
                onChange={(e) => updateCurriculumNode(index, 'description', e.target.value)}
                placeholder="설명을 입력하세요"
                rows={3}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '13px',
                  resize: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => deleteCurriculumNode(index)}
                style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#fef2f2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Initialize default classes if none exist
  const initializeDefaultClasses = async () => {
    if (!confirm('기본 반 구성(입시반, 오디션반, 전문반, 취미반)을 생성하시겠습니까?')) return;

    for (let i = 0; i < defaultClasses.length; i++) {
      await fetch('/api/admin/curriculum/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...defaultClasses[i],
          order: i,
          isPublished: true,
        }),
      });
    }

    fetchClasses();
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>로딩중...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>커리큘럼 관리</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          {classes.length === 0 && (
            <button
              onClick={initializeDefaultClasses}
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
              기본 반 구성 생성
            </button>
          )}
          <button
            onClick={() => openClassModal()}
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
            + 반 추가
          </button>
        </div>
      </div>

      {/* Class List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {classes.map((cls) => (
          <div
            key={cls.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {/* Class Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #eee',
            }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>
                  {cls.title}
                  {!cls.isPublished && (
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
                </h2>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  {cls.subtitle || '(부제목 없음)'} · 전공 {cls.majors.length}개
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => openMajorModal(cls)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  + 전공 추가
                </button>
                <button
                  onClick={() => openClassModal(cls)}
                  style={{
                    padding: '8px 16px',
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
                  onClick={() => handleDeleteClass(cls.id)}
                  style={{
                    padding: '8px 16px',
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

            {/* Majors List */}
            <div style={{ padding: '16px 24px' }}>
              {cls.majors.length === 0 ? (
                <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
                  등록된 전공이 없습니다.
                </p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
                  {cls.majors.map((major) => (
                    <div
                      key={major.id}
                      style={{
                        padding: '16px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>
                            {major.name}
                            {!major.isPublished && (
                              <span style={{
                                marginLeft: '6px',
                                padding: '2px 6px',
                                backgroundColor: '#ef4444',
                                color: '#fff',
                                borderRadius: '4px',
                                fontSize: '10px',
                              }}>
                                비공개
                              </span>
                            )}
                          </h3>
                          <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                            {major.description || '(설명 없음)'}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                        <button
                          onClick={() => openCurriculumModal(cls, major)}
                          style={{
                            flex: 1,
                            padding: '6px',
                            backgroundColor: '#f59e0b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          커리큘럼 편집
                        </button>
                        <button
                          onClick={() => openMajorModal(cls, major)}
                          style={{
                            padding: '6px 10px',
                            backgroundColor: '#e5e7eb',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteMajor(major.id)}
                          style={{
                            padding: '6px 10px',
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {classes.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          backgroundColor: '#fff',
          borderRadius: '12px',
        }}>
          <p style={{ color: '#999', marginBottom: '16px' }}>등록된 커리큘럼이 없습니다.</p>
          <p style={{ color: '#666', fontSize: '14px' }}>
            &apos;기본 반 구성 생성&apos; 버튼을 클릭하여 입시반, 오디션반, 전문반, 취미반을 생성하세요.
          </p>
        </div>
      )}

      {/* Class Edit Modal */}
      {isClassModalOpen && (
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
            maxWidth: '700px',
            maxHeight: '90vh',
            overflow: 'auto',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
              {selectedClass ? '반 수정' : '반 추가'}
            </h2>
            <form onSubmit={handleClassSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                    슬러그 (URL) *
                  </label>
                  <input
                    type="text"
                    value={classFormData.slug}
                    onChange={(e) => setClassFormData({ ...classFormData, slug: e.target.value })}
                    required
                    placeholder="admission, audition, etc."
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
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={classFormData.title}
                    onChange={(e) => setClassFormData({ ...classFormData, title: e.target.value })}
                    required
                    placeholder="입시반"
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
                  부제목
                </label>
                <input
                  type="text"
                  value={classFormData.subtitle}
                  onChange={(e) => setClassFormData({ ...classFormData, subtitle: e.target.value })}
                  placeholder="실용음악 대학 합격을 위한 체계적인 준비"
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
                  소개 텍스트
                </label>
                <textarea
                  value={classFormData.intro}
                  onChange={(e) => setClassFormData({ ...classFormData, intro: e.target.value })}
                  rows={3}
                  placeholder="반 소개 내용..."
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
                  배경 이미지
                </label>
                <ImageUpload
                  value={classFormData.bgImage}
                  onChange={(url) => setClassFormData({ ...classFormData, bgImage: url })}
                  folder="curriculum"
                  aspectRatio="16/9"
                />
              </div>

              {/* Benefits */}
              <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 500 }}>수강생 혜택</label>
                  <button
                    type="button"
                    onClick={addBenefit}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    + 혜택 추가
                  </button>
                </div>
                {classFormData.benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={benefit.title}
                      onChange={(e) => updateBenefit(i, 'title', e.target.value)}
                      placeholder="혜택 제목"
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '13px',
                      }}
                    />
                    <input
                      type="text"
                      value={benefit.desc}
                      onChange={(e) => updateBenefit(i, 'desc', e.target.value)}
                      placeholder="설명"
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '13px',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeBenefit(i)}
                      style={{
                        padding: '8px',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Universities (for admission) */}
              {(classFormData.slug === 'admission' || classFormData.universities.length > 0) && (
                <div style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500 }}>합격 대학 목록 (입시반)</label>
                    <button
                      type="button"
                      onClick={() => addListItem('universities')}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      + 대학 추가
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {classFormData.universities.map((uni, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input
                          type="text"
                          value={uni}
                          onChange={(e) => updateListItem('universities', i, e.target.value)}
                          placeholder="대학명"
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '13px',
                            width: '120px',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem('universities', i)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agencies (for audition) */}
              {(classFormData.slug === 'audition' || classFormData.agencies.length > 0) && (
                <div style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500 }}>합격 기획사 목록 (오디션반)</label>
                    <button
                      type="button"
                      onClick={() => addListItem('agencies')}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      + 기획사 추가
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {classFormData.agencies.map((agency, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input
                          type="text"
                          value={agency}
                          onChange={(e) => updateListItem('agencies', i, e.target.value)}
                          placeholder="기획사명"
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '13px',
                            width: '120px',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem('agencies', i)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                    정렬 순서
                  </label>
                  <input
                    type="number"
                    value={classFormData.order}
                    onChange={(e) => setClassFormData({ ...classFormData, order: parseInt(e.target.value) || 0 })}
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
                      checked={classFormData.isPublished}
                      onChange={(e) => setClassFormData({ ...classFormData, isPublished: e.target.checked })}
                    />
                    <span style={{ fontSize: '14px' }}>공개</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
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
                  {selectedClass ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Major Edit Modal */}
      {isMajorModalOpen && (
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
              {selectedMajor ? '전공 수정' : '전공 추가'} - {selectedClass?.title}
            </h2>
            <form onSubmit={handleMajorSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  전공명 *
                </label>
                <input
                  type="text"
                  value={majorFormData.name}
                  onChange={(e) => setMajorFormData({ ...majorFormData, name: e.target.value })}
                  required
                  placeholder="보컬, 작곡, 미디 등"
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
                  아이콘
                </label>

                {/* 기본 아이콘 선택 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '8px',
                  marginBottom: '12px',
                }}>
                  {availableIcons.map((iconItem) => {
                    const IconComponent = iconItem.icon;
                    const isSelected = majorFormData.icon === iconItem.id;
                    return (
                      <button
                        key={iconItem.id}
                        type="button"
                        onClick={() => setMajorFormData({ ...majorFormData, icon: iconItem.id })}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '12px 8px',
                          border: isSelected ? '2px solid #3b82f6' : '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#eff6ff' : '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        <IconComponent size={24} />
                        <span style={{ fontSize: '11px', color: '#666' }}>{iconItem.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 커스텀 아이콘 업로드 */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  paddingTop: '12px',
                  borderTop: '1px solid #eee',
                }}>
                  <p style={{ fontSize: '12px', color: '#666' }}>
                    또는
                  </p>
                  <div style={{ width: '60px', height: '60px' }}>
                    <ImageUpload
                      value={majorFormData.icon?.startsWith('http') || majorFormData.icon?.startsWith('/') ? majorFormData.icon : ''}
                      onChange={(url) => setMajorFormData({ ...majorFormData, icon: url })}
                      folder="curriculum/icons"
                      aspectRatio="1/1"
                      placeholder=""
                      compact
                    />
                  </div>
                  <p style={{ fontSize: '12px', color: '#666' }}>
                    직접 업로드
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  설명
                </label>
                <textarea
                  value={majorFormData.description}
                  onChange={(e) => setMajorFormData({ ...majorFormData, description: e.target.value })}
                  rows={2}
                  placeholder="전공에 대한 간단한 설명"
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

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                    정렬 순서
                  </label>
                  <input
                    type="number"
                    value={majorFormData.order}
                    onChange={(e) => setMajorFormData({ ...majorFormData, order: parseInt(e.target.value) || 0 })}
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
                      checked={majorFormData.isPublished}
                      onChange={(e) => setMajorFormData({ ...majorFormData, isPublished: e.target.checked })}
                    />
                    <span style={{ fontSize: '14px' }}>공개</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsMajorModalOpen(false)}
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
                  {selectedMajor ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Curriculum Editor Modal */}
      {isCurriculumModalOpen && selectedMajor && (
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
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
              커리큘럼 편집 - {selectedClass?.title} / {selectedMajor.name}
            </h2>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>
              카드형 커리큘럼을 편집합니다. 각 카드에 이미지, 제목, 설명을 입력하세요.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => addCurriculumNode()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                + 카드 추가
              </button>
            </div>

            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              minHeight: '200px',
              maxHeight: '500px',
              overflow: 'auto',
              backgroundColor: '#f9fafb',
            }}>
              {curriculumData.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
                  커리큘럼 카드가 없습니다. 위 버튼을 클릭하여 추가하세요.
                </p>
              ) : (
                renderCurriculumEditor()
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => setIsCurriculumModalOpen(false)}
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
                type="button"
                onClick={handleCurriculumSave}
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
