import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

export default function GraduatePage() {
  return (
    <SubPageLayout
      title="대학원/편입"
      subtitle="대학원 진학 및 편입 안내"
      bgImage="/images/about/intro_a.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              더 깊은 음악 연구를 위한 대학원 진학,<br />
              또는 목표 대학으로의 편입을 준비하시나요?<br />
              <strong>경희실용음악학원이 함께합니다.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Graduate School */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '32px',
          }}>
            {/* 대학원 */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '40px',
            }}>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#8b5cf6',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '20px',
              }}>
                대학원
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
                실용음악 대학원 진학
              </h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, marginBottom: '24px' }}>
                학부에서 쌓은 실력을 바탕으로 더 깊이 있는 연구와
                전문성을 갖추고 싶다면 대학원 진학을 고려해보세요.
              </p>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>주요 대학원</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {['한양대학교 대학원', '경희대학교 대학원', '동덕여자대학교 대학원', '명지대학교 대학원'].map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 편입 */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '40px',
            }}>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '20px',
              }}>
                편입
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
                4년제 대학 편입
              </h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, marginBottom: '24px' }}>
                현재 재학 중인 대학에서 목표하는 대학으로
                편입을 통해 새로운 도전을 시작할 수 있습니다.
              </p>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>편입 요건</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {['전문대 졸업(예정)자 또는 4년제 2학년 수료자', '학점 및 실기 성적 우수자', '대학별 편입 전형 통과'].map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '40px' }}>
            준비 과정
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            {['실력 진단', '목표 설정', '포트폴리오 준비', '실기 레슨', '면접 대비'].map((step, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 28px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              >
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#8b5cf6', marginRight: '12px' }}>
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
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
              backgroundColor: '#8b5cf6',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            대학원/편입 상담
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
