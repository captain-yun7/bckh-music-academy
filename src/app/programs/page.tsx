'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';
import Link from 'next/link';

interface Program {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  image: string | null;
}

// 기본 프로그램 데이터 (DB 데이터가 없을 때 폴백)
const fallbackPrograms: Program[] = [
  {
    id: 'ht',
    slug: 'ht',
    name: 'HT 프로그램',
    subtitle: 'Harmony Training',
    description: '그룹 합주를 통한 실전 앙상블 훈련',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
  },
  {
    id: 'cake-concert',
    slug: 'cake-concert',
    name: '케이크콘서트',
    subtitle: 'Cake Concert',
    description: '정기적으로 열리는 수강생 발표회',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
  },
  {
    id: 'open-stage',
    slug: 'open-stage',
    name: '오픈스테이지',
    subtitle: 'Open Stage',
    description: '자유롭게 무대 경험을 쌓는 공개 공연',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
  },
  {
    id: 'album',
    slug: 'album',
    name: '수강생음반',
    subtitle: 'Student Album',
    description: '전문 스튜디오에서 나만의 음반 제작',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
  },
  {
    id: 'audition',
    slug: 'audition',
    name: '정기오디션',
    subtitle: 'Regular Audition',
    description: '기획사 관계자 초청 오디션 진행',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
  },
  {
    id: 'busking',
    slug: 'busking',
    name: '버스킹',
    subtitle: 'Busking',
    description: '야외에서 진행되는 편안한 분위기의 어쿠스틱 공연',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
  },
];

// 기본 이미지 (DB에 이미지가 없을 때)
const defaultImages: Record<string, string> = {
  'ht': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
  'cake-concert': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
  'open-stage': 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
  'album': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
  'audition': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
  'busking': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
};

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>(fallbackPrograms);

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
    };

    fetchPrograms();
  }, []);

  const getImage = (program: Program) => {
    if (program.image) return program.image;
    return defaultImages[program.slug] || defaultImages['ht'];
  };

  return (
    <SubPageLayout
      title="특별프로그램"
      subtitle="차별화된 경희만의 프로그램"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            레슨만으로는 채울 수 없는 실전 경험과 무대 기회를<br />
            경희만의 특별 프로그램으로 제공합니다.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          gap: '20px',
          paddingBottom: '20px',
          paddingLeft: 'max(20px, calc((100vw - 1700px) / 2))',
          paddingRight: 'max(20px, calc((100vw - 1700px) / 2))',
        }}>
            {programs.map((program) => (
              <Link
                key={program.id}
                href={`/programs/${program.slug}`}
                style={{
                  flex: '0 0 min(320px, 85vw)',
                  scrollSnapAlign: 'start',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#f8f8f8',
                  transition: 'transform 0.3s ease',
                  height: '100%',
                }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                    <Image
                      src={getImage(program)}
                      alt={program.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                    }}>
                      <p style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.8)',
                        letterSpacing: '0.1em',
                        marginBottom: '4px',
                      }}>
                        {program.subtitle}
                      </p>
                      <p style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: '#fff',
                      }}>
                        {program.name}
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <p style={{
                      fontSize: '15px',
                      color: '#666',
                      marginBottom: '16px',
                      lineHeight: 1.6,
                    }}>
                      {program.description}
                    </p>
                    <span style={{
                      fontSize: '14px',
                      color: '#3b82f6',
                      fontWeight: 600,
                    }}>
                      자세히 보기 →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    </SubPageLayout>
  );
}
