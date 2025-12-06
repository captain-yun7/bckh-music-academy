'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const musicians = [
  {
    name: '문수진',
    role: '싱어송라이터',
    achievement: '음원 발매 및 활발한 활동',
    image: '/images/pride/debut_moon.jpg',
  },
  {
    name: '포테이토',
    role: '아티스트',
    achievement: '음원 발매',
    image: '/images/pride/debut_potato.jpg',
  },
  {
    name: '리사',
    role: '아티스트',
    achievement: '활발한 음악 활동',
    image: '/images/pride/risa.jpg',
  },
  {
    name: '수강생 A',
    role: '프로 뮤지션',
    achievement: '데뷔 및 활동',
    image: '/images/pride/debut_a.jpg',
  },
  {
    name: '수강생 B',
    role: '프로 뮤지션',
    achievement: '데뷔 및 활동',
    image: '/images/pride/debut_b.jpg',
  },
  {
    name: '수강생 C',
    role: '프로 뮤지션',
    achievement: '데뷔 및 활동',
    image: '/images/pride/debut_c.jpg',
  },
];

export default function MusiciansSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.musician-item', {
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
      id="musicians"
      ref={sectionRef}
      style={{ padding: '120px 0', backgroundColor: '#000' }}
    >
      <div className="container">
        {/* Section Header */}
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
          TRAINEE DEBUT
        </p>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
          배출 뮤지션
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '60px', maxWidth: '600px' }}>
          경희실용음악학원을 거쳐 현재 음악계에서 활발히 활동 중인 뮤지션들입니다.
        </p>

        {/* Musicians Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {musicians.map((musician, index) => (
            <div
              key={index}
              className="musician-item"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#111',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                <Image
                  src={musician.image}
                  alt={musician.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {musician.name}
                </p>
                <p style={{ fontSize: '14px', color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  {musician.role}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                  {musician.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginTop: '100px',
          paddingTop: '60px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              25+
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              Years of History
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              1000+
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              합격생 배출
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              100+
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              프로 뮤지션 배출
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
