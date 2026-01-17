'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';

interface Musician {
  id: string;
  name: string;
  role: string;
  achievement: string;
  image: string | null;
  snsUrl: string | null;
  order: number;
}

export default function MusiciansPage() {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const res = await fetch('/api/musicians');
        const data = await res.json();
        setMusicians(data);
      } catch (error) {
        console.error('Failed to fetch musicians:', error);
      }
      setIsLoading(false);
    };

    fetchMusicians();
  }, []);

  return (
    <SubPageLayout
      title="배출 뮤지션"
      subtitle="경희실용음악학원을 거쳐 음악계에서 활동 중인 뮤지션들"
      bgImage="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              경희실용음악학원은 2007년 개원 이래<br />
              <strong style={{ color: '#ffc50a' }}>수많은 프로 뮤지션</strong>을 배출해왔습니다.<br />
              현재 국내 음악계에서 활발히 활동하는 졸업생들을 소개합니다.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
              로딩중...
            </div>
          ) : musicians.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
              등록된 뮤지션이 없습니다.
            </div>
          ) : (
            <>
              {/* Musicians Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {musicians.map((musician) => (
                  <div
                    key={musician.id}
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: '#111',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: '#222' }}>
                      {musician.image ? (
                        <Image
                          src={musician.image}
                          alt={musician.name}
                          fill
                          style={{ objectFit: 'contain' }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#666',
                        }}>
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M20 21a8 8 0 0 0-16 0" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '24px' }}>
                      <p style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                        {musician.name}
                      </p>
                      <p style={{ fontSize: '14px', color: '#ffc50a', fontWeight: 600, marginBottom: '12px' }}>
                        {musician.role}
                      </p>
                      <p style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.6)',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '12px',
                        marginTop: '12px',
                        lineHeight: 1.6,
                      }}>
                        {musician.achievement}
                      </p>
                      {musician.snsUrl && (
                        <a
                          href={musician.snsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '12px',
                            color: '#3b82f6',
                            fontSize: '13px',
                            textDecoration: 'none',
                          }}
                        >
                          SNS 바로가기
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginTop: '100px',
            padding: '60px 40px',
            backgroundColor: '#ffc50a',
            borderRadius: '20px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#000', lineHeight: 1 }}>
                18+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.7)', marginTop: '12px' }}>
                Years of History
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#000', lineHeight: 1 }}>
                1000+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.7)', marginTop: '12px' }}>
                합격생 배출
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#000', lineHeight: 1 }}>
                100+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.7)', marginTop: '12px' }}>
                프로 뮤지션 배출
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
