'use client';

import Link from 'next/link';

const courses = [
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
    title: '랩/HIPHOP',
    subtitle: 'RAP & HIPHOP',
    target: '래퍼/힙합 프로듀서 양성',
    features: ['랩 메이킹', '플로우 트레이닝', '비트 프로듀싱', '믹스테입 제작'],
    color: '#fff',
  },
  {
    id: '04',
    title: '전문반',
    subtitle: 'PROFESSIONAL',
    target: '프로 활동 중인 뮤지션 대상',
    features: ['레벨업 트레이닝', '세션 & 라이브', '음원 제작', '아티스트 브랜딩'],
    color: '#fff',
  },
  {
    id: '05',
    title: '취미반',
    subtitle: 'HOBBY',
    target: '나이/실력 무관, 누구나 환영',
    features: ['1:1 맞춤 레슨', '원하는 곡 수업', '자유 스케줄', '연습실 이용'],
    color: '#fff',
  },
];

const benefits = [
  { icon: '🎵', title: '연습실 무제한', desc: '운영시간 내 자유롭게 연습' },
  { icon: '🎙️', title: '전문 레코딩', desc: '녹음실 포트폴리오 제작' },
  { icon: '🎤', title: '정기 공연', desc: '케이크콘서트 무대 경험' },
  { icon: '👥', title: '3인 멘토링', desc: '담당·부·스텝강사 지도' },
];

export default function CoursesSection() {
  return (
    <section id="courses" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div style={{
        padding: '100px 0 60px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
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
            <Link
              href="/courses"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'transparent',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '100px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              전체 과정 보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gap: '0',
          }}>
            {courses.map((course, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  alignItems: 'center',
                  padding: '40px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
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
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{
        padding: '80px 0',
        backgroundColor: '#111',
      }}>
        <div className="container">
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            marginBottom: '48px',
            textAlign: 'center',
          }}>
            수강생 혜택
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                style={{
                  padding: '40px 32px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '40px', display: 'block', marginBottom: '20px' }}>
                  {benefit.icon}
                </span>
                <p style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '10px',
                }}>
                  {benefit.title}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #ffc50a 0%, #ffb700 100%)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px',
          }}>
            <div>
              <p style={{
                fontSize: 'clamp(28px, 5vw, 40px)',
                fontWeight: 700,
                color: '#000',
                marginBottom: '12px',
              }}>
                무료 상담 신청
              </p>
              <p style={{
                fontSize: '17px',
                color: 'rgba(0,0,0,0.7)',
              }}>
                레벨테스트 후 맞춤 커리큘럼을 제안해 드립니다
              </p>
            </div>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                backgroundColor: '#000',
                borderRadius: '100px',
                color: '#ffc50a',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              상담 신청하기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="text-align: right"] {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
