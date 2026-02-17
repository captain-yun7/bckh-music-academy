'use client';

import { useEffect, useRef } from 'react';

interface NaverMapProps {
  address: string;
  zoom?: number;
  height?: string;
  markerTitle?: string;
  fallbackLatitude?: number;
  fallbackLongitude?: number;
}

declare global {
  interface Window {
    naver: typeof naver;
  }
}

export default function NaverMap({
  address,
  zoom = 17,
  height = '450px',
  markerTitle = '경희실용음악학원',
  fallbackLatitude = 37.4869,
  fallbackLongitude = 126.7828,
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    const createMap = (location: naver.maps.LatLng) => {
      if (!mapRef.current) return;

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

      const marker = new window.naver.maps.Marker({
        position: location,
        map: map,
        title: markerTitle,
      });

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

      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });

      infoWindow.open(map, marker);
    };

    const initMap = () => {
      if (!mapRef.current || !window.naver) return;

      // 주소로 지오코딩 시도
      if (window.naver.maps.Service) {
        window.naver.maps.Service.geocode(
          { query: address },
          (status: naver.maps.Service.Status, response: naver.maps.Service.GeocodeResponse) => {
            if (status === window.naver.maps.Service.Status.OK && response.v2.addresses.length > 0) {
              const result = response.v2.addresses[0];
              const location = new window.naver.maps.LatLng(
                parseFloat(result.y),
                parseFloat(result.x)
              );
              createMap(location);
            } else {
              // 지오코딩 실패 시 fallback 좌표 사용
              const location = new window.naver.maps.LatLng(fallbackLatitude, fallbackLongitude);
              createMap(location);
            }
          }
        );
      } else {
        // Service 모듈 없으면 fallback 좌표 사용
        const location = new window.naver.maps.LatLng(fallbackLatitude, fallbackLongitude);
        createMap(location);
      }
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const checkNaverMaps = setInterval(() => {
        if (window.naver && window.naver.maps) {
          clearInterval(checkNaverMaps);
          initMap();
        }
      }, 100);

      setTimeout(() => clearInterval(checkNaverMaps), 10000);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [address, zoom, markerTitle, fallbackLatitude, fallbackLongitude]);

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
