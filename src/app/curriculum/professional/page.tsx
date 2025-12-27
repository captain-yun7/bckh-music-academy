'use client';

import { useState, ReactNode } from 'react';
import SubPageLayout from '@/components/SubPageLayout';

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

// SVG Icons
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
    <path d="M11.9 12.1a3 3 0 1 0 4.2 4.2" />
    <path d="M18.7 5.3l-1.4-1.4a2 2 0 0 0-2.8 0l-9.2 9.2a4 4 0 0 0 0 5.6l1.4 1.4a4 4 0 0 0 5.6 0l9.2-9.2a2 2 0 0 0 0-2.8l-1.4-1.4z" />
    <path d="M22 2l-4 4" />
  </svg>
);

const IconDrum = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="10" rx="9" ry="5" />
    <path d="M3 10v4c0 2.8 4 5 9 5s9-2.2 9-5v-4" />
    <line x1="3" y1="14" x2="3" y2="18" />
    <line x1="21" y1="14" x2="21" y2="18" />
    <line x1="12" y1="5" x2="12" y2="1" />
    <line x1="5" y1="6" x2="3" y2="3" />
    <line x1="19" y1="6" x2="21" y2="3" />
  </svg>
);

const IconRecording = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" fill={color} />
  </svg>
);

const IconDisc = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconStage = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconMentor = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconNetwork = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3" />
    <circle cx="5" cy="19" r="3" />
    <circle cx="19" cy="19" r="3" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="12" x2="5" y2="16" />
    <line x1="12" y1="12" x2="19" y2="16" />
  </svg>
);

const majors: MajorCurriculum[] = [
  {
    id: 'vocal',
    name: '보컬',
    icon: <IconMic size={32} color="#f59e0b" />,
    description: '프로 보컬리스트/세션 양성 과정',
    curriculum: [
      {
        title: '심화 테크닉',
        children: [
          { title: '고급 발성', items: ['믹스보이스 마스터', '고음 확장', '성대 관리법'] },
          { title: '퍼포먼스', items: ['무대 연출', '라이브 감각', 'MC 스킬'] },
          { title: '장르 특화', items: ['재즈 보컬', '소울/R&B', '록/메탈 보컬'] },
        ],
      },
      {
        title: '현장 실무',
        children: [
          { title: '레코딩', items: ['보컬 녹음 기법', '마이크 활용', '디렉팅 대응'] },
          { title: '세션 활동', items: ['밴드 합주', '라이브 세션', '코러스 작업'] },
          { title: '음원 발매', items: ['싱글/EP 제작', '음원 플랫폼 등록', '프로모션'] },
        ],
      },
      {
        title: '아티스트 개발',
        children: [
          { title: '브랜딩', items: ['아티스트 컨셉', 'SNS 마케팅', '팬층 구축'] },
          { title: '무대 경험', items: ['케이크콘서트', '외부 공연', '페스티벌'] },
        ],
      },
    ],
  },
  {
    id: 'composing',
    name: '작곡/프로듀싱',
    icon: <IconMusic size={32} color="#f59e0b" />,
    description: '상업 작곡가/프로듀서 양성 과정',
    curriculum: [
      {
        title: '고급 작곡 기법',
        children: [
          { title: '상업 작곡', items: ['히트곡 분석', '트렌드 파악', '장르별 작곡'] },
          { title: '편곡 심화', items: ['밴드 편곡', '오케스트라', '전자음악'] },
          { title: '탑라인/송라이팅', items: ['멜로디 발전', '가사 작법', '콜라보레이션'] },
        ],
      },
      {
        title: '프로덕션',
        children: [
          { title: '믹싱', items: ['EQ/컴프레서 활용', '공간계 이펙트', '밸런싱'] },
          { title: '마스터링', items: ['라우드니스', '스테레오 이미지', '최종 음압'] },
          { title: '사운드 디자인', items: ['신스 프로그래밍', '샘플 제작', '효과음'] },
        ],
      },
      {
        title: '커리어 개발',
        children: [
          { title: '포트폴리오', items: ['데모 제작', '작품집 구성', 'PR 자료'] },
          { title: '업계 진출', items: ['음악 출판사', '기획사 납품', '프리랜서 활동'] },
        ],
      },
    ],
  },
  {
    id: 'piano',
    name: '재즈피아노',
    icon: <IconPiano size={32} color="#f59e0b" />,
    description: '재즈 피아니스트/세션 양성 과정',
    curriculum: [
      {
        title: '고급 테크닉',
        children: [
          { title: '즉흥연주 심화', items: ['모달 즉흥', '아웃사이드 플레이', '리하모니제이션'] },
          { title: '스타일 연구', items: ['비밥', '쿨재즈', '퓨전', '컨템포러리'] },
          { title: '솔로 피아노', items: ['스트라이드', '발라드 터치', '루바토'] },
        ],
      },
      {
        title: '앙상블/세션',
        children: [
          { title: '트리오/콤보', items: ['리듬섹션 호흡', '콤핑', '솔로 주고받기'] },
          { title: '빅밴드', items: ['보이싱', '리듬 컷', '어레인지'] },
          { title: '반주', items: ['보컬 반주', '솔로이스트 서포트', '리드 시트 해석'] },
        ],
      },
      {
        title: '현장 활동',
        children: [
          { title: '공연', items: ['재즈클럽', '호텔 라운지', '페스티벌'] },
          { title: '레코딩', items: ['스튜디오 세션', '앨범 참여', '사운드트랙'] },
        ],
      },
    ],
  },
  {
    id: 'guitar',
    name: '기타',
    icon: <IconGuitar size={32} color="#f59e0b" />,
    description: '세션 기타리스트/아티스트 양성 과정',
    curriculum: [
      {
        title: '고급 테크닉',
        children: [
          { title: '솔로잉', items: ['스케일 응용', '아르페지오', '고급 테크닉'] },
          { title: '장르 마스터', items: ['블루스', '재즈', '퓨전', '메탈'] },
          { title: '톤 메이킹', items: ['이펙터 체인', '앰프 세팅', '녹음 톤'] },
        ],
      },
      {
        title: '세션 활동',
        children: [
          { title: '밴드 세션', items: ['리듬 파트', '리드 파트', '앙상블'] },
          { title: '레코딩', items: ['클린/드라이브', '어쿠스틱', '일렉트릭'] },
          { title: '라이브', items: ['무대 세팅', '모니터링', '퍼포먼스'] },
        ],
      },
      {
        title: '커리어',
        children: [
          { title: '세션맨', items: ['기획사 세션', '녹음 세션', '라이브 세션'] },
          { title: '아티스트', items: ['솔로 앨범', '밴드 활동', '유튜브 채널'] },
        ],
      },
    ],
  },
  {
    id: 'bass',
    name: '베이스',
    icon: <IconGuitar size={32} color="#f59e0b" />,
    description: '세션 베이시스트 양성 과정',
    curriculum: [
      {
        title: '고급 테크닉',
        children: [
          { title: '슬랩/탭핑', items: ['슬랩 심화', '더블 탭', '코드 연주'] },
          { title: '그루브', items: ['펑크/소울', '재즈', 'R&B', '라틴'] },
          { title: '솔로잉', items: ['코드톤', '스케일', '멜로딕 베이스'] },
        ],
      },
      {
        title: '세션 활동',
        children: [
          { title: '밴드', items: ['드럼과 호흡', '리듬섹션', '곡 해석'] },
          { title: '레코딩', items: ['DI/앰프', '톤 메이킹', '프로덕션'] },
          { title: '라이브', items: ['무대 운용', '모니터링', '세팅'] },
        ],
      },
      {
        title: '커리어',
        children: [
          { title: '세션맨', items: ['기획사 세션', '녹음 세션', '투어 세션'] },
          { title: '밴드 활동', items: ['프로 밴드', '프로젝트', '세션'] },
        ],
      },
    ],
  },
  {
    id: 'drums',
    name: '드럼',
    icon: <IconDrum size={32} color="#f59e0b" />,
    description: '세션 드러머 양성 과정',
    curriculum: [
      {
        title: '고급 테크닉',
        children: [
          { title: '그루브 심화', items: ['펑크/소울', '재즈', '라틴', '일렉트로닉'] },
          { title: '폴리리듬', items: ['오드 타임', '메트릭 모듈레이션', '리니어 드러밍'] },
          { title: '솔로', items: ['루디먼츠 응용', '멜로딕 솔로', '드럼 배틀'] },
        ],
      },
      {
        title: '세션 활동',
        children: [
          { title: '밴드', items: ['리듬섹션 리딩', '다이나믹스', '곡 구성'] },
          { title: '레코딩', items: ['마이킹', '클릭 연주', '사운드 메이킹'] },
          { title: '라이브', items: ['무대 세팅', '인이어', '퍼포먼스'] },
        ],
      },
      {
        title: '커리어',
        children: [
          { title: '세션맨', items: ['기획사 세션', '녹음 세션', '투어 세션'] },
          { title: '밴드 활동', items: ['프로 밴드', '프로젝트 밴드', '세션'] },
        ],
      },
    ],
  },
];

const IconHome = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const IconCheck = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

const IconStar = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);

const specialPrograms = [
  { icon: <IconHome size={32} color="#f59e0b" />, title: '연습실 무제한 사용', desc: '약 30여개실, 사용시간 11:00 ~ 22:00' },
  { icon: <IconStar size={32} color="#f59e0b" />, title: 'Open Stage', desc: '두 달에 한 번 Open Stage 무대 참여' },
  { icon: <IconRecording size={32} color="#f59e0b" />, title: '레코딩 실습', desc: '월 1회 이상 실전 녹음 수업' },
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
          backgroundColor: depth === 0 ? '#fef3c7' : depth === 1 ? '#fff' : 'transparent',
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
                color: '#b45309',
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

export default function ProfessionalCoursePage() {
  const [selectedMajor, setSelectedMajor] = useState<string>('vocal');
  const currentMajor = majors.find((m) => m.id === selectedMajor) || majors[0];

  return (
    <SubPageLayout
      title="전문반"
      subtitle="프로 뮤지션을 향한 고급 과정"
      bgImage="/images/main/main4.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              프로 뮤지션, 세션맨, 프로듀서를 목표로 하는<br />
              <strong>심화 전문 과정</strong>입니다.<br />
              현장 경험과 네트워크를 쌓으며 프로로 성장하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Tree */}
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
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#fef3c7',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {currentMajor.icon}
              </div>
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

      {/* Special Programs */}
      <section style={{ padding: '60px 0', backgroundColor: '#fffbeb' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            전문반 수강생 혜택
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}>
            {specialPrograms.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '28px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#000', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
