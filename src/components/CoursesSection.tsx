'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Vocal Training',
    items: ['발성/호흡 기초', '음정/리듬 교정', '장르별 테크닉', '무대 퍼포먼스'],
  },
  {
    title: 'Instrument',
    items: ['피아노/건반', '기타/베이스', '드럼/퍼커션', '현악기/관악기'],
  },
  {
    title: 'Production',
    items: ['작곡/편곡', 'MIDI 프로듀싱', '믹싱/마스터링', '사운드 디자인'],
  },
];

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-block', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="courses" ref={sectionRef} className="services-section">
      <div className="container">
        <p className="text-white/50 text-sm mb-8">Our Courses</p>

        {/* Service Blocks - 301lab Style */}
        {services.map((service, index) => (
          <div key={index} className="service-block">
            <div>
              <h3 className="service-title">{service.title}</h3>
              <ul className="service-list">
                {service.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="service-images">
              <div className="service-image flex items-center justify-center text-4xl">
                {index === 0 ? '🎤' : index === 1 ? '🎹' : '💻'}
              </div>
              <div className="service-image flex items-center justify-center text-4xl">
                {index === 0 ? '🎵' : index === 1 ? '🎸' : '🎼'}
              </div>
              <div className="service-image flex items-center justify-center text-4xl">
                {index === 0 ? '🎧' : index === 1 ? '🥁' : '🎚️'}
              </div>
              <div className="service-image flex items-center justify-center text-4xl">
                {index === 0 ? '🎶' : index === 1 ? '🎻' : '🔊'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
