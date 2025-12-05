'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const musicians = [
  {
    name: '김OO',
    role: '싱어송라이터',
    achievement: '2023 데뷔, 음원 발매',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop',
  },
  {
    name: '이OO',
    role: '보컬리스트',
    achievement: '오디션 프로그램 본선 진출',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  },
  {
    name: '박OO',
    role: '작곡가/프로듀서',
    achievement: '다수 아이돌 곡 작업',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop',
  },
  {
    name: '최OO',
    role: '세션 기타리스트',
    achievement: '유명 아티스트 투어 세션',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop',
  },
  {
    name: '정OO',
    role: '래퍼',
    achievement: '힙합 레이블 소속',
    image: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=400&h=400&fit=crop',
  },
  {
    name: '한OO',
    role: '뮤지컬 배우',
    achievement: '대학로 뮤지컬 주연',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
];

export default function MusiciansSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.musician-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="musicians"
      ref={sectionRef}
      style={{ padding: '120px 0', backgroundColor: '#000' }}
    >
      <div className="container">
        {/* Section Header */}
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
          ALUMNI
        </p>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
          배출 뮤지션
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '60px', maxWidth: '600px' }}>
          경희실용음악학원을 거쳐 현재 음악계에서 활발히 활동 중인 뮤지션들입니다.
        </p>

        {/* Musicians Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {musicians.map((musician, index) => (
            <div
              key={index}
              className="musician-item"
              style={{
                textAlign: 'center',
              }}
            >
              <div style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                margin: '0 auto 24px',
                borderRadius: '50%',
                overflow: 'hidden',
              }}>
                <Image
                  src={musician.image}
                  alt={musician.name}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <p style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                {musician.name}
              </p>
              <p style={{ fontSize: '16px', color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                {musician.role}
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                {musician.achievement}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginTop: '100px',
          paddingTop: '60px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              25+
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              Years of History
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              1000+
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              합격생 배출
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              100+
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              프로 뮤지션 배출
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
