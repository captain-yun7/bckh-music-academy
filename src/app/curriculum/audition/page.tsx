import SubPageLayout from '@/components/SubPageLayout';

const features = [
  { icon: '🎤', title: '오디션 곡 선정', desc: '개인의 강점을 살리는 곡 선정 및 편곡' },
  { icon: '🎭', title: '무대 퍼포먼스', desc: '표정, 동선, 제스처 등 종합 연출' },
  { icon: '📹', title: '카메라 테스트', desc: '영상 촬영을 통한 객관적 피드백' },
  { icon: '💪', title: '멘탈 관리', desc: '긴장 완화 및 자신감 향상 훈련' },
  { icon: '🎵', title: '보컬 트레이닝', desc: '음색, 발성, 호흡 집중 레슨' },
  { icon: '💃', title: '댄스 기초', desc: '기본 리듬감 및 퍼포먼스 능력 향상' },
];

export default function AuditionCoursePage() {
  return (
    <SubPageLayout
      title="오디션반"
      subtitle="프로 데뷔를 위한 집중 트레이닝"
      bgImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              기획사 오디션, 방송 오디션, 공개 채용까지<br />
              <strong>프로 데뷔를 목표로 하는 집중 트레이닝 과정</strong>입니다.<br />
              현직 프로듀서와 트레이너의 실전 노하우를 전수받으세요.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            오디션반 프로그램
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {features.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '32px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>
                  {item.icon}
                </span>
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

      {/* Process */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
            오디션 준비 과정
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            {['상담 & 진단', '곡 선정', '집중 레슨', '모의 오디션', '실전 지원'].map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}>
                  {i + 1}
                </div>
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>
                  {step}
                </span>
                {i < 4 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </SubPageLayout>
  );
}
