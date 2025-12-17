'use client';

import Link from 'next/link';

// 전공 분야
const majors = [
  { name: 'VOCAL', korean: '보컬', icon: '🎤' },
  { name: 'PIANO', korean: '피아노', icon: '🎹' },
  { name: 'GUITAR', korean: '기타', icon: '🎸' },
  { name: 'BASS', korean: '베이스', icon: '🎸' },
  { name: 'DRUMS', korean: '드럼', icon: '🥁' },
  { name: 'COMPOSING', korean: '작곡', icon: '🎼' },
  { name: 'MIDI', korean: '미디/프로듀싱', icon: '🎧' },
  { name: 'DANCE', korean: '댄스', icon: '💃' },
];

export default function AboutSection() {
  return (
    <section id="about" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Hero Section */}
      <div style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <p style={{
              color: '#ffc50a',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}>
              ABOUT ACADEMY
            </p>
            <h2 style={{
              fontSize: 'clamp(40px, 7vw, 72px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '32px',
            }}>
              음악으로<br />
              <span style={{ color: '#ffc50a' }}>꿈을 현실로</span>
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}>
              1999년 개원 이래 25년간 <strong style={{ color: '#fff' }}>1,000명 이상의 합격생</strong>과
              <strong style={{ color: '#fff' }}> 100명 이상의 프로 뮤지션</strong>을 배출한 경희실용음악학원.
              체계적인 커리큘럼과 최강 멘토링 시스템으로 여러분의 음악적 꿈을 현실로 만들어 드립니다.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  backgroundColor: '#ffc50a',
                  borderRadius: '100px',
                  color: '#000',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                학원 소개 자세히
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '100px',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                }}
              >
                상담 신청
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Majors Section */}
      <div style={{ padding: '100px 0', backgroundColor: '#0a0a0a' }}>
        <div className="container">
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            marginBottom: '48px',
          }}>
            전공 분야
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {majors.map((major, index) => (
              <div
                key={index}
                style={{
                  padding: '32px 24px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '32px', marginBottom: '16px', display: 'block' }}>
                  {major.icon}
                </span>
                <p style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '4px',
                }}>
                  {major.name}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                  {major.korean}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Us */}
      <div style={{
        padding: '100px 0',
        backgroundColor: '#111',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}>
            <div style={{
              padding: '48px',
              backgroundColor: '#ffc50a',
              borderRadius: '24px',
            }}>
              <p style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#000',
                lineHeight: 1,
                marginBottom: '16px',
              }}>
                01
              </p>
              <p style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#000',
                marginBottom: '12px',
              }}>
                최강 3인 멘토링
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.7)', lineHeight: 1.7 }}>
                담당강사 · 부강사 · 스텝강사가 함께 지도하는 촘촘한 멘토링 시스템
              </p>
            </div>

            <div style={{
              padding: '48px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <p style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#ffc50a',
                lineHeight: 1,
                marginBottom: '16px',
              }}>
                02
              </p>
              <p style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '12px',
              }}>
                16개 스텝수업
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                전공별 그룹 스텝수업으로 체계적이고 효율적인 학습 진행
              </p>
            </div>

            <div style={{
              padding: '48px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <p style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#ffc50a',
                lineHeight: 1,
                marginBottom: '16px',
              }}>
                03
              </p>
              <p style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '12px',
              }}>
                전문 레코딩
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                전문 녹음실에서 입시/오디션용 포트폴리오 제작 지원
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
