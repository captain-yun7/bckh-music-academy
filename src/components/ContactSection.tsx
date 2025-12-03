'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="container">
        <div className="contact-content">
          <p className="contact-label">Contact</p>

          <h2 className="contact-title">
            Partner with us to shape a<br />
            refined digital future, where strategy and creativity meet<br />
            excellence.
          </h2>

          {/* Contact Info Grid - 301lab Style */}
          <div className="contact-info">
            <div>
              <p className="contact-info-label">New Business</p>
              <p className="contact-info-value">
                <a href="mailto:contact@khmusic.co.kr">contact@khmusic.co.kr</a>
              </p>
              <p className="contact-info-value">+82-32-123-4567</p>
            </div>
            <div>
              <p className="contact-info-label">General Inquiries</p>
              <p className="contact-info-value">
                <a href="mailto:info@khmusic.co.kr">info@khmusic.co.kr</a>
              </p>
              <p className="contact-info-value">+82-32-123-4568</p>
            </div>
            <div>
              <p className="contact-info-label">Location</p>
              <p className="contact-info-value">경기도 부천시 원미구</p>
              <p className="contact-info-value">중동로 123, 2층</p>
            </div>
          </div>

          {/* Email Copy Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                navigator.clipboard.writeText('contact@khmusic.co.kr');
                alert('이메일이 복사되었습니다!');
              }}
              className="btn-outline-light flex items-center gap-2 px-6 py-3 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              이메일 복사
            </button>
          </div>
        </div>

        {/* Background Text - 301lab Style */}
        <div className="contact-bg-text">
          CONNECT WITH 경희음악<br />
          CONNECT WITH 경희음악<br />
          CONNECT WITH 경희음악<br />
          CONNECT WITH 경희음악
        </div>
      </div>
    </section>
  );
}
