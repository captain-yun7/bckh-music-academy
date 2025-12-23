'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageLightbox from './ImageLightbox';

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + musicians.length) % musicians.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % musicians.length);
  };

  return (
    <>
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
                onClick={() => openLightbox(index)}
                style={{
                  flex: '0 0 300px',
                  scrollSnapAlign: 'start',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#111',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                }}
                className="musician-item"
              >
                <div style={{ position: 'relative', aspectRatio: '3/4' }}>
                  <Image
                    src={musician.image}
                    alt={musician.name}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
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
                  {/* Hover Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0)',
                      transition: 'background-color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="musician-overlay"
                  >
                    <div
                      style={{
                        padding: '12px',
                        backgroundColor: 'rgba(255, 197, 10, 0.9)',
                        borderRadius: '50%',
                        opacity: 0,
                        transform: 'scale(0.8)',
                        transition: 'all 0.3s ease',
                      }}
                      className="musician-icon"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                        <path d="M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </div>
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

          .musician-item:hover {
            transform: scale(1.02);
          }

          .musician-item:hover .musician-overlay {
            background-color: rgba(0, 0, 0, 0.2) !important;
          }

          .musician-item:hover .musician-icon {
            opacity: 1 !important;
            transform: scale(1) !important;
          }

          .musician-item:hover img {
            transform: scale(1.05);
          }
        `}</style>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={musicians[currentIndex]?.image || ''}
        imageAlt={musicians[currentIndex]?.name || ''}
        title={musicians[currentIndex]?.name}
        description={musicians[currentIndex]?.description}
        onPrev={goToPrev}
        onNext={goToNext}
        showNavigation={true}
      />
    </>
  );
}
