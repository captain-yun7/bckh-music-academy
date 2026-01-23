'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { imagePresets, getPlaceholderUrl } from '@/lib/image';

interface Slide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  buttonText?: string | null;
  buttonLink?: string | null;
  textPosition?: string;
  textAlign?: string;
}

// 기본 슬라이드 (DB가 비어있을 때 사용)
const defaultSlides: Slide[] = [
  {
    id: '1',
    imageUrl: '/images/main/main1.jpg',
    title: '',
    subtitle: null,
  },
  {
    id: '2',
    imageUrl: '/images/main/main2.jpg',
    title: '',
    subtitle: null,
  },
  {
    id: '3',
    imageUrl: '/images/main/main3.jpg',
    title: '',
    subtitle: null,
  },
  {
    id: '4',
    imageUrl: '/images/main/main4.jpg',
    title: '',
    subtitle: null,
  },
  {
    id: '5',
    imageUrl: '/images/main/main5.jpg',
    title: '',
    subtitle: null,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  return (
    <section
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
            src={slide.imageUrl.includes('cloudinary.com') ? imagePresets.heroSlide(slide.imageUrl) : slide.imageUrl}
            alt={`슬라이드 ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
            placeholder={slide.imageUrl.includes('cloudinary.com') ? 'blur' : 'empty'}
            blurDataURL={slide.imageUrl.includes('cloudinary.com') ? getPlaceholderUrl(slide.imageUrl) : undefined}
          />
          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: slide.title
              ? slide.textPosition === 'center'
                ? 'rgba(0,0,0,0.5)'
                : slide.textPosition === 'right'
                  ? 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)'
                  : 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)'
              : 'rgba(0,0,0,0.2)'
          }} />

          {/* Text Content */}
          {(slide.title || slide.subtitle) && (
            <div
              style={{
                position: 'absolute',
                top: '0',
                bottom: '0',
                left: slide.textPosition === 'right' ? 'auto' : slide.textPosition === 'center' ? '50%' : '0',
                right: slide.textPosition === 'right' ? '0' : 'auto',
                transform: slide.textPosition === 'center' ? 'translateX(-50%)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: slide.textPosition === 'center' ? 'center' : slide.textPosition === 'right' ? 'flex-end' : 'flex-start',
                padding: isMobile
                  ? slide.textPosition === 'center' ? '0 80px' : '0 70px'
                  : '0 8%',
                maxWidth: isMobile
                  ? '100%'
                  : slide.textPosition === 'center' ? '80%' : '60%',
                textAlign: (slide.textAlign || 'left') as 'left' | 'center' | 'right',
                zIndex: 20,
              }}
            >
              {slide.title && (
                <h2
                  style={{
                    fontSize: isMobile ? 'clamp(24px, 6vw, 36px)' : 'clamp(32px, 5vw, 56px)',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: isMobile ? '12px' : '16px',
                    lineHeight: 1.4,
                    textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                    opacity: index === currentSlide ? 1 : 0,
                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
                    whiteSpace: isMobile ? 'normal' : 'pre-line',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                  }}
                >
                  {slide.title}
                </h2>
              )}
              {slide.subtitle && (
                <p
                  style={{
                    fontSize: isMobile ? 'clamp(14px, 3.5vw, 16px)' : 'clamp(16px, 2vw, 20px)',
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: isMobile ? '24px' : '32px',
                    lineHeight: 1.6,
                    textShadow: '0 1px 10px rgba(0,0,0,0.3)',
                    opacity: index === currentSlide ? 1 : 0,
                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
                    whiteSpace: isMobile ? 'normal' : 'pre-line',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                  }}
                >
                  {slide.subtitle}
                </p>
              )}
              {slide.buttonText && slide.buttonLink && (
                <div
                  style={{
                    opacity: index === currentSlide ? 1 : 0,
                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s',
                  }}
                >
                  <a
                    href={slide.buttonLink}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: isMobile ? '6px' : '8px',
                      padding: isMobile ? '12px 24px' : '16px 32px',
                      backgroundColor: '#ffc50a',
                      color: '#000',
                      fontWeight: 600,
                      fontSize: isMobile ? '14px' : '16px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(255,197,10,0.4)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 30px rgba(255,197,10,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,197,10,0.4)';
                    }}
                  >
                    {slide.buttonText}
                    <svg width={isMobile ? '16' : '20'} height={isMobile ? '16' : '20'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: isMobile ? '12px' : '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
          padding: isMobile ? '8px' : '12px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          borderRadius: '50%',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="이전 슬라이드"
      >
        <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: isMobile ? '12px' : '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
          padding: isMobile ? '8px' : '12px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          borderRadius: '50%',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="다음 슬라이드"
      >
        <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '24px' : '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '8px' : '12px',
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentSlide ? (isMobile ? '24px' : '32px') : (isMobile ? '8px' : '12px'),
              height: isMobile ? '8px' : '12px',
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
