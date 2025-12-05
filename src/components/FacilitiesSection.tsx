'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  {
    title: '레코딩 스튜디오',
    desc: '전문 녹음 장비 완비',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop',
  },
  {
    title: '개인 연습실',
    desc: '방음 시설 완비',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop',
  },
  {
    title: '보컬 부스',
    desc: '1:1 레슨 전용',
    image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=600&h=400&fit=crop',
  },
  {
    title: '합주실',
    desc: '밴드 합주 가능',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&h=400&fit=crop',
  },
  {
    title: '피아노실',
    desc: '그랜드 피아노 보유',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&h=400&fit=crop',
  },
  {
    title: '대기 공간',
    desc: '편안한 휴식 공간',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  },
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {facilities.map((item, index) => (
            <div
              key={index}
              className="facility-item"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
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
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '8px' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '15px', color: '#888' }}>
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
