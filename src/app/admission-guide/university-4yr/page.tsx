import SubPageLayout from '@/components/SubPageLayout';

const universities = [
  {
    name: '서울대학교',
    department: '음악대학 작곡과(재즈작곡전공)',
    admission: '수시/정시',
    exam: '실기(작곡, 즉흥연주), 면접',
  },
  {
    name: '한양대학교',
    department: '실용음악학과',
    admission: '수시/정시',
    exam: '실기(전공실기, 시창청음), 면접',
  },
  {
    name: '경희대학교',
    department: '포스트모던음악학과',
    admission: '수시/정시',
    exam: '실기(자유곡, 지정곡), 이론',
  },
  {
    name: '동덕여자대학교',
    department: '실용음악학과',
    admission: '수시/정시',
    exam: '실기(전공실기), 면접',
  },
  {
    name: '명지대학교',
    department: '뮤지컬공연학과',
    admission: '수시/정시',
    exam: '실기(노래, 연기, 무용), 면접',
  },
  {
    name: '단국대학교',
    department: '뮤지컬학과',
    admission: '수시/정시',
    exam: '실기(뮤지컬실기), 면접',
  },
];

export default function University4YrPage() {
  return (
    <SubPageLayout
      title="4년제대학"
      subtitle="4년제 대학 실용음악과 입시 안내"
      bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              4년제 대학 실용음악과는 높은 경쟁률과<br />
              <strong>전문적인 실기 능력</strong>을 요구합니다.<br />
              체계적인 준비가 합격의 열쇠입니다.
            </p>
          </div>
        </div>
      </section>

      {/* University List */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            주요 대학 입시 정보
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
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>
                      {uni.name}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#3b82f6', fontWeight: 500 }}>
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
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#999',
            marginTop: '24px',
          }}>
            * 입시 정보는 변경될 수 있으니 반드시 대학 공식 입시요강을 확인하세요
          </p>
        </div>
      </section>

    </SubPageLayout>
  );
}
