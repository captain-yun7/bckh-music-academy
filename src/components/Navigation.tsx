'use client';

import { useState, useEffect, useRef } from 'react';
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
  { name: '학원소개', href: '/about' },
  { name: '합격자명단', href: '/admissions' },
  { name: '합격자동영상', href: '/success-videos' },
  { name: '배출뮤지션', href: '/musicians' },
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
  { name: '내부시설', href: '/facilities' },
  { name: '공연사진', href: '/performances' },
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
    name: '장학제도',
    href: '/scholarship',
    children: [
      { name: '입학장학', href: '/scholarship/entrance' },
      { name: '성적장학', href: '/scholarship/merit' },
    ],
  },
  {
    name: '특별프로그램',
    href: '/programs',
    children: [
      { name: 'HT 프로그램', href: '/programs/ht' },
      { name: '케이크콘서트', href: '/programs/cake-concert' },
      { name: '수강생음반', href: '/programs/album' },
      { name: '정기오디션', href: '/programs/audition' },
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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileExpandedMenu(null);
  }, [pathname]);

  const handleMouseEnter = (name: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setActiveMenu(name);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const toggleMobileSubmenu = (name: string) => {
    setMobileExpandedMenu(mobileExpandedMenu === name ? null : name);
  };

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-inner">
            {/* Logo */}
            <Link href="/" className="nav-logo">
              경희실용음악학원
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-desktop">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="nav-item"
                  onMouseEnter={() => link.children && handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={link.href} className="nav-link">
                    {link.name}
                    {link.children && (
                      <svg
                        className="nav-arrow"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {link.children && activeMenu === link.name && (
                    <div
                      className="mega-menu"
                      onMouseEnter={() => handleMouseEnter(link.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="mega-menu-content">
                        <div className="mega-menu-header">
                          <h3>{link.name}</h3>
                          <Link href={link.href} className="mega-menu-all">
                            전체보기
                          </Link>
                        </div>
                        <div className="mega-menu-grid">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="mega-menu-item"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/contact" className="nav-cta">
              상담신청
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="nav-mobile-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-scroll">
          {navLinks.map((link) => (
            <div key={link.name} className="mobile-menu-section">
              {link.children ? (
                <>
                  <button
                    className="mobile-menu-link mobile-menu-toggle"
                    onClick={() => toggleMobileSubmenu(link.name)}
                  >
                    <span>{link.name}</span>
                    <svg
                      className={`mobile-arrow ${mobileExpandedMenu === link.name ? 'expanded' : ''}`}
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    className={`mobile-submenu ${mobileExpandedMenu === link.name ? 'expanded' : ''}`}
                  >
                    <Link
                      href={link.href}
                      className="mobile-submenu-link mobile-submenu-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      전체보기
                    </Link>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="mobile-submenu-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  className="mobile-menu-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="mobile-menu-cta"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            상담신청
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .nav.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .nav-logo {
          font-size: 20px;
          font-weight: 700;
          color: #111;
          text-decoration: none;
          white-space: nowrap;
        }

        .nav-desktop {
          display: none;
          align-items: center;
          gap: 4px;
        }

        @media (min-width: 1024px) {
          .nav-desktop {
            display: flex;
          }
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          font-size: 15px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #000;
          background: rgba(0, 0, 0, 0.04);
        }

        .nav-arrow {
          margin-left: 2px;
          transition: transform 0.2s ease;
        }

        .nav-item:hover .nav-arrow {
          transform: rotate(180deg);
        }

        .mega-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding-top: 8px;
        }

        .mega-menu-content {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
          padding: 20px;
          min-width: 240px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mega-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid #eee;
        }

        .mega-menu-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #111;
          margin: 0;
        }

        .mega-menu-all {
          font-size: 13px;
          color: #3b82f6;
          text-decoration: none;
        }

        .mega-menu-all:hover {
          text-decoration: underline;
        }

        .mega-menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 4px;
        }

        .mega-menu-item {
          padding: 10px 12px;
          font-size: 14px;
          color: #444;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .mega-menu-item:hover {
          background: #f5f5f5;
          color: #000;
        }

        .nav-cta {
          display: none;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          background: #111;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .nav-cta:hover {
          background: #333;
        }

        @media (min-width: 1024px) {
          .nav-cta {
            display: block;
          }
        }

        .nav-mobile-btn {
          display: block;
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }

        @media (min-width: 1024px) {
          .nav-mobile-btn {
            display: none;
          }
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 72px;
          right: -100%;
          width: 100%;
          max-width: 320px;
          height: calc(100vh - 72px);
          background: #fff;
          z-index: 999;
          transition: right 0.3s ease;
          overflow: hidden;
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-menu-scroll {
          height: 100%;
          overflow-y: auto;
          padding: 16px;
        }

        .mobile-menu-section {
          border-bottom: 1px solid #f0f0f0;
        }

        .mobile-menu-section:last-child {
          border-bottom: none;
        }

        .mobile-menu-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px 12px;
          font-size: 16px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .mobile-menu-toggle {
          font-weight: 600;
        }

        .mobile-arrow {
          transition: transform 0.2s ease;
        }

        .mobile-arrow.expanded {
          transform: rotate(180deg);
        }

        .mobile-submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: #fafafa;
          margin: 0 -12px;
          padding: 0 12px;
        }

        .mobile-submenu.expanded {
          max-height: 500px;
        }

        .mobile-submenu-link {
          display: block;
          padding: 12px 20px;
          font-size: 14px;
          color: #555;
          text-decoration: none;
        }

        .mobile-submenu-all {
          color: #3b82f6;
          font-weight: 500;
        }

        .mobile-menu-cta {
          display: block;
          margin-top: 16px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          background: #111;
          border-radius: 10px;
          text-decoration: none;
          text-align: center;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          top: 72px;
          background: rgba(0, 0, 0, 0.4);
          z-index: 998;
        }

        @media (min-width: 1024px) {
          .mobile-overlay {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
