'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InstructorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-image', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="instructors" ref={sectionRef} className="about-section">
      <div className="container">
        <p className="about-label">About 경희음악</p>

        {/* Horizontal Gallery - 301lab Style */}
        <div className="about-gallery">
          <div className="about-image flex items-center justify-center text-6xl bg-gradient-to-br from-gray-700 to-gray-800">
            🎤
          </div>
          <div className="about-image flex items-center justify-center text-6xl bg-gradient-to-br from-gray-700 to-gray-800">
            🎹
          </div>
          <div className="about-image flex items-center justify-center text-6xl bg-gradient-to-br from-gray-700 to-gray-800">
            🎸
          </div>
          <div className="about-image flex items-center justify-center text-6xl bg-gradient-to-br from-gray-700 to-gray-800">
            🥁
          </div>
          <div className="about-image flex items-center justify-center text-6xl bg-gradient-to-br from-gray-700 to-gray-800">
            🎼
          </div>
        </div>
      </div>
    </section>
  );
}
