'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavChild {
  name: string;
  href: string;
}

interface NavLink {
  name: string;
  href: string;
  children?: NavChild[];
}

const navLinks: NavLink[] = [
  {
    name: '학원소개',
    href: '/about',
    children: [
      { name: '교육이념', href: '/about' },
      { name: '출신뮤지션', href: '/musicians' },
      { name: '장학제도', href: '/scholarship' },
      { name: '특별프로그램', href: '/programs' },
      { name: '오픈스테이지', href: '/programs/open-stage' },
      { name: '사진', href: '/facilities' },
      { name: '오시는 길', href: '/contact' },
    ],
  },
  {
    name: '합격자명단',
    href: '/admissions',
    children: [
      { name: '연도별 합격자', href: '/admissions' },
      { name: '합격자 동영상', href: '/success-videos' },
    ],
  },
  {
    name: '강사진',
    href: '/instructors',
    children: [
      { name: '보컬', href: '/instructors/vocal' },
      { name: '작곡/화성학', href: '/instructors/composing' },
      { name: '미디/전자음악', href: '/instructors/midi' },
      { name: '싱어송라이터', href: '/instructors/singer-songwriter' },
      { name: '기타', href: '/instructors/guitar' },
      { name: '베이스', href: '/instructors/bass' },
      { name: '드럼', href: '/instructors/drums' },
      { name: '재즈피아노', href: '/instructors/jazz-piano' },
      { name: '댄스', href: '/instructors/dance' },
    ],
  },
  {
    name: '커리큘럼',
    href: '/curriculum',
    children: [
      { name: '입시반', href: '/curriculum/admission' },
      { name: '오디션반', href: '/curriculum/audition' },
      { name: '전문반', href: '/curriculum/professional' },
      { name: '취미반', href: '/curriculum/hobby' },
    ],
  },
  {
    name: '입시요강',
    href: '/admission-guide',
    children: [
      { name: '4년제대학', href: '/admission-guide/university-4yr' },
      { name: '2,3년제대학', href: '/admission-guide/university-2yr' },
      { name: '예술고등학교', href: '/admission-guide/art-highschool' },
      { name: '대학원/편입', href: '/admission-guide/graduate' },
    ],
  },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileExpandedMenu(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#111',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            경희실용음악학원
          </Link>

          {/* Desktop Menu - Hidden on mobile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <div
                key={link.name}
                style={{ position: 'relative' }}
                onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '10px 20px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#333',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    transition: 'background 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {link.name}
                  {link.children && (
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && activeDropdown === link.name && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      paddingTop: '8px',
                      zIndex: 100,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                        padding: '8px',
                        minWidth: '160px',
                      }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          style={{
                            display: 'block',
                            padding: '10px 14px',
                            fontSize: '14px',
                            color: '#444',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            transition: 'background 0.2s',
                            whiteSpace: 'nowrap',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="https://pf.kakao.com/_xixgxgxmj"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: '#111',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
              className="desktop-cta"
            >
              상담신청
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#333',
              }}
              className="mobile-hamburger"
              aria-label="메뉴"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            top: '64px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998,
          }}
          className="mobile-only"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        style={{
          position: 'fixed',
          top: '64px',
          right: isMobileMenuOpen ? 0 : '-100%',
          width: '280px',
          height: 'calc(100vh - 64px)',
          backgroundColor: '#fff',
          zIndex: 999,
          transition: 'right 0.3s ease',
          overflowY: 'auto',
          display: 'none',
        }}
        className="mobile-menu-panel"
      >
        <div style={{ padding: '16px' }}>
          {navLinks.map((link) => (
            <div key={link.name} style={{ borderBottom: '1px solid #f0f0f0' }}>
              {link.children ? (
                <>
                  <button
                    onClick={() => setMobileExpandedMenu(mobileExpandedMenu === link.name ? null : link.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '14px 0',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#333',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {link.name}
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      style={{
                        transform: mobileExpandedMenu === link.name ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s',
                      }}
                    >
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div
                    style={{
                      maxHeight: mobileExpandedMenu === link.name ? '400px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        fontSize: '14px',
                        color: '#3b82f6',
                        textDecoration: 'none',
                      }}
                    >
                      전체보기
                    </Link>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: '10px 16px',
                          fontSize: '14px',
                          color: '#555',
                          textDecoration: 'none',
                        }}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '14px 0',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#333',
                    textDecoration: 'none',
                  }}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <a
            href="https://pf.kakao.com/_xixgxgxmj"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'block',
              marginTop: '16px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: '#111',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            상담신청
          </a>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        .desktop-nav {
          display: none !important;
        }
        .desktop-cta {
          display: none !important;
        }
        .mobile-hamburger {
          display: block !important;
        }
        .mobile-menu-panel {
          display: block !important;
        }
        .mobile-only {
          display: block !important;
        }

        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: block !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
          .mobile-menu-panel {
            display: none !important;
          }
          .mobile-only {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
