'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const instructorCategories = [
  {
    title: 'Vocal',
    instructors: [
      { name: '보컬 강사 1', image: '/images/lecturers/vocal1.jpg' },
      { name: '보컬 강사 2', image: '/images/lecturers/vocal2.jpg' },
      { name: '보컬 강사 3', image: '/images/lecturers/vocal3.jpg' },
    ],
  },
  {
    title: 'Piano',
    instructors: [
      { name: '피아노 강사 1', image: '/images/lecturers/piano1.jpg' },
      { name: '피아노 강사 2', image: '/images/lecturers/piano2.jpg' },
      { name: '피아노 강사 3', image: '/images/lecturers/piano3.jpg' },
    ],
  },
  {
    title: 'Guitar',
    instructors: [
      { name: '기타 강사 1', image: '/images/lecturers/guitar1.jpg' },
      { name: '기타 강사 2', image: '/images/lecturers/guitar2.jpg' },
    ],
  },
];

export default function InstructorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.instructor-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="instructors" ref={sectionRef} style={{ padding: '120px 0', backgroundColor: '#111' }}>
      <div className="container">
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
          LECTURER
        </p>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
          전공별 강사진
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '60px', maxWidth: '600px' }}>
          현직에서 활동 중인 전문 뮤지션들이 직접 지도합니다.
        </p>

        {/* Instructor Categories */}
        {instructorCategories.map((category, catIndex) => (
          <div key={catIndex} style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
              {category.title}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {category.instructors.map((instructor, index) => (
                <div
                  key={index}
                  className="instructor-item"
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#1a1a1a',
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '3/4' }}>
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                  </div>
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <p style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                      {instructor.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Instructor Info */}
        <div style={{ marginTop: '60px', padding: '40px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '32px', fontWeight: 600 }}>강사진 특징</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            <div>
              <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>현직 뮤지션 & 전문가</p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>실제 음악 현장에서 활동 중인 전문가들이 직접 지도합니다.</p>
            </div>
            <div>
              <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>최강 3인 멘토링 시스템</p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>담당 강사, 부강사, 스텝강사가 함께 체계적으로 지도합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
