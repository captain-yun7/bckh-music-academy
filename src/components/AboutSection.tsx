'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.featured-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      {/* Featured Work - Dark Section like 301lab */}
      <div className="featured-section">
        <div className="container">
          <p className="featured-label">학원 소개</p>

          {/* Main Featured Image */}
          <div className="featured-item featured-image mb-6 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center p-12">
              <p className="text-white/60 text-lg mb-4">1999년부터 25년의 전통</p>
              <p className="text-white text-2xl font-medium">부천경희실용음악학원</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="featured-title">음악으로 꿈을 실현하는 곳</p>
              <p className="featured-meta">보컬 · 작곡 · 악기 · 입시</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="portfolio-section">
        <div className="container">
          <div className="portfolio-grid">
            <div className="featured-item portfolio-card">
              <div className="portfolio-image flex items-center justify-center text-5xl bg-gradient-to-br from-purple-100 to-blue-100">
                🎤
              </div>
              <div className="portfolio-content">
                <p className="portfolio-title">보컬 트레이닝</p>
                <p className="portfolio-meta">Vocal · Training</p>
              </div>
            </div>
            <div className="featured-item portfolio-card">
              <div className="portfolio-image flex items-center justify-center text-5xl bg-gradient-to-br from-orange-100 to-pink-100">
                🎹
              </div>
              <div className="portfolio-content">
                <p className="portfolio-title">피아노 레슨</p>
                <p className="portfolio-meta">Piano · Keyboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work List - 301lab Style */}
      <div className="work-list">
        <div className="container">
          <div className="work-item featured-item">
            <span className="work-name">VOCAL</span>
            <span className="work-category">발성 · 호흡 · 테크닉</span>
            <span className="work-client">보컬 트레이닝</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">PIANO</span>
            <span className="work-category">클래식 · 재즈 · 반주</span>
            <span className="work-client">피아노/건반</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">GUITAR</span>
            <span className="work-category">일렉 · 어쿠스틱 · 베이스</span>
            <span className="work-client">기타/베이스</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">DRUM</span>
            <span className="work-category">드럼 · 퍼커션 · 카혼</span>
            <span className="work-client">드럼/퍼커션</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">COMPOSITION</span>
            <span className="work-category">화성학 · 편곡 · 이론</span>
            <span className="work-client">작곡/편곡</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">MIDI</span>
            <span className="work-category">DAW · 프로듀싱 · 믹싱</span>
            <span className="work-client">MIDI/프로듀싱</span>
          </div>
        </div>
      </div>
    </section>
  );
}
