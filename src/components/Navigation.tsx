'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { name: '시설사진', href: '#facilities' },
  { name: '공연사진', href: '#performances' },
  { name: '합격영상', href: '#videos' },
  { name: '배출뮤지션', href: '#musicians' },
  { name: '오시는길', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo - 301lab style */}
            <a href="#" className="nav-logo">
              경희실용음악학원
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="nav-link">
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a href="#contact" className="hidden md:block nav-cta">
              상담신청
            </a>

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
          <a
            key={link.name}
            href={link.href}
            className="mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-menu-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact
        </a>
      </div>
    </>
  );
}
