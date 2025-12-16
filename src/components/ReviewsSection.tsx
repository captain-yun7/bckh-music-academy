'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const yearlyAdmissions = [
  { year: '2025', image: '/images/pride/2025ha.jpg' },
  { year: '2024', image: '/images/pride/2024ha.jpg' },
  { year: '2023', image: '/images/pride/2023ha.jpg' },
  { year: '2022', image: '/images/pride/2022ha.jpg' },
  { year: '2021', image: '/images/pride/2021ha.jpg' },
];

const universities = {
  fourYear: [
    '서울예술대학교', '경희대학교', '단국대학교', '동덕여자대학교', '호원대학교',
    '백석대학교', '명지대학교', '상명대학교', '서경대학교', '한양대학교',
  ],
  twoYear: [
    '동아방송예술대학교', '국제예술대학교', '여주대학교', '백제예술대학교',
    '한국영상대학교', '서울예술실용전문학교', '디지털서울문화예술대학교',
  ],
  highSchool: [
    '서울공연예술고등학교', '서서울생활과학고등학교', '한림연예예술고등학교',
    '리라아트고등학교', '한국예술고등학교',
  ],
};

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.admission-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
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
      id="reviews"
      ref={sectionRef}
      style={{ padding: '120px 0 140px', backgroundColor: '#ffffff' }}
    >
      <div className="container">
        {/* Section Header */}
        <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
          PRIDE OF K.H
        </p>
        <h2 style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 700, color: '#000', marginBottom: '80px' }}>
          합격 실적
        </h2>

        {/* Yearly Admission Posters */}
        <div style={{ marginBottom: '100px' }}>
          <p style={{ color: '#666', fontSize: '18px', fontWeight: 600, marginBottom: '40px' }}>
            연도별 합격생 명단
          </p>
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
            {yearlyAdmissions.map((item, index) => (
              <div
                key={index}
                className="admission-item"
                style={{
                  minWidth: '220px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.18)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#f5f5f5' }}>
                  <Image
                    src={item.image}
                    alt={`${item.year}년 합격생`}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%)',
                  }} />
                </div>
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: '#111',
                  borderTop: '3px solid #ffc50a',
                }}>
                  <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>
                    {item.year}년
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* University List */}
        <div style={{ marginBottom: '100px' }}>
          <p style={{ color: '#666', fontSize: '18px', fontWeight: 600, marginBottom: '48px' }}>
            합격 대학 목록
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px' }}>
            {/* 4년제 대학 */}
            <div className="admission-item">
              <p style={{
                color: '#000',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '2px solid #000',
              }}>
                4년제 대학
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {universities.fourYear.map((uni, index) => (
                  <li key={index} style={{ color: '#555', fontSize: '16px', lineHeight: '2.2' }}>
                    {uni}
                  </li>
                ))}
              </ul>
            </div>

            {/* 2년제 대학 */}
            <div className="admission-item">
              <p style={{
                color: '#000',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '2px solid #000',
              }}>
                2년제 대학
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {universities.twoYear.map((uni, index) => (
                  <li key={index} style={{ color: '#555', fontSize: '16px', lineHeight: '2.2' }}>
                    {uni}
                  </li>
                ))}
              </ul>
            </div>

            {/* 예술 고등학교 */}
            <div className="admission-item">
              <p style={{
                color: '#000',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '2px solid #000',
              }}>
                예술 고등학교
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {universities.highSchool.map((school, index) => (
                  <li key={index} style={{ color: '#555', fontSize: '16px', lineHeight: '2.2' }}>
                    {school}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', paddingTop: '48px' }}>
          <p style={{ color: '#888', fontSize: '18px', marginBottom: '40px' }}>
            25년간 1,000명 이상의 합격생 배출
          </p>
          <a
            href="http://www.khmusic.co.kr/pride/sc_list.php"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              padding: '20px 48px',
              borderRadius: '100px',
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#333')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#000')}
          >
            전체 합격생 명단 보기
          </a>
        </div>
      </div>
    </section>
  );
}
