import SubPageLayout from '@/components/SubPageLayout';

export default function CakeConcertPage() {
  return (
    <SubPageLayout
      title="케이크콘서트"
      subtitle="수강생 정기 발표회"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              케이크콘서트는 경희실용음악학원의 대표 발표회입니다.<br />
              수강생들이 그동안 갈고닦은 실력을<br />
              <strong>실제 무대에서 선보이는 특별한 기회</strong>입니다.
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
              <span style={{ fontSize: '48px', marginBottom: '20px', display: 'block' }}>🎤</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>실전 무대 경험</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                전문 공연장에서 실제 무대를 경험하며<br />
                무대 매너와 긴장 관리를 배웁니다
              </p>
            </div>
            <div style={{
              padding: '40px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '48px', marginBottom: '20px', display: 'block' }}>🎸</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>라이브 밴드 협연</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                전문 밴드와 함께하는 라이브 협연으로<br />
                진짜 공연의 감동을 느껴보세요
              </p>
            </div>
            <div style={{
              padding: '40px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '48px', marginBottom: '20px', display: 'block' }}>📹</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>영상 촬영 제공</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                전문 촬영팀의 고화질 영상으로<br />
                나만의 포트폴리오를 만들어가세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
            개최 일정
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
            연 4회 (3월, 6월, 9월, 12월)
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>
            정확한 일정은 공지사항을 확인해주세요
          </p>
        </div>
      </section>

    </SubPageLayout>
  );
}
