'use client';

import { useState, useEffect } from 'react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://pf.kakao.com/_xixgxgxmj"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        transform: `translateY(${isVisible ? '0' : '100px'})`,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        backgroundColor: '#ffc50a',
        color: '#000',
        fontWeight: 700,
        fontSize: '16px',
        borderRadius: '100px',
        textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.3s ease',
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.792 1.86 5.247 4.644 6.619-.178.633-.645 2.298-.738 2.655-.117.446.163.44.343.32.142-.094 2.257-1.533 3.175-2.156.842.123 1.71.188 2.576.188 5.523 0 10-3.582 10-8s-4.477-8-10-8z"/>
      </svg>
      상담 신청하기
    </a>
  );
}
