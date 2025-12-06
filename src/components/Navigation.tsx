'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: '시설사진', href: '/facilities', anchor: '#facilities' },
  { name: '공연사진', href: '/performances', anchor: '#performances' },
  { name: '합격영상', href: '/videos', anchor: '#videos' },
  { name: '배출뮤지션', href: '/musicians', anchor: '#musicians' },
  { name: '오시는길', href: '/contact', anchor: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHref = (link: typeof navLinks[0]) => {
    return isHome ? link.anchor : link.href;
  };

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="nav-logo">
              경희실용음악학원
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.name} href={getHref(link)} className="nav-link">
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link href={isHome ? '#contact' : '/contact'} className="hidden md:block nav-cta">
              상담신청
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
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
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={getHref(link)}
            className="mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link
          href={isHome ? '#contact' : '/contact'}
          className="mobile-menu-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          상담신청
        </Link>
      </div>
    </>
  );
}
