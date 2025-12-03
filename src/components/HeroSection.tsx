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
            <p>경희음악학원은</p>
            <p>사람의 이야기 담긴 곡을 만들어가며</p>
            <p>다채로운 배움터입니다.</p>
          </div>
          <div className="hero-label hidden md:block">
            <p>음악을 가르침을 넘어서 삶을 풍요</p>
            <p>롭고 아름다운 선율로 채우고자 하는</p>
            <p>저희의 바람입니다.</p>
          </div>
          <div className="hero-label hidden md:block text-right">
            <p>부천경희실용음악학원</p>
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
            <p className="font-medium text-black mb-1">경희음악 × MUSIC</p>
            <p className="text-gray-500 text-sm">Where Passion Meets Creativity</p>
            <p className="text-gray-500 text-sm">& Dreams Become Reality →</p>
          </div>
        </div>
      </div>
    </section>
  );
}
