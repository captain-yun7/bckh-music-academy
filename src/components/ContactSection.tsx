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
            음악으로 꿈을 키우는<br />
            부천경희실용음악학원과<br />
            함께하세요.
          </h2>

          {/* Contact Info Grid - 301lab Style */}
          <div className="contact-info">
            <div>
              <p className="contact-info-label">상담 문의</p>
              <p className="contact-info-value">
                <a href="mailto:khmusic80@hanmail.net">khmusic80@hanmail.net</a>
              </p>
              <p className="contact-info-value">032-123-4567</p>
            </div>
            <div>
              <p className="contact-info-label">운영 시간</p>
              <p className="contact-info-value">평일 14:00 - 22:00</p>
              <p className="contact-info-value">주말 10:00 - 18:00</p>
            </div>
            <div>
              <p className="contact-info-label">오시는 길</p>
              <p className="contact-info-value">경기도 부천시 부천로 43</p>
              <p className="contact-info-value">3층 (심곡동)</p>
            </div>
          </div>

          {/* Email Copy Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                navigator.clipboard.writeText('khmusic80@hanmail.net');
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
          부천경희음악<br />
          부천경희음악<br />
          부천경희음악<br />
          부천경희음악
        </div>
      </div>
    </section>
  );
}
