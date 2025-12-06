'use client';

import Navigation from './Navigation';
import Footer from './Footer';

interface SubPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function SubPageLayout({ children, title, subtitle, bgImage }: SubPageLayoutProps) {
  return (
    <>
      <div className="noise-overlay" />
      <Navigation />

      {/* Hero Banner */}
      <div
        style={{
          position: 'relative',
          height: '400px',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '80px',
        }}
      >
        {bgImage && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.4,
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>
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
