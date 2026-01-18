'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageLightbox from './ImageLightbox';
import { imagePresets, getPlaceholderUrl } from '@/lib/image';

interface Musician {
  id: string;
  name: string;
  role: string;
  achievement: string;
  image: string | null;
  snsUrl: string | null;
  order: number;
}

export default function MusiciansSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const res = await fetch('/api/musicians');
        const data = await res.json();
        setMusicians(data);
      } catch (error) {
        console.error('Failed to fetch musicians:', error);
      }
      setIsLoading(false);
    };

    fetchMusicians();
  }, []);

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

  if (isLoading) {
    return (
      <section id="musicians" style={{ padding: '100px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', color: '#999' }}>로딩중...</div>
        </div>
      </section>
    );
  }

  if (musicians.length === 0) {
    return null;
  }

  return (
    <>
      <section id="musicians" style={{ padding: '100px 0', backgroundColor: '#fff' }}>
        <div className="container">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <p style={{ color: '#d4a000', fontSize: '14px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                TRAINEE DEBUT
              </p>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
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
                  border: canScrollLeft ? '2px solid #111' : '2px solid rgba(0,0,0,0.15)',
                  backgroundColor: 'transparent',
                  color: canScrollLeft ? '#111' : 'rgba(0,0,0,0.25)',
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
                  border: canScrollRight ? '2px solid #111' : '2px solid rgba(0,0,0,0.15)',
                  backgroundColor: 'transparent',
                  color: canScrollRight ? '#111' : 'rgba(0,0,0,0.25)',
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
                key={musician.id}
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
                <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#222' }}>
                  {musician.image ? (
                    <Image
                      src={imagePresets.musicianCard(musician.image)}
                      alt={musician.name}
                      fill
                      style={{ objectFit: 'contain', transition: 'transform 0.3s ease' }}
                      sizes="(max-width: 640px) 280px, 300px"
                      quality={90}
                      placeholder="blur"
                      blurDataURL={getPlaceholderUrl(musician.image)}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#222',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                    }}>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                      </svg>
                    </div>
                  )}
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
                backgroundColor: '#111',
                border: '2px solid #111',
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
        description={musicians[currentIndex]?.achievement}
        onPrev={goToPrev}
        onNext={goToNext}
        showNavigation={true}
      />
    </>
  );
}
