import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const schools = [
  {
    name: '서울예술고등학교',
    location: '서울',
    departments: '음악과, 무용과, 연극영화과',
    exam: '실기(전공실기), 면접',
  },
  {
    name: '안양예술고등학교',
    location: '경기',
    departments: '음악과, 미술과, 무용과',
    exam: '실기(전공실기), 면접',
  },
  {
    name: '계원예술고등학교',
    location: '경기',
    departments: '음악과, 미술과, 무용과',
    exam: '실기(전공실기), 면접',
  },
  {
    name: '고양예술고등학교',
    location: '경기',
    departments: '음악과, 미술과, 무용과',
    exam: '실기(전공실기), 면접',
  },
];

export default function ArtHighschoolPage() {
  return (
    <SubPageLayout
      title="예술고등학교"
      subtitle="예술고 입시 안내"
      bgImage="/images/about/intro_a.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              예술고등학교는 중학교 때부터<br />
              <strong>전문적인 음악 교육</strong>을 받을 수 있는 기회입니다.<br />
              조기 진로 결정을 원하는 학생에게 추천합니다.
            </p>
          </div>
        </div>
      </section>

      {/* School List */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            주요 예술고등학교
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {schools.map((school, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  padding: '28px',
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}>
                  {school.location}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '8px' }}>
                  {school.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                  {school.departments}
                </p>
                <div style={{ paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                  <p style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>시험과목</p>
                  <p style={{ fontSize: '14px', color: '#555' }}>{school.exam}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
            예술고 입시 준비 TIP
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {[
              { num: '1', tip: '중학교 1학년부터 체계적인 레슨 시작' },
              { num: '2', tip: '기초 음악이론(화성학, 시창청음) 병행' },
              { num: '3', tip: '무대 경험을 통한 실전 감각 익히기' },
              { num: '4', tip: '전공 실기에 집중하되 기본기 탄탄히' },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {item.num}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, paddingTop: '8px' }}>
                  {item.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#f59e0b',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            예술고 입시 상담
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
