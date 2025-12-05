'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const performances = [
  {
    title: '케이크 콘서트',
    desc: '정기 발표회',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop',
  },
  {
    title: '버스킹 공연',
    desc: '야외 무대 경험',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
  },
  {
    title: '졸업 공연',
    desc: '수료 기념 무대',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=400&fit=crop',
  },
  {
    title: '합동 공연',
    desc: '학원 연합 무대',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
  },
  {
    title: '라이브 공연',
    desc: '클럽 라이브 무대',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
  },
  {
    title: '특별 공연',
    desc: '초청 이벤트',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop',
  },
];

export default function PerformancesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.performance-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="performances"
      ref={sectionRef}
      style={{ padding: '120px 0', backgroundColor: '#000' }}
    >
      <div className="container">
        {/* Section Header */}
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
          PERFORMANCES
        </p>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
          공연 사진
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '60px', maxWidth: '600px' }}>
          다양한 무대 경험을 통해 실전 감각을 키워갑니다.
        </p>

        {/* Performances Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {performances.map((item, index) => (
            <div
              key={index}
              className="performance-item"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#111',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/2' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
