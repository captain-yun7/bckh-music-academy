'use client';

import Link from 'next/link';

// 전공 분야 SVG 아이콘
const MajorIcons = {
  vocal: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
    </svg>
  ),
  piano: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 4v10M10 4v10M14 4v10M18 4v10" />
      <path d="M2 14h20" />
    </svg>
  ),
  guitar: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M11.5 8.5L19 1l4 4-7.5 7.5" />
      <path d="M12 12c-3 3-3.5 5.5-1 8s5 2 8-1c2.5-2.5 2-6-.5-8.5S15 7.5 12 12z" />
      <circle cx="11" cy="15" r="1" fill="#ffc50a" />
    </svg>
  ),
  bass: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M3 6l3-3h3l-3 3H3zM3 6v12c0 2 1 3 3 3h3c2 0 3-1 3-3V6" />
      <path d="M6 9v6M9 9v6" />
      <circle cx="7.5" cy="18" r="1" fill="#ffc50a" />
    </svg>
  ),
  drums: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <ellipse cx="12" cy="8" rx="9" ry="4" />
      <path d="M3 8v8c0 2.2 4 4 9 4s9-1.8 9-4V8" />
      <path d="M3 12c0 2.2 4 4 9 4s9-1.8 9-4" />
      <path d="M7 2L5 6M17 2l2 4" />
    </svg>
  ),
  composing: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  midi: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <rect x="4" y="14" width="16" height="6" rx="2" />
      <path d="M9 14V9a3 3 0 0 1 6 0v5" />
      <circle cx="8" cy="17" r="1" fill="#ffc50a" />
      <circle cx="16" cy="17" r="1" fill="#ffc50a" />
    </svg>
  ),
  dance: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v4M12 10l4 4-2 6M12 10l-4 4 2 6" />
      <path d="M8 10l-3-2M16 10l3-2" />
    </svg>
  ),
};

// 전공 분야
const majors = [
  { name: 'VOCAL', korean: '보컬', icon: 'vocal' },
  { name: 'PIANO', korean: '피아노', icon: 'piano' },
  { name: 'GUITAR', korean: '기타', icon: 'guitar' },
  { name: 'BASS', korean: '베이스', icon: 'bass' },
  { name: 'DRUMS', korean: '드럼', icon: 'drums' },
  { name: 'COMPOSING', korean: '작곡', icon: 'composing' },
  { name: 'MIDI', korean: '미디/프로듀싱', icon: 'midi' },
  { name: 'DANCE', korean: '댄스', icon: 'dance' },
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
              <a
                href="https://pf.kakao.com/_xixgxgxmj"
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
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
                <span style={{ marginBottom: '16px', display: 'block' }}>
                  {MajorIcons[major.icon as keyof typeof MajorIcons]}
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
    </section>
  );
}
