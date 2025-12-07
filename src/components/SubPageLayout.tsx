'use client';

import Image from 'next/image';
import Navigation from './Navigation';
import Footer from './Footer';

interface SubPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function SubPageLayout({ children, title, subtitle, bgImage }: SubPageLayoutProps) {
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
