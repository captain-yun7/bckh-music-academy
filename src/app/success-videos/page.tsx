'use client';

import { useState } from 'react';
import SubPageLayout from '@/components/SubPageLayout';

// 합격생 동영상 데이터 (khmusic.co.kr 실제 데이터)
const successVideos = [
  // 2025학년도
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
  // 2024학년도
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
    id: 224,
    title: '서서울생활과학고 실용음악과 보컬전공',
    name: '송채원',
    youtubeId: 'TXANHRFiLWE',
    year: '2024',
    university: '서서울생활과학고등학교',
    major: '보컬',
  },
  {
    id: 223,
    title: '호원대학교 실용음악과 작곡전공',
    name: '김미래',
    youtubeId: 'zhfYSQb30Sw',
    year: '2024',
    university: '호원대학교',
    major: '작곡',
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
  {
    id: 219,
    title: '동아방송예술대학교 실용음악과 작곡전공',
    name: '이은비',
    youtubeId: 'K34t03QNEgw',
    year: '2024',
    university: '동아방송예술대학교',
    major: '작곡',
  },
  // 2023학년도
  {
    id: 211,
    title: '호원대학교 실용음악과 베이스전공',
    name: '김휘성',
    youtubeId: '6OYMnDDyf_M',
    year: '2023',
    university: '호원대학교',
    major: '베이스',
  },
  {
    id: 210,
    title: '서울공연예술고 실용음악과 기타전공',
    name: '이용환',
    youtubeId: '-oHA9e6qHpA',
    year: '2023',
    university: '서울공연예술고등학교',
    major: '기타',
  },
  // 2022학년도
  {
    id: 201,
    title: '서울실용음악고/서서울생활과학고 베이스전공',
    name: '곽재민',
    youtubeId: 'EuQ7K3q6Kpg',
    year: '2022',
    university: '서울실용음악고등학교',
    major: '베이스',
    additionalInfo: '서서울생활과학고등학교 중복합격',
  },
  {
    id: 197,
    title: '호원대학교 실용음악과 재즈피아노전공',
    name: '이예린',
    youtubeId: 'fZK5iW8Krzo',
    year: '2022',
    university: '호원대학교',
    major: '재즈피아노',
    additionalInfo: '수시합격',
  },
  {
    id: 196,
    title: '호원대학교 실용음악과 작곡전공',
    name: '이유진',
    youtubeId: 'ru0dE2_K4oE',
    year: '2022',
    university: '호원대학교',
    major: '작곡',
    additionalInfo: '수시합격',
  },
  {
    id: 195,
    title: '서울공연예술고 실용음악과 피아노전공',
    name: '강은지',
    youtubeId: 'VO1wviLxa5o',
    year: '2022',
    university: '서울공연예술고등학교',
    major: '피아노',
  },
  // 2020학년도
  {
    id: 185,
    title: '호원대 실용음악과 재즈피아노전공',
    name: '김선경',
    youtubeId: 'dKhpy_hJQwg',
    year: '2020',
    university: '호원대학교',
    major: '재즈피아노',
    additionalInfo: '정시합격',
  },
  // 2018학년도
  {
    id: 165,
    title: '경희대학교 포스트모던음악과 작곡전공',
    name: '김영찬',
    youtubeId: 'X5aTWYYtspI',
    year: '2018',
    university: '경희대학교',
    major: '작곡',
    additionalInfo: '수시합격',
  },
];

// 연도 목록
const videoYears = [...new Set(successVideos.map(v => v.year))].sort((a, b) => Number(b) - Number(a));

export default function SuccessVideosPage() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const filteredVideos = selectedYear === 'all'
    ? successVideos
    : successVideos.filter(v => v.year === selectedYear);

  return (
    <SubPageLayout
      title="합격자동영상"
      subtitle="경희실용음악학원 합격생들의 이야기"
      bgImage="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80"
    >
      {/* Year Filter */}
      <section style={{ padding: '40px 0', backgroundColor: '#000' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setSelectedYear('all')}
              style={{
                padding: '12px 28px',
                borderRadius: '100px',
                border: 'none',
                backgroundColor: selectedYear === 'all' ? '#ffc50a' : 'rgba(255,255,255,0.1)',
                color: selectedYear === 'all' ? '#000' : '#fff',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              전체 ({successVideos.length})
            </button>
            {videoYears.map(year => {
              const count = successVideos.filter(v => v.year === year).length;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '100px',
                    border: 'none',
                    backgroundColor: selectedYear === year ? '#ffc50a' : 'rgba(255,255,255,0.1)',
                    color: selectedYear === year ? '#000' : '#fff',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {year}학년도 ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section style={{ padding: '60px 0', backgroundColor: '#111' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '28px',
          }}>
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
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
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                        }}
                      />
                      <div
                        onClick={() => setPlayingVideo(video.youtubeId)}
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
                      {/* Year Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
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
                        top: '14px',
                        right: '14px',
                        padding: '8px 16px',
                        backgroundColor: 'rgba(0,0,0,0.75)',
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
                    marginBottom: '10px',
                  }}>
                    {video.university}
                  </p>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '6px',
                  }}>
                    {video.name} 합격생
                  </p>
                  <p style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.5,
                  }}>
                    {video.title}
                  </p>
                  {video.additionalInfo && (
                    <p style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.4)',
                      marginTop: '12px',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(255,197,10,0.1)',
                      borderRadius: '8px',
                      borderLeft: '3px solid #ffc50a',
                    }}>
                      {video.additionalInfo}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
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
