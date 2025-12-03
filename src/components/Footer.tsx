'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <p className="footer-text font-medium text-white/80 mb-2">
              부천경희실용음악학원
            </p>
            <p className="footer-text">
              대표: 조중욱 | 사업자등록번호: 130-92-09724
            </p>
            <p className="footer-text">
              경기도 부천시 부천로 43, 3층 (심곡동)
            </p>
          </div>
          <div className="text-right">
            <p className="footer-text">
              1999 - {currentYear} © 부천경희실용음악학원
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
