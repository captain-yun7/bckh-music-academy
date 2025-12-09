'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const musicians = [
  {
    name: '문별',
    generation: '4기',
    role: '마마무 멤버',
    achievement: '마마무 활동중',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=500&fit=crop',
  },
  {
    name: '나다',
    generation: '3기',
    role: '래퍼 / 방송인',
    achievement: '와썹, 쇼미더머니3, 언프리티랩스타',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop',
  },
  {
    name: '신이삭',
    generation: '5기',
    role: '세션 드러머',
    achievement: '악뮤/에픽하이/잔나비 세션',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=500&fit=crop',
  },
  {
    name: '이종훈',
    generation: '10기',
    role: '슈퍼밴드 출연',
    achievement: '케빈오와 애프터문',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=500&fit=crop',
  },
  {
    name: '고석우',
    generation: '13기',
    role: 'KPOP 작곡가',
    achievement: '화사, 로시 등 곡 작업',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=500&fit=crop',
  },
  {
    name: '박진오',
    generation: '14기',
    role: '래퍼',
    achievement: '고등랩퍼, 쇼미더머니',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=500&fit=crop',
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
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                }}>
                  {musician.generation}
                </div>
              </div>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                  {musician.name}
                </p>
                <p style={{ fontSize: '13px', color: '#ffc50a', fontWeight: 600, marginBottom: '6px' }}>
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
              backgroundColor: '#ffc50a',
              borderRadius: '8px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
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
          padding: '60px 40px',
          backgroundColor: '#ffc50a',
          borderRadius: '20px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, color: '#000', lineHeight: 1 }}>
              18+
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.7)', marginTop: '12px' }}>
              Years of History
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, color: '#000', lineHeight: 1 }}>
              1000+
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.7)', marginTop: '12px' }}>
              합격생 배출
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, color: '#000', lineHeight: 1 }}>
              100+
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.7)', marginTop: '12px' }}>
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
