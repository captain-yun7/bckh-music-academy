'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const allInstructors = [
  { name: '하수지', category: 'Vocal', image: '/images/lecturers/vocal_하수지.jpeg' },
  { name: '김수현', category: 'Vocal', image: '/images/lecturers/vocal_김수현.jpeg' },
  { name: '김한울', category: 'Vocal', image: '/images/lecturers/vocal_김한울.jpg' },
  { name: '이은지', category: 'Vocal', image: '/images/lecturers/vocal_이은지.jpg' },
  { name: '전용일', category: 'Vocal', image: '/images/lecturers/vocal_전용일.jpg' },
  { name: '홍연하', category: 'Vocal', image: '/images/lecturers/vocal_홍연하.png' },
  { name: '이민경', category: 'Piano', image: '/images/lecturers/piano_이민경.jpg' },
  { name: '이소정', category: 'Piano', image: '/images/lecturers/piano_이소정.jpg' },
  { name: '김하영', category: 'Piano', image: '/images/lecturers/piano_김하영.png' },
  { name: '황진하', category: 'Piano', image: '/images/lecturers/piano_황진하.jpg' },
  { name: '노아(Noah)', category: 'Guitar', image: '/images/lecturers/guitar_노아.jpg' },
  { name: '김영롱', category: 'Guitar', image: '/images/lecturers/guitar_김영롱.jpg' },
  { name: '남윤찬', category: 'Guitar', image: '/images/lecturers/guitar_남윤찬.jpg' },
  { name: '현재천', category: 'Bass', image: '/images/lecturers/bass_현재천.jpg' },
  { name: '유종광', category: 'Drums', image: '/images/lecturers/drums_유종광.jpeg' },
  { name: '강혜민', category: 'Composing', image: '/images/lecturers/composing_강혜민.jpg' },
  { name: '이재혁', category: 'MIDI', image: '/images/lecturers/midi_이재혁.jpg' },
  { name: '양지은', category: 'Dance', image: '/images/lecturers/dance_양지은.jpeg' },
];

export default function InstructorsSection() {
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
    <section id="instructors" style={{ padding: '100px 0', backgroundColor: '#111' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              INSTRUCTORS
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
              전문 강사진
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
              현직에서 활동 중인 전문 뮤지션들이 직접 지도합니다.
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
          {allInstructors.map((instructor, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 200px',
                scrollSnapAlign: 'start',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4' }}>
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="200px"
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: '#fff',
                  fontWeight: 500,
                }}>
                  {instructor.category}
                </div>
              </div>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                  {instructor.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            href="/instructors"
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
            전체 강사진 보기
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
