'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  {
    id: 1,
    title: '레코딩 스튜디오',
    description: '전문 녹음 장비를 갖춘 스튜디오',
    icon: '🎙️',
    gradient: 'from-g-purple to-g-blue',
  },
  {
    id: 2,
    title: '개인 연습실',
    description: '방음 처리된 독립 연습 공간',
    icon: '🎵',
    gradient: 'from-g-blue to-g-teal',
  },
  {
    id: 3,
    title: '합주실',
    description: '밴드 합주가 가능한 대형 연습실',
    icon: '🎸',
    gradient: 'from-g-orange to-g-pink',
  },
  {
    id: 4,
    title: '미디룸',
    description: '최신 DAW와 장비를 갖춘 작업실',
    icon: '💻',
    gradient: 'from-g-teal to-g-blue',
  },
  {
    id: 5,
    title: '보컬 부스',
    description: '전문 보컬 녹음 부스',
    icon: '🎤',
    gradient: 'from-g-pink to-g-purple',
  },
  {
    id: 6,
    title: '라운지',
    description: '편안한 휴식과 교류 공간',
    icon: '☕',
    gradient: 'from-g-gold to-g-orange',
  },
];

export default function FacilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.facilities-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Gallery items animation
      gsap.from('.facility-item', {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.7)',
      });

      // Parallax effect on scroll
      gsap.to('.facilities-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="facilities-bg absolute inset-0 bg-bg-darker" />
      <div className="bg-gradient-blur gradient-orange absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="facilities-header text-center max-w-3xl mx-auto mb-16">
          <p className="text-g-orange font-semibold mb-4 tracking-wider uppercase">
            Facilities
          </p>
          <h2 className="section-title mb-6">
            <span className="gradient-text-gold">최고의 환경</span>에서 연습하세요
          </h2>
          <p className="section-subtitle mx-auto">
            최신 장비와 쾌적한 환경에서 음악에만 집중할 수 있습니다.
            레코딩 스튜디오부터 개인 연습실까지 모든 시설을 자유롭게 이용하세요.
          </p>
        </div>

        {/* Facilities Grid */}
        <div
          ref={galleryRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {facilities.map((facility, index) => (
            <div
              key={facility.id}
              className={`facility-item group relative overflow-hidden rounded-2xl cursor-pointer
                ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              `}
            >
              {/* Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${facility.gradient} opacity-80`}
              />

              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-grid opacity-20" />

              {/* Content */}
              <div
                className={`relative z-10 p-6 md:p-8 flex flex-col justify-end h-full
                  ${index === 0 ? 'min-h-[300px] md:min-h-[400px]' : 'min-h-[180px] md:min-h-[200px]'}
                `}
              >
                {/* Icon */}
                <span
                  className={`text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500
                    ${index === 0 ? 'text-6xl md:text-7xl' : ''}
                  `}
                >
                  {facility.icon}
                </span>

                {/* Title */}
                <h3
                  className={`font-bold text-white mb-2
                    ${index === 0 ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}
                  `}
                >
                  {facility.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-white/80 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300
                    ${index === 0 ? 'text-base md:text-lg' : 'text-sm'}
                  `}
                >
                  {facility.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Virtual Tour CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 glass rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-orange flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">시설 방문 상담</p>
                <p className="text-text-secondary text-sm">직접 방문하여 시설을 확인해보세요</p>
              </div>
            </div>
            <a href="#contact" className="btn btn-primary btn-glow">
              방문 예약하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
