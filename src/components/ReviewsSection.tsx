'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    name: '김OO',
    age: '20대',
    course: '보컬',
    rating: 5,
    content:
      '처음 레슨 받을 때는 음치라고 생각했는데, 6개월 만에 노래방 점수가 90점대로 올랐어요! 선생님이 제 목소리 특성을 잘 파악해서 맞춤 레슨해주셔서 정말 감사해요.',
    result: '노래방 점수 60점 → 92점',
    gradient: 'from-g-purple to-g-blue',
  },
  {
    id: 2,
    name: '이OO',
    age: '30대',
    course: '기타',
    rating: 5,
    content:
      '직장 다니면서 취미로 시작했는데, 이제 회사 밴드에서 기타 담당하고 있어요. 주말 레슨만으로도 충분히 실력이 늘었습니다.',
    result: '회사 밴드 기타리스트로 활동 중',
    gradient: 'from-g-orange to-g-gold',
  },
  {
    id: 3,
    name: '박OO',
    age: '10대',
    course: '보컬',
    rating: 5,
    content:
      '음대 입시 준비하면서 경희쌤께 배웠는데, 1차 합격했어요! 입시곡 선정부터 실기까지 체계적으로 준비할 수 있었습니다.',
    result: 'K예술대학교 실용음악과 1차 합격',
    gradient: 'from-g-blue to-g-teal',
  },
  {
    id: 4,
    name: '최OO',
    age: '20대',
    course: '작곡',
    rating: 5,
    content:
      '유튜브에 올릴 자작곡을 만들고 싶어서 배우기 시작했어요. 이제 혼자서 비트도 만들고 녹음까지 할 수 있게 됐습니다!',
    result: '유튜브 자작곡 조회수 10만 달성',
    gradient: 'from-g-pink to-g-purple',
  },
  {
    id: 5,
    name: '정OO',
    age: '40대',
    course: '피아노',
    rating: 5,
    content:
      '어릴 때 배우다 중단했던 피아노를 다시 시작했어요. 재즈 피아노에 도전했는데, 선생님이 잘 이끌어주셔서 이제 재즈바에서 연주도 해봤습니다.',
    result: '재즈바 오픈마이크 출연',
    gradient: 'from-g-teal to-g-blue',
  },
  {
    id: 6,
    name: '한OO',
    age: '20대',
    course: '드럼',
    rating: 5,
    content:
      '밴드 결성이 꿈이었는데, 여기서 드럼 배우면서 밴드 멤버도 구하고 이제 곧 첫 공연 준비 중이에요!',
    result: '인디밴드 결성 및 공연 준비 중',
    gradient: 'from-g-gold to-g-orange',
  },
];

const achievements = [
  { number: '500+', label: '수료생' },
  { number: '98%', label: '만족도' },
  { number: '50+', label: '입시 합격' },
  { number: '100+', label: '대회 수상' },
];

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.reviews-header', {
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

      // Achievement numbers animation
      gsap.from('.achievement-item', {
        scrollTrigger: {
          trigger: '.achievements-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Reviews cards animation
      gsap.from('.review-card', {
        scrollTrigger: {
          trigger: '.reviews-grid',
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
      id="reviews"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="bg-gradient-blur gradient-purple absolute top-[30%] right-[-20%] opacity-15" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="reviews-header text-center max-w-3xl mx-auto mb-16">
          <p className="text-g-purple font-semibold mb-4 tracking-wider uppercase">
            Reviews & Results
          </p>
          <h2 className="section-title mb-6">
            수강생들의 <span className="gradient-text">성장 스토리</span>
          </h2>
          <p className="section-subtitle mx-auto">
            부천경희에서 꿈을 이룬 수강생들의 생생한 후기를 확인하세요.
            당신도 다음 주인공이 될 수 있습니다.
          </p>
        </div>

        {/* Achievements */}
        <div className="achievements-grid grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-item text-center p-6 glass rounded-2xl"
            >
              <div className="stat-number gradient-text">{achievement.number}</div>
              <div className="stat-label mt-2">{achievement.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="review-card card group">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center text-white font-bold`}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">
                    {review.name}{' '}
                    <span className="text-text-muted font-normal">({review.age})</span>
                  </p>
                  <p className="text-g-purple text-sm">{review.course} 수강</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-g-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-text-secondary mb-4 leading-relaxed">
                &ldquo;{review.content}&rdquo;
              </p>

              {/* Result Badge */}
              <div className="mt-auto pt-4 border-t border-border-light">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-g-teal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-g-teal">
                    {review.result}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Reviews CTA */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            더 많은 후기가 궁금하신가요?
          </p>
          <a href="#contact" className="btn btn-secondary">
            수강 후기 더보기
          </a>
        </div>
      </div>
    </section>
  );
}
