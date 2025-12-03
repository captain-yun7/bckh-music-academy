'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '🎵',
    title: '전문 커리큘럼',
    description: '체계적인 교육 과정으로 기초부터 전문가 수준까지 단계별 맞춤 교육을 제공합니다.',
    gradient: 'gradient-purple',
  },
  {
    icon: '🎤',
    title: '현직 전문 강사진',
    description: '현업에서 활발히 활동하는 전문 뮤지션들이 1:1 맞춤 레슨을 진행합니다.',
    gradient: 'gradient-blue',
  },
  {
    icon: '🎹',
    title: '최신 시설',
    description: '최신 녹음 장비와 쾌적한 연습실, 전문 레슨실을 완비하고 있습니다.',
    gradient: 'gradient-orange',
  },
  {
    icon: '🏆',
    title: '입시/오디션 전문',
    description: '음대 입시, 오디션, 대회 준비를 위한 전문 트레이닝 프로그램을 운영합니다.',
    gradient: 'gradient-gold',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Subtitle animation
      gsap.from('.about-subtitle', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Cards stagger animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="bg-gradient-blur gradient-purple absolute top-[20%] right-[-20%] opacity-20" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="about-title section-title">
            왜 <span className="gradient-text">부천경희</span>인가요?
          </h2>
          <p className="about-subtitle section-subtitle mx-auto mt-6">
            15년 이상의 노하우로 수많은 뮤지션을 배출한 부천 최고의 실용음악 교육기관입니다.
            전문성과 열정으로 여러분의 음악적 성장을 함께합니다.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card card group cursor-pointer"
            >
              {/* Icon */}
              <div className={`feature-icon ${feature.gradient}`}>
                <span>{feature.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-g-purple transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-2 text-text-muted group-hover:text-g-purple transition-colors">
                <span className="text-sm font-medium">자세히 보기</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
