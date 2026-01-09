'use client';

import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import SubPageLayout from '@/components/SubPageLayout';

// SVG Icon Components
const IconMic = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const IconMusic = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const IconPiano = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="6" y1="4" x2="6" y2="14" />
    <line x1="10" y1="4" x2="10" y2="14" />
    <line x1="14" y1="4" x2="14" y2="14" />
    <line x1="18" y1="4" x2="18" y2="14" />
    <line x1="2" y1="14" x2="22" y2="14" />
  </svg>
);

const IconGuitar = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.9 12.1a4.5 4.5 0 1 0-6.4 6.4 4.5 4.5 0 0 0 6.4-6.4z" />
    <path d="m21 3-6 6" />
    <path d="m15 9-3 3" />
    <circle cx="12" cy="12" r="1" />
    <path d="M20 4v3h-3" />
  </svg>
);

const IconDrum = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="10" rx="9" ry="5" />
    <path d="M3 10v4c0 2.8 4 5 9 5s9-2.2 9-5v-4" />
    <line x1="3" y1="10" x2="3" y2="14" />
    <line x1="21" y1="10" x2="21" y2="14" />
    <path d="M6 3l-3 7" />
    <path d="M18 3l3 7" />
  </svg>
);

const IconMidi = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h.01" />
    <path d="M10 10h.01" />
    <path d="M14 10h.01" />
    <path d="M18 10h.01" />
    <path d="M8 14h8" />
  </svg>
);

const IconBass = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18a6 6 0 0 0 6-6V4" />
    <path d="M6 12a6 6 0 0 0 6 6" />
    <circle cx="12" cy="18" r="3" />
    <path d="M18 4h-3v3" />
    <line x1="15" y1="4" x2="18" y2="7" />
  </svg>
);

const IconDance = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v4" />
    <path d="M9 10h6" />
    <path d="M9 10l-3 10" />
    <path d="M15 10l3 10" />
    <path d="M12 10v8" />
    <path d="M9 22l3-4 3 4" />
  </svg>
);

const IconRap = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
    <path d="M3 3l18 18" />
  </svg>
);

const IconAct = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

// 아이콘 ID로 아이콘 컴포넌트 반환
const getIconById = (iconId: string, size: number): ReactNode => {
  const iconMap: Record<string, ReactNode> = {
    'vocal': <IconMic size={size} />,
    'composing': <IconMusic size={size} />,
    'piano': <IconPiano size={size} />,
    'guitar': <IconGuitar size={size} />,
    'drum': <IconDrum size={size} />,
    'midi': <IconMidi size={size} />,
    'bass': <IconBass size={size} />,
    'dance': <IconDance size={size} />,
    'rap': <IconRap size={size} />,
    'acting': <IconAct size={size} />,
  };
  return iconMap[iconId] || null;
};

// 전공명으로 기본 아이콘 추론 (아이콘이 선택되지 않은 경우 폴백)
const getDefaultIconForMajor = (name: string, size: number): ReactNode => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('보컬') || lowerName.includes('vocal')) return <IconMic size={size} />;
  if (lowerName.includes('작곡') || lowerName.includes('화성')) return <IconMusic size={size} />;
  if (lowerName.includes('피아노') || lowerName.includes('piano')) return <IconPiano size={size} />;
  if (lowerName.includes('기타') || lowerName.includes('guitar')) return <IconGuitar size={size} />;
  if (lowerName.includes('드럼') || lowerName.includes('drum')) return <IconDrum size={size} />;
  if (lowerName.includes('미디') || lowerName.includes('midi')) return <IconMidi size={size} />;
  if (lowerName.includes('베이스') || lowerName.includes('bass')) return <IconBass size={size} />;
  if (lowerName.includes('댄스') || lowerName.includes('dance')) return <IconDance size={size} />;
  if (lowerName.includes('랩') || lowerName.includes('rap')) return <IconRap size={size} />;
  if (lowerName.includes('연기') || lowerName.includes('act')) return <IconAct size={size} />;
  return <IconMusic size={size} />;
};

// 아이콘 렌더링 - 커스텀 이미지 URL > 선택된 아이콘 ID > 전공명 기반 추론 순서로 표시
const MajorIcon = ({ icon, name, size = 20 }: { icon: string | null; name: string; size?: number }) => {
  if (icon) {
    // 커스텀 이미지 URL인 경우 (http:// 또는 / 로 시작)
    if (icon.startsWith('http') || icon.startsWith('/')) {
      return (
        <Image
          src={icon}
          alt={name}
          width={size}
          height={size}
          style={{ objectFit: 'contain' }}
        />
      );
    }
    // 아이콘 ID인 경우
    const iconComponent = getIconById(icon, size);
    if (iconComponent) return iconComponent;
  }
  // 아이콘이 없거나 유효하지 않으면 전공명으로 추론
  return getDefaultIconForMajor(name, size);
};

interface CurriculumItem {
  title: string;
  image?: string;
  description?: string;
  items?: string[];
  children?: CurriculumItem[];
}

interface CurriculumMajor {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;
  curriculum: CurriculumItem[];
}

interface Benefit {
  title: string;
  desc: string;
}

interface CurriculumClassData {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  intro: string | null;
  bgImage: string | null;
  benefits: Benefit[];
  universities: string[];
  agencies: string[];
  majors: CurriculumMajor[];
}

// 커리큘럼 카드 컴포넌트
function CurriculumCard({ item }: { item: CurriculumItem }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    }}>
      {/* 이미지 영역 */}
      <div style={{
        position: 'relative',
        aspectRatio: '16/10',
        backgroundColor: '#333',
        overflow: 'hidden',
      }}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #667 0%, #444 100%)',
          }} />
        )}
        {/* 제목 오버레이 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.7) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h4 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}>
            {item.title}
          </h4>
        </div>
      </div>

      {/* 설명 영역 */}
      {item.description && (
        <div style={{
          padding: '16px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: 1.6,
          }}>
            {item.description}
          </p>
        </div>
      )}
    </div>
  );
}

// Benefit icons (generic icons)
const BenefitIcon = ({ index }: { index: number }) => {
  const icons = [
    // Home
    <svg key="home" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>,
    // Check
    <svg key="check" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22,4 12,14.01 9,11.01" />
    </svg>,
    // Award
    <svg key="award" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
    </svg>,
    // Star
    <svg key="star" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
    </svg>,
    // File
    <svg key="file" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>,
    // Users
    <svg key="users" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>,
    // Disc
    <svg key="disc" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
  ];
  return icons[index % icons.length];
};

interface Props {
  slug: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  fallbackBgImage?: string;
}

export default function CurriculumPageContent({ slug, fallbackTitle, fallbackSubtitle, fallbackBgImage }: Props) {
  const [data, setData] = useState<CurriculumClassData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMajor, setSelectedMajor] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/curriculum/${slug}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
          if (json.majors?.length > 0) {
            setSelectedMajor(json.majors[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch curriculum data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const currentMajor = data?.majors?.find((m) => m.id === selectedMajor) || data?.majors?.[0];

  // Show loading state
  if (isLoading) {
    return (
      <SubPageLayout
        title={fallbackTitle || '로딩중...'}
        subtitle={fallbackSubtitle || ''}
        bgImage={fallbackBgImage || '/images/main/main2.jpg'}
      >
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>커리큘럼 정보를 불러오는 중...</p>
        </div>
      </SubPageLayout>
    );
  }

  // If no data from API, show placeholder
  if (!data) {
    return (
      <SubPageLayout
        title={fallbackTitle || '커리큘럼'}
        subtitle={fallbackSubtitle || ''}
        bgImage={fallbackBgImage || '/images/main/main2.jpg'}
      >
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>커리큘럼 정보가 아직 등록되지 않았습니다.</p>
          <p style={{ color: '#999', fontSize: '14px', marginTop: '8px' }}>관리자 페이지에서 커리큘럼을 등록해주세요.</p>
        </div>
      </SubPageLayout>
    );
  }

  return (
    <SubPageLayout
      title={data.title}
      subtitle={data.subtitle || fallbackSubtitle || ''}
      bgImage={data.bgImage || fallbackBgImage || '/images/main/main2.jpg'}
    >
      {/* Intro */}
      {data.intro && (
        <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9, whiteSpace: 'pre-line' }}>
                {data.intro}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Curriculum Tree */}
      {data.majors && data.majors.length > 0 && (
        <section style={{ padding: '60px 0', backgroundColor: '#f5f5f5' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
              전공별 커리큘럼
            </h2>

            {/* Major Selection */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '40px',
            }}>
              {data.majors.map((major) => (
                <button
                  key={major.id}
                  onClick={() => setSelectedMajor(major.id)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: selectedMajor === major.id ? '#000' : '#fff',
                    color: selectedMajor === major.id ? '#fff' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: '30px',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <MajorIcon icon={major.icon} name={major.name} size={20} />
                  </span>
                  {major.name}
                </button>
              ))}
            </div>

            {/* Curriculum Tree Content */}
            {currentMajor && (
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                  paddingBottom: '24px',
                  borderBottom: '1px solid #eee',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '12px', color: '#fff', overflow: 'hidden' }}>
                    <MajorIcon icon={currentMajor.icon} name={currentMajor.name} size={28} />
                  </span>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#000' }}>
                      {currentMajor.name} 전공
                    </h3>
                    {currentMajor.description && (
                      <p style={{ fontSize: '15px', color: '#666', marginTop: '4px' }}>
                        {currentMajor.description}
                      </p>
                    )}
                  </div>
                </div>

                {currentMajor.curriculum && currentMajor.curriculum.length > 0 ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '24px',
                  }}>
                    {currentMajor.curriculum.map((item, i) => (
                      <CurriculumCard key={i} item={item} />
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
                    커리큘럼 정보가 아직 등록되지 않았습니다.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Benefits */}
      {data.benefits && data.benefits.length > 0 && (
        <section style={{ padding: '60px 0', backgroundColor: '#fffbeb' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
              {data.title} 수강생 혜택
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {data.benefits.map((benefit, i) => (
                <div
                  key={i}
                  style={{
                    padding: '28px',
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <BenefitIcon index={i} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#000', marginBottom: '8px' }}>
                    {benefit.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Universities (for admission) */}
      {data.universities && data.universities.length > 0 && (
        <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
              주요 합격 대학
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
            }}>
              {data.universities.map((uni, i) => (
                <span
                  key={i}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                >
                  {uni}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agencies (for audition) */}
      {data.agencies && data.agencies.length > 0 && (
        <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
              주요 합격 기획사
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
            }}>
              {data.agencies.map((agency, i) => (
                <span
                  key={i}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                >
                  {agency}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </SubPageLayout>
  );
}
