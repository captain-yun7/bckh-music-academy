'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const facilities = [
  { title: '레코딩 스튜디오', image: '/images/facilities/facility01.jpg', desc: '전문 녹음 장비 완비' },
  { title: '보컬 연습실', image: '/images/facilities/facility02.jpg', desc: '방음 시설 완비' },
  { title: '피아노실', image: '/images/facilities/facility03.jpg', desc: '그랜드 피아노 보유' },
  { title: '기타 연습실', image: '/images/facilities/facility04.jpg', desc: '앰프 및 이펙터 구비' },
  { title: '드럼 연습실', image: '/images/facilities/facility05.jpg', desc: '전자/어쿠스틱 드럼' },
  { title: '합주실', image: '/images/facilities/facility06.jpg', desc: '밴드 합주 가능' },
  { title: '미디 작업실', image: '/images/facilities/facility07.jpg', desc: '최신 DAW 환경' },
  { title: '댄스 연습실', image: '/images/facilities/facility08.jpg', desc: '전면 거울 설치' },
  { title: '상담실', image: '/images/facilities/facility09.jpg', desc: '편안한 상담 공간' },
  { title: '휴게공간', image: '/images/facilities/facility10.jpg', desc: '쉼과 소통의 공간' },
  { title: '로비', image: '/images/facilities/facility11.jpg', desc: '쾌적한 대기 공간' },
  { title: '복도', image: '/images/facilities/facility12.jpg', desc: '밝고 깨끗한 환경' },
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
      const scrollAmount = 320;
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: '#ffc50a', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              FACILITIES
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
              시설 안내
            </h2>
            <p style={{ color: '#666', fontSize: '17px', lineHeight: 1.6 }}>
              최신 장비와 쾌적한 환경에서 음악에만 집중할 수 있습니다.
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
          {facilities.map((item, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 300px',
                scrollSnapAlign: 'start',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#111',
                position: 'relative',
                transition: 'transform 0.3s',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="300px"
                />
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)',
                }} />
                {/* Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                {/* Description on Image */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            href="/facilities"
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
            전체 시설 보기
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
