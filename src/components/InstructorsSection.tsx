'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const instructors = [
  {
    title: 'Vocal',
    name: '보컬 강사진',
    desc: '전문 보컬 트레이닝',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=500&fit=crop',
  },
  {
    title: 'Piano',
    name: '피아노 강사진',
    desc: '재즈/클래식/반주',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=500&fit=crop',
  },
  {
    title: 'Guitar',
    name: '기타 강사진',
    desc: '일렉/어쿠스틱/클래식',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=500&fit=crop',
  },
  {
    title: 'Bass',
    name: '베이스 강사진',
    desc: '일렉/콘트라베이스',
    image: 'https://images.unsplash.com/photo-1619558041249-0523e8323b3f?w=400&h=500&fit=crop',
  },
  {
    title: 'Drums',
    name: '드럼 강사진',
    desc: '드럼/퍼커션/카혼',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=500&fit=crop',
  },
  {
    title: 'Composing',
    name: '작곡 강사진',
    desc: '화성학/편곡/작곡',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=500&fit=crop',
  },
  {
    title: 'MIDI/EMP',
    name: 'MIDI 강사진',
    desc: 'DAW/프로듀싱/믹싱',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=500&fit=crop',
  },
  {
    title: 'Dance',
    name: '댄스 강사진',
    desc: 'K-POP/현대무용',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=500&fit=crop',
  },
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
        <p className="text-white text-3xl md:text-4xl font-semibold mb-10">전공별 강사진</p>

        {/* Horizontal Gallery - 301lab Style */}
        <div className="about-gallery">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="about-image relative flex flex-col items-center justify-end overflow-hidden min-w-[260px]"
            >
              <Image
                src={instructor.image}
                alt={instructor.name}
                fill
                className="object-cover"
                sizes="260px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 p-6 text-center w-full">
                <p className="text-white/60 text-sm mb-2 uppercase tracking-wider font-medium">{instructor.title}</p>
                <p className="text-white font-bold text-lg mb-1">{instructor.name}</p>
                <p className="text-white/80 text-base">{instructor.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructor Info */}
        <div className="mt-14 p-10 bg-white/5 rounded-xl">
          <p className="text-white/60 text-base mb-8 font-medium">강사진 특징</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-white font-bold mb-4 text-lg">현직 뮤지션 & 전문가</p>
              <p className="text-white/80 text-base leading-relaxed">실제 음악 현장에서 활동 중인 전문가들이 직접 지도합니다.</p>
            </div>
            <div>
              <p className="text-white font-bold mb-4 text-lg">최강 3인 멘토링 시스템</p>
              <p className="text-white/80 text-base leading-relaxed">담당 강사, 부강사, 스텝강사가 함께 체계적으로 지도합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
