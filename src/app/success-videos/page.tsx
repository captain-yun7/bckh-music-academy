import SubPageLayout from '@/components/SubPageLayout';

// 합격 영상 데이터
const videos = [
  {
    id: 'video1',
    title: '2024 수시 합격자 인터뷰 - 김OO (한양대 실용음악)',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=640',
    youtubeId: 'dQw4w9WgXcQ', // 플레이스홀더
    year: 2024,
    university: '한양대학교',
  },
  {
    id: 'video2',
    title: '2024 정시 합격자 인터뷰 - 이OO (경희대 포스트모던)',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=640',
    youtubeId: 'dQw4w9WgXcQ',
    year: 2024,
    university: '경희대학교',
  },
  {
    id: 'video3',
    title: '2023 수시 합격자 인터뷰 - 박OO (서울예대 실용음악)',
    thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=640',
    youtubeId: 'dQw4w9WgXcQ',
    year: 2023,
    university: '서울예술대학교',
  },
  {
    id: 'video4',
    title: '2023 합격자 레슨 영상 - 최OO (동덕여대 실용음악)',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=640',
    youtubeId: 'dQw4w9WgXcQ',
    year: 2023,
    university: '동덕여자대학교',
  },
  {
    id: 'video5',
    title: '2022 수시 합격자 실기 영상 - 정OO (호원대 실용음악)',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=640',
    youtubeId: 'dQw4w9WgXcQ',
    year: 2022,
    university: '호원대학교',
  },
  {
    id: 'video6',
    title: '2022 합격 후기 - 강OO (백제예대 실용음악)',
    thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=640',
    youtubeId: 'dQw4w9WgXcQ',
    year: 2022,
    university: '백제예술대학교',
  },
];

export default function SuccessVideosPage() {
  return (
    <SubPageLayout
      title="합격자동영상"
      subtitle="경희실용음악학원 합격생들의 이야기"
      bgImage="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80"
    >
      {/* Video Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '32px',
          }}>
            {videos.map((video) => (
              <div
                key={video.id}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#f8f8f8',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '6px 12px',
                    backgroundColor: '#000',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}>
                    {video.year}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{
                    fontSize: '13px',
                    color: '#3b82f6',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}>
                    {video.university}
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000',
                    lineHeight: 1.5,
                  }}>
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Videos CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '17px', color: '#666', marginBottom: '24px' }}>
            더 많은 합격 영상은 유튜브에서 확인하세요
          </p>
          <a
            href="https://www.youtube.com/@khmusic"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              backgroundColor: '#FF0000',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube 채널 바로가기
          </a>
        </div>
      </section>
    </SubPageLayout>
  );
}
