import SubPageLayout from '@/components/SubPageLayout';

const programs = [
  { title: '고급 테크닉', desc: '전공별 심화 테크닉 및 표현력 향상' },
  { title: '레코딩 실습', desc: '전문 스튜디오에서 실제 녹음 경험' },
  { title: '세션 활동', desc: '현장 세션 참여 및 네트워킹 기회' },
  { title: '음반 제작', desc: '개인 앨범 또는 데모 제작 지원' },
  { title: '공연 기획', desc: '케이크콘서트 등 정기 공연 참여' },
  { title: '업계 멘토링', desc: '현직 프로 뮤지션의 1:1 멘토링' },
];

export default function ProfessionalCoursePage() {
  return (
    <SubPageLayout
      title="전문반"
      subtitle="프로 뮤지션을 향한 고급 과정"
      bgImage="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              프로 뮤지션, 세션맨, 프로듀서를 목표로 하는<br />
              <strong>심화 전문 과정</strong>입니다.<br />
              현장 경험과 네트워크를 쌓으며 프로로 성장하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            전문반 프로그램
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {programs.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '32px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  borderLeft: '4px solid #f59e0b',
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center',
          }}>
            <div>
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#f59e0b' }}>50+</p>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>배출 프로 뮤지션</p>
            </div>
            <div>
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#f59e0b' }}>100+</p>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>세션 활동 연결</p>
            </div>
            <div>
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#f59e0b' }}>30+</p>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>음반 제작 지원</p>
            </div>
          </div>
        </div>
      </section>

    </SubPageLayout>
  );
}
