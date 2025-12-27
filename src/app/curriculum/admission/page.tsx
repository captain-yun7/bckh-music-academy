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
    description: '입시에 최적화된 보컬 트레이닝',
    curriculum: [
      {
        title: '기초 단계',
        children: [
          { title: '호흡법', items: ['복식호흡', '횡격막 운동', '호흡 지구력 훈련'] },
          { title: '발성법', items: ['두성/흉성 발성', '성대 접촉 훈련', '공명 위치 찾기'] },
          { title: '음정/리듬', items: ['음정 정확도 훈련', '박자 세분화', '리듬 패턴 익히기'] },
        ],
      },
      {
        title: '심화 단계',
        children: [
          { title: '테크닉', items: ['비브라토', '벨팅', '페이크', '런/애드리브'] },
          { title: '장르 소화', items: ['발라드', 'R&B', '팝', '소울'] },
          { title: '감정 표현', items: ['가사 해석', '감정선 구축', '곡 스토리텔링'] },
        ],
      },
      {
        title: '입시 준비',
        children: [
          { title: '입시곡 선정', items: ['개인 음색에 맞는 곡 선정', '자유곡/지정곡 준비'] },
          { title: '실전 연습', items: ['모의 실기 테스트', '무대 매너', '긴장 컨트롤'] },
        ],
      },
    ],
  },
  {
    id: 'composing',
    name: '작곡/화성학',
    icon: <IconMusic size={20} />,
    description: '창작과 이론을 겸비한 작곡 과정',
    curriculum: [
      {
        title: '기초 이론',
        children: [
          { title: '음악 기초 이론', items: ['음계/조성', '음정/화음', '박자/리듬'] },
          { title: '화성학 기초', items: ['3화음/7화음', '다이어토닉 코드', '케이던스'] },
          { title: '시창청음', items: ['음정 청음', '화음 청음', '멜로디 카피'] },
        ],
      },
      {
        title: '심화 과정',
        children: [
          { title: '화성학 심화', items: ['텐션 코드', '모달 인터체인지', '리하모니제이션'] },
          { title: '편곡', items: ['악기 편성', '리듬 섹션 편곡', '스트링/브라스 편곡'] },
          { title: '작곡 실습', items: ['멜로디 작법', '코드 프로그레션', '형식 구성'] },
        ],
      },
      {
        title: '입시 준비',
        children: [
          { title: '작곡 포트폴리오', items: ['자작곡 완성', '장르별 곡 준비', '악보 정리'] },
          { title: '필기 시험 대비', items: ['화성학 문제 풀이', '시창청음 실전 연습'] },
        ],
      },
    ],
  },
  {
    id: 'midi',
    name: '미디/전자음악',
    icon: <IconMidi size={20} />,
    description: '디지털 음악 제작의 모든 것',
    curriculum: [
      {
        title: '기초 단계',
        children: [
          { title: 'DAW 기초', items: ['Logic/Cubase/Ableton 사용법', '미디 입력', '오디오 녹음'] },
          { title: '가상악기', items: ['신디사이저 기초', '샘플러 활용', '드럼 프로그래밍'] },
          { title: '음악 기초 이론', items: ['코드 이론', '스케일', '리듬 패턴'] },
        ],
      },
      {
        title: '심화 과정',
        children: [
          { title: '사운드 디자인', items: ['신스 음색 만들기', 'FX/앰비언스', '베이스 사운드'] },
          { title: '믹싱 기초', items: ['EQ/컴프레서', '공간계 이펙트', '밸런스 조절'] },
          { title: '장르별 제작', items: ['팝/발라드', 'EDM/힙합', 'R&B/소울'] },
        ],
      },
      {
        title: '입시 준비',
        children: [
          { title: '포트폴리오', items: ['자작곡 3-5곡', '장르 다양성', '완성도 높이기'] },
          { title: '실기 시험', items: ['실시간 편곡', '즉흥 작곡', '음원 분석'] },
        ],
      },
    ],
  },
  {
    id: 'piano',
    name: '재즈피아노',
    icon: <IconPiano size={20} />,
    description: '재즈 화성과 즉흥연주 마스터',
    curriculum: [
      {
        title: '기초 단계',
        children: [
          { title: '테크닉', items: ['하농/스케일', '손목/팔 릴렉싱', '터치 컨트롤'] },
          { title: '코드 보이싱', items: ['3화음/7화음 보이싱', '텐션 보이싱', '드롭 보이싱'] },
          { title: '리듬', items: ['스윙 필', '라틴 리듬', '펑크/R&B 그루브'] },
        ],
      },
      {
        title: '심화 과정',
        children: [
          { title: '즉흥연주', items: ['스케일 활용', '모티브 발전', '코드톤 솔로'] },
          { title: '리하모니제이션', items: ['대리코드', '패싱코드', '모달 인터체인지'] },
          { title: '반주법', items: ['발라드 반주', '스윙/보사노바', '팝/R&B 스타일'] },
        ],
      },
      {
        title: '입시 준비',
        children: [
          { title: '입시곡', items: ['자유곡 선정', '스탠다드 곡 준비', '초견 연습'] },
          { title: '실전 대비', items: ['모의 실기', '긴장 컨트롤', '무대 연주력'] },
        ],
      },
    ],
  },
  {
    id: 'guitar',
    name: '기타',
    icon: <IconGuitar size={20} />,
    description: '일렉/어쿠스틱 기타 전문 과정',
    curriculum: [
      {
        title: '기초 단계',
        children: [
          { title: '기본기', items: ['코드폼', '스트로크/아르페지오', '뮤트 테크닉'] },
          { title: '스케일', items: ['메이저/마이너 스케일', '펜타토닉', '모드 스케일'] },
          { title: '리듬 기타', items: ['8비트/16비트', '셔플/스윙', '펑크/레게'] },
        ],
      },
      {
        title: '심화 과정',
        children: [
          { title: '솔로 테크닉', items: ['벤딩/비브라토', '해머링/풀링', '스위핑/태핑'] },
          { title: '장르 연구', items: ['블루스', '재즈', '록/메탈', '퓨전'] },
          { title: '톤 메이킹', items: ['이펙터 활용', '앰프 세팅', '사운드 디자인'] },
        ],
      },
      {
        title: '입시 준비',
        children: [
          { title: '입시곡', items: ['자유곡 선정', '지정곡 연습', '초견 능력'] },
          { title: '실전', items: ['모의 실기', '무대 연주', '앙상블'] },
        ],
      },
    ],
  },
  {
    id: 'bass',
    name: '베이스',
    icon: <IconBass size={20} />,
    description: '그루브와 앙상블의 핵심',
    curriculum: [
      {
        title: '기초 단계',
        children: [
          { title: '기본기', items: ['핑거링', '피킹', '슬랩 기초'] },
          { title: '리듬', items: ['8비트/16비트 그루브', '고스트 노트', '싱코페이션'] },
          { title: '음악 이론', items: ['스케일', '코드톤', '아르페지오'] },
        ],
      },
      {
        title: '심화 과정',
        children: [
          { title: '테크닉', items: ['슬랩 심화', '탭핑', '코드 연주'] },
          { title: '장르 연구', items: ['펑크', '소울/R&B', '재즈', '록'] },
          { title: '앙상블', items: ['드럼과의 호흡', '밴드 사운드', '그루브 만들기'] },
        ],
      },
      {
        title: '입시 준비',
        children: [
          { title: '입시곡', items: ['자유곡/지정곡', '워킹베이스', '초견'] },
          { title: '실전', items: ['모의 실기', '앙상블 테스트'] },
        ],
      },
    ],
  },
  {
    id: 'drums',
    name: '드럼',
    icon: <IconDrum size={20} />,
    description: '리듬과 그루브의 기초',
    curriculum: [
      {
        title: '기초 단계',
        children: [
          { title: '스틱 컨트롤', items: ['그립', '싱글/더블 스트로크', '악센트'] },
          { title: '기본 리듬', items: ['8비트/16비트', '필인', '하이햇 오픈/클로즈'] },
          { title: '루디먼츠', items: ['패러디들', '플램', '드래그'] },
        ],
      },
      {
        title: '심화 과정',
        children: [
          { title: '장르 리듬', items: ['펑크/셔플', '라틴(보사/삼바)', '재즈 스윙'] },
          { title: '그루브', items: ['고스트 노트', '다이나믹스', '폴리리듬'] },
          { title: '앙상블', items: ['밴드 연주', '베이스와 호흡', '곡 해석'] },
        ],
      },
      {
        title: '입시 준비',
        children: [
          { title: '입시곡', items: ['자유곡 선정', '지정곡 연습', '초견'] },
          { title: '실전', items: ['모의 실기', '무대 퍼포먼스'] },
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
          backgroundColor: depth === 0 ? '#f8f9fa' : depth === 1 ? '#fff' : 'transparent',
          borderRadius: '8px',
          marginBottom: '4px',
          cursor: hasChildren ? 'pointer' : 'default',
          borderLeft: depth > 0 ? '2px solid #e5e7eb' : 'none',
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

export default function AdmissionCoursePage() {
  const [selectedMajor, setSelectedMajor] = useState<string>('vocal');
  const currentMajor = majors.find((m) => m.id === selectedMajor) || majors[0];

  return (
    <SubPageLayout
      title="입시반"
      subtitle="실용음악 대학 합격을 위한 체계적인 준비"
      bgImage="/images/main/main2.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              경희실용음악학원 입시반은 25년 전통의 노하우로<br />
              <strong>연간 95% 이상의 합격률</strong>을 자랑합니다.<br />
              1:1 맞춤 레슨과 체계적인 커리큘럼으로 꿈의 대학에 합격하세요.
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
                  {currentMajor.name} 전공
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
            입시 준비 과정
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            {[
              { step: '01', title: '레벨 테스트', desc: '현재 실력 진단 및 목표 대학 설정' },
              { step: '02', title: '맞춤 커리큘럼', desc: '개인별 약점 보완 및 강점 강화' },
              { step: '03', title: '전공 실기', desc: '입시곡 선정 및 집중 레슨' },
              { step: '04', title: '이론 수업', desc: '화성학, 시창청음, 음악이론' },
              { step: '05', title: '모의고사', desc: '실전과 동일한 환경에서 연습' },
              { step: '06', title: '합격', desc: '꿈의 대학 합격!' },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  padding: '28px',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  lineHeight: '40px',
                  backgroundColor: '#f59e0b',
                  color: '#fff',
                  borderRadius: '50%',
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}>
                  {item.step}
                </span>
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

      {/* Benefits */}
      <section style={{ padding: '60px 0', backgroundColor: '#fffbeb' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            입시반 수강생 혜택
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
              { title: '철저한 출결확인 시스템/생활지도', desc: '출석 문자 통보', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
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
              { title: '4개월 단위 모의 TEST', desc: '', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              )},
              { title: '학부형 세미나&상담 프로그램', desc: '학부형상담 연 1~2회', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )},
              { title: '레코딩 실습', desc: '월 1회 이상 실전 녹음 수업', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
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

      {/* Universities */}
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
            {[
              '서울대학교', '한양대학교', '경희대학교', '동덕여자대학교',
              '서울예술대학교', '호원대학교', '백제예술대학교', '명지대학교',
              '단국대학교', '계명대학교', '동아방송예술대학교', '홍익대학교',
              '백석예술대학교', '그 외 다수',
            ].map((uni) => (
              <span
                key={uni}
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
    </SubPageLayout>
  );
}
