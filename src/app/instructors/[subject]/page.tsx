'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Subject {
  id: string;
  name: string;
  nameKo: string;
  order: number;
}

interface Instructor {
  id: string;
  name: string;
  subjectId: string;
  subject: Subject;
  image: string | null;
  intro: string | null;
  profile: string | null;
  curriculum: string | null;
  musicGenres: string | null;
  recommendedAlbums: string | null;
  messageToStudents: string | null;
  isActive: boolean;
  order: number;
}

// Subject slug 매핑
const subjectSlugMap: Record<string, string> = {
  'vocal': 'Vocal',
  'composing': 'Composing',
  'midi': 'MIDI/EMP',
  'singer-songwriter': 'SingerSongwriter',
  'guitar': 'Guitar',
  'bass': 'Bass',
  'drums': 'Drums',
  'jazz-piano': 'JazzPiano',
  'dance': 'Dance',
};

const subjectTitles: Record<string, { title: string; subtitle: string }> = {
  'vocal': { title: '보컬', subtitle: '대중음악 보컬 전문 교육' },
  'composing': { title: '작곡/화성학', subtitle: '작곡 및 화성학 이론 전문 교육' },
  'midi': { title: '미디/전자음악', subtitle: 'MIDI 및 전자음악 프로덕션 교육' },
  'singer-songwriter': { title: '싱어송라이터', subtitle: '보컬과 작곡을 겸비한 아티스트 양성' },
  'guitar': { title: '기타', subtitle: '일렉기타, 어쿠스틱기타 전문 교육' },
  'bass': { title: '베이스', subtitle: '일렉베이스 전문 교육' },
  'drums': { title: '드럼', subtitle: '드럼 전문 교육' },
  'jazz-piano': { title: '재즈피아노', subtitle: '재즈피아노 및 건반 전문 교육' },
  'dance': { title: '댄스', subtitle: '무대 퍼포먼스 및 댄스 교육' },
};

const subjectOrder = ['vocal', 'composing', 'midi', 'singer-songwriter', 'guitar', 'bass', 'drums', 'jazz-piano', 'dance'];

// 모달 컴포넌트
function InstructorModal({
  instructor,
  subjectTitle,
  onClose
}: {
  instructor: Instructor | null;
  subjectTitle: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (instructor) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [instructor]);

  if (!instructor) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '40px 20px',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          maxWidth: '700px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header with image */}
        <div style={{
          padding: '32px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid #ffc50a',
            backgroundColor: '#f5f5f5',
          }}>
            {instructor.image ? (
              <Image
                src={instructor.image}
                alt={instructor.name}
                width={100}
                height={100}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
              }}>
                👤
              </div>
            )}
          </div>
          <div>
            <span style={{
              display: 'inline-block',
              backgroundColor: '#ffc50a',
              color: '#000',
              padding: '4px 12px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '8px',
            }}>
              {subjectTitle} 전공
            </span>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>
              {instructor.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* 자기소개 */}
          {instructor.intro && (
            <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffc50a',
                marginBottom: '12px',
                backgroundColor: '#fffbeb',
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'inline-block',
              }}>
                · 자기소개
              </h4>
              <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {instructor.intro}
              </p>
            </div>
          )}

          {/* 프로필 */}
          {instructor.profile && (
            <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffc50a',
                marginBottom: '12px',
                backgroundColor: '#fffbeb',
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'inline-block',
              }}>
                · 프로필
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {instructor.profile.split('\n').filter(line => line.trim()).map((line, index) => (
                  <li key={index} style={{
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}>
                    <span style={{ color: '#ffc50a', marginTop: '2px' }}>•</span>
                    {line.replace(/^[-•]\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 커리큘럼 */}
          {instructor.curriculum && (
            <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffc50a',
                marginBottom: '12px',
                backgroundColor: '#fffbeb',
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'inline-block',
              }}>
                · 커리큘럼
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {instructor.curriculum.split('\n').filter(line => line.trim()).map((line, index) => (
                  <li key={index} style={{
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}>
                    <span style={{ color: '#ffc50a', marginTop: '2px' }}>•</span>
                    {line.replace(/^[-•]\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 추구하는 음악장르 */}
          {instructor.musicGenres && (
            <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffc50a',
                marginBottom: '12px',
                backgroundColor: '#fffbeb',
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'inline-block',
              }}>
                · 추구하는 음악장르
              </h4>
              <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {instructor.musicGenres}
              </p>
            </div>
          )}

          {/* 추천음반리스트 */}
          {instructor.recommendedAlbums && (
            <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffc50a',
                marginBottom: '12px',
                backgroundColor: '#fffbeb',
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'inline-block',
              }}>
                · 추천음반리스트
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {instructor.recommendedAlbums.split('\n').filter(line => line.trim()).map((line, index) => (
                  <li key={index} style={{
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}>
                    <span style={{ color: '#ffc50a', marginTop: '2px' }}>•</span>
                    {line.replace(/^[-•]\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 레슨생분들께 드리는 말씀 */}
          {instructor.messageToStudents && (
            <div style={{
              padding: '24px',
              backgroundColor: '#111',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                backgroundColor: '#ffc50a',
              }} />
              <p style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffc50a',
                marginBottom: '12px',
              }}>
                · 레슨생분들께 드리는 말씀
              </p>
              <p style={{
                fontSize: '15px',
                color: '#fff',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
              }}>
                {instructor.messageToStudents}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InstructorSubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  const subjectInfo = subjectTitles[subject];
  const subjectName = subjectSlugMap[subject];

  useEffect(() => {
    if (!subjectName) return;

    const fetchInstructors = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/instructors?subject=${subjectName}`);
        const data = await res.json();
        setInstructors(data);
      } catch (error) {
        console.error('Failed to fetch instructors:', error);
      }
      setIsLoading(false);
    };

    fetchInstructors();
  }, [subjectName]);

  if (!subjectInfo) {
    return null;
  }

  const currentIndex = subjectOrder.indexOf(subject);
  const prevSubject = currentIndex > 0 ? subjectOrder[currentIndex - 1] : null;
  const nextSubject = currentIndex < subjectOrder.length - 1 ? subjectOrder[currentIndex + 1] : null;

  return (
    <SubPageLayout
      title={subjectInfo.title}
      subtitle={subjectInfo.subtitle}
      bgImage="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1920&q=80"
    >
      {/* Breadcrumb */}
      <section style={{ padding: '24px 0', backgroundColor: '#f8f8f8', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
            <Link href="/instructors" style={{ color: '#3b82f6', textDecoration: 'none' }}>
              강사진
            </Link>
            <span>/</span>
            <span style={{ color: '#000', fontWeight: 500 }}>{subjectInfo.title}</span>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
              로딩중...
            </div>
          ) : instructors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
              등록된 강사가 없습니다.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '32px',
            }}>
              {instructors.map((instructor) => (
                <div
                  key={instructor.id}
                  onClick={() => setSelectedInstructor(instructor)}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f8f8',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#eee' }}>
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
                        fontSize: '80px',
                        color: '#ccc',
                      }}>
                        👤
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#ffc50a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <p style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#000',
                      marginBottom: '8px',
                    }}>
                      {instructor.name}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#3b82f6',
                      fontWeight: 500,
                    }}>
                      {subjectInfo.title} 전공
                    </p>
                    <p style={{
                      fontSize: '13px',
                      color: '#999',
                      marginTop: '8px',
                    }}>
                      클릭하여 상세정보 보기
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {prevSubject ? (
              <Link
                href={`/instructors/${prevSubject}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {subjectTitles[prevSubject]?.title}
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/instructors"
              style={{
                padding: '12px 24px',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              전체 강사진 보기
            </Link>

            {nextSubject ? (
              <Link
                href={`/instructors/${nextSubject}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              >
                {subjectTitles[nextSubject]?.title}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <InstructorModal
        instructor={selectedInstructor}
        subjectTitle={subjectInfo.title}
        onClose={() => setSelectedInstructor(null)}
      />
    </SubPageLayout>
  );
}
