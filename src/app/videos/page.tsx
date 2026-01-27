'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';

interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string | null;
  category: string;
  order: number;
}

function getYoutubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/success-videos');
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
      setIsLoading(false);
    };
    fetchVideos();
  }, []);

  return (
    <SubPageLayout
      title="합격 영상"
      subtitle="경희실용음악학원 수강생들의 합격 후기와 인터뷰"
    >
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          {isLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <div style={{ aspectRatio: '16/9', backgroundColor: '#e5e5e5', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ padding: '24px' }}>
                    <div style={{ height: '20px', backgroundColor: '#e5e5e5', borderRadius: '4px', width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  </div>
                </div>
              ))}
              <style jsx global>{`
                @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.5; }
                }
              `}</style>
            </div>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
              등록된 영상이 없습니다.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
              {videos.map((video) => {
                const youtubeId = getYoutubeId(video.youtubeUrl);
                return (
                  <div
                    key={video.id}
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
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      />
                    </div>
                    <div style={{ padding: '24px' }}>
                      <p style={{ fontSize: '18px', fontWeight: 700, color: '#000' }}>
                        {video.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* YouTube Channel Link */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <a
              href="https://www.youtube.com/channel/UC064T0e2BoevLYHkXkp8Yog"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#ff0000',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                padding: '16px 40px',
                borderRadius: '100px',
                textDecoration: 'none',
              }}
            >
              YouTube 채널 바로가기
            </a>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
