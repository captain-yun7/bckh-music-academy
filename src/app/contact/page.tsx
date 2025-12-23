import SubPageLayout from '@/components/SubPageLayout';

export default function ContactPage() {
  return (
    <SubPageLayout
      title="오시는길"
      subtitle="경희실용음악학원 위치 안내"
    >
      {/* Naver Map Section */}
      <section style={{ padding: '0' }}>
        <div style={{ width: '100%', height: '450px', backgroundColor: '#e5e5e5' }}>
          <iframe
            src="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EB%B6%80%EC%B2%9C%EC%8B%9C%20%EC%9B%90%EB%AF%B8%EA%B5%AC%20%EC%A4%91%EB%8F%99%201141-2?c=15.00,0,0,0,dh"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="경희실용음악학원 네이버 지도"
          />
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            {/* Address */}
            <div>
              <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                ADDRESS
              </p>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
                주소
              </h3>
              <p style={{ fontSize: '17px', color: '#555', lineHeight: 1.8 }}>
                경기도 부천시 원미구 중동 1141-2<br />
                (중동역 도보 5분 거리)
              </p>
            </div>

            {/* Phone */}
            <div>
              <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                PHONE
              </p>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
                전화번호
              </h3>
              <p style={{ fontSize: '17px', color: '#555', lineHeight: 1.8 }}>
                대표전화: 032-321-8668<br />
                팩스: 032-321-8669
              </p>
            </div>

            {/* Hours */}
            <div>
              <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                HOURS
              </p>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
                운영시간
              </h3>
              <p style={{ fontSize: '17px', color: '#555', lineHeight: 1.8 }}>
                평일: 13:00 - 22:00<br />
                토요일: 10:00 - 18:00<br />
                일요일/공휴일: 휴무
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            DIRECTIONS
          </p>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#000', marginBottom: '40px' }}>
            찾아오시는 방법
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Subway */}
            <div style={{ padding: '32px', backgroundColor: '#fff', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>7</span>
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                지하철
              </h4>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8 }}>
                7호선 중동역 1번 출구<br />
                도보 5분 거리
              </p>
            </div>

            {/* Bus */}
            <div style={{ padding: '32px', backgroundColor: '#fff', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>BUS</span>
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                버스
              </h4>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8 }}>
                중동역 정류장 하차<br />
                12, 23, 37, 83번 외 다수
              </p>
            </div>

            {/* Car */}
            <div style={{ padding: '32px', backgroundColor: '#fff', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>P</span>
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                자가용
              </h4>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8 }}>
                건물 내 주차 가능<br />
                주차 문의: 032-321-8668
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#000', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            방문 상담 예약
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
            직접 방문하시기 전 예약하시면 더 자세한 상담이 가능합니다
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="tel:032-321-8668"
              style={{
                display: 'inline-block',
                backgroundColor: '#fff',
                color: '#000',
                fontSize: '16px',
                fontWeight: 600,
                padding: '16px 40px',
                borderRadius: '100px',
                textDecoration: 'none',
              }}
            >
              전화 상담
            </a>
            <a
              href="https://pf.kakao.com/_xixgxgxmj"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#fee500',
                color: '#000',
                fontSize: '16px',
                fontWeight: 600,
                padding: '16px 40px',
                borderRadius: '100px',
                textDecoration: 'none',
              }}
            >
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
