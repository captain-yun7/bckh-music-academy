'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 실제 유튜브 영상 ID로 교체 필요
const videos = [
  {
    title: '2024 서울예대 합격생 인터뷰',
    youtubeId: 'dQw4w9WgXcQ', // 예시 ID - 실제 영상으로 교체
    year: '2024',
  },
  {
    title: '2024 경희대 실용음악과 합격',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
  },
  {
    title: '2023 동아방송예대 합격 후기',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2023',
  },
  {
    title: '2023 호원대 실용음악 합격',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2023',
  },
];

export default function VideosSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.video-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="videos"
      ref={sectionRef}
      style={{ padding: '120px 0', backgroundColor: '#f8f8f8' }}
    >
      <div className="container">
        {/* Section Header */}
        <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
          SUCCESS STORIES
        </p>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, color: '#000', marginBottom: '24px' }}>
          합격 영상
        </h2>
        <p style={{ color: '#666', fontSize: '18px', marginBottom: '60px', maxWidth: '600px' }}>
          경희실용음악학원 수강생들의 합격 후기와 인터뷰 영상입니다.
        </p>

        {/* Videos Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {videos.map((video, index) => (
            <div
              key={index}
              className="video-item"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: '#000',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '6px 12px',
                  borderRadius: '100px',
                  marginBottom: '12px',
                }}>
                  {video.year}
                </span>
                <p style={{ fontSize: '18px', fontWeight: 700, color: '#000' }}>
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* More Videos Link */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <a
            href="https://www.youtube.com/@khmusic"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 600,
              padding: '16px 40px',
              borderRadius: '100px',
              textDecoration: 'none',
            }}
          >
            더 많은 영상 보기
          </a>
        </div>
      </div>
    </section>
  );
}
