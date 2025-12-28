'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 강사 상세 데이터 타입
interface InstructorDetail {
  name: string;
  category: string;
  image: string;
  introduction: string;
  profile: string;
  curriculum: { title: string; content: string }[];
  genres: string;
  recommendations: string[];
  message: string;
}

// 강사 데이터 (상세 정보 포함)
const allInstructors: InstructorDetail[] = [
  {
    name: '하수지',
    category: 'Vocal',
    image: '/images/lecturers/vocal_하수지.jpeg',
    introduction: '안녕하세요. 보컬트레이너 겸 싱어송라이터 하수지입니다.',
    profile: '백석예대 실용음악학과 싱어송라이터 전공',
    curriculum: [
      { title: '학생의 결을 이해하는 보컬 티칭', content: '학생 고유의 결을 이해하고 그 색을 살려주는 교육을 지향합니다.' },
      { title: '탄탄한 기본기 + 창의적 해석', content: '호흡·자세·발성 기초를 통해 안정된 기반을 세우고, 학생만의 개성을 담은 소리를 만들어갑니다.' },
    ],
    genres: 'Rock, R&B, Funk, J-pop, Indie, Pop',
    recommendations: ['Kara Marni - Caught up', 'Nao - Bad Blood', '전지선 - Help'],
    message: '각자의 목소리와 개성이 가장 편안하게 빛날 수 있도록 돕겠습니다.',
  },
  {
    name: '김수현',
    category: 'Vocal',
    image: '/images/lecturers/vocal_김수현.jpeg',
    introduction: '안녕하세요. K-POP 보컬 트레이너 김수현입니다.',
    profile: '경희대학교 포스트모던음악학과 졸업',
    curriculum: [
      { title: '체계적인 발성 교육', content: '복식호흡부터 두성, 믹스보이스까지 체계적인 발성 테크닉을 가르칩니다.' },
      { title: 'K-POP 스타일링', content: '아이돌 보컬 트레이닝 경험을 바탕으로 K-POP에 최적화된 보컬 스타일링을 지도합니다.' },
    ],
    genres: 'K-POP, R&B, Ballad, Dance Pop',
    recommendations: ['Ariana Grande - Into You', '태연 - Fine', 'IU - 에잇'],
    message: '여러분의 숨겨진 가능성을 함께 발견해 나가요!',
  },
  {
    name: '김한울',
    category: 'Vocal',
    image: '/images/lecturers/vocal_김한울.jpg',
    introduction: '안녕하세요. 세션보컬 겸 보컬트레이너 김한울입니다.',
    profile: '동아방송예술대학교 실용음악과 졸업',
    curriculum: [
      { title: '라이브 퍼포먼스 중심 교육', content: '무대 위에서 빛나는 보컬리스트가 되기 위한 라이브 퍼포먼스 중심의 수업을 진행합니다.' },
    ],
    genres: 'Soul, R&B, Gospel, Pop',
    recommendations: ['Stevie Wonder - Superstition', 'Bruno Mars - Uptown Funk'],
    message: '함께 음악으로 소통하며 성장해요!',
  },
  {
    name: '이은지',
    category: 'Vocal',
    image: '/images/lecturers/vocal_이은지.jpg',
    introduction: '안녕하세요. 발라드 보컬 전문 트레이너 이은지입니다.',
    profile: '서울예술대학교 실용음악과 졸업',
    curriculum: [
      { title: '감성 보컬 트레이닝', content: '기본 발성을 바탕으로 곡의 감정을 온전히 전달할 수 있는 표현력을 키워드립니다.' },
    ],
    genres: 'Ballad, Pop, OST',
    recommendations: ['백예린 - 그건 아마 우리의 잘못은 아닐 거야', '아이유 - 밤편지'],
    message: '당신의 목소리로 감동을 전할 수 있도록 함께 하겠습니다.',
  },
  {
    name: '전용일',
    category: 'Vocal',
    image: '/images/lecturers/vocal_전용일.jpg',
    introduction: '안녕하세요. 아이돌 보컬 트레이너 전용일입니다.',
    profile: '단국대학교 실용음악과 졸업',
    curriculum: [
      { title: '아이돌 맞춤 보컬 트레이닝', content: '댄스와 보컬을 동시에 소화해야 하는 아이돌 지망생을 위한 특화 수업입니다.' },
    ],
    genres: 'K-POP, Hip-Hop, R&B, EDM',
    recommendations: ['BIGBANG - BANG BANG BANG', 'BTS - Dynamite'],
    message: '꿈을 향해 달려가는 여러분을 응원합니다!',
  },
  {
    name: '홍연하',
    category: 'Vocal',
    image: '/images/lecturers/vocal_홍연하.png',
    introduction: '안녕하세요. 퓨전국악 보컬 전문 홍연하입니다.',
    profile: '호원대학교 실용음악과 졸업',
    curriculum: [
      { title: '국악 창법과 실용음악의 융합', content: '전통 국악 창법을 현대 실용음악에 접목시키는 독특한 수업을 진행합니다.' },
    ],
    genres: '퓨전국악, World Music, Folk, Indie',
    recommendations: ['이날치 - 범 내려온다', '잠비나이 - Connection'],
    message: '전통과 현대의 조화로운 소리를 함께 만들어가요.',
  },
  {
    name: '이민경',
    category: 'Piano',
    image: '/images/lecturers/piano_이민경.jpg',
    introduction: '안녕하세요. 재즈 피아니스트 이민경입니다.',
    profile: '버클리 음대 재즈피아노 전공',
    curriculum: [
      { title: '재즈피아노 입문', content: '재즈 보이싱과 즉흥연주의 기초를 배웁니다.' },
    ],
    genres: 'Jazz, Bossa Nova, Fusion',
    recommendations: ['Bill Evans - My Foolish Heart', 'Herbie Hancock - Cantaloupe Island'],
    message: '재즈의 자유로움을 피아노로 표현해봐요.',
  },
  {
    name: '이소정',
    category: 'Piano',
    image: '/images/lecturers/piano_이소정.jpg',
    introduction: '안녕하세요. 피아니스트 이소정입니다.',
    profile: '한양대학교 음악대학원 졸업',
    curriculum: [
      { title: '반주법', content: '다양한 장르의 반주법을 체계적으로 배웁니다.' },
    ],
    genres: 'Classical, Jazz, Pop',
    recommendations: ['Chopin - Ballade No.1', 'Oscar Peterson - C Jam Blues'],
    message: '클래식과 재즈를 넘나드는 피아노를 경험해보세요.',
  },
  {
    name: '김하영',
    category: 'Piano',
    image: '/images/lecturers/piano_김하영.png',
    introduction: '안녕하세요. 가요 반주 전문 김하영입니다.',
    profile: '경희대학교 포스트모던음악학과 졸업',
    curriculum: [
      { title: '실용 반주법', content: 'K-POP과 가요 반주의 핵심을 배웁니다.' },
    ],
    genres: 'K-POP, Ballad, Pop',
    recommendations: ['IU - 밤편지', '폴킴 - 모든 날, 모든 순간'],
    message: '노래를 더 빛나게 하는 반주를 만들어봐요.',
  },
  {
    name: '황진하',
    category: 'Piano',
    image: '/images/lecturers/piano_황진하.jpg',
    introduction: '안녕하세요. 재즈 피아니스트 황진하입니다.',
    profile: '단국대학교 실용음악과 졸업',
    curriculum: [
      { title: '재즈 화성학/피아노', content: '재즈 화성학과 피아노를 동시에 배웁니다.' },
    ],
    genres: 'Jazz, Fusion, Contemporary',
    recommendations: ['Chick Corea - Spain', 'Keith Jarrett - The Köln Concert'],
    message: '화성학과 피아노, 두 마리 토끼를 잡아봐요.',
  },
  {
    name: '노아(Noah)',
    category: 'Guitar',
    image: '/images/lecturers/guitar_노아.jpg',
    introduction: '안녕하세요. 세션 기타리스트 Noah입니다.',
    profile: 'Musicians Institute(MI) 졸업',
    curriculum: [
      { title: '일렉기타 테크닉', content: '펜타토닉부터 모드까지, 일렉기타의 핵심 테크닉을 배웁니다.' },
    ],
    genres: 'Rock, Blues, Fusion, Pop',
    recommendations: ['Jimi Hendrix - Voodoo Child', 'Steve Vai - For The Love of God'],
    message: '기타와 함께하는 음악 여행을 시작해봐요!',
  },
  {
    name: '김영롱',
    category: 'Guitar',
    image: '/images/lecturers/guitar_김영롱.jpg',
    introduction: '안녕하세요. 핑거스타일 기타리스트 김영롱입니다.',
    profile: '동아방송예술대학교 실용음악과 졸업',
    curriculum: [
      { title: '핑거스타일 기초', content: '어쿠스틱 기타의 매력을 핑거스타일로 표현하는 방법을 배웁니다.' },
    ],
    genres: 'Fingerstyle, Acoustic, Folk',
    recommendations: ['Sungha Jung - Felicity', 'Tommy Emmanuel - Mombasa'],
    message: '손끝으로 전하는 감성, 함께 만들어요.',
  },
  {
    name: '남윤찬',
    category: 'Guitar',
    image: '/images/lecturers/guitar_남윤찬.jpg',
    introduction: '안녕하세요. 재즈 기타리스트 남윤찬입니다.',
    profile: '백제예술대학교 실용음악과 졸업',
    curriculum: [
      { title: '재즈 기타 입문', content: '재즈 기타의 기초부터 즉흥연주까지 체계적으로 배웁니다.' },
    ],
    genres: 'Jazz, Fusion, Bossa Nova',
    recommendations: ['Wes Montgomery - Four on Six', 'Pat Metheny - Bright Size Life'],
    message: '재즈의 세계로 함께 떠나봐요.',
  },
  {
    name: '현재천',
    category: 'Bass',
    image: '/images/lecturers/bass_현재천.jpg',
    introduction: '안녕하세요. 재즈 베이시스트 현재천입니다.',
    profile: '서울예술대학교 실용음악과 졸업',
    curriculum: [
      { title: '재즈 베이스', content: '워킹베이스와 재즈 그루브의 핵심을 배웁니다.' },
    ],
    genres: 'Jazz, Fusion, Funk',
    recommendations: ['Jaco Pastorius - Portrait of Tracy', 'Marcus Miller - Blast'],
    message: '밴드의 심장, 베이스의 매력을 느껴보세요.',
  },
  {
    name: '유종광',
    category: 'Drums',
    image: '/images/lecturers/drums_유종광.jpeg',
    introduction: '안녕하세요. 재즈 드러머 유종광입니다.',
    profile: '경희대학교 포스트모던음악학과 졸업',
    curriculum: [
      { title: '재즈/퓨전 드럼', content: '스윙 리듬부터 퓨전 그루브까지 체계적으로 배웁니다.' },
    ],
    genres: 'Jazz, Fusion, Pop, Rock',
    recommendations: ['Dave Weckl - Tower of Inspiration'],
    message: '리듬의 세계로 함께 빠져봐요!',
  },
  {
    name: '강혜민',
    category: 'Composing',
    image: '/images/lecturers/composing_강혜민.jpg',
    introduction: '안녕하세요. 작곡가 겸 프로듀서 강혜민입니다.',
    profile: '버클리 음대 작곡전공 졸업',
    curriculum: [
      { title: 'K-POP 작곡의 기초', content: 'K-POP 특유의 후킹 멜로디와 구조를 분석하고, 직접 작곡해보는 실습 위주의 수업을 진행합니다.' },
    ],
    genres: 'K-POP, Pop, R&B, Electronic',
    recommendations: ['EXO - Love Shot', 'NCT 127 - Kick It'],
    message: '여러분의 음악적 아이디어를 현실로 만들어 드립니다.',
  },
  {
    name: '이재혁',
    category: 'MIDI',
    image: '/images/lecturers/midi_이재혁.jpg',
    introduction: '안녕하세요. 전자음악 프로듀서 이재혁입니다.',
    profile: '경희대학교 포스트모던음악학과 졸업',
    curriculum: [
      { title: 'DAW 마스터', content: 'Logic Pro, Ableton Live를 활용한 음악 제작의 A to Z를 배웁니다.' },
    ],
    genres: 'Electronic, EDM, Ambient, Experimental',
    recommendations: ['Daft Punk - Around the World', 'Deadmau5 - Strobe'],
    message: '기술과 창의성의 조화로 여러분만의 사운드를 만들어봐요.',
  },
  {
    name: '양지은',
    category: 'Dance',
    image: '/images/lecturers/dance_양지은.jpeg',
    introduction: '안녕하세요. K-POP 안무가 양지은입니다.',
    profile: '한국예술종합학교 무용과 졸업',
    curriculum: [
      { title: 'K-POP 댄스', content: '아이돌 안무의 기초부터 고급 테크닉까지 배웁니다.' },
    ],
    genres: 'K-POP, Hip-Hop, Contemporary',
    recommendations: ['EXO - Monster', 'aespa - Next Level'],
    message: '무대 위에서 빛나는 퍼포머가 되어보세요!',
  },
];

// 섹션 컴포넌트
function Section({ title, children, noBorder = false }: { title: string; children: React.ReactNode; noBorder?: boolean }) {
  return (
    <div style={{
      marginBottom: noBorder ? 0 : '28px',
      paddingBottom: noBorder ? 0 : '28px',
      borderBottom: noBorder ? 'none' : '1px solid #eee',
    }}>
      <h4 style={{
        fontSize: '13px',
        fontWeight: 600,
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '12px',
      }}>
        · {title}
      </h4>
      {children}
    </div>
  );
}

// 모달 컴포넌트
function InstructorModal({
  instructor,
  onClose
}: {
  instructor: InstructorDetail | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (instructor) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [instructor]);

  if (!instructor) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '40px 20px',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header with small image */}
        <div style={{
          padding: '32px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid #ffc50a',
          }}>
            <Image
              src={instructor.image}
              alt={instructor.name}
              width={100}
              height={100}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          <div>
            <span style={{
              display: 'inline-block',
              backgroundColor: '#ffc50a',
              color: '#000',
              padding: '4px 12px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '8px',
            }}>
              {instructor.category} 전공
            </span>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>
              {instructor.name}
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>{instructor.profile}</p>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* 자기소개 */}
          <Section title="자기소개">
            <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.8 }}>
              {instructor.introduction}
            </p>
          </Section>

          {/* 커리큘럼 */}
          <Section title="커리큘럼">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {instructor.curriculum.map((item, index) => (
                <div key={index}>
                  <h5 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#000',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#ffc50a',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 700,
                    }}>
                      {index + 1}
                    </span>
                    {item.title}
                  </h5>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.8, paddingLeft: '32px' }}>
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* 추구하는 음악장르 & 추천음반 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Section title="추구하는 음악장르" noBorder>
              <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.8 }}>
                {instructor.genres}
              </p>
            </Section>
            <Section title="추천음반리스트" noBorder>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {instructor.recommendations.map((item, index) => (
                  <li key={index} style={{
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{ color: '#ffc50a' }}>♪</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* 레슨생분들께 드리는 말씀 */}
          <div style={{
            marginTop: '32px',
            padding: '32px',
            backgroundColor: '#111',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* 데코 라인 */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: '#ffc50a',
            }} />
            {/* 큰따옴표 장식 */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '24px',
              fontSize: '80px',
              fontFamily: 'Georgia, serif',
              color: 'rgba(255,197,10,0.15)',
              lineHeight: 1,
            }}>
              &rdquo;
            </div>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#ffc50a',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}>
              Message
            </p>
            <p style={{
              fontSize: '18px',
              color: '#fff',
              lineHeight: 1.8,
              fontWeight: 400,
              position: 'relative',
              zIndex: 1,
            }}>
              {instructor.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstructorsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorDetail | null>(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  const openModal = (instructor: InstructorDetail) => {
    setSelectedInstructor(instructor);
  };

  return (
    <>
      <section id="instructors" style={{ padding: '100px 0', backgroundColor: '#fff' }}>
        <div className="container">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <p style={{ color: '#ffc50a', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                INSTRUCTORS
              </p>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                강사진
              </h2>
              <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px' }}>
                현직에서 활동 중인 프로뮤지션들이 직접 지도합니다.
              </p>
            </div>

            {/* Navigation Arrows */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  border: canScrollLeft ? '2px solid #ffc50a' : '2px solid rgba(0,0,0,0.2)',
                  backgroundColor: 'transparent',
                  color: canScrollLeft ? '#ffc50a' : 'rgba(0,0,0,0.3)',
                  cursor: canScrollLeft ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  border: canScrollRight ? '2px solid #ffc50a' : '2px solid rgba(0,0,0,0.2)',
                  backgroundColor: 'transparent',
                  color: canScrollRight ? '#ffc50a' : 'rgba(0,0,0,0.3)',
                  cursor: canScrollRight ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingBottom: '20px',
              marginBottom: '40px',
              marginLeft: '-20px',
              marginRight: '-20px',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            {allInstructors.map((instructor, index) => (
              <div
                key={index}
                onClick={() => openModal(instructor)}
                style={{
                  flex: '0 0 180px',
                  scrollSnapAlign: 'start',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                }}
                className="instructor-item"
              >
                <div style={{ position: 'relative', aspectRatio: '3/4' }}>
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    sizes="180px"
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '4px 10px',
                    backgroundColor: '#ffc50a',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#000',
                    fontWeight: 600,
                  }}>
                    {instructor.category}
                  </div>
                  {/* Hover Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0)',
                      transition: 'background-color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="instructor-overlay"
                  >
                    <div
                      style={{
                        padding: '12px',
                        backgroundColor: 'rgba(255, 197, 10, 0.9)',
                        borderRadius: '50%',
                        opacity: 0,
                        transform: 'scale(0.8)',
                        transition: 'all 0.3s ease',
                      }}
                      className="instructor-icon"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                        <path d="M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: '#000' }}>
                    {instructor.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/instructors"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: '#000',
                borderRadius: '100px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              강사진프로필 상세보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }

          .instructor-item:hover {
            transform: scale(1.02);
          }

          .instructor-item:hover .instructor-overlay {
            background-color: rgba(0, 0, 0, 0.3) !important;
          }

          .instructor-item:hover .instructor-icon {
            opacity: 1 !important;
            transform: scale(1) !important;
          }

          .instructor-item:hover img {
            transform: scale(1.05);
          }
        `}</style>
      </section>

      {/* Modal */}
      <InstructorModal
        instructor={selectedInstructor}
        onClose={() => setSelectedInstructor(null)}
      />
    </>
  );
}
