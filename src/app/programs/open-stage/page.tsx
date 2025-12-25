import SubPageLayout from '@/components/SubPageLayout';

const features = [
  {
    title: '누구나 참여',
    desc: '입시반, 전문반, 취미반, 오디션반 구분 없이 모든 수강생이 참여 가능합니다.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: '원내 소극장',
    desc: '학원 내 전용 소극장 무대에서 실전 공연 경험을 쌓을 수 있습니다.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
  },
  {
    title: 'MR 참여 가능',
    desc: '밴드 없이도 MR(음원)을 사용하여 무대에 참여할 수 있습니다.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: '팀 구성 지원',
    desc: '솔로 참가자를 위해 학원에서 밴드 팀 구성을 도와드립니다.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export default function OpenStagePage() {
  return (
    <SubPageLayout
      title="오픈스테이지"
      subtitle="무대 경험을 쌓는 열린 공연"
      bgImage="/images/programs/open-stage/photo01.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              오픈스테이지는 <strong style={{ color: '#ffc50a' }}>모든 수강생</strong>이 참여할 수 있는<br />
              열린 공연 프로그램입니다.<br />
              실전 무대 경험을 통해 성장할 수 있는 기회를 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            프로그램 특징
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {features.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '40px 32px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#000' }}>
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

      {/* Schedule */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '40px' }}>
              진행 일정
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            }}>
              <div style={{
                padding: '32px',
                backgroundColor: '#111',
                borderRadius: '16px',
                border: '1px solid #333',
              }}>
                <p style={{ fontSize: '48px', fontWeight: 700, color: '#ffc50a', marginBottom: '8px' }}>
                  4회
                </p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>
                  연간 개최
                </p>
              </div>
              <div style={{
                padding: '32px',
                backgroundColor: '#111',
                borderRadius: '16px',
                border: '1px solid #333',
              }}>
                <p style={{ fontSize: '48px', fontWeight: 700, color: '#ffc50a', marginBottom: '8px' }}>
                  원내
                </p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>
                  소극장 무대
                </p>
              </div>
            </div>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '32px' }}>
              상세 일정은 학원 공지사항을 확인해주세요
            </p>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            참여 방법
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            {['참가 신청', '곡 선정 & 연습', '리허설', '무대 공연'].map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: '16px', fontWeight: 500, color: '#333' }}>
                  {step}
                </span>
                {i < 3 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2">
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
