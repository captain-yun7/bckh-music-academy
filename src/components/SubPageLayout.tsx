'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Navigation from './Navigation';
import Footer from './Footer';

interface SubPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  bgImage?: string; // 직접 지정하면 우선 적용
}

export default function SubPageLayout({ children, title, subtitle, bgImage: propBgImage }: SubPageLayoutProps) {
  const pathname = usePathname();
  const [dbBgImage, setDbBgImage] = useState<string | null>(null);

  useEffect(() => {
    // 경로 변경 시 이전 배경 즉시 제거 (깜빡임 방지)
    setDbBgImage(null);

    // DB에서 현재 경로에 맞는 배경 이미지 불러오기
    const fetchBgImage = async () => {
      try {
        const res = await fetch('/api/page-backgrounds');
        if (res.ok) {
          const backgrounds = await res.json();
          // 정확히 일치하는 경로 먼저 찾기
          if (backgrounds[pathname]) {
            setDbBgImage(backgrounds[pathname]);
          } else {
            // 없으면 상위 경로 배경 이미지 사용 (예: /instructors/vocal -> /instructors)
            const segments = pathname.split('/').filter(Boolean);
            if (segments.length > 1) {
              const parentPath = '/' + segments[0];
              if (backgrounds[parentPath]) {
                setDbBgImage(backgrounds[parentPath]);
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch background image:', error);
      }
    };

    // prop으로 배경이 지정되지 않은 경우에만 DB에서 불러오기
    if (!propBgImage) {
      fetchBgImage();
    }
  }, [pathname, propBgImage]);

  // prop으로 전달된 배경이 우선, 없으면 DB 배경 사용
  const bgImage = propBgImage || dbBgImage;
  const isExternalImage = bgImage?.startsWith('http');

  return (
    <>
      <div className="noise-overlay" />
      <Navigation />

      {/* Hero Banner */}
      <div
        style={{
          position: 'relative',
          height: '400px',
          backgroundColor: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '64px',
          overflow: 'hidden',
        }}
      >
        {bgImage && (
          isExternalImage ? (
            <Image
              src={bgImage}
              alt={title}
              fill
              style={{ objectFit: 'cover', opacity: 0.5 }}
              sizes="100vw"
              priority
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.5,
              }}
            />
          )
        )}
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
          }}
        />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>
          <h1 style={{ fontSize: 'clamp(36px, 7vw, 64px)', fontWeight: 700, color: '#fff', marginBottom: '16px', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <main style={{ minHeight: '60vh' }}>
        {children}
      </main>

      <Footer />
    </>
  );
}
