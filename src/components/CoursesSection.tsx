'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: 'vocal',
    title: '보컬',
    subtitle: 'Vocal Training',
    description: '발성, 호흡, 음정, 리듬부터 감정 표현까지 체계적인 보컬 트레이닝',
    features: ['발성/호흡 기초', '음정/리듬 교정', '장르별 테크닉', '무대 퍼포먼스'],
    gradient: 'from-g-purple to-g-blue',
    icon: '🎤',
  },
  {
    id: 'piano',
    title: '피아노',
    subtitle: 'Piano & Keyboard',
    description: '클래식부터 재즈, 팝까지 다양한 장르의 피아노 연주법 마스터',
    features: ['기초 연주법', '코드 & 스케일', '반주법', '즉흥 연주'],
    gradient: 'from-g-blue to-g-teal',
    icon: '🎹',
  },
  {
    id: 'guitar',
    title: '기타',
    subtitle: 'Guitar & Bass',
    description: '어쿠스틱, 일렉, 베이스 기타의 다양한 주법과 연주 테크닉',
    features: ['기초 코드 & 스케일', '핑거스타일', '솔로 & 리프', '밴드 합주'],
    gradient: 'from-g-orange to-g-pink',
    icon: '🎸',
  },
  {
    id: 'drum',
    title: '드럼',
    subtitle: 'Drums & Percussion',
    description: '기초 리듬부터 고급 테크닉까지, 그루브 넘치는 드러머로 성장',
    features: ['기초 비트 패턴', '장르별 리듬', '필인 & 솔로', '레코딩 테크닉'],
    gradient: 'from-g-teal to-g-blue',
    icon: '🥁',
  },
  {
    id: 'composition',
    title: '작곡/편곡',
    subtitle: 'Composition & Arrangement',
    description: '나만의 음악을 만들어가는 작곡과 편곡의 모든 것',
    features: ['화성학 기초', 'MIDI 프로듀싱', '장르별 편곡', '믹싱 기초'],
    gradient: 'from-g-pink to-g-purple',
    icon: '🎼',
  },
  {
    id: 'midi',
    title: 'MIDI/프로듀싱',
    subtitle: 'Music Production',
    description: 'Logic, Ableton 등 DAW를 활용한 현대 음악 제작 과정',
    features: ['DAW 기초', '비트메이킹', '사운드 디자인', '믹싱 & 마스터링'],
    gradient: 'from-g-gold to-g-orange',
    icon: '💻',
  },
];

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.courses-header', {
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

      // Cards animation
      gsap.from('.course-card', {
        scrollTrigger: {
          trigger: '.courses-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-bg-darker" />
      <div className="bg-gradient-blur gradient-blue absolute bottom-[-20%] left-[-10%] opacity-20" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="courses-header text-center max-w-3xl mx-auto mb-16">
          <p className="text-g-purple font-semibold mb-4 tracking-wider uppercase">
            Courses
          </p>
          <h2 className="section-title mb-6">
            당신에게 맞는 <span className="gradient-text">과정</span>을 찾아보세요
          </h2>
          <p className="section-subtitle mx-auto">
            보컬, 악기, 작곡까지 실용음악의 모든 분야를 전문적으로 배울 수 있습니다.
            초급부터 전문가 과정까지, 레벨에 맞는 맞춤 교육을 제공합니다.
          </p>
        </div>

        {/* Course Grid */}
        <div className="courses-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-card group"
              onMouseEnter={() => setHoveredCard(course.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="course-card relative overflow-hidden">
                {/* Gradient Header */}
                <div
                  className={`course-card-image bg-gradient-to-br ${course.gradient} flex items-center justify-center`}
                >
                  <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                    {course.icon}
                  </span>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="btn btn-primary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      자세히 보기
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="course-card-content">
                  <p className="text-text-muted text-sm mb-1">{course.subtitle}</p>
                  <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                  <p className="text-text-secondary mb-4">{course.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {course.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-bg-card rounded-full text-sm text-text-secondary border border-border-light"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary mb-6">
            원하는 과정이 없으신가요? 상담을 통해 맞춤 과정을 설계해 드립니다.
          </p>
          <a href="#contact" className="btn btn-secondary">
            맞춤 상담 받기
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
        </div>
      </div>
    </section>
  );
}
