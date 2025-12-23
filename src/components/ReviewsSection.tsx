'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

// 년도별 합격자 데이터
const admissionsByYear: Record<string, { summary: string; students: { name: string; school: string; major: string }[] }> = {
  '2025': {
    summary: '서울예대 외 32명',
    students: [
      { name: '박은진', school: '단국대학교', major: '싱어송라이터' },
      { name: '강은지', school: '동덕여자대학교', major: '피아노' },
      { name: '최영민', school: '호원대학교', major: 'K-POP' },
      { name: '김서연', school: '서울예술대학교', major: '실용음악' },
      { name: '이하늘', school: '경희대학교', major: '포스트모던음악' },
      { name: '정민수', school: '한양대학교', major: '실용음악' },
      { name: '박지원', school: '동아방송예술대학교', major: '보컬' },
      { name: '김도현', school: '백제예술대학교', major: '작곡' },
    ],
  },
  '2024': {
    summary: '서울예대 외 45명',
    students: [
      { name: '차예서', school: '호원대학교', major: 'K-POP' },
      { name: '최지혜', school: '서울공연예술고등학교', major: '보컬' },
      { name: '이은비', school: '동아방송예술대학교', major: '작곡' },
      { name: '김태윤', school: '서울예술대학교', major: '실용음악' },
      { name: '박소희', school: '경희대학교', major: '포스트모던음악' },
      { name: '정유진', school: '단국대학교', major: '뮤지컬' },
      { name: '이준서', school: '한양대학교', major: '실용음악' },
      { name: '강민지', school: '동덕여자대학교', major: '피아노' },
      { name: '조현아', school: '백제예술대학교', major: '보컬' },
      { name: '윤서현', school: '서울실용음악고등학교', major: '보컬' },
    ],
  },
  '2023': {
    summary: '서울예대 외 52명',
    students: [
      { name: '김하은', school: '서울예술대학교', major: '실용음악' },
      { name: '이서준', school: '경희대학교', major: '포스트모던음악' },
      { name: '박민서', school: '한양대학교', major: '실용음악' },
      { name: '정예린', school: '동아방송예술대학교', major: '보컬' },
      { name: '최우진', school: '단국대학교', major: '작곡' },
      { name: '강지우', school: '백제예술대학교', major: '실용음악' },
      { name: '윤하영', school: '명지대학교', major: '보컬' },
      { name: '조민준', school: '상명대학교', major: 'MIDI' },
      { name: '임수빈', school: '서울공연예술고등학교', major: '보컬' },
      { name: '한지민', school: '동덕여자대학교', major: '피아노' },
      { name: '송예나', school: '호원대학교', major: 'K-POP' },
      { name: '오승우', school: '계명대학교', major: '실용음악' },
    ],
  },
  '2022': {
    summary: '서울예대 외 48명',
    students: [
      { name: '김도윤', school: '서울예술대학교', major: '실용음악' },
      { name: '이수민', school: '경희대학교', major: '포스트모던음악' },
      { name: '박지훈', school: '한양대학교', major: '실용음악' },
      { name: '정서연', school: '동아방송예술대학교', major: '작곡' },
      { name: '최민혁', school: '단국대학교', major: '싱어송라이터' },
      { name: '강수진', school: '백제예술대학교', major: '보컬' },
      { name: '윤재현', school: '명지대학교', major: '기타' },
      { name: '조아린', school: '상명대학교', major: '피아노' },
      { name: '임채원', school: '한림연예예술고등학교', major: '보컬' },
      { name: '한서윤', school: '동덕여자대학교', major: '작곡' },
    ],
  },
  '2021': {
    summary: '서울예대 외 41명',
    students: [
      { name: '김예진', school: '서울예술대학교', major: '실용음악' },
      { name: '이하준', school: '경희대학교', major: '포스트모던음악' },
      { name: '박서아', school: '한양대학교', major: '실용음악' },
      { name: '정우성', school: '동아방송예술대학교', major: 'MIDI' },
      { name: '최유나', school: '단국대학교', major: '보컬' },
      { name: '강태현', school: '백제예술대학교', major: '드럼' },
      { name: '윤미래', school: '명지대학교', major: '작곡' },
      { name: '조현우', school: '상명대학교', major: '기타' },
    ],
  },
};

const years = ['2025', '2024', '2023', '2022', '2021'];

export default function ReviewsSection() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentData = admissionsByYear[selectedYear];

  // 이름 마스킹 함수 (중간 글자를 * 처리)
  const maskName = (name: string) => {
    if (name.length === 2) {
      return name[0] + '*';
    } else if (name.length >= 3) {
      return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    }
    return name;
  };

  return (
    <section id="reviews" style={{ backgroundColor: '#000' }}>
      {/* Header */}
      <div style={{ padding: '100px 0 60px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
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
              18년간 쌓아온 신뢰와 결과로 증명합니다
            </p>
          </div>
        </div>
      </div>

      {/* Year Selector Ticker */}
      <div style={{
        padding: '0',
        backgroundColor: '#ffc50a',
        overflow: 'hidden',
      }}>
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            animation: 'scrollYears 20s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {[...years, ...years, ...years].map((year, index) => (
            <button
              key={index}
              onClick={() => setSelectedYear(year)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '24px 48px',
                backgroundColor: selectedYear === year ? '#000' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}
            >
              <span style={{
                backgroundColor: selectedYear === year ? '#ffc50a' : '#000',
                color: selectedYear === year ? '#000' : '#ffc50a',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: 700,
              }}>
                {year}
              </span>
              <span style={{
                color: selectedYear === year ? '#fff' : '#000',
                fontSize: '16px',
                fontWeight: 600,
              }}>
                {admissionsByYear[year].summary}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Year Tabs (Static) */}
      <div style={{
        padding: '40px 0',
        backgroundColor: '#111',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  padding: '14px 28px',
                  backgroundColor: selectedYear === year ? '#ffc50a' : 'transparent',
                  border: selectedYear === year ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '100px',
                  color: selectedYear === year ? '#000' : '#fff',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                {year}년
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Admission List by Year */}
      <div style={{ padding: '80px 0' }}>
        <div className="container">
          {/* Year Title */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '12px',
            }}>
              {selectedYear}년 합격자
            </h3>
            <p style={{
              color: '#ffc50a',
              fontSize: '20px',
              fontWeight: 600,
            }}>
              {currentData.summary}
            </p>
          </div>

          {/* Student Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {currentData.students.map((student, index) => (
              <div
                key={index}
                style={{
                  padding: '24px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ffc50a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p style={{
                    color: '#fff',
                    fontSize: '17px',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    {maskName(student.name)}
                  </p>
                  <p style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '14px',
                  }}>
                    {student.school} · {student.major}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
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
        @keyframes scrollYears {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
