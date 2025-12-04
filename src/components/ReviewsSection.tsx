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
    <section id="reviews" ref={sectionRef} className="portfolio-section">
      <div className="container">
        <p className="section-label">PRIDE OF K.H</p>
        <h2 className="section-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>합격 실적</h2>

        {/* Recent Admissions */}
        <div className="mt-12 mb-16">
          <p className="text-[var(--text-light)] text-sm mb-6">최근 합격 소식</p>
          <div className="portfolio-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {recentAdmissions.map((item, index) => (
              <div key={index} className="admission-item portfolio-card">
                <div className="portfolio-content">
                  <span className="badge mb-3">{item.year} {item.type}</span>
                  <p className="portfolio-title" style={{ fontSize: '16px' }}>{item.school}</p>
                  <p className="portfolio-meta">{item.major}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* University List - Work List Style */}
        <div className="work-list" style={{ background: 'transparent', padding: '0' }}>
          <p className="text-[var(--text-light)] text-sm mb-6">합격 대학 목록</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="admission-item">
              <p className="text-[var(--text-gray)] text-xs uppercase tracking-wider mb-4">4년제 대학</p>
              {universities.fourYear.map((uni, index) => (
                <div key={index} className="py-2 border-b border-[var(--border-light)]">
                  <span className="text-[var(--text-dark)] text-sm">{uni}</span>
                </div>
              ))}
            </div>
            <div className="admission-item">
              <p className="text-[var(--text-gray)] text-xs uppercase tracking-wider mb-4">2년제 대학</p>
              {universities.twoYear.map((uni, index) => (
                <div key={index} className="py-2 border-b border-[var(--border-light)]">
                  <span className="text-[var(--text-dark)] text-sm">{uni}</span>
                </div>
              ))}
            </div>
            <div className="admission-item">
              <p className="text-[var(--text-gray)] text-xs uppercase tracking-wider mb-4">예술 고등학교</p>
              {universities.highSchool.map((school, index) => (
                <div key={index} className="py-2 border-b border-[var(--border-light)]">
                  <span className="text-[var(--text-dark)] text-sm">{school}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-[var(--text-light)] text-sm mb-6">25년간 1,000명 이상의 합격생 배출</p>
          <a
            href="http://www.khmusic.co.kr/pride/sc_list.php"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark"
          >
            전체 합격생 명단 보기
          </a>
        </div>
      </div>
    </section>
  );
}
