'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const performances = [
  { image: '/images/performances/performance01.jpg' },
  { image: '/images/performances/performance02.jpg' },
  { image: '/images/performances/performance03.jpg' },
  { image: '/images/performances/performance04.jpg' },
  { image: '/images/performances/performance05.jpg' },
  { image: '/images/performances/performance06.jpg' },
  { image: '/images/performances/performance07.jpg' },
  { image: '/images/performances/performance08.jpg' },
  { image: '/images/performances/performance09.jpg' },
  { image: '/images/performances/performance10.jpg' },
  { image: '/images/performances/performance11.jpg' },
  { image: '/images/performances/performance12.jpg' },
  { image: '/images/performances/performance13.jpg' },
  { image: '/images/performances/performance14.jpg' },
  { image: '/images/performances/performance15.jpg' },
];

export default function PerformancesSection() {
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
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="performances" style={{ padding: '100px 0', backgroundColor: '#000' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              PERFORMANCES
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
              공연 사진
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
              다양한 무대 경험을 통해 실전 감각을 키워갑니다.
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
          {performances.map((item, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 320px',
                scrollSnapAlign: 'start',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#111',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/2' }}>
                <Image
                  src={item.image}
                  alt={`공연 ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="320px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            href="/performances"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              border: '2px solid #ffc50a',
              borderRadius: '8px',
              color: '#ffc50a',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            전체 공연 보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
