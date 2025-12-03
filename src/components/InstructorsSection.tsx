'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const instructors = [
  {
    id: 1,
    name: '김수현',
    role: '보컬 전임',
    specialty: '팝 보컬 / 발라드',
    experience: '15년차 보컬 트레이너',
    credentials: ['현대가요제 대상', 'SM 보컬 트레이너 출신', '다수 가수 보컬 디렉팅'],
    gradient: 'from-g-purple to-g-pink',
  },
  {
    id: 2,
    name: '이정우',
    role: '기타 전임',
    specialty: '어쿠스틱 / 일렉기타',
    experience: '12년차 세션',
    credentials: ['서울재즈페스티벌 출연', '앨범 100여장 세션 참여', '유명 아티스트 투어 기타리스트'],
    gradient: 'from-g-orange to-g-gold',
  },
  {
    id: 3,
    name: '박지민',
    role: '피아노 전임',
    specialty: '재즈 / 팝 피아노',
    experience: '10년차 연주자',
    credentials: ['버클리 음대 출신', '재즈 클럽 하우스 피아니스트', '교회 음악 디렉터'],
    gradient: 'from-g-blue to-g-teal',
  },
  {
    id: 4,
    name: '최현석',
    role: '드럼 전임',
    specialty: '모던 드럼',
    experience: '13년차 드러머',
    credentials: ['국내 대형 밴드 드러머', '드럼 클리닉 다수 진행', '뮤직비디오 드럼 세션'],
    gradient: 'from-g-teal to-g-blue',
  },
  {
    id: 5,
    name: '한승희',
    role: '작곡 전임',
    specialty: 'MIDI / 작편곡',
    experience: '8년차 프로듀서',
    credentials: ['차트 인 곡 다수 작곡', '광고 음악 제작', 'K-POP 작곡 실무'],
    gradient: 'from-g-pink to-g-purple',
  },
];

export default function InstructorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.instructors-header', {
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

      // Cards stagger animation with 3D effect
      gsap.from('.instructor-card', {
        scrollTrigger: {
          trigger: '.instructors-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        rotationY: 15,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="instructors"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="bg-gradient-blur gradient-purple absolute top-[10%] left-[-15%] opacity-15" />
      <div className="bg-gradient-blur gradient-blue absolute bottom-[10%] right-[-15%] opacity-15" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="instructors-header text-center max-w-3xl mx-auto mb-16">
          <p className="text-g-purple font-semibold mb-4 tracking-wider uppercase">
            Instructors
          </p>
          <h2 className="section-title mb-6">
            <span className="gradient-text">전문 강사진</span>과 함께하세요
          </h2>
          <p className="section-subtitle mx-auto">
            현업에서 활발히 활동하는 전문 뮤지션들이 여러분의 음악적 성장을 이끕니다.
            풍부한 현장 경험과 교육 노하우로 최고의 레슨을 제공합니다.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="instructors-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="instructor-card group"
            >
              {/* Avatar */}
              <div className={`instructor-avatar bg-gradient-to-br ${instructor.gradient}`}>
                <span className="text-4xl">👨‍🎤</span>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
              <p className="text-g-purple font-medium mb-1">{instructor.role}</p>
              <p className="text-text-muted text-sm mb-4">{instructor.specialty}</p>

              {/* Experience */}
              <div className="inline-block px-3 py-1 bg-bg-card rounded-full text-sm text-text-secondary border border-border-light mb-4">
                {instructor.experience}
              </div>

              {/* Credentials */}
              <ul className="space-y-2 text-left">
                {instructor.credentials.map((credential, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <svg
                      className="w-4 h-4 text-g-purple mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 glass rounded-full px-8 py-4">
            <span className="text-text-secondary">
              강사진 전체 프로필이 궁금하신가요?
            </span>
            <a
              href="#contact"
              className="text-g-purple font-semibold hover:underline inline-flex items-center gap-1"
            >
              문의하기
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
