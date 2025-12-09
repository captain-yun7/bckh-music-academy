import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

export default function RegularAuditionPage() {
  return (
    <SubPageLayout
      title="정기오디션"
      subtitle="국내 70여개 기획사 참여 오디션"
      bgImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80"
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
              70+
            </div>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              경희실용음악학원은 정기적으로<br />
              <strong style={{ color: '#ffc50a' }}>국내 70여개 기획사 관계자</strong>를 초청하여<br />
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
              padding: '40px 32px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              textAlign: 'center',
            }}>
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
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#000' }}>
                직접 스카우트 기회
              </h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                기획사 캐스팅 담당자가 직접 참관하여
                현장에서 스카우트 제의를 받을 수 있습니다.
              </p>
            </div>
            <div style={{
              padding: '40px 32px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              textAlign: 'center',
            }}>
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
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#000' }}>
                전문 피드백
              </h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                오디션 후 전문가의 상세한 피드백을 받아
                부족한 점을 보완할 수 있습니다.
              </p>
            </div>
            <div style={{
              padding: '40px 32px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              textAlign: 'center',
            }}>
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
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#000' }}>
                우수학생 프로모션
              </h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                우수 학생에 대한 별도 프로모션을 통해
                기획사에 적극 추천해드립니다.
              </p>
            </div>
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
              <p style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#ffc50a', lineHeight: 1 }}>
                70+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginTop: '12px' }}>
                협력 기획사
              </p>
            </div>
            <div>
              <p style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#ffc50a', lineHeight: 1 }}>
                연 2~3회
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginTop: '12px' }}>
                정기 오디션
              </p>
            </div>
            <div>
              <p style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#ffc50a', lineHeight: 1 }}>
                다수
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginTop: '12px' }}>
                데뷔 성공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            오디션 진행 과정
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            {['참가 신청', '사전 리허설', '오디션 진행', '합격자 발표'].map((step, i) => (
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

      {/* Notice */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid #eee',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '24px' }}>
              안내사항
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                정기오디션은 학원 수강생만 참여할 수 있습니다.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                오디션 참가비는 별도로 부과되지 않습니다.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                사전 리허설 참석은 필수입니다.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                <span style={{ color: '#ffc50a', fontWeight: 700 }}>•</span>
                상세 일정은 학원 공지사항에서 확인해주세요.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            다음 정기오디션에 도전해보세요!
          </h3>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
            수강 상담을 통해 오디션 준비를 시작하세요
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
