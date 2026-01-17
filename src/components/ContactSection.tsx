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
            경희실용음악학원과<br />
            함께하세요.
          </h2>

          {/* Contact Info Grid - 301lab Style */}
          <div className="contact-info">
            <div>
              <p className="contact-info-label">상담 문의</p>
              <p className="contact-info-value">
                <a href="mailto:khmusic80@hanmail.net">khmusic80@hanmail.net</a>
              </p>
              <p className="contact-info-value">
                <a href="tel:032-611-9191">032-611-9191/2</a>
              </p>
            </div>
            <div>
              <p className="contact-info-label">운영 시간</p>
              <p className="contact-info-value">평일 13:00 - 22:00</p>
              <p className="contact-info-value">주말/공휴일 11:00 - 19:00</p>
            </div>
            <div>
              <p className="contact-info-label">오시는 길</p>
              <p className="contact-info-value">경기도 부천시 부천로 43</p>
              <p className="contact-info-value">3층 (심곡동)</p>
            </div>
          </div>

        </div>

        {/* Background Text - 301lab Style */}
        <div className="contact-bg-text">
          경희실용음악학원<br />
          경희실용음악학원<br />
          경희실용음악학원<br />
          경희실용음악학원
        </div>
      </div>
    </section>
  );
}
