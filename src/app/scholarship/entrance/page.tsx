import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const benefits = [
  { level: '서울예대 예비 1~5번', condition: '동아방송예대 재학중', discount: '50%' },
  { level: '동아방송예대 예비 1~5번', condition: '서경, 홍익, 한양, 호원 재학중', discount: '40%' },
  { level: '위 대학 예비 1~5번', condition: '경희, 단국, 동덕(보컬/피아노) 재학중', discount: '30%' },
  { level: '기타 대학', condition: '기타 실용음악 관련 대학', discount: '15%' },
];

export default function EntranceScholarshipPage() {
  return (
    <SubPageLayout
      title="입학장학"
      subtitle="시작부터 함께하는 장학 혜택"
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
              대학 합격생/재학생을 위한 특별 장학 혜택<br />
              수업료의 최대 50%까지 장학금을 지원합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Table */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            대상별 할인율
          </h2>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 120px',
              alignItems: 'center',
              padding: '20px 32px',
              backgroundColor: '#000',
              color: '#fff',
            }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>합격/예비 조건</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>또는 재학 조건</span>
              <span style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>할인율</span>
            </div>
            {benefits.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 120px',
                  alignItems: 'center',
                  padding: '24px 32px',
                  borderBottom: i < benefits.length - 1 ? '1px solid #f0f0f0' : 'none',
                }}
              >
                <span style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#333',
                }}>
                  {item.level}
                </span>
                <span style={{
                  fontSize: '15px',
                  color: '#666',
                }}>
                  {item.condition}
                </span>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#ffc50a',
                  textAlign: 'center',
                }}>
                  {item.discount}
                </span>
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
            backgroundColor: '#fffbeb',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid #ffc50a',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              유의사항
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                합격 후 미진학의 경우에도 반수생과 동일하게 인정됩니다.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                예비번호는 해당 학교의 공식 발표 기준입니다.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#c00', lineHeight: 1.7, fontWeight: 500 }}>
                <span style={{ color: '#c00', fontWeight: 700 }}>•</span>
                증빙서류 위조/변조 적발 시 강력한 법적 조치가 취해집니다.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            신청 방법
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            {['상담 예약', '증빙서류 제출', '심사 및 확정', '장학금 적용'].map((step, i) => (
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

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
            대학 합격증 또는 재학증명서를 준비해 상담받으세요
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#ffc50a',
              color: '#000',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            상담 신청하기
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
