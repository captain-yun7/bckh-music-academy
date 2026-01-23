'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Program {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  icon: string | null;
  image: string | null;
}

// 기본 아이콘 (DB 데이터가 없을 때 사용)
const defaultIcons: Record<string, React.ReactNode> = {
  'ht': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <circle cx="12" cy="5" r="3" />
      <circle cx="4" cy="18" r="3" />
      <circle cx="20" cy="18" r="3" />
      <path d="M12 8v4" />
      <path d="M7 15l5-3 5 3" />
    </svg>
  ),
  'cake-concert': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M12 3v18M5 8l7-5 7 5M5 8v8l7 5 7-5V8" />
    </svg>
  ),
  'open-stage': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M12 7V3M8 3h8" />
      <circle cx="12" cy="14" r="3" />
    </svg>
  ),
  'album': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1" fill="#ffc50a" />
    </svg>
  ),
  'audition': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v4M8 23h8" />
      <path d="M17 4l2-2M7 4L5 2" />
    </svg>
  ),
};

// 기본 프로그램 데이터 (DB 데이터가 없을 때 폴백)
const fallbackPrograms = [
  {
    id: 'ht',
    slug: 'ht',
    name: 'HT 프로그램',
    subtitle: 'Harmony Training',
    description: '그룹 합주를 통한 실전 앙상블 훈련. 밴드 세션과 함께 실제 무대처럼 연습합니다.',
    icon: null,
    image: null,
  },
  {
    id: 'cake-concert',
    slug: 'cake-concert',
    name: '케이크콘서트',
    subtitle: 'Cake Concert',
    description: '정기적으로 열리는 수강생 발표회. 실전 무대 경험을 쌓을 수 있습니다.',
    icon: null,
    image: null,
  },
  {
    id: 'open-stage',
    slug: 'open-stage',
    name: '오픈스테이지',
    subtitle: 'Open Stage',
    description: '자유롭게 무대 경험을 쌓는 공개 공연. 관객 앞에서 실력을 발휘합니다.',
    icon: null,
    image: null,
  },
  {
    id: 'album',
    slug: 'album',
    name: '수강생음반',
    subtitle: 'Student Album',
    description: '전문 스튜디오에서 나만의 음반 제작. 포트폴리오로 활용 가능합니다.',
    icon: null,
    image: null,
  },
  {
    id: 'audition',
    slug: 'audition',
    name: '정기오디션',
    subtitle: 'Regular Audition',
    description: '기획사 관계자 초청 오디션 진행. 데뷔의 기회를 잡으세요.',
    icon: null,
    image: null,
  },
];

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>(fallbackPrograms);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('/api/programs');
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setPrograms(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      }
      setIsLoading(false);
    };

    fetchPrograms();
  }, []);

  const getIcon = (program: Program) => {
    // DB에 아이콘 URL이 있으면 이미지로 표시
    if (program.icon && (program.icon.startsWith('http') || program.icon.startsWith('/'))) {
      return (
        <img
          src={program.icon}
          alt=""
          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
        />
      );
    }
    // 기본 아이콘 사용
    return defaultIcons[program.slug] || defaultIcons['ht'];
  };
  return (
    <section style={{ padding: '100px 0', backgroundColor: '#111' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{
            color: '#ffc50a',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            SPECIAL PROGRAMS
          </p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
          }}>
            특별프로그램
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '17px',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            레슨만으로는 채울 수 없는 실전 경험과 무대 기회를 제공합니다
          </p>
        </div>

        {/* Programs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}>
          {programs.map((program) => (
            <Link
              key={program.id}
              href={`/programs/${program.slug}`}
              style={{
                padding: '32px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ display: 'block', marginBottom: '20px' }}>
                {getIcon(program)}
              </span>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}>
                {program.subtitle}
              </p>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '12px',
              }}>
                {program.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7,
              }}>
                {program.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/programs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              backgroundColor: '#ffc50a',
              color: '#000',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 600,
              transition: 'transform 0.2s',
            }}
          >
            프로그램 자세히 보기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
