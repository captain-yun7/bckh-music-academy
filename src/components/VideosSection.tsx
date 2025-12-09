'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

const videos = [
  {
    title: '2024 서울예대 합격생 인터뷰',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
  },
  {
    title: '2024 경희대 실용음악과 합격',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
  },
  {
    title: '2023 동아방송예대 합격 후기',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2023',
  },
  {
    title: '2023 호원대 실용음악 합격',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2023',
  },
  {
    title: '2023 백제예대 합격 인터뷰',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2023',
  },
  {
    title: '2022 한양대 실용음악 합격',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2022',
  },
];

export default function VideosSection() {
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
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="videos" style={{ padding: '100px 0', backgroundColor: '#f8f8f8' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              SUCCESS STORIES
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
              합격 영상
            </h2>
            <p style={{ color: '#666', fontSize: '16px' }}>
              경희실용음악학원 수강생들의 합격 후기와 인터뷰 영상입니다.
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
          {videos.map((video, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 380px',
                scrollSnapAlign: 'start',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
              <div style={{ padding: '20px' }}>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '100px',
                  marginBottom: '10px',
                }}>
                  {video.year}
                </span>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#000' }}>
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            href="/success-videos"
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
            더 많은 영상 보기
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
