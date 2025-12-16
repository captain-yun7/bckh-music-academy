'use client';

import { useState } from 'react';
import Link from 'next/link';

// 합격생 동영상 데이터 (khmusic.co.kr 실제 데이터)
const successVideos = [
  {
    id: 233,
    title: '단국대학교 뉴뮤직학과 싱어송라이터전공',
    name: '박은진',
    youtubeId: 'uj73oS-QUi4',
    year: '2025',
    university: '단국대학교',
    major: '싱어송라이터',
    additionalInfo: '여주대, 남서울대 중복합격',
  },
  {
    id: 232,
    title: '동덕여자대학교 피아노전공',
    name: '강은지',
    youtubeId: 'fVqn5iH71ys',
    year: '2025',
    university: '동덕여자대학교',
    major: '피아노',
    additionalInfo: '서경대예비3, 홍익대1차, 백석예대 중복합격',
  },
  {
    id: 231,
    title: '호원대학교 K-POP학과',
    name: '최영민',
    youtubeId: 'N-0NNbqGWFg',
    year: '2025',
    university: '호원대학교',
    major: 'K-POP',
  },
  {
    id: 228,
    title: '호원대학교 K-POP학과',
    name: '차예서',
    youtubeId: 'zhsj2Wie4IU',
    year: '2024',
    university: '호원대학교',
    major: 'K-POP',
  },
  {
    id: 225,
    title: '서서울생활과학고 실용음악과 보컬전공',
    name: '문은솔',
    youtubeId: '9nprqjZXgvY',
    year: '2024',
    university: '서서울생활과학고등학교',
    major: '보컬',
  },
  {
    id: 220,
    title: '서울공연예술고 실용음악과 보컬전공',
    name: '최지혜',
    youtubeId: 'kot7OFU_21c',
    year: '2024',
    university: '서울공연예술고등학교',
    major: '보컬',
  },
];

export default function SuccessVideosSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <section id="success-videos" style={{ padding: '100px 0', backgroundColor: '#000' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{
            color: '#ffc50a',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            PRIDE OF K.H
          </p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px'
          }}>
            합격생 동영상
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '17px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            경희실용음악학원 합격생들의 실기 영상과 인터뷰입니다
          </p>
        </div>

        {/* Video Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {successVideos.map((video, index) => (
            <div
              key={video.id}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#111',
                transition: 'transform 0.3s ease',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                {playingVideo === video.youtubeId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  />
                ) : (
                  <>
                    {/* Gradient Background instead of YouTube thumbnail */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, #1a1a2e ${index * 5}%, #16213e ${50 + index * 5}%, #0f3460 100%)`,
                    }} />

                    {/* University Logo/Text Overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '20px',
                    }}>
                      <div style={{
                        fontSize: '48px',
                        marginBottom: '12px',
                        opacity: 0.3,
                      }}>
                        🎓
                      </div>
                      <p style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        {video.year} 합격
                      </p>
                    </div>

                    {/* Play Button Overlay */}
                    <div
                      onClick={() => setPlayingVideo(video.youtubeId)}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <div style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        backgroundColor: '#ffc50a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(255,197,10,0.4)',
                        transition: 'transform 0.3s ease',
                      }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#000">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Year Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '8px 16px',
                      backgroundColor: '#ffc50a',
                      color: '#000',
                      borderRadius: '100px',
                      fontSize: '13px',
                      fontWeight: 700,
                    }}>
                      {video.year}학년도
                    </div>

                    {/* Major Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      borderRadius: '100px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}>
                      {video.major}
                    </div>
                  </>
                )}
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{
                  color: '#ffc50a',
                  fontSize: '15px',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}>
                  {video.university}
                </p>
                <p style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '4px',
                }}>
                  {video.name} 합격생
                </p>
                {video.additionalInfo && (
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '12px',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                  }}>
                    {video.additionalInfo}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link
            href="/admissions"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              backgroundColor: '#ffc50a',
              borderRadius: '50px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
          >
            전체 합격생 보기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
