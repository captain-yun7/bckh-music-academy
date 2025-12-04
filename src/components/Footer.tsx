'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <p className="footer-text font-medium text-white/80 mb-2">
              경희실용음악학원
            </p>
            <p className="footer-text">
              대표: 조중욱 | 사업자등록번호: 130-92-09724
            </p>
            <p className="footer-text">
              경기도 부천시 부천로 43, 3층 (심곡동)
            </p>
            <p className="footer-text mt-2">
              TEL: 032-667-7088 | Email: khmusic80@hanmail.net
            </p>
          </div>
          <div className="text-right">
            <div className="flex justify-end gap-4 mb-4">
              <a
                href="https://www.youtube.com/channel/UC064T0e2BoevLYHkXkp8Yog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                YouTube
              </a>
              <a
                href="http://blog.naver.com/kyunghee_music"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                Blog
              </a>
              <a
                href="https://www.instagram.com/kyunghee_music/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="https://pf.kakao.com/_xixgxgxmj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                KakaoTalk
              </a>
            </div>
            <p className="footer-text">
              1999 - {currentYear} © 경희실용음악학원
            </p>
            <p className="footer-text">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
