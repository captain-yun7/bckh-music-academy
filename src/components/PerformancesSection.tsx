'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageLightbox from './ImageLightbox';
import { imagePresets, getPlaceholderUrl } from '@/lib/image';

interface GalleryImage {
  id: string;
  title: string | null;
  imageUrl: string;
  category: string;
  order: number;
}

export default function PerformancesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery?category=PERFORMANCE');
        if (res.ok) {
          const data = await res.json();
          setImages(data);
        }
      } catch (error) {
        console.error('Failed to fetch performance images:', error);
      }
      setIsLoading(false);
    };
    fetchImages();
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
      const scrollAmount = 350;
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
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (isLoading || images.length === 0) {
    return null;
  }

  return (
    <>
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
            {images.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                style={{
                  flex: '0 0 320px',
                  scrollSnapAlign: 'start',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#111',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                className="performance-item"
              >
                <div style={{ position: 'relative', aspectRatio: '3/2' }}>
                  <Image
                    src={item.imageUrl.includes('cloudinary.com') ? imagePresets.galleryThumb(item.imageUrl) : item.imageUrl}
                    alt={item.title || `공연 ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    sizes="320px"
                    loading={index < 4 ? 'eager' : 'lazy'}
                    placeholder={item.imageUrl.includes('cloudinary.com') ? 'blur' : 'empty'}
                    blurDataURL={item.imageUrl.includes('cloudinary.com') ? getPlaceholderUrl(item.imageUrl) : undefined}
                  />
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
                    className="performance-overlay"
                  >
                    <div
                      style={{
                        padding: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '50%',
                        opacity: 0,
                        transform: 'scale(0.8)',
                        transition: 'all 0.3s ease',
                      }}
                      className="performance-icon"
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
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link
              href="/gallery/performances"
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

          .performance-item:hover {
            transform: scale(1.02);
          }

          .performance-item:hover .performance-overlay {
            background-color: rgba(0, 0, 0, 0.3) !important;
          }

          .performance-item:hover .performance-icon {
            opacity: 1 !important;
            transform: scale(1) !important;
          }

          .performance-item:hover img {
            transform: scale(1.05);
          }
        `}</style>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={images[currentIndex]?.imageUrl || ''}
        imageAlt={images[currentIndex]?.title || `공연 ${currentIndex + 1}`}
        onPrev={goToPrev}
        onNext={goToNext}
        showNavigation={true}
      />
    </>
  );
}
