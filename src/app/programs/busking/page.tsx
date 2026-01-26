import SubPageLayout from '@/components/SubPageLayout';

export default function BuskingPage() {
  return (
    <SubPageLayout
      title="버스킹"
      subtitle="야외 어쿠스틱 공연"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              야외에서 진행되는 어쿠스틱 공연으로<br />
              공연장과는 다른 <strong style={{ color: '#ffc50a' }}>편안한 분위기</strong>에서<br />
              무대 경험을 쌓을 수 있습니다.
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
            gap: '32px',
          }}>
            <div style={{
              padding: '40px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '48px', marginBottom: '20px', display: 'block' }}>🎵</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>어쿠스틱 공연</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                야외에서 진행되는 어쿠스틱 공연으로<br />
                편안한 분위기 속에서 무대를 즐깁니다
              </p>
            </div>
            <div style={{
              padding: '40px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '48px', marginBottom: '20px', display: 'block' }}>🌳</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>야외 무대</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                학원 인근 심곡천에서 진행되며<br />
                자연 속에서 특별한 공연을 경험합니다
              </p>
            </div>
            <div style={{
              padding: '40px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '48px', marginBottom: '20px', display: 'block' }}>🎸</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>편안한 분위기</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                공연장과는 다른 자유롭고<br />
                편안한 분위기의 공연입니다
              </p>
            </div>
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
              개최 일정
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
                  2회
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
                  5·9월
                </p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>
                  매년 개최
                </p>
              </div>
            </div>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '32px' }}>
              장소: 학원 인근 심곡천
            </p>
          </div>
        </div>
      </section>

    </SubPageLayout>
  );
}
