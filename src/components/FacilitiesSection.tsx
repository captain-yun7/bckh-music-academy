'use client';

import { useState, useEffect } from 'react';
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

export default function FacilitiesSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery?category=FACILITY');
        if (res.ok) {
          const data = await res.json();
          setImages(data);
        }
      } catch (error) {
        console.error('Failed to fetch facility images:', error);
      }
      setIsLoading(false);
    };
    fetchImages();
  }, []);

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
      <section id="facilities" style={{ padding: '100px 0', backgroundColor: '#fff' }}>
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ color: '#ffc50a', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              FACILITIES
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
              시설 안내
            </h2>
          </div>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}
            className="facilities-grid"
          >
            {images.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                className="facility-item"
              >
                <Image
                  src={item.imageUrl.includes('cloudinary.com') ? imagePresets.galleryThumb(item.imageUrl) : item.imageUrl}
                  alt={item.title || `시설 ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading={index < 3 ? 'eager' : 'lazy'}
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
                  className="facility-overlay"
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
                    className="facility-icon"
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

          {/* View All Link */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/gallery/facilities"
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
          .facilities-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          @media (max-width: 768px) {
            .facilities-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          @media (max-width: 480px) {
            .facilities-grid {
              grid-template-columns: 1fr !important;
            }
          }

          .facility-item:hover {
            transform: scale(1.02);
          }

          .facility-item:hover .facility-overlay {
            background-color: rgba(0, 0, 0, 0.3) !important;
          }

          .facility-item:hover .facility-icon {
            opacity: 1 !important;
            transform: scale(1) !important;
          }

          .facility-item:hover img {
            transform: scale(1.05);
          }
        `}</style>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={images[currentIndex]?.imageUrl || ''}
        imageAlt={images[currentIndex]?.title || ''}
        title={images[currentIndex]?.title || undefined}
        onPrev={goToPrev}
        onNext={goToNext}
        showNavigation={true}
      />
    </>
  );
}
