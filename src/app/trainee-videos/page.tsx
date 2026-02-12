'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';

interface Video {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  thumbnailUrl: string | null;
}

function getYoutubeThumbnail(url: string): string {
  const videoId = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';
}

function getYoutubeVideoId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
  return match ? match[1] : null;
}

export default function TraineeVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos?category=TRAINEE');
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

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <SubPageLayout
      title="수강생 영상"
      subtitle="경희 수강생들의 무대 영상"
    >
      <section style={{ padding: '60px 0 100px', backgroundColor: '#fff' }}>
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}>
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => openVideo(video)}
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundColor: '#000',
                  }}
                  className="video-card"
                >
                  <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                    <img
                      src={video.thumbnailUrl || getYoutubeThumbnail(video.youtubeUrl) || `https://img.youtube.com/vi/default/mqdefault.jpg`}
                      alt={video.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    />
                    {/* Play Button */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      transition: 'background-color 0.3s ease',
                    }} className="play-overlay">
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 197, 10, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease',
                      }} className="play-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Hover Overlay with Description */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '20px',
                      transition: 'background-color 0.3s ease',
                    }} className="info-overlay">
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#fff',
                        marginBottom: '8px',
                        opacity: 0,
                        transform: 'translateY(10px)',
                        transition: 'all 0.3s ease',
                      }} className="video-title">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p style={{
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.8)',
                          lineHeight: 1.5,
                          opacity: 0,
                          transform: 'translateY(10px)',
                          transition: 'all 0.3s ease 0.1s',
                        }} className="video-desc">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          onClick={closeVideo}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '900px',
              backgroundColor: '#000',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '16/9' }}>
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(selectedVideo.youtubeUrl)}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                {selectedVideo.title}
              </h3>
              {selectedVideo.description && (
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  {selectedVideo.description}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={closeVideo}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
      )}

      <style jsx global>{`
        .video-card:hover img {
          transform: scale(1.05);
        }
        .video-card:hover .play-overlay {
          background-color: rgba(0,0,0,0.4);
        }
        .video-card:hover .play-button {
          transform: scale(1.1);
        }
        .video-card:hover .info-overlay {
          background-color: rgba(0,0,0,0.7);
        }
        .video-card:hover .video-title,
        .video-card:hover .video-desc {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </SubPageLayout>
  );
}
