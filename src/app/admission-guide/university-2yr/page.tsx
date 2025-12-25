import SubPageLayout from '@/components/SubPageLayout';

const universities = [
  {
    name: '서울예술대학교',
    department: '실용음악과',
    admission: '수시/정시',
    exam: '실기(자유곡 1곡), 면접',
  },
  {
    name: '호원대학교',
    department: '실용음악학부',
    admission: '수시/정시',
    exam: '실기(자유곡), 시창',
  },
  {
    name: '백제예술대학교',
    department: '실용음악과',
    admission: '수시/정시',
    exam: '실기(전공실기), 면접',
  },
  {
    name: '동아방송예술대학교',
    department: '방송보컬과',
    admission: '수시/정시',
    exam: '실기(노래 2곡), 면접',
  },
  {
    name: '계명문화대학교',
    department: '뮤직프로덕션과',
    admission: '수시/정시',
    exam: '실기(전공실기), 면접',
  },
];

export default function University2YrPage() {
  return (
    <SubPageLayout
      title="2,3년제대학"
      subtitle="전문대학 실용음악과 입시 안내"
      bgImage="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              2,3년제 전문대학은 실무 중심의 교육으로<br />
              <strong>빠른 현장 진출</strong>을 목표로 합니다.<br />
              실기 능력과 무대 경험이 중요합니다.
            </p>
          </div>
        </div>
      </section>

      {/* University List */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            주요 전문대학 입시 정보
          </h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {universities.map((uni, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  padding: '28px 32px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>
                      {uni.name}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#10b981', fontWeight: 500 }}>
                      {uni.department}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>전형</p>
                    <p style={{ fontSize: '14px', color: '#333' }}>{uni.admission}</p>
                  </div>
                </div>
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                  <p style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>시험과목</p>
                  <p style={{ fontSize: '14px', color: '#555' }}>{uni.exam}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </SubPageLayout>
  );
}
