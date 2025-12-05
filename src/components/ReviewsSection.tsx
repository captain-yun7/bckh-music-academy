'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const recentAdmissions = [
  { year: '2025', school: '서서울생활과학고등학교', major: '실용음악과', type: '고등학교' },
  { year: '2025', school: '국제예술대학교', major: '실용음악과', type: '2년제' },
  { year: '2025', school: '호원대학교', major: '실용음악학부', type: '4년제' },
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

        {/* Recent Admissions */}
        <div style={{ marginBottom: '100px' }}>
          <p style={{ color: '#666', fontSize: '18px', fontWeight: 600, marginBottom: '40px' }}>
            최근 합격 소식
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {recentAdmissions.map((item, index) => (
              <div
                key={index}
                className="admission-item"
                style={{
                  backgroundColor: '#f8f8f8',
                  borderRadius: '20px',
                  padding: '40px',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  backgroundColor: '#fff',
                  color: '#666',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '10px 20px',
                  borderRadius: '100px',
                  marginBottom: '32px',
                }}>
                  {item.year} {item.type}
                </span>
                <p style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
                  {item.school}
                </p>
                <p style={{ fontSize: '18px', color: '#888' }}>
                  {item.major}
                </p>
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
