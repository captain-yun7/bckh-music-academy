'use client';

import { useState } from 'react';
import Link from 'next/link';

// 전공별 수강과정
const subjectCourses = [
  {
    id: 'vocal',
    title: 'VOCAL',
    subtitle: '보컬',
    description: '대중음악 보컬 전문 교육',
    features: ['발성법', '호흡법', '가창력 향상', '곡 해석'],
  },
  {
    id: 'piano',
    title: 'PIANO',
    subtitle: '피아노',
    description: '재즈피아노 및 건반 전문 교육',
    features: ['코드 진행', '즉흥 연주', '반주법', '리듬 트레이닝'],
  },
  {
    id: 'guitar',
    title: 'GUITAR',
    subtitle: '기타',
    description: '일렉/어쿠스틱 기타 전문 교육',
    features: ['코드 워크', '솔로 연주', '리듬 기타', '즉흥 연주'],
  },
  {
    id: 'bass',
    title: 'BASS',
    subtitle: '베이스',
    description: '일렉베이스 전문 교육',
    features: ['그루브 메이킹', '슬랩 주법', '리듬 섹션', '앙상블'],
  },
  {
    id: 'drums',
    title: 'DRUMS',
    subtitle: '드럼',
    description: '드럼 전문 교육',
    features: ['기본 비트', '리듬 패턴', '필인', '앙상블'],
  },
  {
    id: 'composing',
    title: 'COMPOSING',
    subtitle: '작곡/화성학',
    description: '작곡 및 화성학 이론 교육',
    features: ['화성학', '편곡', '작곡법', '음악 이론'],
  },
  {
    id: 'midi',
    title: 'MIDI/EMP',
    subtitle: '미디/전자음악',
    description: 'MIDI 및 전자음악 프로덕션',
    features: ['DAW 활용', '사운드 디자인', '믹싱', '마스터링'],
  },
  {
    id: 'songwriting',
    title: 'SONGWRITING',
    subtitle: '싱어송라이터',
    description: '보컬과 작곡을 겸비한 아티스트 양성',
    features: ['작사/작곡', '자작곡 연주', '보컬 퍼포먼스', '스토리텔링'],
  },
  {
    id: 'dance',
    title: 'DANCE',
    subtitle: '댄스',
    description: '무대 퍼포먼스 및 댄스 교육',
    features: ['안무', '보컬 & 댄스', '무대 매너', '퍼포먼스'],
  },
];

// 과정별 수강과정
const programCourses = [
  {
    id: '01',
    title: '입시반',
    subtitle: 'ENTRANCE EXAM',
    target: '4년제/2년제 대학, 고등학교, 대학원 입시',
    features: ['전공레슨', '스텝수업 I, II', '레코딩', '피아노레슨'],
    color: '#ffc50a',
  },
  {
    id: '02',
    title: '오디션반',
    subtitle: 'AUDITION',
    target: '엔터테인먼트 기획사 오디션 대비',
    features: ['보컬 트레이닝', '댄스 & 안무', '모의 테스트', '포트폴리오'],
    color: '#fff',
  },
  {
    id: '03',
    title: '전문반',
    subtitle: 'PROFESSIONAL',
    target: '프로 활동 중인 뮤지션 대상',
    features: ['레벨업 트레이닝', '세션 & 라이브', '음원 제작', '아티스트 브랜딩'],
    color: '#fff',
  },
  {
    id: '04',
    title: '취미반',
    subtitle: 'HOBBY',
    target: '나이/실력 무관, 누구나 환영',
    features: ['1:1 맞춤 레슨', '원하는 곡 수업', '자유 스케줄', '연습실 이용'],
    color: '#fff',
  },
];

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<'subject' | 'program'>('subject');

  return (
    <section id="courses" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div style={{
        padding: '100px 0 40px',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              color: '#ffc50a',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              CURRICULUM
            </p>
            <h2 style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '16px',
            }}>
              수강과정
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px' }}>
              목표와 레벨에 맞는 최적의 커리큘럼
            </p>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '60px',
          }}>
            <button
              onClick={() => setActiveTab('subject')}
              style={{
                padding: '16px 40px',
                fontSize: '16px',
                fontWeight: 600,
                backgroundColor: activeTab === 'subject' ? '#ffc50a' : 'transparent',
                color: activeTab === 'subject' ? '#000' : 'rgba(255,255,255,0.6)',
                border: activeTab === 'subject' ? 'none' : '2px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              전공별
            </button>
            <button
              onClick={() => setActiveTab('program')}
              style={{
                padding: '16px 40px',
                fontSize: '16px',
                fontWeight: 600,
                backgroundColor: activeTab === 'program' ? '#ffc50a' : 'transparent',
                color: activeTab === 'program' ? '#000' : 'rgba(255,255,255,0.6)',
                border: activeTab === 'program' ? 'none' : '2px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              과정별
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ padding: '0 0 80px' }}>
        <div className="container">
          {/* 전공별 - 3x3 그리드 */}
          {activeTab === 'subject' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="subject-grid"
            >
              {subjectCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    padding: '32px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.3s',
                  }}
                >
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#ffc50a',
                    letterSpacing: '0.1em',
                    marginBottom: '12px',
                  }}>
                    {course.title}
                  </p>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '12px',
                  }}>
                    {course.subtitle}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '24px',
                    lineHeight: 1.6,
                  }}>
                    {course.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {course.features.map((feature, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          borderRadius: '100px',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '13px',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 과정별 */}
          {activeTab === 'program' && (
            <div style={{ display: 'grid', gap: '0' }}>
              {programCourses.map((course, index) => (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    alignItems: 'center',
                    padding: '40px 0',
                    borderBottom: index < programCourses.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    gap: '40px',
                  }}
                >
                  {/* Left - Number & Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span style={{
                      fontSize: '48px',
                      fontWeight: 800,
                      color: course.color === '#ffc50a' ? '#ffc50a' : 'rgba(255,255,255,0.15)',
                      fontFamily: 'monospace',
                      minWidth: '80px',
                    }}>
                      {course.id}
                    </span>
                    <div>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.1em',
                        marginBottom: '6px',
                      }}>
                        {course.subtitle}
                      </p>
                      <p style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: course.color === '#ffc50a' ? '#ffc50a' : '#fff',
                      }}>
                        {course.title}
                      </p>
                    </div>
                  </div>

                  {/* Middle - Features */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {course.features.map((feature, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '10px 18px',
                          backgroundColor: course.color === '#ffc50a' ? 'rgba(255,197,10,0.15)' : 'rgba(255,255,255,0.05)',
                          borderRadius: '100px',
                          color: course.color === '#ffc50a' ? '#ffc50a' : 'rgba(255,255,255,0.8)',
                          fontSize: '14px',
                          fontWeight: 500,
                          border: course.color === '#ffc50a' ? '1px solid rgba(255,197,10,0.3)' : '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Right - Target */}
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.6,
                    }}>
                      {course.target}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .subject-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        @media (max-width: 1024px) {
          .subject-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .subject-grid {
            grid-template-columns: 1fr !important;
          }
          div[style*="text-align: right"] {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
