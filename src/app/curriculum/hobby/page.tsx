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

const IconGuitar = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.9 12.1a4.5 4.5 0 1 0-6.4 6.4 4.5 4.5 0 0 0 6.4-6.4z" />
    <path d="m21 3-6 6" />
    <path d="m15 9-3 3" />
    <circle cx="12" cy="12" r="1" />
    <path d="M20 4v3h-3" />
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

const IconBass = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18a6 6 0 0 0 6-6V4" />
    <path d="M6 12a6 6 0 0 0 6 6" />
    <circle cx="12" cy="18" r="3" />
    <path d="M18 4h-3v3" />
    <line x1="15" y1="4" x2="18" y2="7" />
  </svg>
);

const IconComputer = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const IconMusic = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const IconClock = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const IconSmile = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const IconStage = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20" />
    <path d="M5 20v-8l7-5 7 5v8" />
    <line x1="12" y1="7" x2="12" y2="2" />
    <path d="M10 2h4" />
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
    description: '노래하는 즐거움을 느껴보세요',
    curriculum: [
      {
        title: '기초 다지기',
        children: [
          { title: '호흡과 발성', items: ['편안한 호흡법', '자연스러운 발성', '목 건강 관리'] },
          { title: '음정과 리듬', items: ['음감 키우기', '리듬 타기', '박자 맞추기'] },
        ],
      },
      {
        title: '노래 배우기',
        children: [
          { title: '곡 연습', items: ['좋아하는 곡 선택', '가사 외우기', '멜로디 익히기'] },
          { title: '감정 표현', items: ['가사 이해하기', '느낌 살리기', '나만의 스타일'] },
        ],
      },
      {
        title: '즐기기',
        children: [
          { title: '무대 경험', items: ['소규모 발표회', '노래방 실력 UP', '가족/친구 앞 공연'] },
        ],
      },
    ],
  },
  {
    id: 'guitar',
    name: '기타',
    icon: <IconGuitar size={20} />,
    description: '기타 하나로 노래를 완성해보세요',
    curriculum: [
      {
        title: '기초 배우기',
        children: [
          { title: '기본 자세', items: ['기타 잡는 법', '픽 사용법', '손가락 위치'] },
          { title: '코드 익히기', items: ['기본 코드(C, G, D, Em, Am)', '코드 체인지', '간단한 스트로크'] },
        ],
      },
      {
        title: '곡 연습',
        children: [
          { title: '반주 연습', items: ['좋아하는 곡 반주', '스트로크 패턴', '아르페지오'] },
          { title: '노래하며 치기', items: ['가사와 반주 동시에', '리듬 맞추기', '완곡하기'] },
        ],
      },
      {
        title: '실력 향상',
        children: [
          { title: '다양한 주법', items: ['핑거스타일', '퍼커시브 기타', '간단한 솔로'] },
        ],
      },
    ],
  },
  {
    id: 'piano',
    name: '피아노',
    icon: <IconPiano size={20} />,
    description: '피아노로 아름다운 선율을 연주해보세요',
    curriculum: [
      {
        title: '기초 다지기',
        children: [
          { title: '기본기', items: ['건반 익히기', '손 모양', '앉는 자세'] },
          { title: '악보 읽기', items: ['음표와 쉼표', '박자 이해', '간단한 악보'] },
        ],
      },
      {
        title: '곡 연주',
        children: [
          { title: '양손 연주', items: ['오른손 멜로디', '왼손 반주', '양손 합치기'] },
          { title: '좋아하는 곡', items: ['OST', '팝송', '가요'] },
        ],
      },
      {
        title: '반주하기',
        children: [
          { title: '코드 반주', items: ['기본 코드', '반주 패턴', '노래 반주'] },
        ],
      },
    ],
  },
  {
    id: 'drums',
    name: '드럼',
    icon: <IconDrum size={20} />,
    description: '신나는 리듬으로 스트레스 해소!',
    curriculum: [
      {
        title: '기초 배우기',
        children: [
          { title: '드럼 세트', items: ['구성 알기', '스틱 잡는 법', '기본 자세'] },
          { title: '기본 리듬', items: ['8비트 기초', '심벌 사용', '페달 밟기'] },
        ],
      },
      {
        title: '리듬 연습',
        children: [
          { title: '다양한 비트', items: ['8비트 변형', '16비트', '필인 넣기'] },
          { title: '곡에 맞춰 연주', items: ['좋아하는 곡', '박자 맞추기', '완곡하기'] },
        ],
      },
      {
        title: '합주',
        children: [
          { title: '밴드 연주', items: ['다른 악기와 호흡', '소규모 합주', '발표회 참여'] },
        ],
      },
    ],
  },
  {
    id: 'bass',
    name: '베이스',
    icon: <IconBass size={20} />,
    description: '음악의 기둥, 베이스를 배워보세요',
    curriculum: [
      {
        title: '기초 다지기',
        children: [
          { title: '기본기', items: ['베이스 잡는 법', '핑거링', '피킹'] },
          { title: '음 익히기', items: ['지판 이해', '스케일', '리듬 타기'] },
        ],
      },
      {
        title: '곡 연습',
        children: [
          { title: '베이스 라인', items: ['루트 연주', '간단한 라인', '곡에 맞춰 연주'] },
          { title: '그루브', items: ['리듬감 키우기', '드럼과 호흡', '완곡하기'] },
        ],
      },
      {
        title: '합주',
        children: [
          { title: '밴드 연주', items: ['리듬 섹션', '다른 악기와 호흡', '발표회'] },
        ],
      },
    ],
  },
  {
    id: 'composing',
    name: '작곡/미디',
    icon: <IconComputer size={20} />,
    description: '나만의 음악을 만들어보세요',
    curriculum: [
      {
        title: '기초 배우기',
        children: [
          { title: '음악 이론', items: ['음표/쉼표', '코드 기초', '멜로디 만들기'] },
          { title: 'DAW 사용법', items: ['프로그램 설치', '기본 인터페이스', '미디 입력'] },
        ],
      },
      {
        title: '곡 만들기',
        children: [
          { title: '작곡 실습', items: ['멜로디 작성', '코드 붙이기', '구성 만들기'] },
          { title: '편곡', items: ['악기 추가', '드럼 비트', '베이스 라인'] },
        ],
      },
      {
        title: '완성하기',
        children: [
          { title: '믹싱 기초', items: ['볼륨 조절', '팬닝', '간단한 이펙트'] },
          { title: '음원 저장', items: ['파일 추출', 'SNS 공유', '링크 만들기'] },
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

export default function HobbyCoursePage() {
  const [selectedMajor, setSelectedMajor] = useState<string>('vocal');
  const currentMajor = majors.find((m) => m.id === selectedMajor) || majors[0];

  return (
    <SubPageLayout
      title="취미반"
      subtitle="음악을 즐기는 가장 쉬운 방법"
      bgImage="/images/main/main5.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              노래가 좋아서, 악기가 배우고 싶어서<br />
              <strong>음악을 취미로 즐기고 싶은 모든 분</strong>을 위한 과정입니다.<br />
              부담 없이 시작하고, 음악과 함께하는 삶을 경험하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Tree */}
      <section style={{ padding: '60px 0', backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            과목별 커리큘럼
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

      {/* Benefits */}
      <section style={{ padding: '60px 0', backgroundColor: '#fffbeb' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            취미반 수강생 혜택
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {[
              { icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              ), title: '하루 1시간 연습실 사용', desc: '전화예약 가능, 약 30여개실 (사용시간 11:00 ~ 22:00)' },
              { icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
                </svg>
              ), title: 'Open Stage', desc: '두 달에 한 번 Open Stage 무대 참여' },
            ].map((item, i) => (
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
                <span style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  {item.icon}
                </span>
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

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#f59e0b' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            음악과 함께하는 즐거운 일상
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
            지금 바로 상담 신청하고 무료 체험 레슨을 받아보세요!
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#fff',
              color: '#f59e0b',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            상담 신청하기
          </a>
        </div>
      </section>
    </SubPageLayout>
  );
}
