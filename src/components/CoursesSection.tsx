'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        <p className="text-white/50 text-sm mb-4">CURRICULUM</p>
        <p className="text-white text-2xl md:text-3xl font-medium mb-12">수강과정 안내</p>

        {/* Course Blocks */}
        {courses.map((course, index) => (
          <div key={index} className="service-block">
            <div className="flex-1">
              <div className="flex items-baseline gap-4 mb-2">
                <h3 className="service-title">{course.title}</h3>
                <span className="text-white/40 text-sm">{course.subtitle}</span>
              </div>
              <p className="text-white/60 text-sm mb-4">{course.desc}</p>
              <ul className="service-list">
                {course.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-blue-400 text-sm mt-4">{course.highlight}</p>
            </div>
          </div>
        ))}

        {/* Benefits Section */}
        <div className="mt-16 p-8 border border-white/10 rounded-lg">
          <p className="text-white/50 text-sm mb-4">수강생 혜택</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-white font-medium mb-2">연습실 무제한 사용</p>
              <p className="text-white/60 text-sm">운영시간 내 자유롭게 연습</p>
            </div>
            <div>
              <p className="text-white font-medium mb-2">레코딩 지원</p>
              <p className="text-white/60 text-sm">전문 녹음실 포트폴리오 제작</p>
            </div>
            <div>
              <p className="text-white font-medium mb-2">정기 공연 참여</p>
              <p className="text-white/60 text-sm">케이크콘서트 무대 경험</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
