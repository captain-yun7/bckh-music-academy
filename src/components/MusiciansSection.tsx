'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 배출 뮤지션 데이터 (khmusic.co.kr 실제 데이터)
const musicians = [
  {
    name: '문별',
    group: '마마무',
    role: '래퍼 / 싱어송라이터',
    achievement: '마마무 멤버, 솔로 활동',
    description: '대한민국 대표 걸그룹 마마무의 래퍼이자 서브보컬. 작사, 작곡에도 참여하며 솔로 아티스트로도 활발히 활동 중',
    image: '/images/musicians/moonbyul.jpg',
  },
  {
    name: '나다',
    realName: '윤예진',
    group: '와썹',
    role: '래퍼 / 방송인',
    achievement: '쇼미더머니3, 언프리티랩스타',
    description: '걸그룹 와썹 출신 래퍼. Mnet 쇼미더머니3, 언프리티랩스타 출연으로 주목받았으며 현재 방송인으로도 활동',
    image: '/images/musicians/nada.jpg',
  },
  {
    name: '이종훈',
    group: '애프터문',
    role: '보컬 / 기타리스트',
    achievement: '슈퍼밴드, 케빈오와 애프터문',
    description: 'JTBC 슈퍼밴드 출연, 케빈오와 애프터문 멤버로 활동하며 독보적인 음악 세계를 구축',
    image: '/images/musicians/aftermoon.jpg',
  },
  {
    name: '웰던포테이토',
    group: '밴드',
    role: '인디밴드',
    achievement: '인디씬 활동',
    description: '감각적인 사운드와 독특한 음악 색깔로 인디음악 씬에서 주목받는 밴드',
    image: '/images/musicians/weldonpotato.jpg',
  },
  {
    name: '리싸',
    group: '솔로',
    role: 'R&B 아티스트',
    achievement: '솔로 활동',
    description: '감성적인 R&B 보컬로 주목받는 솔로 아티스트',
    image: '/images/musicians/risa.jpg',
  },
  {
    name: '주대건',
    group: '소리얼',
    role: '보컬',
    achievement: '소리얼 멤버',
    description: '혼성 보컬 그룹 소리얼의 멤버로 활동',
    image: '/images/musicians/soreal.jpg',
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
      const scrollAmount = 320;
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: '#ffc50a', fontSize: '14px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              TRAINEE DEBUT
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
              배출 뮤지션
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: 1.6 }}>
              경희실용음악학원을 거쳐 현재 음악계에서 활발히 활동 중인 뮤지션들입니다
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
                border: canScrollLeft ? '2px solid #ffc50a' : '2px solid rgba(255,255,255,0.2)',
                backgroundColor: 'transparent',
                color: canScrollLeft ? '#ffc50a' : 'rgba(255,255,255,0.3)',
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
                border: canScrollRight ? '2px solid #ffc50a' : '2px solid rgba(255,255,255,0.2)',
                backgroundColor: 'transparent',
                color: canScrollRight ? '#ffc50a' : 'rgba(255,255,255,0.3)',
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
                flex: '0 0 300px',
                scrollSnapAlign: 'start',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#111',
                transition: 'transform 0.3s ease',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4' }}>
                <Image
                  src={musician.image}
                  alt={musician.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="300px"
                />
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 60%)',
                }} />
                {/* Info on Image */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                }}>
                  <p style={{ fontSize: '13px', color: '#ffc50a', fontWeight: 600, marginBottom: '6px' }}>
                    {musician.role}
                  </p>
                  <p style={{ fontSize: '26px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                    {musician.name}
                  </p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    {musician.achievement}
                  </p>
                </div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#111' }}>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                  {musician.description}
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
              backgroundColor: 'transparent',
              border: '2px solid #ffc50a',
              borderRadius: '50px',
              color: '#ffc50a',
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

      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
