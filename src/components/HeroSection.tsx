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

      tl.from('.hero-stats', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="container">
        {/* Top Labels - 301lab style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="hero-label">
            <p>경희실용음악학원은</p>
            <p>1999년부터 25년 이상</p>
            <p>음악의 꿈을 키워온 전문학원입니다.</p>
          </div>
          <div className="hero-label hidden md:block">
            <p>보컬 · 피아노 · 기타 · 베이스</p>
            <p>드럼 · 작곡 · MIDI · 댄스</p>
            <p>전 과목 전문 강사진이 함께합니다.</p>
          </div>
          <div className="hero-label hidden md:block text-right">
            <p>Since 1999</p>
            <p>부천시 심곡동</p>
          </div>
        </div>

        {/* Main Title - 301lab Style Large Typography */}
        <div className="mb-16">
          <h1 className="hero-title">
            <span className="hero-title-line block">YOUR</span>
            <span className="hero-title-line block text-right">MUSICAL</span>
            <span className="hero-title-line block">DREAM</span>
            <span className="hero-title-line block text-right">STARTS HERE</span>
          </h1>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="hero-stats text-center md:text-left">
            <p className="text-3xl md:text-4xl font-bold text-black">25+</p>
            <p className="text-gray-500 text-sm">Years of Excellence</p>
          </div>
          <div className="hero-stats text-center md:text-left">
            <p className="text-3xl md:text-4xl font-bold text-black">8</p>
            <p className="text-gray-500 text-sm">전공 분야</p>
          </div>
          <div className="hero-stats text-center md:text-left">
            <p className="text-3xl md:text-4xl font-bold text-black">16</p>
            <p className="text-gray-500 text-sm">전공별 스텝수업</p>
          </div>
          <div className="hero-stats text-center md:text-left">
            <p className="text-3xl md:text-4xl font-bold text-black">1000+</p>
            <p className="text-gray-500 text-sm">합격생 배출</p>
          </div>
        </div>

        {/* Bottom Label */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="hero-subtitle">
            <p className="font-medium text-black mb-1">경희실용음악학원</p>
            <p className="text-gray-500 text-sm">입시반 · 오디션반 · 전문반 · 취미반</p>
            <p className="text-gray-500 text-sm">최강 3인 멘토링 시스템</p>
          </div>
          <div className="hero-subtitle text-left md:text-right">
            <p className="text-gray-500 text-sm">평일 13:00 - 22:00</p>
            <p className="text-gray-500 text-sm">주말/공휴일 11:00 - 19:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
