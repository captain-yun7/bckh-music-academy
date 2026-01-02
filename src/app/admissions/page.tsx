'use client';

import { useState } from 'react';
import SubPageLayout from '@/components/SubPageLayout';
import { admissionsByYear, years } from '@/data/admissions';

export default function AdmissionsPage() {
  const [selectedYear, setSelectedYear] = useState('2025');

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
    <SubPageLayout
      title="연도별 합격자"
      subtitle="경희실용음악학원 음대 합격 현황"
      bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
    >
      {/* Year Selector */}
      <section style={{ padding: '40px 0', backgroundColor: '#111', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {years.map((year) => {
              const count = admissionsByYear[year].students.length;
              return (
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
                  {year}년 ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Admission List by Year */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
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
              총 {currentData.students.length}명 합격
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
        </div>
      </section>
    </SubPageLayout>
  );
}
