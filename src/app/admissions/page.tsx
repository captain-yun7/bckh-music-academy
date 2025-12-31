'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';

interface Admission {
  id: string;
  studentName: string;
  university: string;
  department: string;
  year: number;
  major: string | null;
  isEarlyAdmission: boolean;
}

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const res = await fetch('/api/admissions');
        const data = await res.json();
        setAdmissions(data);

        // 연도 목록 추출
        const uniqueYears = [...new Set(data.map((a: Admission) => a.year))] as number[];
        uniqueYears.sort((a, b) => b - a);
        setYears(uniqueYears);

        // 최신 연도 기본 선택
        if (uniqueYears.length > 0) {
          setSelectedYear(uniqueYears[0]);
        }
      } catch (error) {
        console.error('Failed to fetch admissions:', error);
      }
      setIsLoading(false);
    };

    fetchAdmissions();
  }, []);

  const filteredAdmissions = selectedYear
    ? admissions.filter(a => a.year === selectedYear)
    : admissions;

  const currentYearCount = filteredAdmissions.length;

  return (
    <SubPageLayout
      title="연도별 합격자"
      subtitle="경희실용음악학원 음대 합격 현황"
      bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
    >
      {/* Year Selector */}
      <section style={{ padding: '40px 0', backgroundColor: '#111', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          {isLoading ? (
            <div style={{ textAlign: 'center', color: '#999' }}>로딩중...</div>
          ) : years.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#999' }}>등록된 합격자가 없습니다.</div>
          ) : (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              {years.map((year) => {
                const count = admissions.filter(a => a.year === year).length;
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
          )}
        </div>
      </section>

      {/* Admission List by Year */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          {!isLoading && selectedYear && (
            <>
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
                  총 {currentYearCount}명 합격
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
                {filteredAdmissions.map((admission) => (
                  <div
                    key={admission.id}
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
                        {admission.studentName}
                      </p>
                      <p style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '14px',
                      }}>
                        {admission.university} · {admission.department}
                        {admission.major && ` (${admission.major})`}
                      </p>
                      {admission.isEarlyAdmission && (
                        <span style={{
                          display: 'inline-block',
                          marginTop: '6px',
                          padding: '4px 10px',
                          backgroundColor: 'rgba(255,197,10,0.2)',
                          color: '#ffc50a',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}>
                          수시합격
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

    </SubPageLayout>
  );
}
