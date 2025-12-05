'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const specialSystems = [
  {
    title: '최강 3인 멘토링',
    desc: '담당 강사 · 부강사 · 스텝강사가 함께 지도',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
  },
  {
    title: '16개 스텝수업',
    desc: '전공별 그룹 수업으로 체계적 학습',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
  },
  {
    title: '레코딩 시스템',
    desc: '전문 녹음실에서 포트폴리오 제작',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=300&fit=crop',
  },
  {
    title: '케이크 콘서트',
    desc: '정기 공연을 통한 무대 경험 축적',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop',
  },
  {
    title: '정기 오디션',
    desc: '실전과 같은 오디션 경험 제공',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
  },
  {
    title: '장학생 제도',
    desc: '우수 학생 장학금 지원',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
  },
  {
    title: '뮤지션 특강',
    desc: '현직 뮤지션 초청 특별 강의',
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=400&h=300&fit=crop',
  },
  {
    title: 'HT 프로그램',
    desc: '입시생 집중 트레이닝 프로그램',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
  },
];

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
          <div className="featured-item featured-image mb-8 relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1400&h=600&fit=crop"
              alt="경희실용음악학원 스튜디오"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-12">
                <p className="text-white/80 text-xl mb-6 font-medium">1999년부터 25년의 전통</p>
                <p className="text-white text-4xl md:text-5xl font-bold mb-8">경희실용음악학원</p>
                <p className="text-white/90 text-lg max-w-lg mx-auto leading-relaxed">
                  체계적인 커리큘럼과 최강 3인 멘토링 시스템으로<br />
                  수많은 음대 합격생과 프로 뮤지션을 배출해왔습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="featured-title text-2xl">음악으로 꿈을 실현하는 곳</p>
              <p className="featured-meta text-lg">입시 · 오디션 · 전문 · 취미 · 랩/HIPHOP</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-white/70 text-base">2025년 최신 합격 소식</p>
              <p className="text-white text-lg font-semibold">서서울생활과학고 실용음악과 합격!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Special System Grid */}
      <div className="portfolio-section">
        <div className="container">
          <p className="text-gray-500 text-base font-medium mb-10">SPECIAL SYSTEM</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {specialSystems.map((system, index) => (
              <div key={index} className="featured-item portfolio-card group cursor-pointer">
                <div className="portfolio-image relative overflow-hidden">
                  <Image
                    src={system.image}
                    alt={system.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="portfolio-content p-6">
                  <p className="portfolio-title text-lg font-bold">{system.title}</p>
                  <p className="portfolio-meta text-base">{system.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work List - 301lab Style (전공 분야) */}
      <div className="work-list">
        <div className="container">
          <p className="text-gray-500 text-base font-medium mb-10">전공 분야</p>
          <div className="work-item featured-item">
            <span className="work-name">VOCAL</span>
            <span className="work-category">보컬 스텝수업 I, II</span>
            <span className="work-client">보컬 트레이닝</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">PIANO</span>
            <span className="work-category">재즈 · 반주 · 클래식</span>
            <span className="work-client">피아노/건반</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">GUITAR</span>
            <span className="work-category">일렉 · 어쿠스틱 · 클래식</span>
            <span className="work-client">기타</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">BASS</span>
            <span className="work-category">일렉베이스 · 콘트라베이스</span>
            <span className="work-client">베이스</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">DRUMS</span>
            <span className="work-category">드럼 · 퍼커션 · 카혼</span>
            <span className="work-client">드럼/퍼커션</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">COMPOSING</span>
            <span className="work-category">화성학 · 편곡 · 작곡</span>
            <span className="work-client">작곡</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">MIDI/EMP</span>
            <span className="work-category">DAW · 프로듀싱 · 믹싱</span>
            <span className="work-client">미디/프로듀싱</span>
          </div>
          <div className="work-item featured-item">
            <span className="work-name">DANCE</span>
            <span className="work-category">K-POP · 현대무용 · 안무</span>
            <span className="work-client">댄스</span>
          </div>
        </div>
      </div>
    </section>
  );
}
