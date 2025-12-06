'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  { title: '레코딩 스튜디오', image: '/images/facilities/facility01.jpg' },
  { title: '보컬 연습실', image: '/images/facilities/facility02.jpg' },
  { title: '피아노실', image: '/images/facilities/facility03.jpg' },
  { title: '기타 연습실', image: '/images/facilities/facility04.jpg' },
  { title: '드럼 연습실', image: '/images/facilities/facility05.jpg' },
  { title: '합주실', image: '/images/facilities/facility06.jpg' },
  { title: '미디 작업실', image: '/images/facilities/facility07.jpg' },
  { title: '댄스 연습실', image: '/images/facilities/facility08.jpg' },
  { title: '상담실', image: '/images/facilities/facility09.jpg' },
  { title: '휴게공간', image: '/images/facilities/facility10.jpg' },
  { title: '로비', image: '/images/facilities/facility11.jpg' },
  { title: '복도', image: '/images/facilities/facility12.jpg' },
];

export default function FacilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.facility-item', {
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
      id="facilities"
      ref={sectionRef}
      style={{ padding: '120px 0', backgroundColor: '#f8f8f8' }}
    >
      <div className="container">
        {/* Section Header */}
        <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
          FACILITIES
        </p>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, color: '#000', marginBottom: '24px' }}>
          시설 사진
        </h2>
        <p style={{ color: '#666', fontSize: '18px', marginBottom: '60px', maxWidth: '600px' }}>
          최신 장비와 쾌적한 환경에서 음악에만 집중할 수 있습니다.
        </p>

        {/* Facilities Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {facilities.map((item, index) => (
            <div
              key={index}
              className="facility-item"
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#000' }}>
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
