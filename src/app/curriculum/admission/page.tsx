import SubPageLayout from '@/components/SubPageLayout';

const curriculum = [
  { step: '01', title: '레벨 테스트', desc: '현재 실력 진단 및 목표 대학 설정' },
  { step: '02', title: '맞춤 커리큘럼', desc: '개인별 약점 보완 및 강점 강화' },
  { step: '03', title: '전공 실기', desc: '입시곡 선정 및 집중 레슨' },
  { step: '04', title: '이론 수업', desc: '화성학, 시창청음, 음악이론' },
  { step: '05', title: '모의고사', desc: '실전과 동일한 환경에서 연습' },
  { step: '06', title: '입시 컨설팅', desc: '대학별 전형 분석 및 전략 수립' },
];

const universities = [
  '서울대학교', '한양대학교', '경희대학교', '동덕여자대학교',
  '서울예술대학교', '호원대학교', '백제예술대학교', '명지대학교',
  '단국대학교', '계명대학교', '동아방송예술대학교', '그 외 다수',
];

export default function AdmissionCoursePage() {
  return (
    <SubPageLayout
      title="입시반"
      subtitle="실용음악 대학 합격을 위한 체계적인 준비"
      bgImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={{
              fontSize: '18px',
              color: '#333',
              lineHeight: 1.9,
              textAlign: 'center',
            }}>
              경희실용음악학원 입시반은 25년 전통의 노하우로<br />
              <strong>연간 95% 이상의 합격률</strong>을 자랑합니다.<br />
              1:1 맞춤 레슨과 체계적인 커리큘럼으로 꿈의 대학에 합격하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Steps */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            입시반 커리큘럼
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {curriculum.map((item) => (
              <div
                key={item.step}
                style={{
                  padding: '32px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <span style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#3b82f6',
                  letterSpacing: '0.1em',
                }}>
                  STEP {item.step}
                </span>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#000',
                  margin: '12px 0',
                }}>
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

      {/* Universities */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
            주요 합격 대학
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
          }}>
            {universities.map((uni) => (
              <span
                key={uni}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '30px',
                  color: '#fff',
                  fontSize: '15px',
                }}
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </section>

    </SubPageLayout>
  );
}
