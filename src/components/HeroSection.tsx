'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.hero-label', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      tl.from('.hero-title-line', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.3');

      tl.from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="container">
        {/* Top Labels - 301lab style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="hero-label">
            <p>부천경희실용음악학원은</p>
            <p>1999년부터 음악의 꿈을 키워온</p>
            <p>부천 대표 실용음악 전문학원입니다.</p>
          </div>
          <div className="hero-label hidden md:block">
            <p>보컬, 작곡, 기타, 피아노, 드럼 등</p>
            <p>전문 강사진과 함께 당신의 음악적</p>
            <p>재능을 발견하고 성장시킵니다.</p>
          </div>
          <div className="hero-label hidden md:block text-right">
            <p>Since 1999</p>
            <p>부천시 심곡동</p>
          </div>
        </div>

        {/* Main Title - 301lab Style Large Typography */}
        <div className="mb-16">
          <h1 className="hero-title">
            <span className="hero-title-line block">WE</span>
            <span className="hero-title-line block text-right">DESIGN</span>
            <span className="hero-title-line block">MUSICAL GROWTH,</span>
            <span className="hero-title-line block text-right">TOGETHER</span>
          </h1>
        </div>

        {/* Bottom Label */}
        <div className="flex justify-between items-end">
          <div className="hero-subtitle">
            <p className="font-medium text-black mb-1">부천경희실용음악학원</p>
            <p className="text-gray-500 text-sm">경기도 부천시 부천로 43, 3층</p>
            <p className="text-gray-500 text-sm">khmusic80@hanmail.net →</p>
          </div>
        </div>
      </div>
    </section>
  );
}
