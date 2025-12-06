import SubPageLayout from '@/components/SubPageLayout';

const videos = [
  {
    title: '2024 서울예대 합격생 인터뷰',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
    category: '합격 인터뷰',
  },
  {
    title: '2024 경희대 실용음악과 합격',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
    category: '합격 인터뷰',
  },
  {
    title: '2023 동아방송예대 합격 후기',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2023',
    category: '합격 인터뷰',
  },
  {
    title: '2023 호원대 실용음악 합격',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2023',
    category: '합격 인터뷰',
  },
  {
    title: '케이크 콘서트 하이라이트',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
    category: '공연 영상',
  },
  {
    title: '수강생 레코딩 현장',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
    category: '레코딩',
  },
];

export default function VideosPage() {
  return (
    <SubPageLayout
      title="합격 영상"
      subtitle="경희실용음악학원 수강생들의 합격 후기와 인터뷰"
    >
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          {/* Filter Tabs */}
          <div style={{ marginBottom: '48px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['전체', '합격 인터뷰', '공연 영상', '레코딩'].map((tab) => (
              <button
                key={tab}
                style={{
                  padding: '12px 24px',
                  borderRadius: '100px',
                  border: 'none',
                  backgroundColor: tab === '전체' ? '#000' : '#e5e5e5',
                  color: tab === '전체' ? '#fff' : '#666',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
            {videos.map((video, index) => (
              <div
                key={index}
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
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span style={{
                      backgroundColor: '#000',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '6px 12px',
                      borderRadius: '100px',
                    }}>
                      {video.year}
                    </span>
                    <span style={{
                      backgroundColor: '#f0f0f0',
                      color: '#666',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '6px 12px',
                      borderRadius: '100px',
                    }}>
                      {video.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#000' }}>
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

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
