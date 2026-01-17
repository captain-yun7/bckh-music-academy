'use client';

import { useEffect, useRef } from 'react';

interface NaverMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
  markerTitle?: string;
}

declare global {
  interface Window {
    naver: typeof naver;
  }
}

export default function NaverMap({
  latitude,
  longitude,
  zoom = 17,
  height = '450px',
  markerTitle = '경희실용음악학원',
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.naver) return;

      const location = new window.naver.maps.LatLng(latitude, longitude);

      const mapOptions: naver.maps.MapOptions = {
        center: location,
        zoom: zoom,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      // 마커 추가
      const marker = new window.naver.maps.Marker({
        position: location,
        map: map,
        title: markerTitle,
      });

      // 정보창 추가
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding: 12px 16px; min-width: 200px;">
            <h4 style="font-size: 15px; font-weight: 700; margin: 0 0 6px 0; color: #000;">
              ${markerTitle}
            </h4>
            <p style="font-size: 13px; color: #666; margin: 0;">
              경기도 부천시 부천로 43, 3층
            </p>
            <p style="font-size: 13px; color: #3b82f6; margin: 4px 0 0 0;">
              <a href="tel:032-611-9191" style="color: #3b82f6; text-decoration: none;">
                032-611-9191/2
              </a>
            </p>
          </div>
        `,
        borderWidth: 0,
        backgroundColor: '#fff',
        anchorSize: new window.naver.maps.Size(12, 12),
        anchorColor: '#fff',
      });

      // 마커 클릭 시 정보창 토글
      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });

      // 초기에 정보창 열기
      infoWindow.open(map, marker);
    };

    // 네이버 지도 API가 로드되었는지 확인
    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      // API 로드 대기
      const checkNaverMaps = setInterval(() => {
        if (window.naver && window.naver.maps) {
          clearInterval(checkNaverMaps);
          initMap();
        }
      }, 100);

      // 10초 후 타임아웃
      setTimeout(() => clearInterval(checkNaverMaps), 10000);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [latitude, longitude, zoom, markerTitle]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: height,
        backgroundColor: '#e5e5e5',
      }}
    />
  );
}
