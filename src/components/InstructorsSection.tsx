'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InstructorModal, { InstructorData } from '@/components/InstructorModal';
import { imagePresets, getPlaceholderUrl } from '@/lib/image';

export default function InstructorsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorData | null>(null);
  const [instructors, setInstructors] = useState<InstructorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        // 메인페이지용 순서로 정렬된 강사 목록 가져오기
        const res = await fetch('/api/instructors?mainPage=true');
        if (res.ok) {
          const data = await res.json();
          // 메인페이지에 설정된 강사가 없으면 전체 목록에서 가져오기
          if (data.length === 0) {
            const allRes = await fetch('/api/instructors');
            if (allRes.ok) {
              const allData = await allRes.json();
              setInstructors(allData);
            }
          } else {
            setInstructors(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch instructors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructors();
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
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  const openModal = (instructor: InstructorData) => {
    setSelectedInstructor(instructor);
  };

  // 강사의 첫 번째 과목명을 가져오기
  const getFirstSubjectName = (instructor: InstructorData) => {
    if (instructor.subjects && instructor.subjects.length > 0) {
      return instructor.subjects[0].subject.nameKo;
    }
    return '';
  };

  return (
    <>
      <section id="instructors" style={{ padding: '100px 0', backgroundColor: '#fff' }}>
        <div className="container">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <p style={{ color: '#ffc50a', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                INSTRUCTORS
              </p>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                강사진
              </h2>
              <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px' }}>
                현직에서 활동 중인 프로뮤지션들이 직접 지도합니다.
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
                  border: canScrollLeft ? '2px solid #ffc50a' : '2px solid rgba(0,0,0,0.2)',
                  backgroundColor: 'transparent',
                  color: canScrollLeft ? '#ffc50a' : 'rgba(0,0,0,0.3)',
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
                  border: canScrollRight ? '2px solid #ffc50a' : '2px solid rgba(0,0,0,0.2)',
                  backgroundColor: 'transparent',
                  color: canScrollRight ? '#ffc50a' : 'rgba(0,0,0,0.3)',
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
          {isLoading ? (
            <div style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'hidden',
              paddingBottom: '20px',
              marginBottom: '40px',
            }}>
              {/* 스켈레톤 로딩 UI */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: '0 0 180px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <div style={{
                    aspectRatio: '3/4',
                    backgroundColor: '#e5e5e5',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }} />
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{
                      height: '20px',
                      backgroundColor: '#e5e5e5',
                      borderRadius: '4px',
                      width: '60%',
                      margin: '0 auto',
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          ) : instructors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: '#999' }}>등록된 강사가 없습니다.</p>
            </div>
          ) : (
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
                marginBottom: '40px',
                marginLeft: '-20px',
                marginRight: '-20px',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}
            >
              {instructors.map((instructor, index) => (
                <div
                  key={instructor.id}
                  onClick={() => openModal(instructor)}
                  style={{
                    flex: '0 0 180px',
                    scrollSnapAlign: 'start',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                  }}
                  className="instructor-item"
                >
                  <div style={{ position: 'relative', aspectRatio: '3/4' }}>
                    {instructor.image ? (
                      <Image
                        src={imagePresets.instructorCard(instructor.image)}
                        alt={instructor.name}
                        fill
                        style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        sizes="(max-width: 640px) 160px, 180px"
                        loading={index < 4 ? 'eager' : 'lazy'}
                        priority={index < 2}
                        placeholder="blur"
                        blurDataURL={getPlaceholderUrl(instructor.image)}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#e5e5e5',
                        fontSize: '48px',
                      }}>
                        👤
                      </div>
                    )}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 10px',
                      backgroundColor: '#ffc50a',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#000',
                      fontWeight: 600,
                    }}>
                      {getFirstSubjectName(instructor)}
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
                      className="instructor-overlay"
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
                        className="instructor-icon"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35" />
                          <path d="M11 8v6M8 11h6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <p style={{ fontSize: '16px', fontWeight: 600, color: '#000' }}>
                      {instructor.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Link */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/instructors"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: '#000',
                borderRadius: '100px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              강사진프로필 상세보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }

          .instructor-item:hover {
            transform: scale(1.02);
          }

          .instructor-item:hover .instructor-overlay {
            background-color: rgba(0, 0, 0, 0.3) !important;
          }

          .instructor-item:hover .instructor-icon {
            opacity: 1 !important;
            transform: scale(1) !important;
          }

          .instructor-item:hover img {
            transform: scale(1.05);
          }
        `}</style>
      </section>

      {/* Modal */}
      <InstructorModal
        instructor={selectedInstructor}
        onClose={() => setSelectedInstructor(null)}
      />
    </>
  );
}
