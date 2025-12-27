'use client';

import { useEffect, useState, useCallback } from 'react';
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
            src={slide.imageUrl}
            alt={`슬라이드 ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
          {/* Light Overlay for better visibility */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }} />
        </div>
      ))}

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
