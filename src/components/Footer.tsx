'use client';

// SVG Icons
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const NaverBlogIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222v2.218a.472.472 0 0 0 .944 0v-1.58l.478-.464 1.652 2.174a.472.472 0 0 0 .754-.566l-1.77-2.32zm-8.75 1.974a.471.471 0 1 0 0 .944h2.222a.472.472 0 0 0 0-.944H10.39v-4.492a.472.472 0 0 0-.944 0v4.492h-.289zm-2.665-4.021a.472.472 0 0 0-.891.308l.07.2 1.593 4.395a.544.544 0 0 0 1.022 0l1.594-4.395.07-.2a.472.472 0 0 0-.892-.308l-1.278 3.527-1.288-3.527zm-2.45 4.493l-.022-.002H2.783a.472.472 0 0 0 0 .944H4.76a.472.472 0 0 0 0-.944h-.021l.003.002v-.001l-.001-.001.001.002z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UC064T0e2BoevLYHkXkp8Yog',
      icon: YouTubeIcon,
      hoverColor: 'hover:text-red-500',
    },
    {
      name: 'Blog',
      href: 'https://blog.naver.com/kyunghee_music',
      icon: NaverBlogIcon,
      hoverColor: 'hover:text-green-500',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/khmusic_official/',
      icon: InstagramIcon,
      hoverColor: 'hover:text-pink-500',
    },
    {
      name: 'KakaoTalk',
      href: 'https://pf.kakao.com/_xixgxgxmj',
      icon: KakaoIcon,
      hoverColor: 'hover:text-yellow-400',
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {/* Left Column - Academy Info */}
          <div>
            <p className="text-white font-bold text-xl mb-2">
              경희실용음악학원
            </p>
            <p className="text-yellow-400 text-sm font-semibold mb-5">
              Since 2007
            </p>
            <div className="space-y-2">
              <p className="footer-text">
                대표: 조중욱 | 사업자등록번호: 130-92-09724
              </p>
              <p className="footer-text">
                경기도 부천시 부천로 43, 3층 (심곡동)
              </p>
              <p className="footer-text mt-4">
                TEL: <a href="tel:032-611-9191" className="hover:text-white transition-colors">032-611-9191/2</a>
              </p>
              <p className="footer-text">
                Email: <a href="mailto:khmusic80@hanmail.net" className="hover:text-white transition-colors">khmusic80@hanmail.net</a>
              </p>
            </div>
          </div>

          {/* Right Column - Social & Copyright */}
          <div className="text-left md:text-right">
            <p className="text-white/80 text-base font-semibold mb-5">SNS</p>

            {/* Social Icons Grid */}
            <div className="flex md:justify-end gap-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 transition-all duration-300 ${social.hoverColor} hover:bg-white/20 hover:scale-110`}
                  aria-label={social.name}
                  title={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="space-y-1">
              <p className="footer-text">
                2007 - {currentYear} © 경희실용음악학원
              </p>
              <p className="footer-text">
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
