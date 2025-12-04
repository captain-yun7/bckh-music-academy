'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const instructors = [
  { icon: '🎤', title: 'Vocal', name: '보컬 강사진', desc: '전문 보컬 트레이닝' },
  { icon: '🎹', title: 'Piano', name: '피아노 강사진', desc: '재즈/클래식/반주' },
  { icon: '🎸', title: 'Guitar', name: '기타 강사진', desc: '일렉/어쿠스틱/클래식' },
  { icon: '🎸', title: 'Bass', name: '베이스 강사진', desc: '일렉/콘트라베이스' },
  { icon: '🥁', title: 'Drums', name: '드럼 강사진', desc: '드럼/퍼커션/카혼' },
  { icon: '🎼', title: 'Composing', name: '작곡 강사진', desc: '화성학/편곡/작곡' },
  { icon: '💻', title: 'MIDI/EMP', name: 'MIDI 강사진', desc: 'DAW/프로듀싱/믹싱' },
  { icon: '💃', title: 'Dance', name: '댄스 강사진', desc: 'K-POP/현대무용' },
];

export default function InstructorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-image', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="instructors" ref={sectionRef} className="about-section">
      <div className="container">
        <p className="about-label">LECTURER</p>
        <p className="text-white text-2xl md:text-3xl font-medium mb-8">전공별 강사진</p>

        {/* Horizontal Gallery - 301lab Style */}
        <div className="about-gallery">
          {instructors.map((instructor, index) => (
            <div key={index} className="about-image flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 p-6 min-w-[200px]">
              <span className="text-4xl mb-3">{instructor.icon}</span>
              <p className="text-white/50 text-xs mb-1">{instructor.title}</p>
              <p className="text-white font-medium text-center">{instructor.name}</p>
              <p className="text-white/60 text-sm text-center">{instructor.desc}</p>
            </div>
          ))}
        </div>

        {/* Instructor Info */}
        <div className="mt-12 p-8 bg-white/5 rounded-lg">
          <p className="text-white/50 text-sm mb-4">강사진 특징</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-white font-medium mb-2">현직 뮤지션 & 전문가</p>
              <p className="text-white/60 text-sm">실제 음악 현장에서 활동 중인 전문가들이 직접 지도합니다.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-2">최강 3인 멘토링 시스템</p>
              <p className="text-white/60 text-sm">담당 강사, 부강사, 스텝강사가 함께 체계적으로 지도합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
