import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const features = [
  { title: '그룹 합주', desc: '다양한 악기의 조화를 배우는 앙상블 훈련' },
  { title: '실전 리허설', desc: '공연을 가정한 실전 리허설 진행' },
  { title: '음악적 소통', desc: '다른 연주자와의 호흡을 맞추는 훈련' },
  { title: '장르 다양성', desc: '팝, 재즈, R&B 등 다양한 장르 경험' },
];

export default function HTPage() {
  return (
    <SubPageLayout
      title="HT 프로그램"
      subtitle="Harmony Training - 그룹 합주 프로그램"
      bgImage="/images/about/intro_f.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              HT(Harmony Training) 프로그램은<br />
              <strong>보컬, 기타, 베이스, 드럼, 키보드</strong>가 함께하는<br />
              그룹 합주 프로그램입니다.
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}>
            {features.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '32px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  textAlign: 'center',
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
                  margin: '0 auto 20px',
                  fontSize: '24px',
                  fontWeight: 700,
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#666' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
            진행 일정
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
            매월 2회, 토요일 오후
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>
            상세 일정은 학원으로 문의해주세요
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            HT 프로그램 신청
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
