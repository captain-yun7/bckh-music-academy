'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const facilities = [
  { title: '레코딩 스튜디오', image: '/images/facilities/facility01.jpg' },
  { title: '보컬 연습실', image: '/images/facilities/facility02.jpg' },
  { title: '피아노실', image: '/images/facilities/facility03.jpg' },
  { title: '기타 연습실', image: '/images/facilities/facility04.jpg' },
  { title: '드럼 연습실', image: '/images/facilities/facility05.jpg' },
  { title: '합주실', image: '/images/facilities/facility06.jpg' },
  { title: '미디 작업실', image: '/images/facilities/facility07.jpg' },
  { title: '댄스 연습실', image: '/images/facilities/facility08.jpg' },
  { title: '상담실', image: '/images/facilities/facility09.jpg' },
  { title: '휴게공간', image: '/images/facilities/facility10.jpg' },
  { title: '로비', image: '/images/facilities/facility11.jpg' },
  { title: '복도', image: '/images/facilities/facility12.jpg' },
];

export default function FacilitiesSection() {
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
    <section id="facilities" style={{ padding: '100px 0', backgroundColor: '#f8f8f8' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              FACILITIES
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
              시설 안내
            </h2>
            <p style={{ color: '#666', fontSize: '16px' }}>
              최신 장비와 쾌적한 환경에서 음악에만 집중할 수 있습니다.
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
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                color: canScrollLeft ? '#333' : '#ccc',
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
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                color: canScrollRight ? '#333' : '#ccc',
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
          {facilities.map((item, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 320px',
                scrollSnapAlign: 'start',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="320px"
                />
              </div>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '17px', fontWeight: 600, color: '#000' }}>
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            href="/facilities"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              color: '#333',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500,
              backgroundColor: '#fff',
              transition: 'all 0.2s',
            }}
          >
            전체 시설 보기
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
