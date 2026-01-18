'use client';

import { useState } from 'react';
import Image from 'next/image';
import SubPageLayout from '@/components/SubPageLayout';
import ImageLightbox from '@/components/ImageLightbox';

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

const ITEMS_PER_PAGE = 16;

export default function FacilitiesGalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(facilities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = facilities.slice(startIndex, endIndex);

  const openLightbox = (index: number) => {
    setCurrentIndex(startIndex + index);
    setLightboxOpen(true);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % facilities.length);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SubPageLayout
        title="시설 사진"
        subtitle="최신 장비와 쾌적한 환경에서 음악에만 집중할 수 있습니다"
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
              {currentItems.map((item, index) => (
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
                    alt={item.title}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '48px',
                }}
              >
                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '10px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: currentPage === 1 ? '#f5f5f5' : '#fff',
                    color: currentPage === 1 ? '#999' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                >
                  이전
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: page === currentPage ? '2px solid #ffc50a' : '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: page === currentPage ? '#ffc50a' : '#fff',
                      color: page === currentPage ? '#000' : '#333',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: page === currentPage ? 700 : 500,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '10px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#fff',
                    color: currentPage === totalPages ? '#999' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                >
                  다음
                </button>
              </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '16px',
                  fontSize: '14px',
                  color: '#999',
                }}
              >
                {facilities.length}개의 사진 중 {startIndex + 1}-{Math.min(endIndex, facilities.length)}
              </p>
            )}
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
        imageSrc={facilities[currentIndex]?.image || ''}
        imageAlt={facilities[currentIndex]?.title || ''}
        title={facilities[currentIndex]?.title}
        onPrev={goToPrev}
        onNext={goToNext}
        showNavigation={true}
      />
    </>
  );
}
