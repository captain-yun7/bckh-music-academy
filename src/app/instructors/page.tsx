import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

// 전공별 아이콘 SVG
const SubjectIcons = {
  vocal: (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  composing: (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  midi: (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M6 11h.01M10 11h.01M14 11h.01M18 11h.01M6 15h.01M10 15h.01M14 15h.01M18 15h.01M7 3v4M12 3v4M17 3v4" />
    </svg>
  ),
  'singer-songwriter': (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  guitar: (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <path d="M11.9 2L7.2 6.7c-.8.8-.8 2.1 0 2.9l7.2 7.2c.8.8 2.1.8 2.9 0l4.7-4.7c.8-.8.8-2.1 0-2.9l-7.2-7.2c-.8-.8-2.1-.8-2.9 0z" />
      <path d="M10.5 10.5L6 15M13.5 13.5L9 18M7 22l-2-2M16 11l5-5" />
    </svg>
  ),
  bass: (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <rect x="8" y="4" width="8" height="16" rx="1" />
      <line x1="11" y1="4" x2="11" y2="20" />
      <line x1="13" y1="4" x2="13" y2="20" />
      <circle cx="10" cy="8" r="1" fill="#ffc50a" />
      <circle cx="14" cy="8" r="1" fill="#ffc50a" />
    </svg>
  ),
  drums: (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16M4 12h16" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  'jazz-piano': (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <rect x="2" y="8" width="20" height="12" rx="1" />
      <line x1="6" y1="8" x2="6" y2="20" />
      <line x1="10" y1="8" x2="10" y2="20" />
      <line x1="14" y1="8" x2="14" y2="20" />
      <line x1="18" y1="8" x2="18" y2="20" />
      <rect x="5" y="8" width="2" height="6" fill="#ffc50a" />
      <rect x="13" y="8" width="2" height="6" fill="#ffc50a" />
    </svg>
  ),
  dance: (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ffc50a" strokeWidth="1.5">
      <circle cx="12" cy="5" r="2" />
      <path d="M8 8l2 8-2 4M16 8l-2 8 2 4M12 13v8" />
      <path d="M8 8h8M10 16l-3 3M14 16l3 3" />
    </svg>
  ),
};

// 전공별 강사 데이터
const subjects = [
  {
    id: 'vocal',
    name: '보컬',
    description: '대중음악 보컬 전문 교육',
    instructorCount: 7,
  },
  {
    id: 'composing',
    name: '작곡/화성학',
    description: '작곡 및 화성학 이론 교육',
    instructorCount: 4,
  },
  {
    id: 'midi',
    name: '미디/전자음악',
    description: 'MIDI 및 전자음악 프로덕션',
    instructorCount: 2,
  },
  {
    id: 'singer-songwriter',
    name: '싱어송라이터',
    description: '보컬과 작곡을 겸비한 아티스트 양성',
    instructorCount: 2,
  },
  {
    id: 'guitar',
    name: '기타',
    description: '일렉기타, 어쿠스틱기타 전문 교육',
    instructorCount: 5,
  },
  {
    id: 'bass',
    name: '베이스',
    description: '일렉베이스 전문 교육',
    instructorCount: 2,
  },
  {
    id: 'drums',
    name: '드럼',
    description: '드럼 전문 교육',
    instructorCount: 1,
  },
  {
    id: 'jazz-piano',
    name: '재즈피아노',
    description: '재즈피아노 및 건반 전문 교육',
    instructorCount: 6,
  },
  {
    id: 'dance',
    name: '댄스',
    description: '무대 퍼포먼스 및 댄스 교육',
    instructorCount: 1,
  },
];

export default function InstructorsPage() {
  return (
    <SubPageLayout
      title="강사진"
      subtitle="최고의 강사진이 여러분의 꿈을 함께합니다"
      bgImage="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            경희실용음악학원은 현직 뮤지션, 음대 교수진, 프로듀서 등
            최고의 강사진이 체계적인 교육을 제공합니다.
          </p>
        </div>
      </section>

      {/* Subject Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/instructors/${subject.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#111',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1a1a1a',
                  }}>
                    {SubjectIcons[subject.id as keyof typeof SubjectIcons]}
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      right: '20px',
                    }}>
                      <p style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '4px',
                      }}>
                        {subject.name}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.8)',
                      }}>
                        {subject.instructorCount}명의 전문 강사
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px' }}>
                      {subject.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#3b82f6',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}>
                      강사진 보기
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
