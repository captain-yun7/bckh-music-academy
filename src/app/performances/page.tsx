'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';
import ImageLightbox from '@/components/ImageLightbox';
import { imagePresets, getPlaceholderUrl } from '@/lib/image';

interface GalleryImage {
  id: string;
  title: string | null;
  imageUrl: string;
  category: string;
  order: number;
}

export default function PerformancesPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <SubPageLayout
      title="공연 사진"
      subtitle="다양한 무대 경험을 통해 실전 감각을 키워갑니다"
    >
      <section style={{ padding: '80px 0', backgroundColor: '#111' }}>
        <div className="container">
          {isLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
                  <div style={{ aspectRatio: '16/10', backgroundColor: '#333', animation: 'pulse 1.5s ease-in-out infinite' }} />
                </div>
              ))}
              <style jsx global>{`
                @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.5; }
                }
              `}</style>
            </div>
          ) : images.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.5)' }}>
              등록된 공연 사진이 없습니다.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
              {images.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setLightboxOpen(true);
                  }}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#1a1a1a',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                    <Image
                      src={item.imageUrl.includes('cloudinary.com') ? imagePresets.galleryThumb(item.imageUrl) : item.imageUrl}
                      alt={item.title || `공연 ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      placeholder={item.imageUrl.includes('cloudinary.com') ? 'blur' : 'empty'}
                      blurDataURL={item.imageUrl.includes('cloudinary.com') ? getPlaceholderUrl(item.imageUrl) : undefined}
                    />
                  </div>
                  {item.title && (
                    <div style={{ padding: '24px' }}>
                      <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>
                        {item.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Info */}
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '24px' }}>
              정기적인 공연 기회를 통해 무대 경험을 쌓고, 실전 감각을 키워갑니다.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '48px', fontWeight: 700, color: '#fff' }}>12+</p>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>연간 공연 횟수</p>
              </div>
              <div>
                <p style={{ fontSize: '48px', fontWeight: 700, color: '#fff' }}>케이크</p>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>정기 콘서트</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={images[currentIndex]?.imageUrl || ''}
        imageAlt={images[currentIndex]?.title || `공연 ${currentIndex + 1}`}
        onPrev={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        onNext={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        showNavigation={true}
      />
    </SubPageLayout>
  );
}
