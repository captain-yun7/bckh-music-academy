import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const criteria = [
  { title: '월별 성취도 평가', desc: '담당 강사의 월별 레슨 성취도 평가 A등급 이상' },
  { title: '정기 테스트', desc: '분기별 실기 테스트에서 상위 20% 이내' },
  { title: '출석률', desc: '해당 기간 출석률 100% 달성' },
  { title: '발표회 참여', desc: '케이크콘서트 등 정기 발표회 적극 참여' },
];

export default function MeritScholarshipPage() {
  return (
    <SubPageLayout
      title="성적장학"
      subtitle="노력하는 당신을 응원합니다"
      bgImage="/images/about/intro_a.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#10b981',
              marginBottom: '16px',
            }}>
              최대 30%
            </div>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              재학 중 우수한 성적을 거둔 학생에게<br />
              다음 학기 수업료를 최대 30%까지 감면해드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Criteria */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            선발 기준
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {criteria.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '32px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  borderLeft: '4px solid #10b981',
                }}
              >
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#000',
                  marginBottom: '12px',
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

      {/* Benefits */}
      <section style={{ padding: '80px 0', backgroundColor: '#10b981' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
            등급별 감면율
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            {[
              { grade: '최우수', rate: '30%' },
              { grade: '우수', rate: '20%' },
              { grade: '장려', rate: '10%' },
            ].map((item) => (
              <div
                key={item.grade}
                style={{
                  padding: '32px 48px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                  {item.grade}
                </p>
                <p style={{ fontSize: '40px', fontWeight: 700, color: '#fff' }}>
                  {item.rate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '17px', color: '#666', marginBottom: '24px' }}>
            성적장학금은 재학생에게 자동 적용됩니다
          </p>
          <Link
            href="/scholarship"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            장학제도 전체보기
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
