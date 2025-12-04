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
              <p className="contact-info-value">032-667-7088</p>
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

          {/* Social Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.youtube.com/channel/UC064T0e2BoevLYHkXkp8Yog"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            >
              YouTube
            </a>
            <a
              href="http://blog.naver.com/kyunghee_music"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            >
              Blog
            </a>
            <a
              href="https://www.instagram.com/kyunghee_music/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            >
              Instagram
            </a>
            <a
              href="https://pf.kakao.com/_xixgxgxmj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            >
              KakaoTalk
            </a>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:032-667-7088"
              className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              전화 상담
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText('khmusic80@hanmail.net');
                alert('이메일이 복사되었습니다!');
              }}
              className="btn-outline-light flex items-center gap-2 px-6 py-3 rounded-full text-sm"
            >
              이메일 복사
            </button>
          </div>
        </div>

        {/* Background Text - 301lab Style */}
        <div className="contact-bg-text">
          경희음악<br />
          경희음악<br />
          경희음악<br />
          경희음악
        </div>
      </div>
    </section>
  );
}
