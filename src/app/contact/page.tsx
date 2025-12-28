'use client';

import Script from 'next/script';
import SubPageLayout from '@/components/SubPageLayout';
import NaverMap from '@/components/NaverMap';

// 경희실용음악학원 좌표 (경기도 부천시 부천로 43)
const ACADEMY_LOCATION = {
  latitude: 37.4847,
  longitude: 126.7830,
};

export default function ContactPage() {
  return (
    <SubPageLayout
      title="오시는길"
      subtitle="경희실용음악학원 위치 안내"
    >
      {/* Naver Maps API Script */}
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
      />

      {/* Naver Map Section */}
      <section style={{ padding: '0' }}>
        <NaverMap
          latitude={ACADEMY_LOCATION.latitude}
          longitude={ACADEMY_LOCATION.longitude}
          zoom={17}
          height="450px"
          markerTitle="경희실용음악학원"
        />
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

    </SubPageLayout>
  );
}
