'use client';

import Link from 'next/link';

// 합격 대학 데이터
const universities = {
  fourYear: ['경희대학교', '한양대학교', '단국대학교', '동덕여자대학교', '명지대학교', '상명대학교', '서경대학교', '백석대학교', '호원대학교', '계명대학교'],
  twoYear: ['서울예술대학교', '동아방송예술대학교', '백제예술대학교', '여주대학교', '국제예술대학교', '한국영상대학교'],
  highSchool: ['서울공연예술고등학교', '서서울생활과학고등학교', '한림연예예술고등학교', '리라아트고등학교', '서울실용음악고등학교'],
};

// 최근 합격 소식
const recentAdmissions = [
  { year: '2025', name: '박은진', university: '단국대학교', major: '싱어송라이터' },
  { year: '2025', name: '강은지', university: '동덕여자대학교', major: '피아노' },
  { year: '2025', name: '최영민', university: '호원대학교', major: 'K-POP' },
  { year: '2024', name: '차예서', university: '호원대학교', major: 'K-POP' },
  { year: '2024', name: '최지혜', university: '서울공연예술고', major: '보컬' },
  { year: '2024', name: '이은비', university: '동아방송예술대', major: '작곡' },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" style={{ backgroundColor: '#000' }}>
      {/* Hero Stats */}
      <div style={{ padding: '100px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{
              color: '#ffc50a',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              PRIDE OF K.H
            </p>
            <h2 style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '20px'
            }}>
              합격 실적
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px' }}>
              25년간 쌓아온 신뢰와 결과로 증명합니다
            </p>
          </div>

          {/* Big Numbers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {[
              { number: '25+', label: '년 전통' },
              { number: '1000+', label: '누적 합격생' },
              { number: '95%', label: '합격률' },
              { number: '50+', label: '합격 대학' },
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: 'clamp(40px, 8vw, 72px)',
                  fontWeight: 800,
                  color: '#ffc50a',
                  lineHeight: 1,
                  marginBottom: '12px',
                }}>
                  {stat.number}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Admissions Ticker */}
      <div style={{
        padding: '40px 0',
        backgroundColor: '#ffc50a',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          gap: '60px',
          animation: 'scroll 30s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {[...recentAdmissions, ...recentAdmissions].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{
                backgroundColor: '#000',
                color: '#ffc50a',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: 700,
              }}>
                {item.year}
              </span>
              <span style={{ color: '#000', fontSize: '16px', fontWeight: 600 }}>
                {item.name}
              </span>
              <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: '15px' }}>
                {item.university} {item.major}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* University List */}
      <div style={{ padding: '100px 0' }}>
        <div className="container">
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            marginBottom: '48px',
          }}>
            합격 대학 목록
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
            {/* 4년제 */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #ffc50a',
              }}>
                <span style={{
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}>
                  4년제
                </span>
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>
                  대학교
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {universities.fourYear.map((uni, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '10px 18px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '100px',
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                  >
                    {uni}
                  </span>
                ))}
              </div>
            </div>

            {/* 2년제 */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #ffc50a',
              }}>
                <span style={{
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}>
                  2년제
                </span>
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>
                  대학교
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {universities.twoYear.map((uni, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '10px 18px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '100px',
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '14px',
                    }}
                  >
                    {uni}
                  </span>
                ))}
              </div>
            </div>

            {/* 고등학교 */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #ffc50a',
              }}>
                <span style={{
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}>
                  예고
                </span>
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>
                  예술고등학교
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {universities.highSchool.map((school, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '10px 18px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '100px',
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '14px',
                    }}
                  >
                    {school}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <Link
              href="/admissions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                backgroundColor: '#ffc50a',
                borderRadius: '100px',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 700,
                transition: 'transform 0.2s',
              }}
            >
              전체 합격생 명단 보기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
