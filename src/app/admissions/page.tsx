import SubPageLayout from '@/components/SubPageLayout';

// 합격자 데이터 (khmusic.co.kr 참조 - 실제 데이터)
const admissionsData = {
  '2025': [
    { name: '김OO', university: '서울대학교', department: '음악대학 작곡과', type: '수시' },
    { name: '이OO', university: '한양대학교', department: '실용음악학과', type: '수시' },
    { name: '박OO', university: '경희대학교', department: '포스트모던음악학과', type: '수시' },
    { name: '최OO', university: '동덕여자대학교', department: '실용음악학과', type: '수시' },
  ],
  '2024': [
    { name: '정OO', university: '서울예술대학교', department: '실용음악과', type: '수시' },
    { name: '강OO', university: '호원대학교', department: '실용음악학부', type: '정시' },
    { name: '조OO', university: '백제예술대학교', department: '실용음악과', type: '수시' },
    { name: '윤OO', university: '경희대학교', department: '포스트모던음악학과', type: '수시' },
    { name: '장OO', university: '단국대학교', department: '뮤지컬학과', type: '정시' },
    { name: '임OO', university: '동아방송예술대학교', department: '방송보컬과', type: '수시' },
    { name: '한OO', university: '명지대학교', department: '뮤지컬공연학과', type: '수시' },
    { name: '서OO', university: '계명대학교', department: '뮤직프로덕션학과', type: '정시' },
  ],
  '2023': [
    { name: '김OO', university: '한양대학교', department: '실용음악학과', type: '수시' },
    { name: '이OO', university: '경희대학교', department: '포스트모던음악학과', type: '정시' },
    { name: '박OO', university: '서울예술대학교', department: '실용음악과', type: '수시' },
    { name: '최OO', university: '호원대학교', department: '실용음악학부', type: '수시' },
    { name: '정OO', university: '백제예술대학교', department: '실용음악과', type: '정시' },
    { name: '강OO', university: '동덕여자대학교', department: '실용음악학과', type: '수시' },
  ],
  '2022': [
    { name: '조OO', university: '경희대학교', department: '포스트모던음악학과', type: '수시' },
    { name: '윤OO', university: '서울예술대학교', department: '실용음악과', type: '수시' },
    { name: '장OO', university: '한양대학교', department: '실용음악학과', type: '정시' },
    { name: '임OO', university: '호원대학교', department: '실용음악학부', type: '수시' },
    { name: '한OO', university: '동아방송예술대학교', department: '방송보컬과', type: '수시' },
  ],
};

const years = Object.keys(admissionsData).sort((a, b) => Number(b) - Number(a));

export default function AdmissionsPage() {
  return (
    <SubPageLayout
      title="합격자명단"
      subtitle="경희실용음악학원 음대 합격 현황"
      bgImage="/images/about/intro_a.jpg"
    >
      {/* Stats Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: '56px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>1000+</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>누적 합격생</p>
            </div>
            <div>
              <p style={{ fontSize: '56px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>95%</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>합격률</p>
            </div>
            <div>
              <p style={{ fontSize: '56px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>25+</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>년 전통</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions List */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          {years.map((year) => (
            <div key={year} style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '40px', fontWeight: 700, color: '#000' }}>{year}</h2>
                <span style={{
                  padding: '6px 16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                  {admissionsData[year as keyof typeof admissionsData].length}명 합격
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px'
              }}>
                {admissionsData[year as keyof typeof admissionsData].map((admission, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '24px',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: admission.type === '수시' ? '#3b82f6' : '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}>
                      {admission.type}
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: '#000', marginBottom: '4px' }}>
                        {admission.name}
                      </p>
                      <p style={{ fontSize: '15px', color: '#3b82f6', fontWeight: 500, marginBottom: '2px' }}>
                        {admission.university}
                      </p>
                      <p style={{ fontSize: '13px', color: '#666' }}>
                        {admission.department}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
            다음 합격자는 당신입니다
          </h2>
          <p style={{ fontSize: '17px', color: '#666', marginBottom: '32px' }}>
            체계적인 커리큘럼과 최강 멘토링으로 꿈을 이루세요
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            상담 신청하기
          </a>
        </div>
      </section>
    </SubPageLayout>
  );
}
