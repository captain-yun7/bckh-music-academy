'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const words = ['꿈을', '열정을', '재능을', '미래를'];

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Word toggle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2300);

    return () => clearInterval(interval);
  }, []);

  // Initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate title characters
      tl.from('.hero-char', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power4.out',
      });

      // Animate subtitle
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      // Animate CTA buttons
      tl.from(
        '.hero-cta-btn',
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      // Animate scroll indicator
      tl.from(
        '.scroll-indicator',
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="hero-char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      className="section relative min-h-screen overflow-hidden bg-grid"
    >
      {/* Background Gradient Blurs */}
      <div className="bg-gradient-blur gradient-purple absolute top-[-20%] left-[-10%]" />
      <div className="bg-gradient-blur gradient-blue absolute bottom-[-20%] right-[-10%]" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <h1 ref={titleRef} className="hero-title mb-6">
            <span className="block text-white">당신의 음악적</span>
            <span className="block mt-2">
              <span className="gradient-text inline-block min-w-[180px] md:min-w-[280px]">
                {words.map((word, index) => (
                  <span
                    key={word}
                    className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
                      index === currentWordIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{ position: index === currentWordIndex ? 'relative' : 'absolute' }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </span>
            <span className="block text-white mt-2">{splitText('현실로')}</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="hero-subtitle max-w-2xl mx-auto mb-10 text-text-secondary">
            부천경희실용음악학원에서 전문 뮤지션들과 함께
            <br className="hidden sm:block" />
            당신만의 음악 여정을 시작하세요
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#courses" className="hero-cta-btn btn btn-primary btn-glow text-lg px-8 py-4">
              과정 알아보기
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a href="#contact" className="hero-cta-btn btn btn-secondary text-lg px-8 py-4">
              무료 상담 신청
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="stat-number gradient-text">15+</div>
              <div className="stat-label mt-2">Years</div>
            </div>
            <div className="text-center">
              <div className="stat-number gradient-text">500+</div>
              <div className="stat-label mt-2">Students</div>
            </div>
            <div className="text-center">
              <div className="stat-number gradient-text">20+</div>
              <div className="stat-label mt-2">Courses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span className="text-sm uppercase tracking-widest">Scroll</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
