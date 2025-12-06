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
      { name: '하수지', image: '/images/lecturers/vocal_하수지.jpeg' },
      { name: '김수현', image: '/images/lecturers/vocal_김수현.jpeg' },
      { name: '김한울', image: '/images/lecturers/vocal_김한울.jpg' },
      { name: '이은지', image: '/images/lecturers/vocal_이은지.jpg' },
      { name: '전용일', image: '/images/lecturers/vocal_전용일.jpg' },
      { name: '홍연하', image: '/images/lecturers/vocal_홍연하.png' },
      { name: '홍효진', image: '/images/lecturers/vocal_홍효진.png' },
    ],
  },
  {
    title: 'Piano',
    instructors: [
      { name: '이민경', image: '/images/lecturers/piano_이민경.jpg' },
      { name: '이소정', image: '/images/lecturers/piano_이소정.jpg' },
      { name: '김하영', image: '/images/lecturers/piano_김하영.png' },
      { name: '황진하', image: '/images/lecturers/piano_황진하.jpg' },
      { name: '구자경', image: '/images/lecturers/piano_구자경.png' },
      { name: '박한빈', image: '/images/lecturers/piano_박한빈.jpeg' },
    ],
  },
  {
    title: 'Guitar',
    instructors: [
      { name: '노아(Noah)', image: '/images/lecturers/guitar_노아.jpg' },
      { name: '김영롱', image: '/images/lecturers/guitar_김영롱.jpg' },
      { name: '남윤찬', image: '/images/lecturers/guitar_남윤찬.jpg' },
      { name: '공석배', image: '/images/lecturers/guitar_공석배.jpg' },
      { name: '구자훈', image: '/images/lecturers/guitar_구자훈.png' },
    ],
  },
  {
    title: 'Bass',
    instructors: [
      { name: '현재천', image: '/images/lecturers/bass_현재천.jpg' },
      { name: '신희주', image: '/images/lecturers/bass_신희주.png' },
    ],
  },
  {
    title: 'Drums',
    instructors: [
      { name: '유종광', image: '/images/lecturers/drums_유종광.jpeg' },
    ],
  },
  {
    title: 'Composing',
    instructors: [
      { name: '강혜민', image: '/images/lecturers/composing_강혜민.jpg' },
      { name: '이재혁', image: '/images/lecturers/composing_이재혁.jpg' },
      { name: '이은비', image: '/images/lecturers/composing_이은비.jpg' },
      { name: '황진하', image: '/images/lecturers/composing_황진하.jpg' },
    ],
  },
  {
    title: 'MIDI/EMP',
    instructors: [
      { name: '이재혁', image: '/images/lecturers/midi_이재혁.jpg' },
      { name: '조윤상', image: '/images/lecturers/midi_조윤상.jpg' },
    ],
  },
  {
    title: 'Dance',
    instructors: [
      { name: '양지은', image: '/images/lecturers/dance_양지은.jpeg' },
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
