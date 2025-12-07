import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const agencies = [
  'SM 엔터테인먼트', 'JYP 엔터테인먼트', 'YG 엔터테인먼트',
  'HYBE', '스타쉽', '판타지오', '젤리피쉬', 'FNC',
];

export default function RegularAuditionPage() {
  return (
    <SubPageLayout
      title="정기오디션"
      subtitle="기획사 관계자 초청 오디션"
      bgImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              경희실용음악학원은 정기적으로<br />
              <strong>대형 기획사 관계자를 초청</strong>하여<br />
              수강생들에게 직접 오디션 기회를 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            <div style={{
              padding: '32px',
              backgroundColor: '#fff',
              borderRadius: '16px',
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#10b981' }}>
                직접 스카우트 기회
              </h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                기획사 캐스팅 담당자가 직접 참관하여
                현장에서 스카우트 제의를 받을 수 있습니다.
              </p>
            </div>
            <div style={{
              padding: '32px',
              backgroundColor: '#fff',
              borderRadius: '16px',
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#10b981' }}>
                전문 피드백
              </h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                오디션 후 전문가의 상세한 피드백을 받아
                부족한 점을 보완할 수 있습니다.
              </p>
            </div>
            <div style={{
              padding: '32px',
              backgroundColor: '#fff',
              borderRadius: '16px',
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#10b981' }}>
                실전 경험
              </h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                실제 오디션과 동일한 환경에서
                긴장감 있는 경험을 쌓을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agencies */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '40px' }}>
            협력 기획사
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
          }}>
            {agencies.map((agency) => (
              <span
                key={agency}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '30px',
                  color: '#fff',
                  fontSize: '15px',
                }}
              >
                {agency}
              </span>
            ))}
          </div>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '24px',
          }}>
            * 협력사는 변동될 수 있습니다
          </p>
        </div>
      </section>

      {/* Schedule */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
            오디션 일정
          </h3>
          <p style={{ fontSize: '17px', color: '#666', marginBottom: '32px' }}>
            연 2~3회 (상반기/하반기)
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#10b981',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            오디션 참가 신청
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
