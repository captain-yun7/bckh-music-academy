'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            We create, plan & grow with You
          </p>
          <p className="footer-text">
            1999 - {currentYear} © 경희음악 — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
