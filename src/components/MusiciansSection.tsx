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
    <section id="musicians" style={{ padding: '100px 0', backgroundColor: '#f8f8f8' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: '#ffc50a', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              TRAINEE DEBUT
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
              배출 뮤지션
            </h2>
            <p style={{ color: '#666', fontSize: '17px', lineHeight: 1.6 }}>
              경희실용음악학원을 거쳐 현재 음악계에서 활발히 활동 중인 뮤지션들입니다.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: canScrollLeft ? '2px solid #000' : '2px solid #ddd',
                backgroundColor: '#fff',
                color: canScrollLeft ? '#000' : '#ccc',
                cursor: canScrollLeft ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: canScrollRight ? '2px solid #000' : '2px solid #ddd',
                backgroundColor: '#fff',
                color: canScrollRight ? '#000' : '#ccc',
                cursor: canScrollRight ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '20px',
            marginLeft: '-20px',
            marginRight: '-20px',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          {musicians.map((musician, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 280px',
                scrollSnapAlign: 'start',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4' }}>
                <Image
                  src={musician.image}
                  alt={musician.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="280px"
                />
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 40%)',
                }} />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}>
                  {musician.generation}
                </div>
                {/* Info on Image */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                }}>
                  <p style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                    {musician.name}
                  </p>
                  <p style={{ fontSize: '14px', color: '#ffc50a', fontWeight: 600 }}>
                    {musician.role}
                  </p>
                </div>
              </div>
              <div style={{ padding: '16px 20px', backgroundColor: '#fff' }}>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                  {musician.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            href="/musicians"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              backgroundColor: '#000',
              borderRadius: '50px',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 600,
              transition: 'all 0.3s',
            }}
          >
            전체 뮤지션 보기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
          backgroundColor: '#000',
          borderRadius: '20px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, color: '#ffc50a', lineHeight: 1 }}>
              18+
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginTop: '12px' }}>
              Years of History
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, color: '#ffc50a', lineHeight: 1 }}>
              1000+
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginTop: '12px' }}>
              합격생 배출
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, color: '#ffc50a', lineHeight: 1 }}>
              100+
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginTop: '12px' }}>
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
