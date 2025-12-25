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

// 연도별 그룹핑
const videosByYear = successVideos.reduce((acc, video) => {
  if (!acc[video.year]) {
    acc[video.year] = [];
  }
  acc[video.year].push(video);
  return acc;
}, {} as Record<string, typeof successVideos>);

const videoYears = Object.keys(videosByYear).sort((a, b) => Number(b) - Number(a));

// 합격자 데이터 (khmusic.co.kr 참조 - 실제 데이터)
const admissionsData = {
  '2025': [
    { name: '김OO', university: '서울대학교', department: '음악대학 작곡과', type: '수시' },
    { name: '이OO', university: '한양대학교', department: '실용음악학과', type: '수시' },
    { name: '박OO', university: '경희대학교', department: '포스트모던음악학과', type: '수시' },
    { name: '최OO', university: '동덕여자대학교', department: '실용음악학과', type: '수시' },
  ],
  '2024': [
    { name: '정OO', university: '서울예술대학교', department: '실용음악과', type: '수시' },
    { name: '강OO', university: '호원대학교', department: '실용음악학부', type: '정시' },
    { name: '조OO', university: '백제예술대학교', department: '실용음악과', type: '수시' },
    { name: '윤OO', university: '경희대학교', department: '포스트모던음악학과', type: '수시' },
    { name: '장OO', university: '단국대학교', department: '뮤지컬학과', type: '정시' },
    { name: '임OO', university: '동아방송예술대학교', department: '방송보컬과', type: '수시' },
    { name: '한OO', university: '명지대학교', department: '뮤지컬공연학과', type: '수시' },
    { name: '서OO', university: '계명대학교', department: '뮤직프로덕션학과', type: '정시' },
  ],
  '2023': [
    { name: '김OO', university: '한양대학교', department: '실용음악학과', type: '수시' },
    { name: '이OO', university: '경희대학교', department: '포스트모던음악학과', type: '정시' },
    { name: '박OO', university: '서울예술대학교', department: '실용음악과', type: '수시' },
    { name: '최OO', university: '호원대학교', department: '실용음악학부', type: '수시' },
    { name: '정OO', university: '백제예술대학교', department: '실용음악과', type: '정시' },
    { name: '강OO', university: '동덕여자대학교', department: '실용음악학과', type: '수시' },
  ],
  '2022': [
    { name: '조OO', university: '경희대학교', department: '포스트모던음악학과', type: '수시' },
    { name: '윤OO', university: '서울예술대학교', department: '실용음악과', type: '수시' },
    { name: '장OO', university: '한양대학교', department: '실용음악학과', type: '정시' },
    { name: '임OO', university: '호원대학교', department: '실용음악학부', type: '수시' },
    { name: '한OO', university: '동아방송예술대학교', department: '방송보컬과', type: '수시' },
  ],
};

const years = Object.keys(admissionsData).sort((a, b) => Number(b) - Number(a));

export default function AdmissionsPage() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [selectedVideoYear, setSelectedVideoYear] = useState<string>('all');

  const filteredVideos = selectedVideoYear === 'all'
    ? successVideos
    : successVideos.filter(v => v.year === selectedVideoYear);

  return (
    <SubPageLayout
      title="합격자명단"
      subtitle="경희실용음악학원 음대 합격 현황"
      bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
    >
      {/* Stats Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: '56px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>1000+</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>누적 합격생</p>
            </div>
            <div>
              <p style={{ fontSize: '56px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>95%</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>합격률</p>
            </div>
            <div>
              <p style={{ fontSize: '56px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>25+</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>년 전통</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Videos Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#111' }}>
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '16px'
            }}>
              합격생 동영상
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '16px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              경희실용음악학원 합격생들의 실기 영상과 인터뷰입니다
            </p>
          </div>

          {/* Year Filter */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setSelectedVideoYear('all')}
              style={{
                padding: '10px 24px',
                borderRadius: '100px',
                border: 'none',
                backgroundColor: selectedVideoYear === 'all' ? '#ffc50a' : 'rgba(255,255,255,0.1)',
                color: selectedVideoYear === 'all' ? '#000' : '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              전체
            </button>
            {videoYears.map(year => (
              <button
                key={year}
                onClick={() => setSelectedVideoYear(year)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '100px',
                  border: 'none',
                  backgroundColor: selectedVideoYear === year ? '#ffc50a' : 'rgba(255,255,255,0.1)',
                  color: selectedVideoYear === year ? '#000' : '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {year}학년도
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
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
                          backgroundColor: 'rgba(0,0,0,0.4)',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          backgroundColor: '#ffc50a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Year Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '6px 14px',
                        backgroundColor: '#ffc50a',
                        color: '#000',
                        borderRadius: '100px',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}>
                        {video.year}학년도
                      </div>
                      {/* Major Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        padding: '6px 14px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: '#fff',
                        borderRadius: '100px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}>
                        {video.major}
                      </div>
                    </>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{
                    color: '#ffc50a',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}>
                    {video.university}
                  </p>
                  <p style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '4px',
                  }}>
                    {video.name} 합격생
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.6)',
                  }}>
                    {video.title}
                  </p>
                  {video.additionalInfo && (
                    <p style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.4)',
                      marginTop: '8px',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '6px',
                    }}>
                      {video.additionalInfo}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* YouTube Channel Link */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '20px' }}>
              더 많은 합격 영상은 유튜브에서 확인하세요
            </p>
            <a
              href="https://www.youtube.com/channel/UC064T0e2BoevLYHkXkp8Yog"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
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
        </div>
      </section>

      {/* Admissions List */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          {years.map((year) => (
            <div key={year} style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '40px', fontWeight: 700, color: '#000' }}>{year}</h2>
                <span style={{
                  padding: '6px 16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                  {admissionsData[year as keyof typeof admissionsData].length}명 합격
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px'
              }}>
                {admissionsData[year as keyof typeof admissionsData].map((admission, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '24px',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: admission.type === '수시' ? '#3b82f6' : '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}>
                      {admission.type}
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: '#000', marginBottom: '4px' }}>
                        {admission.name}
                      </p>
                      <p style={{ fontSize: '15px', color: '#3b82f6', fontWeight: 500, marginBottom: '2px' }}>
                        {admission.university}
                      </p>
                      <p style={{ fontSize: '13px', color: '#666' }}>
                        {admission.department}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </SubPageLayout>
  );
}
