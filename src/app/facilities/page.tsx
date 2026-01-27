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

export default function FacilitiesPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <SubPageLayout
      title="시설 사진"
      subtitle="최신 장비와 쾌적한 환경에서 음악에 집중하세요"
    >
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          {isLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff' }}>
                  <div style={{ aspectRatio: '4/3', backgroundColor: '#e5e5e5', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <div style={{ height: '20px', backgroundColor: '#e5e5e5', borderRadius: '4px', width: '60%', margin: '0 auto', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  </div>
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
            <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
              등록된 시설 사진이 없습니다.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
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
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                    <Image
                      src={item.imageUrl.includes('cloudinary.com') ? imagePresets.galleryThumb(item.imageUrl) : item.imageUrl}
                      alt={item.title || `시설 ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading={index < 6 ? 'eager' : 'lazy'}
                      placeholder={item.imageUrl.includes('cloudinary.com') ? 'blur' : 'empty'}
                      blurDataURL={item.imageUrl.includes('cloudinary.com') ? getPlaceholderUrl(item.imageUrl) : undefined}
                    />
                  </div>
                  {item.title && (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <p style={{ fontSize: '18px', fontWeight: 600, color: '#000' }}>
                        {item.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={images[currentIndex]?.imageUrl || ''}
        imageAlt={images[currentIndex]?.title || ''}
        title={images[currentIndex]?.title || undefined}
        onPrev={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        onNext={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        showNavigation={true}
      />
    </SubPageLayout>
  );
}
