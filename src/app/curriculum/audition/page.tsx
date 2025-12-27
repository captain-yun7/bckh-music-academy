'use client';

import { useState, ReactNode } from 'react';
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

const IconDance = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v4" />
    <path d="M8 14l4-4 4 4" />
    <path d="M12 10v8" />
    <path d="M8 22l4-4 4 4" />
  </svg>
);

const IconHeadphone = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const IconTheater = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

interface CurriculumItem {
  title: string;
  items?: string[];
  children?: CurriculumItem[];
}

interface MajorCurriculum {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  curriculum: CurriculumItem[];
}

const majors: MajorCurriculum[] = [
  {
    id: 'vocal',
    name: '보컬',
    icon: <IconMic size={20} />,
    description: '오디션에 최적화된 보컬 트레이닝',
    curriculum: [
      {
        title: '기초 트레이닝',
        children: [
          { title: '발성/호흡', items: ['복식호흡', '성대 컨디션 관리', '음역대 확장'] },
          { title: '음정/리듬', items: ['정확한 음정 훈련', '리듬감 향상', '박자 안정화'] },
          { title: '기본 테크닉', items: ['비브라토', '팔세토', '믹스보이스'] },
        ],
      },
      {
        title: '오디션 준비',
        children: [
          { title: '곡 선정', items: ['개인 음색에 맞는 곡', '오디션 특성에 맞는 곡', '자기 PR곡'] },
          { title: '무대 연출', items: ['표정 연기', '동선 연습', '카메라 시선 처리'] },
          { title: '감정 표현', items: ['가사 해석', '감정선 구축', '스토리텔링'] },
        ],
      },
      {
        title: '실전 대비',
        children: [
          { title: '모의 오디션', items: ['실전 환경 시뮬레이션', '피드백 반영', '긴장감 극복'] },
          { title: '멘탈 관리', items: ['자신감 향상', '긴장 완화법', '컨디션 관리'] },
        ],
      },
    ],
  },
  {
    id: 'dance',
    name: '댄스',
    icon: <IconDance size={20} />,
    description: '퍼포먼스 중심의 댄스 트레이닝',
    curriculum: [
      {
        title: '기초 트레이닝',
        children: [
          { title: '기본기', items: ['아이솔레이션', '웨이브', '스텝'] },
          { title: '리듬 트레이닝', items: ['비트 카운팅', '바운스', '그루브'] },
          { title: '체력/유연성', items: ['스트레칭', '근력 운동', '지구력 훈련'] },
        ],
      },
      {
        title: '장르별 훈련',
        children: [
          { title: '힙합', items: ['올드스쿨', '뉴스쿨', '프리스타일'] },
          { title: 'K-POP', items: ['걸그룹/보이그룹 안무', '칼군무', '표정 연기'] },
          { title: '코레오그래피', items: ['안무 해석', '디테일 표현', '개성 살리기'] },
        ],
      },
      {
        title: '오디션 대비',
        children: [
          { title: '퍼포먼스', items: ['무대 장악력', '카메라 앵글', '그룹 호흡'] },
          { title: '프리스타일', items: ['즉흥 안무', '음악 해석', '개성 표현'] },
        ],
      },
    ],
  },
  {
    id: 'rap',
    name: '랩/힙합',
    icon: <IconHeadphone size={20} />,
    description: '래퍼를 위한 전문 트레이닝',
    curriculum: [
      {
        title: '기초 트레이닝',
        children: [
          { title: '랩 기초', items: ['플로우', '라임', '발음/딕션'] },
          { title: '리듬', items: ['비트 타기', '박자감', '싱코페이션'] },
          { title: '보이스', items: ['톤 만들기', '호흡 조절', '발성'] },
        ],
      },
      {
        title: '심화 과정',
        children: [
          { title: '작사', items: ['가사 쓰기', '스토리텔링', '펀치라인'] },
          { title: '프리스타일', items: ['즉흥 랩', '배틀 랩', '애드리브'] },
          { title: '스타일', items: ['멈블랩', '트랩', '붐뱁', '한국 힙합'] },
        ],
      },
      {
        title: '오디션 대비',
        children: [
          { title: '자작곡', items: ['오리지널 곡 준비', '녹음/믹싱', '뮤직비디오'] },
          { title: '무대 퍼포먼스', items: ['스테이지 매너', '관객 호응', '에너지'] },
        ],
      },
    ],
  },
  {
    id: 'acting',
    name: '연기',
    icon: <IconTheater size={20} />,
    description: '배우/아이돌 연기 트레이닝',
    curriculum: [
      {
        title: '기초 연기',
        children: [
          { title: '발성/발음', items: ['복식호흡', '딕션', '목소리 톤'] },
          { title: '표정 연기', items: ['감정 표현', '눈빛 연기', '미세 표정'] },
          { title: '몸 연기', items: ['제스처', '자세', '동선'] },
        ],
      },
      {
        title: '심화 과정',
        children: [
          { title: '대본 분석', items: ['캐릭터 분석', '상황 이해', '감정선 파악'] },
          { title: '장면 연기', items: ['독백', '2인 연기', '앙상블'] },
          { title: '카메라 연기', items: ['클로즈업', '시선 처리', '자연스러운 연기'] },
        ],
      },
      {
        title: '오디션 대비',
        children: [
          { title: '오디션 연기', items: ['지정 대본', '즉흥 연기', '자기소개'] },
          { title: '실전 연습', items: ['모의 오디션', '피드백', '멘탈 관리'] },
        ],
      },
    ],
  },
];

function TreeNode({ item, depth = 0 }: { item: CurriculumItem; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const hasChildren = item.children && item.children.length > 0;
  const hasItems = item.items && item.items.length > 0;

  return (
    <div style={{ marginLeft: depth > 0 ? '24px' : '0' }}>
      <div
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          backgroundColor: depth === 0 ? '#fffbeb' : depth === 1 ? '#fff' : 'transparent',
          borderRadius: '8px',
          marginBottom: '4px',
          cursor: hasChildren ? 'pointer' : 'default',
          borderLeft: depth > 0 ? '2px solid #fcd34d' : 'none',
          transition: 'background-color 0.2s',
        }}
      >
        {hasChildren && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            strokeWidth="2"
            style={{
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              flexShrink: 0,
            }}
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
        {!hasChildren && hasItems && (
          <span style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', flexShrink: 0 }}>
            ●
          </span>
        )}
        <span style={{
          fontSize: depth === 0 ? '16px' : '15px',
          fontWeight: depth === 0 ? 700 : depth === 1 ? 600 : 500,
          color: depth === 0 ? '#111' : depth === 1 ? '#333' : '#555',
        }}>
          {item.title}
        </span>
      </div>

      {isOpen && hasChildren && (
        <div>
          {item.children!.map((child, i) => (
            <TreeNode key={i} item={child} depth={depth + 1} />
          ))}
        </div>
      )}

      {hasItems && (
        <div style={{
          marginLeft: '40px',
          marginBottom: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          {item.items!.map((text, i) => (
            <span
              key={i}
              style={{
                padding: '6px 12px',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                borderRadius: '16px',
                fontSize: '13px',
              }}
            >
              {text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AuditionCoursePage() {
  const [selectedMajor, setSelectedMajor] = useState<string>('vocal');
  const currentMajor = majors.find((m) => m.id === selectedMajor) || majors[0];

  return (
    <SubPageLayout
      title="오디션반"
      subtitle="프로 데뷔를 위한 집중 트레이닝"
      bgImage="/images/main/main3.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              기획사 오디션, 방송 오디션, 공개 채용까지<br />
              <strong>프로 데뷔를 목표로 하는 집중 트레이닝 과정</strong>입니다.<br />
              현직 프로듀서와 트레이너의 실전 노하우를 전수받으세요.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Tree */}
      <section style={{ padding: '60px 0', backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            분야별 커리큘럼
          </h2>

          {/* Major Selection */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}>
            {majors.map((major) => (
              <button
                key={major.id}
                onClick={() => setSelectedMajor(major.id)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: selectedMajor === major.id ? '#f59e0b' : '#fff',
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
                <span style={{ display: 'flex', alignItems: 'center' }}>{major.icon}</span>
                {major.name}
              </button>
            ))}
          </div>

          {/* Curriculum Tree Content */}
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
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '12px', color: '#fff' }}>
                {currentMajor.icon}
              </span>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#000' }}>
                  {currentMajor.name}
                </h3>
                <p style={{ fontSize: '15px', color: '#666', marginTop: '4px' }}>
                  {currentMajor.description}
                </p>
              </div>
            </div>

            <div>
              {currentMajor.curriculum.map((item, i) => (
                <TreeNode key={i} item={item} depth={0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            오디션 준비 과정
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            {['상담 & 진단', '곡/안무 선정', '집중 레슨', '모의 오디션', '실전 지원'].map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '18px',
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: '16px', fontWeight: 500 }}>
                  {step}
                </span>
                {i < 4 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '60px 0', backgroundColor: '#fffbeb' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            오디션반 수강생 혜택
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {[
              { title: '연습실/합주실/리허설센터 무제한 사용', desc: '약 40여개실, 사용시간 11:00 ~ 22:00', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              )},
              { title: '연 1회 케이크 정기공연 참여', desc: '', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
                </svg>
              )},
              { title: '두달에 한번 Open Stage 참여', desc: '', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
                </svg>
              )},
              { title: '철저한 출결확인 시스템/생활지도', desc: '출석 문자 통보', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
              )},
              { title: '레코딩 실습', desc: '월 1회 이상 실전 녹음 수업', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )},
              { title: '월 2~4회 주요기획사 오디션', desc: '', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <polyline points="17,11 19,13 23,9" />
                </svg>
              )},
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '28px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#000', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Agencies */}
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
            {[
              'SM엔터테인먼트', 'JYP엔터테인먼트', 'YG엔터테인먼트', 'HYBE',
              '빅히트뮤직', 'FNC엔터테인먼트', '큐브엔터테인먼트', '스타쉽엔터테인먼트',
              'RBW', '플레디스', '울림엔터테인먼트', '그 외 다수',
            ].map((agency) => (
              <span
                key={agency}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  borderRadius: '24px',
                  color: '#f59e0b',
                  fontSize: '14px',
                }}
              >
                {agency}
              </span>
            ))}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
