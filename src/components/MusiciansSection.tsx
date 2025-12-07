'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const musicians = [
  {
    name: '문수진',
    role: '싱어송라이터',
    achievement: '음원 발매 및 활발한 활동',
    image: '/images/pride/debut_moon.jpg',
  },
  {
    name: '포테이토',
    role: '아티스트',
    achievement: '음원 발매',
    image: '/images/pride/debut_potato.jpg',
  },
  {
    name: '리사',
    role: '아티스트',
    achievement: '활발한 음악 활동',
    image: '/images/pride/risa.jpg',
  },
  {
    name: '수강생 A',
    role: '프로 뮤지션',
    achievement: '데뷔 및 활동',
    image: '/images/pride/debut_a.jpg',
  },
  {
    name: '수강생 B',
    role: '프로 뮤지션',
    achievement: '데뷔 및 활동',
    image: '/images/pride/debut_b.jpg',
  },
  {
    name: '수강생 C',
    role: '프로 뮤지션',
    achievement: '데뷔 및 활동',
    image: '/images/pride/debut_c.jpg',
  },
];

export default function MusiciansSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="musicians" style={{ padding: '100px 0', backgroundColor: '#000' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              TRAINEE DEBUT
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
              배출 뮤지션
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
              경희실용음악학원을 거쳐 현재 음악계에서 활발히 활동 중인 뮤지션들입니다.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.3)',
                backgroundColor: 'transparent',
                color: canScrollLeft ? '#fff' : 'rgba(255,255,255,0.3)',
                cursor: canScrollLeft ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.3)',
                backgroundColor: 'transparent',
                color: canScrollRight ? '#fff' : 'rgba(255,255,255,0.3)',
                cursor: canScrollRight ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '20px',
          }}
        >
          {musicians.map((musician, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 260px',
                scrollSnapAlign: 'start',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#111',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4' }}>
                <Image
                  src={musician.image}
                  alt={musician.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="260px"
                />
              </div>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                  {musician.name}
                </p>
                <p style={{ fontSize: '13px', color: '#3b82f6', fontWeight: 600, marginBottom: '6px' }}>
                  {musician.role}
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                  {musician.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            href="/musicians"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            전체 뮤지션 보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginTop: '80px',
          paddingTop: '60px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              25+
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              Years of History
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              1000+
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              합격생 배출
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              100+
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              프로 뮤지션 배출
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
