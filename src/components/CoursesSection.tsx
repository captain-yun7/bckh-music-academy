'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    title: '입시반',
    subtitle: 'Entrance Exam Course',
    desc: '음대 입시 전문 프로그램',
    items: [
      '보컬: 전공레슨 + 스텝수업 I, II + 레코딩',
      '작곡: 전공레슨 + 피아노레슨 + 스텝수업',
      '연주: 전공레슨 + 스텝수업 I, II + 레코딩',
      '싱어송라이팅: 보컬 + 악기 + 스텝수업',
      '미디: 전공레슨 + 피아노레슨 + 스텝수업',
    ],
    highlight: '4년제/2년제 대학, 고등학교, 대학원 입시',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop',
  },
  {
    title: '오디션반',
    subtitle: 'Audition Course',
    desc: '기획사 오디션 준비 전문',
    items: [
      '보컬 트레이닝 & 퍼포먼스',
      '댄스 & 안무 트레이닝',
      '오디션 곡 선정 및 연습',
      '실전 오디션 모의 테스트',
      '레코딩 & 영상 포트폴리오',
    ],
    highlight: '엔터테인먼트 기획사 오디션 대비',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
  },
  {
    title: '랩/HIPHOP',
    subtitle: 'Rap & HipHop Course',
    desc: '힙합 아티스트 전문 육성',
    items: [
      '랩 메이킹 & 라이밍 기초',
      '플로우 & 딜리버리 트레이닝',
      '비트 셀렉션 & 프로듀싱',
      '믹스테입 제작',
      '공연 퍼포먼스 트레이닝',
    ],
    highlight: '래퍼/힙합 프로듀서 양성',
    image: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=600&h=400&fit=crop',
  },
  {
    title: '전문반',
    subtitle: 'Professional Course',
    desc: '프로 뮤지션 전문 과정',
    items: [
      '현역 뮤지션 레벨업 트레이닝',
      '세션 & 라이브 퍼포먼스',
      '레코딩 & 음원 제작',
      '공연 기획 & 무대 연출',
      '아티스트 브랜딩',
    ],
    highlight: '프로 활동 중인 뮤지션 대상',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
  },
  {
    title: '취미반',
    subtitle: 'Hobby Course',
    desc: '음악을 즐기고 싶은 모든 분',
    items: [
      '기초부터 차근차근 레슨',
      '원하는 곡 위주 수업',
      '부담 없는 1:1 맞춤 레슨',
      '직장인/학생 스케줄 맞춤',
      '연습실 자유 이용',
    ],
    highlight: '나이/실력 무관, 누구나 환영',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&h=400&fit=crop',
  },
];

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-block', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="courses" ref={sectionRef} className="services-section">
      <div className="container">
        <p className="text-white/60 text-base mb-8 tracking-wider font-medium">CURRICULUM</p>
        <p className="text-white text-4xl md:text-5xl font-bold mb-20">수강과정 안내</p>

        {/* Course Blocks */}
        {courses.map((course, index) => (
          <div key={index} className="service-block">
            <div className="flex-1">
              <div className="flex items-baseline gap-4 mb-4">
                <h3 className="service-title">{course.title}</h3>
                <span className="text-white/50 text-base">{course.subtitle}</span>
              </div>
              <p className="text-white/80 text-lg mb-8">{course.desc}</p>
              <ul className="service-list">
                {course.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-blue-400 text-lg mt-8 font-semibold">{course.highlight}</p>
            </div>
            <div className="service-images">
              <div className="service-image col-span-2 relative overflow-hidden rounded-xl" style={{ aspectRatio: '16/10' }}>
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Benefits Section */}
        <div className="mt-24 p-12 border border-white/10 rounded-2xl">
          <p className="text-white/60 text-base mb-10 tracking-wider font-medium">수강생 혜택</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-white font-bold mb-4 text-xl">연습실 무제한 사용</p>
              <p className="text-white/80 text-base leading-relaxed">운영시간 내 자유롭게 연습</p>
            </div>
            <div>
              <p className="text-white font-bold mb-4 text-xl">레코딩 지원</p>
              <p className="text-white/80 text-base leading-relaxed">전문 녹음실 포트폴리오 제작</p>
            </div>
            <div>
              <p className="text-white font-bold mb-4 text-xl">정기 공연 참여</p>
              <p className="text-white/80 text-base leading-relaxed">케이크콘서트 무대 경험</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
