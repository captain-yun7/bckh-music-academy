'use client';

import { useState } from 'react';
import Image from 'next/image';
import SubPageLayout from '@/components/SubPageLayout';
import ImageLightbox from '@/components/ImageLightbox';

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

export default function PerformancesGalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + performances.length) % performances.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % performances.length);
  };

  return (
    <>
      <SubPageLayout
        title="공연 사진"
        subtitle="다양한 무대 경험을 통해 실전 감각을 키워갑니다"
        bgImage="/images/performances/performance01.jpg"
      >
        <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
          <div className="container">
            {/* 4x4 Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}
              className="gallery-grid"
            >
              {performances.map((item, index) => (
                <div
                  key={index}
                  onClick={() => openLightbox(index)}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                  className="gallery-item"
                >
                  <Image
                    src={item.image}
                    alt={`공연 ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
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
                    className="gallery-overlay"
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
                      className="gallery-icon"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                        <path d="M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style jsx>{`
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          @media (max-width: 992px) {
            .gallery-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }

          @media (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          .gallery-item:hover {
            transform: scale(1.02);
          }

          .gallery-item:hover .gallery-overlay {
            background-color: rgba(0, 0, 0, 0.3) !important;
          }

          .gallery-item:hover .gallery-icon {
            opacity: 1 !important;
            transform: scale(1) !important;
          }

          .gallery-item:hover img {
            transform: scale(1.05);
          }
        `}</style>
      </SubPageLayout>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={performances[currentIndex]?.image || ''}
        imageAlt={`공연 ${currentIndex + 1}`}
        onPrev={goToPrev}
        onNext={goToNext}
        showNavigation={true}
      />
    </>
  );
}
