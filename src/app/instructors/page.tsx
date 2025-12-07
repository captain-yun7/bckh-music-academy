import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';
import Link from 'next/link';

// 전공별 강사 데이터
const subjects = [
  {
    id: 'vocal',
    name: '보컬',
    description: '대중음악 보컬 전문 교육',
    image: '/images/lecturers/vocal_하수지.jpeg',
    instructorCount: 7,
  },
  {
    id: 'composing',
    name: '작곡/화성학',
    description: '작곡 및 화성학 이론 교육',
    image: '/images/lecturers/composing_강혜민.jpg',
    instructorCount: 4,
  },
  {
    id: 'midi',
    name: '미디/전자음악',
    description: 'MIDI 및 전자음악 프로덕션',
    image: '/images/lecturers/midi_이재혁.jpg',
    instructorCount: 2,
  },
  {
    id: 'singer-songwriter',
    name: '싱어송라이터',
    description: '보컬과 작곡을 겸비한 아티스트 양성',
    image: '/images/lecturers/vocal_하수지.jpeg',
    instructorCount: 2,
  },
  {
    id: 'guitar',
    name: '기타',
    description: '일렉기타, 어쿠스틱기타 전문 교육',
    image: '/images/lecturers/guitar_노아.jpg',
    instructorCount: 5,
  },
  {
    id: 'bass',
    name: '베이스',
    description: '일렉베이스 전문 교육',
    image: '/images/lecturers/bass_현재천.jpg',
    instructorCount: 2,
  },
  {
    id: 'drums',
    name: '드럼',
    description: '드럼 전문 교육',
    image: '/images/lecturers/drums_유종광.jpeg',
    instructorCount: 1,
  },
  {
    id: 'jazz-piano',
    name: '재즈피아노',
    description: '재즈피아노 및 건반 전문 교육',
    image: '/images/lecturers/piano_이민경.jpg',
    instructorCount: 6,
  },
  {
    id: 'dance',
    name: '댄스',
    description: '무대 퍼포먼스 및 댄스 교육',
    image: '/images/lecturers/dance_양지은.jpeg',
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
                  backgroundColor: '#f8f8f8',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                    <Image
                      src={subject.image}
                      alt={subject.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    }} />
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
