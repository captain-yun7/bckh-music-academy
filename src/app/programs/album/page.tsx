import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const process = [
  { step: '01', title: '곡 선정', desc: '녹음할 곡 선정 및 편곡 방향 결정' },
  { step: '02', title: '프리프로덕션', desc: '녹음 전 리허설 및 레슨 진행' },
  { step: '03', title: '레코딩', desc: '전문 스튜디오에서 녹음 진행' },
  { step: '04', title: '믹싱/마스터링', desc: '전문 엔지니어의 후반 작업' },
  { step: '05', title: '음원 발매', desc: '멜론, 지니 등 주요 음원 플랫폼 발매' },
];

export default function AlbumPage() {
  return (
    <SubPageLayout
      title="수강생음반"
      subtitle="나만의 음반을 제작하세요"
      bgImage="/images/programs/album/photo01.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              경희실용음악학원은 수강생들의 음반 제작을 지원합니다.<br />
              전문 스튜디오에서 녹음부터 음원 발매까지<br />
              <strong>원스톱으로 진행</strong>됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            제작 과정
          </h2>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {process.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '24px',
                  marginBottom: i < process.length - 1 ? '32px' : 0,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <div style={{
                  flex: 1,
                  padding: '20px 28px',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#666' }}>
                    {item.desc}
                  </p>
                </div>
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
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#fff' }}>30+</p>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>발매 음원 수</p>
            </div>
            <div>
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#fff' }}>전문</p>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>레코딩 스튜디오</p>
            </div>
            <div>
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#fff' }}>전 과정</p>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>지원</p>
            </div>
          </div>
        </div>
      </section>

    </SubPageLayout>
  );
}
