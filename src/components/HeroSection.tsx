'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface Slide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  buttonText?: string | null;
  buttonLink?: string | null;
}

// 기본 슬라이드 (DB가 비어있을 때 사용)
const defaultSlides: Slide[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&q=80',
    title: '음악의 꿈을 현실로',
    subtitle: '25년 전통의 경희실용음악학원',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80',
    title: '최고의 강사진',
    subtitle: '현역 뮤지션 출신 전문 강사진이 함께합니다',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80',
    title: '전문 시설',
    subtitle: '최신 장비와 쾌적한 연습실 환경',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1920&q=80',
    title: '1000+ 합격생 배출',
    subtitle: '실용음악과 입시 합격의 산실',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1920&q=80',
    title: '다양한 전공',
    subtitle: '보컬 · 피아노 · 기타 · 베이스 · 드럼 · 작곡',
  },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);

  // 슬라이드 데이터 로드
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('/api/hero-slides');
        const data = await res.json();
        if (data && data.length > 0) {
          setSlides(data);
        }
      } catch {
        // API 실패 시 기본 슬라이드 유지
      }
    };

    fetchSlides();
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play functionality - always running
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-stats-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.6,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        maxHeight: '900px',
        overflow: 'hidden',
      }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            transition: 'opacity 1s ease-in-out',
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 10 : 0,
          }}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        </div>
      ))}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className="container">
          <div className="hero-content" style={{ maxWidth: '800px' }}>
            {/* Badge */}
            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '9999px',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Since 2007
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(36px, 8vw, 72px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '24px',
                lineHeight: 1.2,
              }}
            >
              {slides[currentSlide]?.title}
            </h1>

            {/* Subtitle */}
            {slides[currentSlide]?.subtitle && (
              <p
                style={{
                  fontSize: 'clamp(18px, 3vw, 24px)',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '40px',
                }}
              >
                {slides[currentSlide].subtitle}
              </p>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a
                href={slides[currentSlide]?.buttonLink || 'https://pf.kakao.com/_xixgxgxmj'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                }}
              >
                {slides[currentSlide]?.buttonText || '상담 신청하기'}
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#courses"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderRadius: '9999px',
                  border: '2px solid white',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                }}
              >
                과정 알아보기
              </a>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              marginTop: '80px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
            }}
          >
            <div className="hero-stats-item">
              <p style={{ fontSize: '36px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>25+</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Years of Excellence</p>
            </div>
            <div className="hero-stats-item">
              <p style={{ fontSize: '36px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>8</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>전공 분야</p>
            </div>
            <div className="hero-stats-item">
              <p style={{ fontSize: '36px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>16</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>전공별 스텝수업</p>
            </div>
            <div className="hero-stats-item">
              <p style={{ fontSize: '36px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>1000+</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>합격생 배출</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
          padding: '12px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          borderRadius: '50%',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="이전 슬라이드"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
          padding: '12px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          borderRadius: '50%',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="다음 슬라이드"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentSlide ? '32px' : '12px',
              height: '12px',
              backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  );
}
