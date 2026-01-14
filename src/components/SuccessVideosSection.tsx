'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  thumbnailUrl: string | null;
  order: number;
}

// YouTube URL에서 Video ID 추출
function extractYoutubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : '';
}

export default function SuccessVideosSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/success-videos');
        const data = await res.json();
        setVideos(data.slice(0, 6)); // 메인에는 최대 6개만 표시
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
      setIsLoading(false);
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <section id="success-videos" style={{ padding: '100px 0', backgroundColor: '#000' }}>
        <div className="container">
          <div style={{ textAlign: 'center', color: '#999' }}>로딩중...</div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return null;
  }

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
          {videos.map((video) => {
            const youtubeId = extractYoutubeId(video.youtubeUrl);

            return (
              <div
                key={video.id}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#111',
                  transition: 'transform 0.3s ease',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                  {playingVideo === video.id ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                  ) : (
                    <>
                      <img
                        src={video.thumbnailUrl || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                        }}
                      />
                      <div
                        onClick={() => setPlayingVideo(video.id)}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(0,0,0,0.4)',
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
                          transition: 'transform 0.3s ease',
                        }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="#000">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '8px',
                  }}>
                    {video.title}
                  </p>
                  {video.description && (
                    <p style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.5,
                    }}>
                      {video.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link
            href="/success-videos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              backgroundColor: 'transparent',
              border: '2px solid #ffc50a',
              borderRadius: '8px',
              color: '#ffc50a',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
          >
            전체 합격 영상 보기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
