'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';

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

export default function SuccessVideosPage() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos?category=ADMISSION_SUCCESS');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setVideos(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <SubPageLayout
      title="합격자동영상"
      subtitle="경희실용음악학원 합격생들의 이야기"
    >
      {/* Video Grid */}
      <section style={{ padding: '60px 0', backgroundColor: '#111' }}>
        <div className="container">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
              로딩중...
            </div>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
              등록된 영상이 없습니다.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '28px',
            }}>
              {videos.map((video) => {
                const youtubeId = extractYoutubeId(video.youtubeUrl);

                return (
                  <div
                    key={video.id}
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: '#1a1a1a',
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
                              backgroundColor: 'rgba(0,0,0,0.35)',
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
                    <div style={{ padding: '24px' }}>
                      <p style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '8px',
                      }}>
                        {video.title}
                      </p>
                      {video.description && (
                        <p style={{
                          fontSize: '15px',
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
          )}
        </div>
      </section>

      {/* More Videos CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            더 많은 합격 영상
          </h3>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            경희실용음악학원 공식 유튜브 채널에서 더 많은 합격 영상을 확인하세요
          </p>
          <a
            href="https://www.youtube.com/channel/UC064T0e2BoevLYHkXkp8Yog"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              backgroundColor: '#FF0000',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube 채널 바로가기
          </a>
        </div>
      </section>

    </SubPageLayout>
  );
}
