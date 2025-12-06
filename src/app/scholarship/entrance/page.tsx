import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const benefits = [
  { level: '1등급', discount: '50%', criteria: '레벨테스트 상위 5%' },
  { level: '2등급', discount: '30%', criteria: '레벨테스트 상위 15%' },
  { level: '3등급', discount: '20%', criteria: '레벨테스트 상위 30%' },
  { level: '특별', discount: '10%', criteria: '형제/자매 동시 등록' },
];

export default function EntranceScholarshipPage() {
  return (
    <SubPageLayout
      title="입학장학"
      subtitle="시작부터 함께하는 장학 혜택"
      bgImage="/images/about/intro_a.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#3b82f6',
              marginBottom: '16px',
            }}>
              최대 50%
            </div>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              입학 시 레벨 테스트 결과에 따라<br />
              수업료의 최대 50%까지 장학금을 지원합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Table */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            등급별 혜택
          </h2>
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            {benefits.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 120px 1fr',
                  alignItems: 'center',
                  padding: '24px 32px',
                  borderBottom: i < benefits.length - 1 ? '1px solid #f0f0f0' : 'none',
                }}
              >
                <span style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#3b82f6',
                }}>
                  {item.level}
                </span>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#000',
                }}>
                  {item.discount}
                </span>
                <span style={{
                  fontSize: '15px',
                  color: '#666',
                }}>
                  {item.criteria}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            신청 절차
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            {['상담 예약', '레벨 테스트', '등급 판정', '장학금 적용'].map((step, i) => (
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
                  backgroundColor: '#3b82f6',
                  color: '#fff',
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

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#3b82f6' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
            레벨 테스트를 통해 장학금 혜택을 확인해보세요
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#fff',
              color: '#3b82f6',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            레벨 테스트 신청
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
