import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const rankings = [
  { rank: '1위', discount: '50%', color: '#ffc50a' },
  { rank: '2위', discount: '30%', color: '#c0c0c0' },
  { rank: '3위', discount: '20%', color: '#cd7f32' },
];

const rules = [
  { title: '절대평가', desc: '배운 기간, 나이에 관계없이 동일 기준 적용' },
  { title: '전공실기 시험', desc: '전공실기 시험 점수만 반영' },
  { title: '통합선발', desc: '연주/작곡/미디와 보컬/싱송 계열 통합 선발 가능' },
];

export default function MeritScholarshipPage() {
  return (
    <SubPageLayout
      title="성적장학"
      subtitle="노력하는 당신을 응원합니다"
      bgImage="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#ffc50a',
              marginBottom: '16px',
            }}>
              최대 50%
            </div>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              전공실기 시험에서 우수한 성적을 거둔 학생에게<br />
              다음 달 수강료를 최대 50%까지 감면해드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Rankings */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '48px' }}>
            순위별 감면율
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {rankings.map((item) => (
              <div
                key={item.rank}
                style={{
                  width: '200px',
                  padding: '40px 32px',
                  backgroundColor: '#111',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: `2px solid ${item.color}`,
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 20px',
                  backgroundColor: item.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#000">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <p style={{ fontSize: '20px', color: item.color, fontWeight: 700, marginBottom: '12px' }}>
                  {item.rank}
                </p>
                <p style={{ fontSize: '48px', fontWeight: 700, color: '#fff' }}>
                  {item.discount}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
                  다음달 수강료
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            평가 기준
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {rules.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '32px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  borderLeft: '4px solid #ffc50a',
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

      {/* Notice */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#f8f8f8',
            borderRadius: '16px',
            padding: '40px',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '24px' }}>
              안내사항
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                성적장학금은 매월 전공실기 시험 결과에 따라 선발됩니다.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                절대평가 방식으로 배운 기간이나 나이는 평가에 반영되지 않습니다.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                연주/작곡/미디 계열과 보컬/싱송 계열 학생들이 통합 선발됩니다.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                장학금은 다음 달 수강료에서 자동 차감됩니다.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffc50a' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '17px', color: 'rgba(0,0,0,0.8)', marginBottom: '24px' }}>
            성적장학금은 재학생에게 자동 적용됩니다
          </p>
          <Link
            href="/scholarship"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: '#000',
              color: '#fff',
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
