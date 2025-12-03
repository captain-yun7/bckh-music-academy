'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
        <p className="about-label">강사진 소개</p>

        {/* Horizontal Gallery - 301lab Style */}
        <div className="about-gallery">
          <div className="about-image flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 p-6">
            <span className="text-5xl mb-4">🎤</span>
            <p className="text-white font-medium">보컬 트레이너</p>
            <p className="text-white/60 text-sm">서울예대 실용음악과</p>
          </div>
          <div className="about-image flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 p-6">
            <span className="text-5xl mb-4">🎹</span>
            <p className="text-white font-medium">피아노 강사</p>
            <p className="text-white/60 text-sm">재즈/반주 전문</p>
          </div>
          <div className="about-image flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 p-6">
            <span className="text-5xl mb-4">🎸</span>
            <p className="text-white font-medium">기타 강사</p>
            <p className="text-white/60 text-sm">일렉/어쿠스틱</p>
          </div>
          <div className="about-image flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 p-6">
            <span className="text-5xl mb-4">🥁</span>
            <p className="text-white font-medium">드럼 강사</p>
            <p className="text-white/60 text-sm">드럼/퍼커션</p>
          </div>
          <div className="about-image flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 p-6">
            <span className="text-5xl mb-4">💻</span>
            <p className="text-white font-medium">작곡 강사</p>
            <p className="text-white/60 text-sm">MIDI/프로듀싱</p>
          </div>
        </div>
      </div>
    </section>
  );
}
